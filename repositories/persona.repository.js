const Persona = require("../models/persona.model");


class PersonaRepository {
        
    // Buscar todas las personas
    async getAllPersonas(){
        return await Persona.find();
    }
    
    // Buscar persona x id
    async getPersonaById(id){
        return await Persona.findById(id);
    }
    
    // Buscar persona x rfc
    async getPersonaByRFC(rfc){
        return await Persona.findOne({rfc:rfc})
    }
    
    // Buscar persona x 
    async getPersonaByCorreo(correo){
        return await Persona.findOne({correo:correo})
    }

    // Crear una persona
    async createPersona(persona){
        return await Persona.create(persona);
    }
    
    //Actualizar una persona
    async updatePersona(id,persona){
        return await Persona.findByIdAndUpdate(id,persona, {new:true}); // Si no ponemos el new true devuelve a la persona antes de actualizar, si está presente devuelve la persona ya actualizada
    }
    
    async deletePersona(id){
        return await Persona.findByIdAndDelete(id);
    }

    // Buscar si hay toro rfc igual de la persona que estoy mandando
    // El rfc sea igual al rfc que le estoy mandando
    // Y el d sea diferente al id que le estoy mandando
    async getPersonaByRFCAndNotId(id,rfc){
        return await Persona.findOne({_id:{$ne:id},rfc:rfc});
    }
    async getPersonaByCorreoAndNotId(id,correo){
        return await Persona.findOne({_id:{$ne:id},correo:correo});
    }
    async deletePersona(id){
        return await Persona.findByIdAndDelete(id);
    }

}

module.exports = new PersonaRepository();