// Importer le module jsonwebtoken
import jwt from "jsonwebtoken";

// Importer le modèle d'utilisateur
import User from "../models/User.js";

// Middleware pour vérifier le token JWT
const protect = async (req, res, next) => {
  // Récupérer le token JWT depuis les cookies
  const token = req.cookies.jwt;

  // Si le token n'est pas présent, renvoyer une erreur
  if (!token) {
    return res.status(401).json({ message: "Token JWT manquant" });
  }

  try {
    // Vérifier et décodifier le token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Rechercher l'utilisateur par son ID dans la base de données et exclure le mot de passe
    const user = await User.findById(decoded.id).select("-password");

    // Stocker l'utilisateur dans les données de la requête en tant que req.user
    req.user = user;

    // Si le token est valide, passer au middleware suivant
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token JWT invalide" });
  }
};

// Exporter le middleware protect
export default protect;
