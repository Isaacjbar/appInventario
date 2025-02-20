const PersonaRepository = require('../repositories/persona.repository.js');

class PersonaService{
    async getAllPersonas(){
        return await PersonaRepository.getAllPersonas();
    }
    async getPersonaById(id){
        return await PersonaRepository.getPersonaById(id);
    }
    async getPersonaByRFC(rfc){
        return await PersonaRepository.getPersonaByRFC(rfc);
    }
    async getPersonaByEmail(email){
        return await PersonaRepository.getPersonaByEmail(email);
    }
    async createPersona(persona){
        return await PersonaRepository.createPersona(persona);
    }
    async updatePersona(id, persona){
        return await PersonaRepository.updatePersona(id, persona);
    }
    async deletePersona(id){
        return await PersonaRepository.deletePersona(id);
    }
}
module.exports = new PersonaService();