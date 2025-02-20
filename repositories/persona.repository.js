const Persona = require('../models/persona.model.js');

class PersonaRepository{
    async getAllPersonas(){
        return await Persona.find();
    }
    async getPersonaById(id){
        return await Persona.findById(id);
    }
    async getPersonaByRFC(rfc){
        return await Persona.findOne({rfc: rfc});
    }
    async getPersonaByEmail(email){
        return await Persona.findOne({email: email});
    }
    async createPersona(persona){
        return await Persona.create(persona);
    }
    async updatePersona(id, persona){
        return await Persona.findByIdAndUpdate(id, persona, {new: true});
    }
    async deletePersona(id){
        return await Persona.findByIdAndDelete(id);
    }
}

module.exports = new PersonaRepository();