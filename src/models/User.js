// Importer mongoose
import mongoose from "mongoose";

// Créer un schéma de utilisateur
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true } // Ajouter les champs createdAt et updatedAt
);

// Créer un modèle d'utilisateur
const User = mongoose.model("User", userSchema); // Utiliser le schéma pour créer le modèle

export default User;
