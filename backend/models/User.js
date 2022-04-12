const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//Mise en place du schéma d'utilisateur
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

//Création du modèle
userSchema.plugin(uniqueValidator);

//Export et exploitation du modèle
module.exports = mongoose.model('User', userSchema);