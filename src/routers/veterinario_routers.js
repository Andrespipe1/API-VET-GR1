import {Router} from 'express'
import {actualizarPassword,actualizarPerfil,nuevoPassword,comprobarTokenPassword, confirmEmail, login, recuperarPassword, registro, perfilUsuario } from '../controllers/veterinario_controller.js'
import { verificarAutenticacion } from '../helpers/crearJWT.js'

const router = Router()

//Rutas públicas
router.post('/registro',registro)

router.get('/confirmar/:token',confirmEmail)

router.post('/login',login)

router.post('/recuperar-password',recuperarPassword)

router.get('/recuperar-password/:token',comprobarTokenPassword)

router.post('/nuevo-password/:token',nuevoPassword)

//Rutas privadas

router.get('/perfilvet',verificarAutenticacion,perfilUsuario)
router.put('/veterinario/actualizarpassword',verificarAutenticacion,actualizarPassword)
router.put('/veterinario/:id',verificarAutenticacion,actualizarPerfil)
export default router