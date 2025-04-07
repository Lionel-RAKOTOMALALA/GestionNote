const express = require('express');
const router = express.Router();
const etudiantController = require('../controllers/etudiants.controller');

router.post('/', etudiantController.create);
router.get('/', etudiantController.findAll);
router.put('/:numEt', etudiantController.update); 
router.delete('/:numEt', etudiantController.delete); 

module.exports = router;