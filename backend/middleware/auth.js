// Import du package de création de token
const jwt = require('jsonwebtoken');

// Création du middleware d'authentification
module.exports = (req, res, next) => {
  try {
    // Récupération du token de la requête
    const token = req.headers.authorization.split(' ')[1];
    // Vérifier si la clé d'authentification du token est correcte
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    // Récupération de l'userId du token
    const userId = decodedToken.userId;
    // Pour déclarer qu'il s'agit de l'utilisateur qui en envoyé la requête
    req.auth = { userId };
    // Pour vérifier si l'utilisateur est le même que celui qui envoyé la requête
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};