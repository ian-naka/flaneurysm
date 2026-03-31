import { Request, Response } from 'express';
import { z, ZodError } from 'zod';
import RegistroTexto from '../models/RegistroTexto';
import RegistroGaleria from '../models/RegistroGaleria';
import { buscarTodosRegistrosPaginados } from '../helpers/registroQueries';

// regex para detectar qualquer presença de tags html
const htmlTagRegex = /<[^>]*>?/g;

// utilitário do zod para garantir que strings longas não contenham tags e remover espaços excessivos
const sanitizeStringText = z.string().transform((val) => val.trim()).refine((val) => !htmlTagRegex.test(val), {
    message: "tags html ou scripts não são permitidos neste campo."
});

// schemas base e específicos
const baseSchema = {
    titulo: z.string().min(3, "O título é obrigatório."),
    slug: z.string().min(3, "O link é obrigatório.").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "O slug deve conter apenas letras minúsculas, números e hifens."),
};

const registroTextoSchema = z.object({
    ...baseSchema,
    descricao: sanitizeStringText.refine(val => val.length >= 10, "A descrição é obrigatória (mín. 10 caracteres)."),
});

const registroGaleriaSchema = z.object({
    ...baseSchema,
    resumo: sanitizeStringText.refine(val => val.length <= 500, "O resumo não pode ultrapassar 500 caracteres."),
});

export default class RegistroController {

    //criar um novo registro
    static async criar(req: Request, res: Response): Promise<void> {
        try {
            const { tipo } = req.body; //'texto' ou 'galeria'

            if (!tipo || (tipo !== 'texto' && tipo !== 'galeria')) {
                res.status(400).json({ message: "O campo 'tipo' (texto ou galeria) é obrigatório e deve ser válido." });
                return;
            }

            const isTexto = tipo === 'texto';
            const schema = isTexto ? registroTextoSchema : registroGaleriaSchema;

            // valida os dados textuais
            const dadosValidados = schema.parse(req.body);

            // verifica se o slug já está sendo utilizado em qualquer uma das tabelas
            const slugExisteTexto = await RegistroTexto.findOne({ where: { slug: dadosValidados.slug } });
            const slugExisteGaleria = await RegistroGaleria.findOne({ where: { slug: dadosValidados.slug } });

            if (slugExisteTexto || slugExisteGaleria) {
                res.status(422).json({ message: 'Este link (slug) já está em uso. Escolha outro.' });
                return;
            }

            // Acessando os arquivos enviados pelo multer (assumindo single 'thumb' e array 'galeria')
            const files = req.files as { [fieldname: string]: Express.Multer.File[] };

            let thumbPath = null;
            let galeriaPaths = null;

            if (files && files['thumb'] && files['thumb'].length > 0) {
                thumbPath = files['thumb'][0].path;
            }

            if (files && files['galeria'] && files['galeria'].length > 0) {
                // Guarda os caminhos como JSON string para o banco de dados
                galeriaPaths = JSON.stringify(files['galeria'].map(file => file.path));
            }

            // Galeria requer imagens obrigatórias
            if (!isTexto && (!thumbPath || !galeriaPaths)) {
                res.status(422).json({ message: 'Imagens de capa (thumb) e galeria são obrigatórias para o tipo galeria.' });
                return;
            }

            let novoRegistro;
            if (isTexto) {
                novoRegistro = await RegistroTexto.create({
                    ...dadosValidados,
                    thumb: thumbPath,
                });
            } else {
                novoRegistro = await RegistroGaleria.create({
                    ...dadosValidados,
                    thumb: thumbPath,
                    galeria: galeriaPaths,
                });
            }

            res.status(201).json({
                message: 'Registro criado com sucesso!',
                registro: novoRegistro
            });

        } catch (error: any) {
            console.error("ERRO AO CRIAR REGISTRO:", error);
            if (error instanceof ZodError) {
                res.status(422).json({
                    message: "Dados inválidos",
                    errors: error.issues.map((issue) => issue.message)
                });
                return;
            }
            res.status(500).json({ message: 'Erro interno ao salvar o registro.' });
        }
    }


    // buscar registro público por slug em ambas as tabelas
    static async buscarPorSlug(req: Request, res: Response): Promise<void> {
        try {
            const { slug } = req.params;

            // busca na tabela de textos primeiro
            let registro: any = await RegistroTexto.findOne({ where: { slug } });
            let tipo = 'texto';

            // se não encontrou, busca na de galerias
            if (!registro) {
                registro = await RegistroGaleria.findOne({ where: { slug } });
                tipo = 'galeria';
            }

            if (!registro) {
                res.status(404).json({ message: 'Registro não encontrado.' });
                return;
            }

            res.status(200).json({
                ...registro.toJSON(),
                tipo
            });
        } catch (error) {
            console.error("ERRO AO BUSCAR REGISTRO POR SLUG:", error);
            res.status(500).json({ message: 'Erro interno ao buscar o registro.' });
        }
    }

    // buscar registros com paginação e filtro opcional por tipo
    static async listarPaginado(req: Request, res: Response): Promise<void> {
        try {
            const limit = parseInt(req.query.limit as string) || 50;
            const pagina = parseInt(req.query.pagina as string) || 1;
            const tipo = req.query.tipo as string; // 'texto' ou 'galeria' (opcional)
            const offset = (pagina - 1) * limit;

            let registros: any[] = [];
            let total = 0;

            if (tipo === 'texto') {
                const { count, rows } = await RegistroTexto.findAndCountAll({
                    limit,
                    offset,
                    order: [['createdAt', 'DESC']]
                });
                registros = rows.map(r => ({ ...r.toJSON(), tipo: 'texto' }));
                total = count;
            } else if (tipo === 'galeria') {
                const { count, rows } = await RegistroGaleria.findAndCountAll({
                    limit,
                    offset,
                    order: [['createdAt', 'DESC']]
                });
                registros = rows.map(r => ({ ...r.toJSON(), tipo: 'galeria' }));
                total = count;
            } else {
                //utilizando helper isolado para queries robustas com UNION ALL
                const resultado = await buscarTodosRegistrosPaginados(Number(limit), Number(offset));
                total = resultado.total;
                registros = resultado.registros;
            }

            res.status(200).json({
                registros,
                total,
                paginaAtual: pagina,
                totalPaginas: Math.ceil(total / limit)
            });
        } catch (error) {
            console.error("ERRO AO LISTAR REGISTROS:", error);
            res.status(500).json({ message: 'Erro interno ao listar os registros.' });
        }
    }
}
