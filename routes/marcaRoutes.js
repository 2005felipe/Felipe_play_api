const express = require('express');
const router = express.Router();
const marcaController = require('../controllers/marcaController');

router.get('/getMarcas', marcaController.getMarcas);
router.get('/getMarca/:id', marcaController.getMarcaById);
router.post('/postMarca', marcaController.postMarca);
router.put('/putMarca/:id', marcaController.putMarca);
router.delete('/deleteMarca/:id', marcaController.deleteMarca);

module.exports = router;
