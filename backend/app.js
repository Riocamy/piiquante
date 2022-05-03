// Import d'Express
const express = require('express');

// Utilisation d'Express
const app = express();

// Import de mongoDB
const mongoose = require('mongoose');

// Import du package body-parser (parse automatiquement les requêtes en JSON)
const bodyParser = require('body-parser');

// Pour mettre en place le chemin d'accès à un fichier téléchargé par l'utilisateur
const path = require('path');

// Import des routes (CRUD)
const sauceRoutes = require('./routes/sauce');

// Import des routes utilisateur
const userRoutes = require('./routes/user');

// Configuration de la base de données mongoDB
mongoose.connect('mongodb+srv://Riocamy:p6-piiquante@piiquanteserver.5petj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

/**** Intégration des Middlewares ****/

// Accès au core de la requête
app.use(express.json());

// Ajout des Middlewares d'autorisations
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Intégration du bodyparser
app.use(bodyParser.json());

// Middleware de téléchargement de fichiers (images des sauces)
app.use('/images', express.static(path.join(__dirname, 'images')));

// Mise en place des routes Sauce (CRUD)
app.use('/api/sauces', sauceRoutes);

// Mise en place des routes utilisateur
app.use('/api/auth', userRoutes);



// Export et exploitation de l'API
module.exports = app;