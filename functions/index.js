const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: functions.config().gmail.email,
    pass: functions.config().gmail.pass,
  },
});

// CORREO AL ADMIN CUANDO SE CREA UNA SOLICITUD
exports.notificarSolicitud = functions.firestore
  .document("solicitudes/{id}")
  .onCreate(async (snap) => {
    const data = snap.data();

    const mailOptions = {
      from: `Sistema de Aulas <${functions.config().gmail.email}>`,
      to: "aulasnotificacion@gmail.com", // Cambiar por el correo real del admin si hace falta
      subject: "Nueva Solicitud de Limpieza",
      html: `
        <h2>Nueva solicitud registrada</h2>
        <p><strong>Aula:</strong> ${data.aulaId}</p>
        <p><strong>Solicitado por:</strong> ${data.solicitadoPor}</p>
        <p><strong>Nuevo estado:</strong> ${data.nuevoEstado}</p>
        <p><strong>Fecha:</strong> ${new Date().toLocaleString()}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Correo enviado al admin");
  });
