const express = require("express");
const nodemailer = require("nodemailer");

const app = express();

app.use(express.json());

app.post("/contacto", async (req,res)=>{

const {nombre,email,mensaje} = req.body;

const transporter = nodemailer.createTransport({
service:"gmail",
auth:{
user:"tucorreo@gmail.com",
pass:"contraseña_de_aplicacion"
}
});

await transporter.sendMail({
from: email,
to: "tucorreo@gmail.com",
subject:"Mensaje desde contacto",
text:`
Nombre: ${nombre}
Email: ${email}
Mensaje: ${mensaje}
`
});

res.json({mensaje:"Correo enviado"});

});

app.listen(3000, ()=>{
console.log("Servidor funcionando");
});