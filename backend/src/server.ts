import 'dotenv/config';
import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import sequelize from './db/conn'

//importa models
import User from './models/User';
import DashboardConfig from './models/DashboardConfig';

//importa rotas
import userRoutes from './routes/userRoutes';
import registroRoutes from './routes/registroRoutes';
import dashboardConfigRoutes from './routes/dashboardConfigRoutes';

//importa controller
import { conexaoBanco } from './db/conn';

const app: Application = express();

//middleware de seguranca para esconder cabecalhos sensiveis
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}));

app.use(express.json()); //permite ler o body em json
app.use(cookieParser()); //manipulacao dos HttpOnly Cookies para o JWT

//servir arquivos estáticos de uploads
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

//protecao contra ataques
const limite = rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutos
    max: 200, //limite de 200 requisicoes por ip
    message: 'Muitas requisições deste IP, tente novamente mais tarde.'
});
//app.use(limite);

const PORT = process.env.PORT || '';

//rotas
app.use('/auth', userRoutes);
app.use('/registros', registroRoutes);
app.use('/dashboard-config', dashboardConfigRoutes);

//testa conexao com o banco
conexaoBanco().then(async () => {
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta: ${PORT}`);
    });
});