// rotas de registros (publicações)

import { Router } from 'express';
import RegistroController from '../controller/registroController';
import checkToken from '../helpers/verify-token';
import upload from '../helpers/multerConfig';

const router = Router();

// rota protegida: criar novo registro com upload de imagens (thumb + galeria)
router.post(
    '/criar',
    checkToken,
    upload.fields([
        { name: 'thumb', maxCount: 1 },
        { name: 'galeria', maxCount: 20 }
    ]),
    RegistroController.criar
);

// rota pública: buscar registro por slug
router.get('/:slug', RegistroController.buscarPorSlug);

// rota pública: listar registros com paginação
router.get('/', RegistroController.listarPaginado);

export default router;
