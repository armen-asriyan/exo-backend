// Importer jsonwebtoken
import jwt from "jsonwebtoken";

// Fonction pour gérérer un token JWT
const generateToken = (id) => {
  // Retourner le token JWT
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Exportation du module
export default generateToken;
