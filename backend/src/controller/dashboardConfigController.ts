//este arquivo é o controlador que gerencia a busca e atualização das configurações e imagens da dashboard.
import { Request, Response } from 'express';
import DashboardConfig from '../models/DashboardConfig';

export default class DashboardConfigController {

    //busca a configuração atual da dashboard (rota pública)
    static async buscar(_req: Request, res: Response): Promise<void> {
        try {
            //busca ou cria o registro singleton (id=1)
            const [config] = await DashboardConfig.findOrCreate({
                where: { id: 1 },
                defaults: {}
            });

            res.status(200).json(config);
        } catch (error) {
            console.error('ERRO AO BUSCAR CONFIG DA DASHBOARD:', error);
            res.status(500).json({ message: 'Erro interno ao buscar configurações.' });
        }
    }

    //atualiza as configurações da dashboard (rota protegida)
    static async atualizar(req: Request, res: Response): Promise<void> {
        try {
            const { heroTitulo, heroSubtitulo, highlightTitulo, card1Titulo, card2Titulo } = req.body;

            //busca ou cria o registro singleton
            const [config] = await DashboardConfig.findOrCreate({
                where: { id: 1 },
                defaults: {}
            });

            //monta o objeto de update com os campos de texto
            const updateData: any = {};

            if (heroTitulo !== undefined) updateData.heroTitulo = heroTitulo;
            if (heroSubtitulo !== undefined) updateData.heroSubtitulo = heroSubtitulo;
            if (highlightTitulo !== undefined) updateData.highlightTitulo = highlightTitulo;
            if (card1Titulo !== undefined) updateData.card1Titulo = card1Titulo;
            if (card2Titulo !== undefined) updateData.card2Titulo = card2Titulo;

            //processa os arquivos de imagem enviados pelo multer
            const files = req.files as { [fieldname: string]: Express.Multer.File[] };

            if (files) {
                if (files['heroImagem'] && files['heroImagem'].length > 0) {
                    updateData.heroImagem = files['heroImagem'].map((f) => f.filename);
                }
                if (files['highlightImagem'] && files['highlightImagem'].length > 0) {
                    updateData.highlightImagem = files['highlightImagem'].map((f) => f.filename);
                }
                if (files['card1Imagem'] && files['card1Imagem'].length > 0) {
                    updateData.card1Imagem = files['card1Imagem'].map((f) => f.filename);
                }
                if (files['card2Imagem'] && files['card2Imagem'].length > 0) {
                    updateData.card2Imagem = files['card2Imagem'].map((f) => f.filename);
                }
            }

            await config.update(updateData);

            res.status(200).json({
                message: 'Configurações atualizadas com sucesso!',
                config
            });
        } catch (error) {
            console.error('ERRO AO ATUALIZAR CONFIG DA DASHBOARD:', error);
            res.status(500).json({ message: 'Erro interno ao salvar configurações.' });
        }
    }
}
