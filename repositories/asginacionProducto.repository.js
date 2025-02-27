const AsignacionProducto = require('../models/asignacionProducto.model');

class AsignacionProductoRepository {
    async getAllAsignacionesActivas(){
        return await AsignacionProducto.find({estado:'Activo'});
    }

    async getAllAsignacionesProductosByPersona(idPersona){
        return await AsignacionProducto.find({persona:idPersona});
    }

    async createAsignacionProducto(asignacionProducto){
        return await AsignacionProducto.create(asignacionProducto);
    }

    async inactiveStatusAsignacionProducto(id){
        return await AsignacionProducto.findByIdAndUpdate(id,{estado:'Inactivo'},{new:true});
    }

    async getAsignacionProductoById(id){
        return await AsignacionProducto.findById(id);
    }
}

module.exports = new AsignacionProductoRepository();