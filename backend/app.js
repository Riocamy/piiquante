//Import d'Express
const express = require('express');

//Utilisation d'Express
const app = express();

//Import de mongoDB
const mongoose = require('mongoose');

//Import du package body-parser (parse automatiquement les requêtes en JSON)
const bodyParser = require('body-parser');

//Import de la route utilisateur
const userRoutes = require('./routes/user');

//Configuration de la base de données mongoDB
mongoose.connect('mongodb+srv://Riocamy:p6-piiquante@piiquanteserver.5petj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

/**** Intégration des Middlewares ****/

//Ajout des Middlewares d'autorisations
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//Middlewares provisoires pour exécuter le serveur

app.use((req, res, next) => {
  console.log('Requête reçue !');
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
  next();
});

app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
});

//Mise en place de la route utilisateur
app.use('/api/auth', userRoutes);


//Export et exploitation de l'API
module.exports = app;