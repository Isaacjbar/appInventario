const personaRepository = require("../repositories/persona.repository");
const PersonaService = require("../services/persona.service");

class PersonaController {

        async getAllPersonas(req,res){
            try {
                const personas = await PersonaService.getAllPersonas();
                // x defecto siempre retora 200 de status si no se especifica
                res.status(200).json(personas);
            } catch (error) {
                res.status(400).json({message: error.message});
            }
        }
        async getPersonaById(req,res){
            try {
                const personaId = req.params.id;
                if(!personaId || personaId === "" || personaId === undefined || personaId === null){
                    throw new Error("El id de la persona es requerido");
                }
                const persona = await PersonaService.getPersonaById(personaId);

                // x defecto siempre retora 200 de status si no se especifica
                res.json(persona);
            } catch (error) {
                res.status(400).json({message: error.message});
            }
        }
        async createPersona(req,res){
            try {
                const persona = PersonaService.createPersona(req.body);
                res.json(persona);
            } catch (error) {
                res.status(400).json({message: error.message});
            }     
        }      
        async updatePersona(req,res){
            try{
                    const personaId = req.params.id;
                    console.log("id de la person a actualizar",personaId);
                    if(!personaId || personaId === "" || personaId === undefined || personaId === null){
                        throw new Error("El id de la persona es requerido");
                    }
                    const persona = await PersonaService.updatePersona(personaId,req.body)
            }catch(error){
                res.status(400).json({message: error.message});
            }
        }
        async deletePersona(req,res){
            try {
                const id = req.params.id;
                if(!id || id === "" || id === undefined || id === null){
                    throw new Error("El id de la persona es requerido");
                } 
                const persona = await PersonaService.deletePersona(id);
                res.json(persona);
                console.log("Esta persona se eliminó", persona);
            } catch (error) {
                res.status(400).json({message: error.message});
            }
        }
}

module.exports = new PersonaController;