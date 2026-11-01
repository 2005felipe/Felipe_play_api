const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');

router.get('/getVentas', ventaController.getVentas);
router.get('/getVenta/:id', ventaController.getVentaById);
router.post('/postVenta', ventaController.postVenta);
router.put('/putVenta/:id', ventaController.putVenta);
router.delete('/deleteVenta/:id', ventaController.deleteVenta);

module.exports = router;
