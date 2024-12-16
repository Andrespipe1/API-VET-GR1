import {Router} from 'express'
import { actualizarPaciente, detallePaciente, eliminarPaciente, listarPacientes, loginPaciente, perfilPaciente, registrarPaciente } from '../controllers/paciente_controller.js'
import { verificarAutenticacion } from '../helpers/crearJWT.js'
const router = Router()

router.post('/paciente/registro',verificarAutenticacion,registrarPaciente)
router.get('/pacientes',verificarAutenticacion,listarPacientes)
router.get('/paciente/:id',verificarAutenticacion,detallePaciente)
router.put('/paciente/actualizar/:id',verificarAutenticacion,actualizarPaciente)
router.delete('/pacientes/eliminar/:id',verificarAutenticacion,eliminarPaciente)
router.post('/paciente/login',loginPaciente)
router.get('/paciente/perfil',verificarAutenticacion,perfilPaciente)

export default router