//Import d'Express
const express = require('express');

//Utilisation d'Express
const app = express();

//Import de mongoDB
const mongoose = require('mongoose');

//Import de la route utilisateur
const userRoutes = require('./routes/user');

//Configuration de la base de données mongoDB
mongoose.connect('mongodb+srv://Riocamy:p6-piiquante@piiquanteserver.5petj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Mise en place de la route utilisateur
app.use('/api/auth', userRoutes);


//Export et exploitation de l'API
module.exports = app;