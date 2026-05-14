import express from "express";
import nodemailer from "nodemailer";
import { body, validationResult } from "express-validator";
import rateLimit from "express-rate-limit";


const router = express.Router();

// Rate limiting spécifique contact — 5 messages / 15 min / IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Trop de messages envoyés. Réessayez dans 15 minutes." }
});

// Transport SMTP Gmail
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

// Validation des champs du formulaire de contact avec express-validator 
export const contactValidator = [
  body("nom").notEmpty().trim().isLength({ max: 100 }),
  body("prenom").notEmpty().trim().isLength({ max: 100 }),
  body("email").isEmail().normalizeEmail(),
  body("message").notEmpty().trim().isLength({ max: 2000 }),
];

// Fonction d'échappement pour éviter les injections HTML dans les emails 
const escapeHtml = (str) =>
      String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

// Route POST /api/contact pour envoyer un message de contact
router.post( "/", contactLimiter, contactValidator,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

    const { nom, prenom, email, message } = req.body;

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `[Portfolio] Message de ${prenom} ${nom}`,
      html: `
        <h2>Nouveau message sur mon portfolio</h2>
        <p><strong>Nom :</strong> ${escapeHtml(nom)} ${escapeHtml(prenom)}</p>
        <p><strong>Email :</strong> ${escapeHtml(email)}</p>
        <p><strong>Message :</strong></p>
        <pre>${escapeHtml(message)}</pre>
      `,
    });

    res.status(200).json({ message: "Message envoyé avec succès." });

  } catch (err) {
    next(err);
  }
});

export default router;