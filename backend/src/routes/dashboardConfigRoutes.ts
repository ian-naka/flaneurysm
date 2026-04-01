// rotas de configuração da dashboard

import { Router } from 'express';
import DashboardConfigController from '../controller/dashboardConfigController';
import checkToken from '../helpers/verify-token';
import upload from '../helpers/multerConfig';

const router = Router();

// rota pública: buscar configurações atuais da dashboard
router.get('/', DashboardConfigController.buscar);

// rota protegida: atualizar configurações com upload de imagens
router.put(
    '/',
    checkToken,
    upload.fields([
        { name: 'heroImagem', maxCount: 1 },
        { name: 'highlightImagem', maxCount: 1 },
        { name: 'card1Imagem', maxCount: 1 },
        { name: 'card2Imagem', maxCount: 1 },
    ]),
    DashboardConfigController.atualizar
);

export default router;
