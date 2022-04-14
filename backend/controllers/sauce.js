//Import du schéma de données
const Sauce = require('../models/Sauce');

//Import du package file system
const fs = require('fs');

//Controller de la route POST
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce); //Pour extraire les données JSON de l'objet crée
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    //Pour générer l'URL de l'image de l'objet crée
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

//Controller de la route GET (récupération d'un objet spécifique)
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

//Controller de la route PUT
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ? //Vérifie si une image à été téléchargée avec l'objet
    {
      ...JSON.parse(req.body.sauce), //Si oui, on récupère les informations au format JSON
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` //Puis on génére une nouvelle URL
    } : { ...req.body }; //Sinon on modifie son contenu
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

//Controller de la route DELETE
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }) //On trouve l'objet dans la base de données
    .then(sauce => { //Quand on le trouve
      const filename = sauce.imageUrl.split('/images/')[1]; //On extrait le nom du fichier à supprimer
      fs.unlink(`images/${filename}`, () => { //On supprime ce fichier (ici l'image)
        Sauce.deleteOne({ _id: req.params.id }) //Puis on supprime l'objet de la base de données
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

//Controller de la route GET (récupération de tous les objets)
exports.getAllSauces = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};