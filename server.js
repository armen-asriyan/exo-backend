// Importer le module app.js
import app from "./app.js";

// Importer la connexion à la base de données MongoDB
import connectDB from "./src/config/db.js";

const PORT = process.env.PORT || 3030;

// Fonction pour démarrer le serveur
const startServer = async () => {
  try {
    // Connexion à la base de données MongoDB
    await connectDB();

    // Demarrer le serveur Express
    app.listen(PORT, () => {
      console.log(`Serveur tourne sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(`Erreur lors du demarrage du serveur : ${error}`);

    // Quitter le processus Node en cas d'erreur
    process.exit(1);
  }
};

// Demarrer le serveur
startServer();
