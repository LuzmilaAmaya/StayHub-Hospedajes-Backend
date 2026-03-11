import express from "express";
import nodemailer from "nodemailer";

const app = express();

app.use(express.json());

app.post("/contacto", async (req, res) => {
  const { nombre, email, mensaje } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tucorreo@gmail.com",
        pass: "tu_contraseña_de_aplicacion",
      },
    });

    await transporter.sendMail({
      from: email,
      to: "tucorreo@gmail.com",
      subject: "Mensaje desde contacto",
      text: `
Nombre: ${nombre}
Email: ${email}
Mensaje: ${mensaje}
`,
    });

    res.json({ mensaje: "Correo enviado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error enviando " });
  }
});

app.listen(3000, () => {
  console.log("Servidor funcionando en puerto 3000");
});
