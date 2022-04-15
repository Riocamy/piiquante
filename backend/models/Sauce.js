const mongoose = require('mongoose');

//Mise en place du schéma de données mongoDB
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true }, //Identifiant MongoDB unique de l'utilisateur qui a créé la sauce
  name: { type: String, required: true }, //Nom de la sauce
  manufacturer: { type: String, required: true }, //Fabriquant de la sauce
  description: { type: String, required: true }, //Description de la sauce
  mainPepper: { type: String, required: true }, //Le principal ingrédient épicé de la sauce
  imageUrl: { type: String, required: true }, //URL de l'image de la sauce téléchargée par l'utilisateur
  heat: { type: Number, required: true }, //Nombre entre 1 et 10 décrivant la sauce
  likes: { type: Number, default: 0, required: true }, //Nombre d'utilisateurs qui aiment (= like) la sauce
  dislikes: { type: Number, default: 0, required: true }, //Nombre d'utilisateurs qui n'aiment pas (= dislike) la sauce
  usersLiked: { type: Array, default: [], required: true }, //Tableau des userId qui ont aimé la sauce
  usersDisliked: { type: Array, default: [], required: true }, //Tableau des userId qui n'ont pas aimé la sauce
});

//Pour exporter et exploiter le schéma de données
module.exports = mongoose.model('Thing', sauceSchema);