import { sendMailToPaciente } from "../config/nodemailer.js"
import Paciente from "../models/Paciente.js"

const registrarPaciente = async (req,res)=>{
    //Paso 1 - Tomar datos del request
    const{email} = req.body
    //Paso 2 - Validar los datos
    if(Object.values(req.body).includes(""))return res.status(400).json({msg:"Lo sentimos debe llenar todos los campos"})

    const verificarEmailBDD = await Paciente.findOne({email})
    if (verificarEmailBDD) return res.status(400).json({msg:"Lo sentimos, el email ya se encuentra registrado"})
    //Paso 3 - Interactua BDD
    const nuevoPaciente = new Paciente(req.body)

    const password = Math.random().toString(36).slice(2)
    nuevoPaciente.password = await nuevoPaciente.encrypPassword("vet"+password)
    sendMailToPaciente(email,"vet"+password)

    nuevoPaciente.veterinario = req.veterinarioBDD._id
    await nuevoPaciente.save()
    res.status(200).json({msg:"Registro exitoso del paciente"})
}
const listarPacientes = async (req,res)=>{
    //Paso 1 - Tomar datos del request
    //Paso 2 - Validar los datos
    //Paso 3 - Interactua BDD
    const pacientes = await Paciente.find({estado:true}).populate('veterinario',"nombre apellido").select("-estado -__v").where('veterinario').equals(req.veterinarioBDD)
    res.status(200).json(pacientes)
}
const detallePaciente = (req,res)=>{
    res.send("Detalle del paciente")
}
const actualizarPaciente = (req,res)=>{
    res.send("Actualizar paciente") 
}
const eliminarPaciente = (req,res)=>{
    res.send("Eliminar paciente")
}
const loginPaciente = (req,res)=>{
    res.send("Paciente inicio de sesion con éxito")
}
const perfilPaciente = (req,res)=>{
    res.send("Paciente puede ver su perfil")
}
export {
    listarPacientes,
    detallePaciente,
    registrarPaciente,
    actualizarPaciente,
    eliminarPaciente,
    loginPaciente,
    perfilPaciente
}