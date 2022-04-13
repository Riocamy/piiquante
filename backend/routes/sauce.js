//Import d'Express
const express = require('express');
//Déclaration des routes
const router = express.Router();

//Import du middleware d'authentification
const auth = require('../middleware/auth');

//Import du middleware de gestion de fichiers entrants
const multer = require('../middleware/multer-config');

//Import des controllers
const sauceCtrl = require('../controllers/sauce');

//Ajout des controllers aux routes (incluant le middleware d'authentification et la gestion de fichiers)
router.get('/', auth, sauceCtrl.getAllThings);
router.post('/', auth, multer, sauceCtrl.createThing);
router.get('/:id', auth, sauceCtrl.getOneThing);
router.put('/:id', auth, multer, sauceCtrl.modifyThing);
router.delete('/:id', auth, sauceCtrl.deleteThing);

//Export et explotation des routes
module.exports = router;