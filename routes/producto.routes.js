const express = require("express");

const ProductoController = require("../controllers/producto.controller");
const router = express.Router();

router.get("/", ProductoController.getAllProductos);


module.exports = router;