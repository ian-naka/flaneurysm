// Controller de autenticação do Usuário

import { Request, Response } from 'express'; // requisicao e resposta
import bcrypt from 'bcryptjs'; // criptografar
import jwt from 'jsonwebtoken'; // token para validar sessao
import { z, ZodError } from 'zod'; // biblioteca para criar regras de validacao
import User from '../models/User'; // Importando o model atualizado
import { encriptar, desencriptar } from '../helpers/criptoHelper';

// variavel de ambiente com afirmacao de tipo
const jwtSecret = process.env.JWT_SECRET as string;

if (!jwtSecret) {
    throw new Error("ERRO CRÍTICO: JWT_SECRET deve estar definido no .env");
}

// REGRAS DE VALIDACAO DO ZOD
const registroSchema = z.object({
    nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
    email: z.string().email("Insira um e-mail válido."),
    senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
    confirmarSenha: z.string()
}).refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem.",
    path: ["confirmarSenha"], 
});

const loginSchema = z.object({
    email: z.string().email("Insira um e-mail válido."),
    senha: z.string().min(1, "A senha é obrigatória.")
});

export default class userController {

    //Cadastro do Usuário
    static async registrar(req: Request, res: Response): Promise<void> {
        try {
            const { nome, email, senha } = registroSchema.parse(req.body); 

            //encripta o email para poder realizar a busca e o salvamento
            const emailEncriptado = encriptar(email);

            //verifica se o email já existe
            const userExiste = await User.findOne({ where: { email: emailEncriptado } });
            if (userExiste) {
                res.status(422).json({ message: 'Este e-mail já está em uso.' });
                return;
            }

            //criptografia da senha
            const salt = await bcrypt.genSalt(12);
            const senhaHash = await bcrypt.hash(senha, salt);

            //cria o usuário
            const novoUser = await User.create({
                nome,
                email: emailEncriptado,
                senha: senhaHash
            });

            //gera token usando o segredo validado
            const token = jwt.sign(
                { id: novoUser.id, nome: novoUser.nome },
                jwtSecret,
                { expiresIn: '1d' }
            );

            res.status(201).json({ 
                message: 'Usuário criado com sucesso!', 
                token,
                userId: novoUser.id 
            });

        } catch (error: any) {
            console.error("ERRO NO CADASTRO:", error);
            if (error instanceof ZodError) {
                res.status(422).json({ 
                    message: "Dados inválidos", 
                    errors: error.issues.map((issue) => issue.message) 
                });
                return;
            }
            res.status(500).json({ message: 'Erro ao realizar cadastro.' });
        }
    }

    //login do usuário
    static async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, senha } = loginSchema.parse(req.body); 
            
            //encripta o email recebido para localizar no banco de dados
            const emailBusca = encriptar(email);
            const user = await User.findOne({ where: { email: emailBusca } }); 

            if (!user) {
                res.status(422).json({ message: 'E-mail ou senha incorretos!' });
                return;
            } 

            //comparacao da senha que foi mandada com a senha do sistema
            const senhaValida = await bcrypt.compare(senha, user.senha);
            if (!senhaValida) {
                res.status(422).json({ message: 'E-mail ou senha incorretos!' });
                return;
            }

            //gera token
            const token = jwt.sign(
                { id: user.id, nome: user.nome },
                jwtSecret,
                { expiresIn: '1d' }
            );

            res.status(200).json({ 
                message: 'Login realizado com sucesso!', 
                token,
                userId: user.id 
            });

        } catch (error: any) {
            console.error("ERRO NO LOGIN:", error);
            if (error instanceof ZodError) {
                res.status(422).json({ 
                    message: "Dados inválidos", 
                    errors: error.issues.map((issue) => issue.message) 
                });
                return;
            }
            res.status(500).json({ message: 'Erro ao realizar login.' });
        }
    }

    //verifica o usuário atual logado
    static async checkUser(req: Request, res: Response): Promise<void> {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                res.status(401).json({ message: "Acesso negado!" });
                return;
            } 
            
            const token = authHeader.split(' ')[1];
            
            const decoded = jwt.verify(token, jwtSecret) as unknown as { id: number };

            const user = await User.findByPk(decoded.id, {
                attributes: { exclude: ['senha'] } //não retorna a senha para o frontend
            });

            if (user) {
                //desencripta o email antes de enviar a resposta
                user.email = desencriptar(user.email);
            }

            res.status(200).json(user);

        } catch (error) {
            res.status(401).json({ message: "Token inválido!" });
        }
    }
}