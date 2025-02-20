const express = require('express');
const PersonaController = require('../controllers/persona.controller.js'); // No changes needed
const router = express.Router();

router.get('/personas', PersonaController.getAllPersonas);
router.get('/personas/:rfc', PersonaController.getPersonaByRFC);
router.get('/personas/:email', PersonaController.getPersonaByEmail);
router.get('/personas/:id', PersonaController.getPersonaById);
router.post('/personas', PersonaController.createPersona);
router.put('/personas/:id', PersonaController.updatePersona);
router.delete('/personas/:id', PersonaController.deletePersona);

module.exports = router;
