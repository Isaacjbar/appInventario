const PersonaRepository = require('../repositories/persona.repository');
const { validateEmailUnique, validateRFCUnique, validateAge } = require('../utils/validations');

class PersonaService {
  async getAllPersonas() {
    return await PersonaRepository.getAllPersonas();
  }

  async getPersonaById(id) {
    return await PersonaRepository.getPersonaById(id);
  }

  async getPersonaByRFC(rfc) {
    return await PersonaRepository.getPersonaByRFC(rfc);
  }

  async getPersonaByEmail(email) {
    return await PersonaRepository.getPersonaByEmail(email);
  }

  async createPersona(persona) {
    // Validaciones: correo, RFC y fecha de nacimiento
    await validateEmailUnique(persona.email);
    await validateRFCUnique(persona.rfc);
    validateAge(persona.fechaNacimiento);
    
    return await PersonaRepository.createPersona(persona);
  }

  async updatePersona(id, persona) {
    if (persona.email) {
      await validateEmailUnique(persona.email, id);
    }
    if (persona.rfc) {
      await validateRFCUnique(persona.rfc, id);
    }
    if (persona.fechaNacimiento) {
      validateAge(persona.fechaNacimiento);
    }
    
    return await PersonaRepository.updatePersona(id, persona);
  }

  async deletePersona(id) {
    return await PersonaRepository.deletePersona(id);
  }
}

module.exports = new PersonaService();
