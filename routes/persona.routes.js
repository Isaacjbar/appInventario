const express = require("express");
const router = express.Router();
const PersonaController = require("../controllers/persona.controller");


router.get("/",PersonaController.getAllPersonas);
router.get("/id/:id",PersonaController.getPersonaById);
router.post("/",PersonaController.createPersona);
router.put("/:id",PersonaController.updatePersona);
router.delete("/:id",PersonaController.deletePersona);


module.exports = router;
