// Importer les modules nécessaires
import express from "express";
import dotenv from "dotenv";

// Importer le module 'cookie-parser'
import cookieParser from "cookie-parser";

// Importer les routes
import userRoutes from "./src/routes/userRoutes.js";

// Importer le middleware de la gestion des erreurs
import errorMiddleware from "./src/middlewares/errorMiddleware.js";

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

// Créer une instance exportable d'Express
const app = express();

// Configurer Express pour accepter les requêtes JSON
app.use(express.json());

// Configurer Express pour accepter les cookies
app.use(cookieParser());

// Afficher un message de bienvenue sur la racine de l'application
app.get("/", (req, res) => {
  res.send(
    `<h1 style="text-align: center; font-family: Poppins, sans-serif;">Hello, World!</h1>`
  );
});

// Routes
app.use("/api/users/", userRoutes);

// Gestion des erreurs
app.use(errorMiddleware);

// Exporter l'application Express
export default app;
