// Middleware pour verifier si l'utilisateur est admin
const isAdmin = (req, res, next) => {
  // Récupérer l'ID de l'utilisateur depuis les paramètres de la requête
  const { role } = req.user;

  // Si l'utilisateur n'est pas admin, renvoyer une erreur
  if (role !== "admin") {
    return res.status(403).json({ message: "Accès refusé" }); // Pas de précision pour ne pas exposer l'existence de l'utilisateur
  }

  // Si l'utilisateur est admin, passer au middleware suivant
  next();
};

// Exporter le middleware
export default isAdmin;
