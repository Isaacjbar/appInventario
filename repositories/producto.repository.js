const Producto = require("../models/producto.model");

class ProductoRepository {
    async getAllProductos(){ 
        return await Producto.find();
    }

    async getProductoById(id){
        return  await Producto.findById(id);
    }

    async getProductoByNumSerie(numSerie){
        return await Producto.findOne({numSerie: numSerie});
    }

    async createProducto(producto){
        return await Producto.create(producto);
    }   

    async updateProducto(id,producto){
        return await Producto.findByIdAndUpdate(id,producto,{new:true});
    }

    async deleteProducto(id){
        return await Producto.findByIdAndDelete(id);
    }

    /*
    2025-001 | Esta es la forma en la que esta formado el numero de inventario
    */
}

module.exports = new ProductoRepository();