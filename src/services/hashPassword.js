// Importer le module bcrypt
import bcrypt from "bcrypt";

// Le nombre de tours de hachage
const SALT_ROUNDS = 10;

// Fonction pour hacher le mot de passe
export const hashPassword = async (password) => {
  // Hacher le mot de passe
  try {
    // Générer un sel, utilisable pour hacher le mot de passe
    const salt = await bcrypt.genSalt(SALT_ROUNDS);

    // Retourner le mot de passe haché
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.error(`Erreur durant le hachage du mot de passe: ${error.message}`);
    throw new Error(
      `Erreur durant le hachage du mot de passe: ${error.message}`
    );
  }
};

// Fonction pour comparer le mot de passe haché et le mot de passe non haché
export const comparePassword = async (password, hashedPassword) => {
  // Comparer le mot de passe haché et le mot de passe non haché
  return await bcrypt.compare(password, hashedPassword);
};
