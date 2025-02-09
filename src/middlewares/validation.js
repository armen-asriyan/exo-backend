// validations/userValidation.js
import { body, param } from "express-validator";

// Validations pour l'endpoint POST /register
export const validateRegisterUser = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Le nom est obligatoire")
    .isLength({ min: 3 })
    .withMessage("Le nom doit avoir au moins 3 caractères")
    .isLength({ max: 50 })
    .withMessage("Le nom doit avoir au plus 50 caractères"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("L'email est obligatoire")
    .isEmail()
    .withMessage("Veuillez entrer une adresse email valide"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Le mot de passe est obligatoire")
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit avoir au moins 6 caractères")
    .isLength({ max: 200 })
    .withMessage("Le mot de passe doit avoir au plus 200 caractères"),

  body("role")
    .trim()
    .default("user") // Par défaut, le role est user si aucun role n'est fourni
    .isIn(["user", "admin"])
    .withMessage("Le role doit soit 'user' ou 'admin'"),
];

// Validations pour l'endpoint POST /login
export const validateLoginUser = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("L'email est obligatoire")
    .isEmail()
    .withMessage("Veuillez entrer une adresse email valide"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Le mot de passe est obligatoire"),
];

// Validations pour l'endpoint PUT /users/:id
export const validateUpdateUser = [
  param("id").isMongoId().withMessage("ID utilisateur manquant/invalide"),

  body("email")
    .trim()
    .optional()
    .isEmail()
    .withMessage("Veuillez entrer une adresse email valide"),

  body("password")
    .trim()
    .optional()
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit avoir au moins 6 caractères")
    .isLength({ max: 200 })
    .withMessage("Le mot de passe doit avoir au plus 200 caractères"),
];

// Validations pour l'endpoint DELETE /users/:id
export const validateDeleteUser = [
  param("id").isMongoId().withMessage("ID utilisateur manquant/invalide"),
];
