const PersonaRepository = require("../repositories/persona.repository");
const Validaciones = require("../utils/validation");
const Utils = require("../utils/utils"); // Asegúrate de importar Utils si lo usas

class PersonaService {
    async getAllPersonas() {
        return await PersonaRepository.getAllPersonas();
    }

    async getPersonaById(personaId) {
        if (!personaId || personaId.trim() === "") {
            throw new Error("El id de la persona es requerido");
        }
        const persona = await PersonaRepository.getPersonaById(personaId);
        return persona;
    }

    async createPersona(persona) {
        // VALIDAR QUE TODOS LOS CAMPOS OBLIGATORIOS VENGAN
        if (!persona.nombre || !persona.apellido || !persona.fechaNacimiento || !persona.rfc || !persona.correo) {
            throw new Error("Todos los campos son requeridos");
        }

        // VALIDAR RFC Y CORREO
        Validaciones.validarRFC(persona.rfc);
        Validaciones.validarCorreo(persona.correo);

        // VALIDAR DUPLICADOS
        const personaByRFC = await PersonaRepository.getPersonaByRFC(persona.rfc);
        const personaByCorreo = await PersonaRepository.getPersonaByCorreo(persona.correo);

        if (personaByRFC) {
            throw new Error("El RFC ya existe");
        }
        if (personaByCorreo) {
            throw new Error("El correo ya existe");
        }

        // VALIDAR EDAD
        if (Utils.calcularEdad(persona.fechaNacimiento) < 18) {
            throw new Error("La persona es menor de edad");
        }

        return await PersonaRepository.createPersona(persona);
    }
    async updatePersona(personaId,persona){

        // VALIDAR QUE LA PERSONA EXISTA
        const personaById = await PersonaRepository.getPersonaById(personaId);
        
        if(!personaById){
            throw new Error("La persona no existe");
        }

        // VALIDAR QUE TODOS LOS CAMPOS VENGAN EN EL BODY
        if (!persona.nombre || !persona.apellido || !persona.fechaNacimiento || !persona.rfc || !persona.correo) {
            throw new Error("Todos los campos son requeridos");
        }
        // VALIDAR RFC Y CORREO
        Validaciones.validarRFC(persona.rfc);
        Validaciones.validarCorreo(persona.correo);
        // Validar que otras personas no tenga el mismo RFC
        const personaByRFCAndNotId = await PersonaRepository.getPersonaByRFCAndNotId(id, persona.rfc);
        if (personaByRFCAndNotId) {
            throw new Error("El RFC ya existe");
        }   
        const personaByCorreoAndNotId = await PersonaRepository.getPersonaByCorreoAndNotId(id, persona.correo);
        if (personaByCorreoAndNotId) {
            throw new Error("El RFC ya existe");
        }   
        // VALIDAR EDAD
        if (Utils.calcularEdad(persona.fechaNacimiento) < 18) {
            throw new Error("La persona es menor de edad");
        }
        return await PersonaRepository.updatePersona(personaId,persona);
    }
    async deletePersona(id){
        // VALIDAR QUE LA PERSONA EXISTAAAA
        const personaById = await PersonaRepository.getPersonaById(id);
        
        if(!personaById){
            throw new Error("La persona no existe");
        }
        return await PersonaRepository.deletePersona(id);
    }
}

module.exports = new PersonaService();
