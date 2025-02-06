// Importer les modules nécessaires
import express from "express";
import dotenv from "dotenv";

// Importer les routes
import userRoutes from "./src/routes/userRoutes.js";

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

// Créer une instance exportable d'Express
const app = express();

// Configurer Express pour accepter les requêtes JSON
app.use(express.json());

// Afficher un message de bienvenue sur la racine de l'application
app.get("/", (req, res) => {
  res.send(
    `<h1 style="text-align: center; font-family: Poppins, sans-serif;">Hello, World!</h1>`
  );
});

// Routes
app.use("/api/users/", userRoutes);

export default app;
