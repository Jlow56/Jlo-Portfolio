import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { randomUUID } from "crypto";
import rateLimit from "express-rate-limit";
import { httpLogger } from "./middlewares/httpLogger.js";
  
import projectPublicRoutes from "./project/project.routes.public.js";
import projectAdminRoutes from "./project/project.routes.admin.js";

import pdfPublicRoutes from "./pdf/pdf.routes.public.js";
import pdfAdminRoutes from "./pdf/pdf.routes.admin.js";

import contactPublicRoutes from "./contact/contact.routes.public.js";

import { csrfProtection } from "./middlewares/csrf.middleware.js";
import authRoutes from "./auth/auth.routes.js";

import { AppError } from "./errors/AppError.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

/** *
 *  Logger HTTP avec pino-http *
*/
app.use(httpLogger);

/**
 * Sécurité HTTP
 */
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc:  ["'self'"],
      styleSrc:   ["'self'"],
      imgSrc:     ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc:    ["'self'"],
      objectSrc:  ["'none'"],
      frameAncestors: ["'none'"],
    },
  },
}));

const allowedOrigins = process.env.CLIENT_URL // si plusieurs URL autorisées separées par des virgules 
  ? process.env.CLIENT_URL.split(",") // sinon aucune origine autorisée 
  : []; // Liste blanche d'origines autorisées pour CORS

app.use(cors({ // CORS strict avec validation de l'origine et support des cookies pour les requêtes cross-origin 
  origin: (origin, callback) => { // Autoriser les requêtes sans origine (ex: Postman) ou celles provenant de la liste blanche 
    if (!origin || allowedOrigins.includes(origin)) { // Si aucune origine (ex: Postman) ou si l'origine est dans la liste blanche, autoriser la requête 
      callback(null, true); // Autoriser la requête en appelant le callback avec null pour l'erreur et true pour indiquer que l'origine est autorisée 
    } else {
      callback(new Error("Not allowed by CORS")); // Refuser la requête en appelant le callback avec une erreur indiquant que l'origine n'est pas autorisée 
    }
  },
  credentials: true, // Permettre l'envoi de cookies et d'autres informations d'identification dans les requêtes cross-origin
}));

/**
 * Protection contre les attaques de NoSQL injection en nettoyant les données d'entrée
 */
app.use((req, res, next) => {
  req.id = req.headers["x-request-id"] || randomUUID();
  res.set("X-Request-Id", req.id);
  next();
});

app.use(cookieParser());

/**
 * Parsing JSON sécurisé et limité à 10kb pour éviter les attaques de payloads volumineux
 */
app.use(express.json({ limit: "10kb", strict: true }));


app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime()
  });
});

/**
 * Sanitize data, prévention contre les attaques NoSQL injection et XSS
 */
const sanitizeObject = (obj) => {
  if (!obj || typeof obj !== "object") return;

  if (Array.isArray(obj)) {
    obj.forEach(sanitizeObject);
    return;
  }

  for (const key in obj) {
    if (key.startsWith("$") || key.includes(".")) {
      delete obj[key];
      continue;
    }
    sanitizeObject(obj[key]);
  }
};

app.use((req, res, next) => { // Sanitize req.body, req.params et req.query
  sanitizeObject(req.body); // Supprimer les clés dangereuses de req.body
  sanitizeObject(req.params); // Supprimer les clés dangereuses de req.params
  sanitizeObject(req.query); // Supprimer les clés dangereuses de req.query

  next();
});
/**
 * Environnement de production 
 */
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

/**
 * Rate limiting pour les routes d'authentification
 */
app.use("/api/auth", rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20
}));

/**
 * Rate limiting pour les autres routes 
 */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  skip: (req) => req.path.startsWith("/auth")
});

app.use("/api", apiLimiter);

/**
 * CORS strict
 */

/*===========================/
    ** Routes publiques  **      
/*==========================*/
app.use("/api/projects", projectPublicRoutes);
app.use("/api/pdfs", pdfPublicRoutes);
app.use("/api/contact", contactPublicRoutes);

/*=========================/ 
    ** Routes admin  **          
/*========================*/
app.use("/api/auth", csrfProtection, authRoutes);
app.use("/api/admin/projects", csrfProtection, projectAdminRoutes);
app.use("/api/admin/pdfs", csrfProtection, pdfAdminRoutes);

/**
 * Route inconnue → AppError 404
 */
app.use((req, res, next) => {
  next(new AppError("Route not found", 404));
});

/**
 * Handler global d'erreurs
 */
app.use(errorHandler);

export default app;