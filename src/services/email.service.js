import { transporter } from "../config/mailer.js";

export const sendContactEmail = async ({ name, email, message }) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,

    to: process.env.EMAIL_USER,

    subject: "Nuevo mensaje de contacto",

    html: `
      <h2>Nuevo mensaje desde StayHub</h2>

      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${message}</p>
    `,
  });
};