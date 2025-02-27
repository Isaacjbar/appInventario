const asignacionProducto = require('../models/asignacionProducto.model.js');
const AsignacionProductoService = require('../services/asginacionProducto.service.js');

const mongoose = require('mongoose');


class AsignacionProductoController {
    async getAllAsignacionesActivas(req,res){
        try {
            const asignaciones = await AsignacionProductoService.getAllAsignacionesActivas();
            res.status(200).json(asignaciones);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }
    async getAllAsignacionesProductosByPersona(req,res){
        try {
            const idPersona = req.params.id;
            if(!idPersona || idPersona === "" || idPersona === undefined || idPersona === null){
                throw new Error("El id de la persona es requerido");
            }
            const asignaciones = await AsignacionProductoService.getAllAsignacionesProductosByPersona(idPersona);
            res.json(asignaciones);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }
    async createAsignacionProducto(req,res){
        try {
            const asignacionProducto = await AsignacionProductoService.createAsignacionProducto(req.body);
            res.json(asignacionProducto);
        } catch (error) {
            res.status(400).json({message: error.message});
        }     
    }
    async inactiveStatusAsignacionProducto(req,res){
        try{
                const id = req.params.id;
                if(!id || id === "" || id === undefined || id === null){
                    throw new Error("El id de la asignacion es requerido");
                }
                const asignacion = await AsignacionProductoService.inactiveStatusAsignacionProducto(id);
                res.json(asignacion);
        }catch(error){
            res.status(400).json({message: error.message});
        }
    }
    async getAsignacionProductoById(req,res){
        try {
            const id = req.params.id;
            if(!id || id === "" || id === undefined || id === null){
                throw new Error("El id de la asignacion es requerido");
            }
            const asignacion = await AsignacionProductoService.getAsignacionProductoById(id);
            res.json(asignacion);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }
}

module.exports = new AsignacionProductoController;