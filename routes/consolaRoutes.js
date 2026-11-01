const express = require('express');
const router = express.Router();
const consolaController = require('../controllers/consolaController');

router.get('/getConsolas', consolaController.getConsolas);
router.get('/getConsola/:id', consolaController.getConsolaById);
router.post('/postConsola', consolaController.postConsola);
router.put('/putConsola/:id', consolaController.putConsola);
router.delete('/deleteConsola/:id', consolaController.deleteConsola);

module.exports = router;
