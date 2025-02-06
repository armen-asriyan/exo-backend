// Importer le modèle d'utilisateur
import User from "../models/User.js";
import { comparePassword, hashPassword } from "../services/hashPassword.js";

// Importer la fonction pour générer un token JWT
import generateToken from "../utils/tokenUtil.js";

// Fonction pour afficher tous les utilisateurs
export const getAllUsers = async (req, res) => {
  try {
    // Rechercher tous les utilisateurs
    const users = await User.find();

    // Renvoyer les utilisateurs
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la recherche" });
  }
};

// Fonction pour créer un nouvel utilisateur
export const registerUser = async (req, res) => {
  // Destructurer les données du corps de la requête
  const { name, email, password } = req.body;

  // Si les données sont manquantes, renvoyer une erreur
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Tous les champs sont obligatoires" });
  }

  try {
    // Hasher le mot de passe
    const hashedPassword = await hashPassword(password);

    // Créer un nouvel utilisateur
    const user = await User.create({ name, email, password: hashedPassword });

    // Renvoyer un message de confirmation
    res.status(201).json({ message: "Utilisateur enregisté", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de l'enregistrement" });
  }
};

// Fonction pour authentifier un utilisateur
export const loginUser = async (req, res) => {
  // Destructurer les données du corps de la requête
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Tous les champs sont obligatoires" });
  }

  try {
    // Rechercher l'utilisateur par son adresse email
    const user = await User.findOne({ email });

    // Si l'utilisateur n'est pas trouvé, renvoyer une erreur
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Comparer le mot de passe
    const isMatch = await comparePassword(password, user.password);

    // Si le mot de passe ne correspond pas, renvoyer une erreur
    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    // Générer un token JWT
    const token = generateToken(user._id);

    // Renvoyer le token JWT
    res.cookie("token", token, {
      httpOnly: true, // L'utilisateur ne peut pas modifier le cookie depuis le navigateur
    });

    // Envoyer un message de confirmation
    res.status(200).json({ message: "Utilisateur authentifié", user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de l'authentification" });
  }
};

// Mettre à jour un utilisateur en fonction de son ID
export const updateUser = async (req, res) => {
  // Récupérer l'ID de l'utilisateur depuis les paramètres de la requête
  const { id } = req.params;

  // Si l'ID est manquant, renvoyer une erreur
  if (!id) {
    return res.status(400).json({ message: "ID de l'utilisateur manquant" });
  }

  // Destructurer / Recupérer les données du corps de la requête
  const { name, password } = req.body;

  // Si les données sont manquantes, renvoyer une erreur
  if (!name && !password) {
    return res
      .status(400)
      .json({ message: "Tous les champs sont obligatoires" });
  }

  try {
    // Mettre à jour l'utilisateur
    const user = await User.findByIdAndUpdate(
      id,
      { name, password },
      { new: true }
    );

    // Si l'utilisateur n'est pas trouvé, renvoyer une erreur
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Envoyer une réponse avec l'utilisateur mis à jour
    res.status(200).json({ message: "Utilisateur mis à jour", user });
  } catch (error) {}
};

// Supprimer un utilisateur en fonction de son ID
export const deleteUser = async (req, res) => {
  // Récupérer l'ID de l'utilisateur depuis les paramètres de la requête
  const { id } = req.params;

  // Si l'ID est manquant, renvoyer une erreur
  if (!id) {
    return res.status(400).json({ message: "ID de l'utilisateur manquant" });
  }

  try {
    const user = await User.findByIdAndDelete(id);

    // Si l'utilisateur n'est pas trouvé, renvoyer une erreur
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json({ message: "Utilisateur supprimé" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la suppression" });
  }
};
