// Importer le module express-validator
import { validationResult } from "express-validator";

// FOnction pour envoyer des erreurs si les données sont invalides
const validateRequest = (req, res, next) => {
  // Valider les données de la requête
  const errors = validationResult(req);

  // Si les données sont invalides, renvoyer une erreur
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export default validateRequest;
