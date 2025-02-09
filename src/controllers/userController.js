// Importer le modèle d'utilisateur
import User from "../models/User.js";

// Importer la fonction pour hacher et comparer le mot de passe
import { comparePassword, hashPassword } from "../services/hashPassword.js";

// Importer la fonction pour générer un token JWT
import generateToken from "../utils/tokenUtil.js";

// Importer la fonction pour verifier si l'ID est valide
import { isValidObjectId } from "mongoose";

// Fonction pour afficher tous les utilisateurs
export const getAllUsers = async (req, res, next) => {
  try {
    // Rechercher tous les utilisateurs
    // const users = await User.find();

    // Test d'erreur
    throw new Error("Une erreur s'est produite");
    // Renvoyer les utilisateurs
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Fonction pour créer un nouvel utilisateur
export const registerUser = async (req, res, next) => {
  try {
    // Destructurer les données du corps de la requête
    const { name, email, password, role } = req.body;

    // Vérifier si les champs obligatoires sont présents
    if (!name || !email || !password) {
      return next({
        statusCode: 400,
        message: "Tous les champs sont obligatoires",
      });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next({
        statusCode: 400,
        message: "Utilisateur existant",
      });
    }

    // Hasher le mot de passe
    const hashedPassword = await hashPassword(password);

    // Créer un nouvel utilisateur
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Renvoyer un message de confirmation
    res.status(201).json({ message: "Utilisateur enregistré", user });
  } catch (error) {
    next(error);
  }
};

// Fonction pour authentifier un utilisateur
export const loginUser = async (req, res, next) => {
  try {
    // Destructurer les données du corps de la requête
    const { email, password } = req.body;

    // Vérifier si les champs sont présents
    if (!email || !password) {
      return next({
        statusCode: 400,
        message: "Tous les champs sont obligatoires",
      });
    }

    // Rechercher l'utilisateur par son adresse email
    const user = await User.findOne({ email }).select("+password");

    // Vérifier si l'utilisateur existe
    if (!user) {
      return next({
        statusCode: 401,
        message: "Identifiants incorrects",
      });
    }

    // Comparer le mot de passe
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return next({
        statusCode: 401,
        message: "Identifiants incorrects",
      });
    }

    // Générer un token JWT
    const jwt = generateToken(user._id);

    // Renvoyer le token JWT en cookie
    res.cookie("jwt", jwt, {
      httpOnly: true, // Sécuriser le cookie
    });

    // Envoyer un message de confirmation
    res.status(200).json({ message: "Utilisateur authentifié", user, jwt });
  } catch (error) {
    next(error);
  }
};

// Mettre à jour un utilisateur en fonction de son ID
export const updateUser = async (req, res, next) => {
  try {
    // Récupérer l'ID de l'utilisateur depuis les paramètres de la requête
    const { id } = req.params;

    // Vérifier si l'ID est valide
    if (!isValidObjectId(id)) {
      return next({
        statusCode: 400,
        message: "ID utilisateur manquant/invalide",
        code: "INVALID_ID",
      });
    }

    // Destructurer les nouvelles données de l'utilisateur
    const { name, password } = req.body;

    // Vérifier que des champs ont été fournis pour la mise à jour
    if (!name && !password) {
      return next({
        statusCode: 400,
        message: "Au moins un champ doit être fourni pour la mise à jour",
      });
    }

    // Hasher le mot de passe s'il est mis à jour
    const updatedFields = { name };
    if (password) {
      updatedFields.password = await hashPassword(password);
    }

    // Mettre à jour l'utilisateur
    const user = await User.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    // Vérifier si l'utilisateur a été trouvé
    if (!user) {
      return next({
        statusCode: 404,
        message: "Utilisateur non trouvé",
      });
    }

    // Envoyer une réponse avec l'utilisateur mis à jour
    res.status(200).json({ message: "Utilisateur mis à jour", user });
  } catch (error) {
    next(error);
  }
};

// Supprimer un utilisateur en fonction de son ID
export const deleteUser = async (req, res, next) => {
  try {
    // Récupérer l'ID de l'utilisateur depuis les paramètres de la requête
    const { id } = req.params;

    // Vérifier si l'ID est valide
    if (!isValidObjectId(id)) {
      return next({
        statusCode: 400,
        message: "ID utilisateur manquant/invalide",
        code: "INVALID_ID",
      });
    }

    // Supprimer l'utilisateur
    const user = await User.findByIdAndDelete(id);

    // Vérifier si l'utilisateur a été trouvé
    if (!user) {
      return next({
        statusCode: 404,
        message: "Utilisateur non trouvé",
      });
    }

    // Confirmer la suppression
    res.status(200).json({ message: "Utilisateur supprimé" });
  } catch (error) {
    next(error);
  }
};
