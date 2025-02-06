// Importer les modules nécessaires
import express from "express";

const router = express.Router();

// Importer les controllers
import {
  registerUser,
  loginUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

// Route pour enregistrer un nouvel utilisateur
router.get("/", getAllUsers); // Vaut '/api/users'
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
