const express = require("express");

const ProductoController = require("../controllers/producto.controller");
const router = express.Router();

router.get("/", ProductoController.getAllProductos);
router.get("/:id", ProductoController.getProductoById);
router.get("/numSerie/:numSerie", ProductoController.getProductoByNumSerie);
router.post("/", ProductoController.createProducto);
router.put("/:id", ProductoController.updateProducto);
router.delete("/:id", ProductoController.deleteProducto);

module.exports = router;
