const express = require('express');
const PersonaController = require('../controllers/persona.controller.js');
const router = express.Router();

// Rutas explícitas para cada tipo de búsqueda
router.get('/personas', PersonaController.getAllPersonas);
router.get('/personas/id/:id', PersonaController.getPersonaById);
router.get('/personas/rfc/:rfc', PersonaController.getPersonaByRFC);
router.get('/personas/email/:email', PersonaController.getPersonaByEmail);

router.post('/personas', PersonaController.createPersona);
router.put('/personas/id/:id', PersonaController.updatePersona);
router.delete('/personas/id/:id', PersonaController.deletePersona);

module.exports = router;
