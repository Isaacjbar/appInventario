const PersonaRepository = require("../repositories/persona.repository");
const ProductoRepository = require("../repositories/producto.repository");
const AsignacionProductoRepository = require("../repositories/asginacionProducto.repository");
const Validaciones = require("../utils/validation");
const Utils = require("../utils/utils"); 

class AsignacionProductoService {
    async getAllAsignacionesActivas(){
        return await AsignacionProductoRepository.getAllAsignacionesActivas();
    }
    async getAllAsignacionesProductosByPersona(idPersona){
        return await AsignacionProductoRepository.getAllAsignacionesProductosByPersona(idPersona);
    }
    async createAsignacionProducto(asignacionProducto){
        const persona = await PersonaRepository.getPersonaById(asignacionProducto.persona);
        const producto = await ProductoRepository.getProductoById(asignacionProducto.producto);
        if(!persona){
            throw new Error("La persona no existe");
        }
        if(!producto){
            throw new Error("El producto no existe");
        }
        return await AsignacionProductoRepository.createAsignacionProducto(asignacionProducto);
    }
    async inactiveStatusAsignacionProducto(id){
        return await AsignacionProductoRepository.inactiveStatusAsignacionProducto(id);
    }
    async getAsignacionProductoById(id){
        return await AsignacionProductoRepository.getAsignacionProductoById(id);
    }
}

module.exports = new AsignacionProductoService();