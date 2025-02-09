// Middleware pour verifier si l'utilisateur est l'utilisateur connecté et qu'il a le rôle "admin"
const authorizeUser = (req, res, next) => {
  // Récupérer l'ID de l'utilisateur depuis les paramètres de la requête
  const { id } = req.params;
  const { id: userId, role } = req.user;

  // Si l'id de params n'est pas celui de l'utilisateur connecté et qu'il n'a pas le rôle "admin", renvoyer une erreur
  if (id !== userId && role !== "admin") {
    return res.status(403).json({ message: "Accès refusé" });
  }
  // Si l'ID de l'utilisateur est celui de l'utilisateur connecté, passer au middleware suivant
  next();
};

// Exporter le middleware
export default authorizeUser;
