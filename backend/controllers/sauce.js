//Import du schéma de données
const Thing = require('../models/Sauce');

//Import du package file system
const fs = require('fs');

//Controller de la route POST
exports.createThing = (req, res, next) => {
  const thingObject = JSON.parse(req.body.sauce); //Pour extraire les données JSON de l'objet crée
  delete thingObject._id;
  const thing = new Thing({
    ...thingObject,
    //Pour générer l'URL de l'image de l'objet crée
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

//Controller de la route GET (récupération d'un objet spécifique)
exports.getOneThing = (req, res, next) => {
  Thing.findOne({
    _id: req.params.id
  }).then(
    (thing) => {
      res.status(200).json(thing);
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
exports.modifyThing = (req, res, next) => {
  const thingObject = req.file ? //Vérifie si une image à été téléchargée avec l'objet
    {
      ...JSON.parse(req.body.thing), //Si oui, on récupère les informations au format JSON
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` //Puis on génére une nouvelle URL
    } : { ...req.body }; //Sinon on modifie son contenu
  Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

//Controller de la route DELETE
exports.deleteThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id }) //On trouve l'objet dans la base de données
    .then(thing => { //Quand on le trouve
      const filename = thing.imageUrl.split('/images/')[1]; //On extrait le nom du fichier à supprimer
      fs.unlink(`images/${filename}`, () => { //On supprime ce fichier (ici l'image)
        Thing.deleteOne({ _id: req.params.id }) //Puis on supprime l'objet de la base de données
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

//Controller de la route GET (récupération de tous les objets)
exports.getAllThings = (req, res, next) => {
  Thing.find().then(
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