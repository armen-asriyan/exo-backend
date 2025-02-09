// Importer mongoose
import mongoose from "mongoose";

// Créer un schéma de utilisateur
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minLength: [3, "Le nom doit avoir au moins 3 caractères"],
      maxLength: [50, "Le nom doit avoir au plus 50 caractères"],
      required: [true, "Le nom est requis"],
    },
    email: {
      type: String,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Veuillez entrer une adresse email valide"], // example: "V1L0T@example.com"
      required: [true, "L'email est requis"],
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      minLength: [6, "Le mot de passe doit avoir au moins 6 caractères"],
      maxLength: [200, "Le mot de passe doit avoir au plus 200 caractères"],
      required: [true, "Le mot de passe est requis"],
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: [true, "Le rôle est requis"],
    },
  },
  { timestamps: true } // Ajouter les champs createdAt et updatedAt
);

// Créer un modèle d'utilisateur
const User = mongoose.model("User", userSchema); // Utiliser le schéma pour créer le modèle

export default User;
