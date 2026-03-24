//rotas de autenticação

import { Router } from 'express'; //gerenciador de rotas do express
import userController from '../controller/userController'; //importa o controller de autenticação do usuário

const router = Router(); //inicializa o roteador do express

router.post('/registrar', userController.registrar); //rota para cadastrar um novo usuário
router.post('/login', userController.login); //rota para realizar o login do usuário
router.get('/checkuser', userController.checkUser); //rota para verificar o usuário logado através do token

export default router; // exporta o roteador para ser utilizado no server.ts