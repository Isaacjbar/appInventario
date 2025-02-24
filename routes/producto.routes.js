const express = require('express');
const ProductoController =  require('../controllers/producto.controller');
const router = express.Router();

//Obtener todos los productos
router.get('/', ProductoController.getAllProductos);
router.post('/', ProductoController.createProducto);

router.get('/:id', ProductoController.getProductoById);
router.get('/serie/:numSerie', ProductoController.getProductoByNumSerie);

module.exports = router;
