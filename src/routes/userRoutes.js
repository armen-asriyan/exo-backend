// Importer les modules nécessaires
import express from "express";

// Créer un routeur
const router = express.Router();

// Importer les controllers pour les utilisateurs
import {
  registerUser,
  loginUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

// Importer les middlewares

// Importer le middleware pour verifier le token
import protect from "../middlewares/protect.js";

// Importer le middleware pour verifier si l'utilisateur est admin
import isAdmin from "../middlewares/isAdmin.js";

// Importer le middleware pour verifier si l'utilisateur est l'utilisateur connecté et qu'il a le rôle "admin"
import authorizeUser from "../middlewares/authorizeUser.js";

// Importer les régles de validation
import {
  validateRegisterUser,
  validateLoginUser,
  validateUpdateUser,
  validateDeleteUser,
} from "../middlewares/validation.js";

// Importer les middlewares pour valider les données
import validateRequest from "../middlewares/validateRequest.js";

// ===== ROUTES POUR LES UTILISATEURS =====

// Route pour récupérer tous les utilisateurs
router.get("/", protect, isAdmin, getAllUsers); // Vaut '/api/users'

// Route pour enregistrer un nouvel utilisateur
router.post("/register", validateRegisterUser, validateRequest, registerUser);

// Route pour authentifier un utilisateur
router.post("/login", validateLoginUser, validateRequest, loginUser);

// Route pour envoyer un message si l'ID est manquant
router.put("/", (req, res) => {
  res.status(400).json({
    message: "ID utilisateur manquant",
    code: "MISSING_ID",
  });
});

// Route pour mettre à jour un utilisateur en fonction de son ID, après avoir verifié le token et qu'il soit l'utilisateur connecté
router.put(
  "/:id",
  protect,
  authorizeUser,
  validateUpdateUser,
  validateRequest,
  updateUser
);

// Route pour envoyer un message si l'ID est manquant
router.delete("/", (req, res) => {
  res.status(400).json({
    message: "ID utilisateur manquant",
    code: "MISSING_ID",
  });
});

// Route pour supprimer un utilisateur en fonction de son ID, après avoir verifié le token et qu'il soit l'utilisateur connecté
router.delete(
  "/:id",
  protect,
  authorizeUser,
  validateDeleteUser,
  validateRequest,
  deleteUser
);

// Exporter le routeur
export default router;
