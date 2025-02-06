// Importer mongoose
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";

// Connexion à la base de données MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);

    // Si connexion OK, afficher l'adresse de la base de données
    console.log(
      `Connexion à la base de données MongoDB : ${conn.connection.host}`
    );
  } catch (error) {
    // En cas d'erreur afficher un message d'erreur
    console.error(
      `Erreur de connexion à la base de données MongoDB : ${error}`
    );
  }
};

export default connectDB;
