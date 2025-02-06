# Projet Express & MongoDB <--!-- Bien lire la documention>

Ce projet couvre les concepts de base d'Express.js et Mongoose, et permet de comprendre comment créer un serveur, gérer une base de données MongoDB et implémenter des fonctionnalités d'authentification. Les exercices augmentent progressivement en difficulté, en allant de la configuration du serveur à la gestion des utilisateurs avec authentification et validation.

## Table des matières

- [Projet Express \& MongoDB \<--!-- Bien lire la documention\>](#projet-express--mongodb------bien-lire-la-documention)
  - [Table des matières](#table-des-matières)
  - [Exercice 1 : Configuration du serveur Express et connexion MongoDB](#exercice-1--configuration-du-serveur-express-et-connexion-mongodb)
  - [Exercice 2 : Définir un modèle Mongoose pour un utilisateur](#exercice-2--définir-un-modèle-mongoose-pour-un-utilisateur)
  - [Exercice 3 : Ajouter un nouvel utilisateur via une API POST](#exercice-3--ajouter-un-nouvel-utilisateur-via-une-api-post)
  - [Exercice 4 : Afficher tous les utilisateurs avec un endpoint GET](#exercice-4--afficher-tous-les-utilisateurs-avec-un-endpoint-get)
  - [Exercice 5 : Mise à jour des informations d'un utilisateur](#exercice-5--mise-à-jour-des-informations-dun-utilisateur)
  - [Exercice 6 : Suppression d'un utilisateur](#exercice-6--suppression-dun-utilisateur)
  - [Exercice 7 : Authentification de l'utilisateur avec un token JWT](#exercice-7--authentification-de-lutilisateur-avec-un-token-jwt)
  - [Exercice 8 : Vérification du token JWT pour protéger les routes](#exercice-8--vérification-du-token-jwt-pour-protéger-les-routes)
  - [Exercice 9 : Ajouter un champ `role` à l'utilisateur et vérifier les autorisations](#exercice-9--ajouter-un-champ-role-à-lutilisateur-et-vérifier-les-autorisations)
  - [Exercice 10 : Mise en place de la gestion des erreurs et validation des entrées](#exercice-10--mise-en-place-de-la-gestion-des-erreurs-et-validation-des-entrées)

---

## Exercice 1 : Configuration du serveur Express et connexion MongoDB

**Énoncé** : Créez une application Express de base et connectez-la à une base de données MongoDB en utilisant Mongoose. L'application doit afficher "Hello, World!" lorsqu'un utilisateur accède à la racine du site.

---

## Exercice 2 : Définir un modèle Mongoose pour un utilisateur

**Énoncé** : Créez un modèle Mongoose pour un utilisateur avec les propriétés suivantes :

- `name` (String, obligatoire)
- `email` (String, unique et obligatoire)
- `password` (String, obligatoire)
- `createdAt` (Date, valeur par défaut à la date actuelle)

---

## Exercice 3 : Ajouter un nouvel utilisateur via une API POST

**Énoncé** : Créez un endpoint `POST /register` qui permet d'ajouter un nouvel utilisateur dans la base de données. L'utilisateur doit fournir `name`, `email` et `password` dans la requête.

---

## Exercice 4 : Afficher tous les utilisateurs avec un endpoint GET

**Énoncé** : Créez un endpoint `GET /users` qui récupère et renvoie tous les utilisateurs de la base de données. Assurez-vous que les données sont renvoyées au format JSON.

---

## Exercice 5 : Mise à jour des informations d'un utilisateur

**Énoncé** : Créez un endpoint `PUT /users/:id` qui permet de mettre à jour les informations d'un utilisateur en fonction de son ID. L'utilisateur peut modifier son `name` ou `password`.

---

## Exercice 6 : Suppression d'un utilisateur

**Énoncé** : Créez un endpoint `DELETE /users/:id` qui permet de supprimer un utilisateur de la base de données en fonction de son ID.

---

## Exercice 7 : Authentification de l'utilisateur avec un token JWT

**Énoncé** : Implémentez un endpoint `POST /login` permettant à un utilisateur de se connecter avec son `email` et `password`. Si l'utilisateur existe et que le mot de passe est correct, générez un token JWT et renvoyez-le à l'utilisateur. Utilisez la bibliothèque `jsonwebtoken` pour générer le token.

---

## Exercice 8 : Vérification du token JWT pour protéger les routes

**Énoncé** : Créez un middleware qui vérifie si un token JWT est présent dans l'en-tête de la requête. Si le token est valide, autorisez l'accès à la route protégée ; sinon, renvoyez une erreur "Unauthorized".

---

## Exercice 9 : Ajouter un champ `role` à l'utilisateur et vérifier les autorisations

**Énoncé** : Ajoutez un champ `role` au modèle de l'utilisateur, qui peut être "user" ou "admin". Créez un middleware qui vérifie si l'utilisateur connecté a le rôle "admin" avant de lui permettre d'accéder à certaines routes protégées.

---

## Exercice 10 : Mise en place de la gestion des erreurs et validation des entrées

**Énoncé** : Implémentez une gestion des erreurs globale pour votre application Express. Assurez-vous que toutes les erreurs, comme les erreurs de validation des entrées, sont capturées et renvoyées au client sous forme de réponses structurées. Utilisez une bibliothèque comme `express-validator` pour valider les entrées des utilisateurs (par exemple, valider l'email et le mot de passe).

---

Astuces pour mener les exercices :

1. Exercice 1 : Configuration du serveur Express et connexion MongoDB

   Astuces :
   Commencez par bien comprendre les outils : Avant de coder, assurez-vous de bien comprendre le rôle d'Express et de Mongoose dans l'application. Express permet de gérer les requêtes HTTP, tandis que Mongoose simplifie l'interaction avec MongoDB.
   Connexion à MongoDB : Si vous utilisez une base de données locale, assurez-vous que MongoDB est installé et en cours d'exécution. Si vous utilisez MongoDB Atlas, n'oubliez pas de configurer correctement votre chaîne de connexion.
   Ne sautez pas les étapes de validation : Parfois, un petit oubli dans la configuration peut empêcher la connexion à MongoDB. Vérifiez les erreurs dans la console et assurez-vous que votre base de données est accessible.

2. Exercice 2 : Définir un modèle Mongoose pour un utilisateur

   Astuces :
   Structure du modèle : Lorsque vous définissez un modèle, assurez-vous que les types de données sont correctement définis (par exemple, String, Date, Number). Cela permettra de mieux structurer vos données dans MongoDB.
   Utilisez les propriétés uniques et obligatoires avec discernement : Ne surchargez pas votre modèle avec des contraintes inutiles. Par exemple, email doit être unique, mais d’autres champs peuvent ne pas l’être.
   Soyez clair sur les valeurs par défaut : Par exemple, pour le champ createdAt, la valeur par défaut devrait être la date du jour (Date.now()), mais assurez-vous de bien comprendre pourquoi c’est nécessaire.

3. Exercice 3 : Ajouter un nouvel utilisateur via une API POST

   Astuces :
   Vérification des données reçues : Avant de sauvegarder un nouvel utilisateur, vérifiez que toutes les données nécessaires sont présentes (utilisez des outils comme express-validator pour la validation).
   Gérer les erreurs : Si des erreurs se produisent, comme un email déjà utilisé, assurez-vous de retourner des messages d'erreur clairs à l'utilisateur.
   Sécurisation : Bien que ce premier exercice ne concerne pas encore la sécurité, il est essentiel de penser à la sécurité dès le début, notamment pour la gestion du mot de passe (ne jamais le stocker en texte clair).

4. Exercice 4 : Afficher tous les utilisateurs avec un endpoint GET

   Astuces :
   Utilisez la pagination : Si votre base de données contient beaucoup d'utilisateurs, il peut être utile d’ajouter une pagination pour éviter de charger trop de données en une seule fois.
   Gestion des erreurs : Si une erreur se produit lors de la récupération des utilisateurs (par exemple, si la connexion à MongoDB échoue), assurez-vous de gérer cette erreur proprement.
   Retourner un format JSON cohérent : L'API doit toujours retourner des données au format JSON. Pensez à normaliser la structure des réponses.

5. Exercice 5 : Mise à jour des informations d'un utilisateur

   Astuces :
   Vérification de l'existence de l'utilisateur : Avant de mettre à jour un utilisateur, vérifiez qu’il existe dans la base de données. Si l’utilisateur n’est pas trouvé, renvoyez une erreur appropriée.
   Autorisation de modification : Dans une vraie application, vous devrez vous assurer que l'utilisateur qui tente de modifier les informations est bien celui qui a créé le compte ou un administrateur. La gestion des autorisations est cruciale.
   Validation des données : Comme pour l'ajout d'un utilisateur, vérifiez que les données envoyées dans la requête sont valides avant de procéder à la mise à jour.

6. Exercice 6 : Suppression d'un utilisateur

   Astuces :
   Vérifier les références liées à l'utilisateur : Avant de supprimer un utilisateur, assurez-vous qu’il n’y a pas de références importantes dans d’autres collections qui nécessiteraient de mettre à jour ou supprimer d’autres documents.
   Gérer la suppression en toute sécurité : Lorsque vous supprimez des données, veillez à bien comprendre si cela doit être une suppression physique ou logique. Parfois, au lieu de supprimer un utilisateur, il est préférable de le marquer comme supprimé (par exemple, avec un champ isDeleted).
   Retour d'erreur clair : Si l’utilisateur n’est pas trouvé ou si la suppression échoue, retournez un message d’erreur compréhensible.

7. Exercice 7 : Authentification de l'utilisateur avec un token JWT

   Astuces :
   Sécurisez le mot de passe : Avant de générer un token JWT, assurez-vous que le mot de passe est bien haché avec un algorithme sécurisé comme bcrypt.
   Vérifiez les données de l'utilisateur : Assurez-vous que l'email et le mot de passe envoyés correspondent à ceux enregistrés dans la base de données avant de générer un token JWT.
   Ne stockez pas le mot de passe dans le token : Le token ne doit contenir que des informations publiques. Ne mettez jamais de mots de passe dans le JWT.

8. Exercice 8 : Vérification du token JWT pour protéger les routes

   Astuces :
   Ajoutez un middleware de vérification : Créez un middleware qui vérifie l'existence du token dans les en-têtes de la requête (souvent dans Authorization).
   Gestion des erreurs de token : Si le token est manquant ou invalide, renvoyez une erreur 401 Unauthorized et expliquez clairement le problème à l'utilisateur.
   Décodage du token : Assurez-vous de bien décoder le token avec la clé secrète pour récupérer les informations de l'utilisateur et effectuer une vérification correcte.

9. Exercice 9 : Ajouter un champ role à l'utilisateur et vérifier les autorisations

   Astuces :
   Gérer les rôles avec soin : Créez des rôles simples, comme user et admin. Assurez-vous de bien comprendre la logique derrière la gestion des rôles, comme vérifier que l'utilisateur a bien le rôle admin avant d'accéder à certaines routes.
   Middleware pour autorisation : Utilisez un middleware qui vérifiera le rôle de l'utilisateur avant de lui permettre d’accéder à certaines routes. Cela permet d’éviter que des utilisateurs non autorisés accèdent à des ressources sensibles.
   Limitez les rôles dans le JWT : Ajoutez un champ role dans le payload du JWT pour vérifier rapidement les autorisations de l'utilisateur.

10. Exercice 10 : Mise en place de la gestion des erreurs et validation des entrées

    Astuces :
    Validation côté serveur : Même si vous validez les entrées côté client, n'oubliez pas de toujours valider et nettoyer les données côté serveur pour éviter les injections malveillantes.
    Utilisez express-validator ou joi : Ces bibliothèques sont très utiles pour effectuer une validation de données structurée (email valide, mot de passe sécurisé, etc.).
    Gérez les erreurs globalement : Créez un middleware de gestion des erreurs qui capture toutes les erreurs et renvoie des réponses structurées avec des messages clairs.
