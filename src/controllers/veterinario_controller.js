import sendMailToUser from "../config/nodemailer.js"
import veterinario from "../models/veterinario.js"
import Veterinario from "../models/veterinario.js"

const registro = async (req,res)=>{
    //Paso 1 tomar datos del request
    const {email, password} = req.body

    //Paso 2 Validar datos
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos debe llenar todos los campos"})

    
    const verificarEmailBDD = await Veterinario.findOne({email})
    if (verificarEmailBDD) return res.status(400).json({msg:"Lo sentimos el email ya se encuentra registrado"})
    
    //Paso 3 - Interactuar con BDD
    const nuevoVeterinario = new Veterinario(req.body)
    nuevoVeterinario.password = await nuevoVeterinario.encrypPassword(password)
    const token = nuevoVeterinario.crearToken()
    await sendMailToUser(email, token)
    await nuevoVeterinario.save()
    res.status(200).json({msg: "Revisa tu correo electronico"})

    
}

const confirmEmail = async (req,res) => {

    //Paso 1 tomar datos del request
    const {token} = req.params

    //Paso 2 Validar datos
    if(!(token)) return res.status(400).json({msg:"Lo sentimos no se puede validar la cuenta"})

    const veterinarioBDD = await Veterinario.findOne({token})
    if(!veterinarioBDD?.token) return res.status(400).json({msg:"La cuenta ya ha sido confirmada"})

    //Paso 3 - Interactuar con BDD
    veterinarioBDD.token = null
    veterinarioBDD.confirmEmail = true
    await veterinarioBDD.save()
    res.status(200).json({msg: "Token confirmado, ya puedes iniciar sesión"})
}

const login = async (req, res) => {

    // Paso 1: Tomar los datos del request (correo electrónico y contraseña)
    const { email, password } = req.body;

    // Paso 2: Validar datos
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos debes llenar todos los campos"})

    const veterinarioBDD = await Veterinario.findOne({email})
    if(veterinarioBDD.confirmEmail===false) return res.status(400).json({msg:"Lo sentimos debes validar tu cuenta"})

    if(!veterinarioBDD)return res.status(400).json({msg:"Lo sentimos el email no se encuentra registrado"})
    const verificarPasword= veterinarioBDD.matchPassword(password)
    if(!verificarPasword) return res.status(400).json({msg:"Lo sentimos el password no es el correcto"})

    // Paso 3: Interactuar con BDD


    res.status(200).json({veterinarioBDD});
}



export {
    registro,
    confirmEmail,
    login
}