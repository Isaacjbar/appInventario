const express = require("express");
const router = express.Router();
const AsignacionProductoController = require("../controllers/asginacionProducto.controller");

router.get("/",AsignacionProductoController.getAllAsignacionesActivas);
router.get("/persona/:id",AsignacionProductoController.getAllAsignacionesProductosByPersona);
router.post("/",AsignacionProductoController.createAsignacionProducto);
router.put("/:id",AsignacionProductoController.inactiveStatusAsignacionProducto);
router.get("/:id",AsignacionProductoController.getAsignacionProductoById);

module.exports = router;
