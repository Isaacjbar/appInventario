const ProductoRepository = require('../repositories/producto.repository');

class ProductoService  {

    async getAllProductos(){
        return await ProductoRepository.getAllProductos();
    }   

};

module.exports = new ProductoService();