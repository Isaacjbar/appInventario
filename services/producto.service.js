const ProductoRepository = require("../repositories/producto.repository");
const Validaciones = require("../utils/validation");

class ProductoService {
  async getAllProductos() {
    return await ProductoRepository.getAllProductos();
  }

  async getProductoById(id) {
    if (!id) {
      throw new Error("El id del producto es requerido");
    }
    return await ProductoRepository.getProductoById(id);
  }

  async getProductoByNumSerie(numSerie) {
    if (!numSerie) {
      throw new Error("El número de serie del producto es requerido");
    }
    return await ProductoRepository.getProductoByNumSerie(numSerie);
  }

  async createProducto(producto) {
    if (
      !producto.nombre ||
      !producto.precio ||
      !producto.fechaAdquisicion ||
      !producto.numSerie
    ) {
      throw new Error("Todos los campos son obligatorios");
    }

    const existeNumSerie = await ProductoRepository.getProductoByNumSerie(
      producto.numSerie
    );
    if (existeNumSerie) {
      throw new Error("El número de serie ya existe en otro producto");
    }

    if (producto.precio < 0) {
      throw new Error("El precio no puede ser negativo");
    }

    if (!Validaciones.esFechaValida(producto.fechaAdquisicion)) {
      throw new Error("La fecha de adquisición no tiene un formato válido");
    }

    let yearAdquisicion = producto.fechaAdquisicion.split("-")[0];
    let countYear = await ProductoRepository.contarProductosByYear(yearAdquisicion);
    countYear++;

    producto.numInventario = `${yearAdquisicion}-${countYear.toString().padStart(3, "0")}`;
    return await ProductoRepository.createProducto(producto);
  }

  async updateProducto(id, producto) {
    if (
      !producto.nombre ||
      !producto.precio ||
      !producto.fechaAdquisicion ||
      !producto.numSerie
    ) {
      throw new Error("Todos los campos son obligatorios");
    }

    const existeNumSerie = await ProductoRepository.getProductoByNumSerie(
      producto.numSerie
    );
    const getProductoByNumSerieAndNotId = await ProductoRepository.getProductoByNumSerieAndNotId(producto.numSerie, id);

    
    if(getProductoByNumSerieAndNotId){
      throw new Error("El número de serie ya existe en otro producto");
    }

    if (existeNumSerie && existeNumSerie._id.toString() !== id) {
      throw new Error("El número de serie ya existe en otro producto");
    }

    if (producto.precio < 0) {
      throw new Error("El precio no puede ser negativo");
    }

    if (!Validaciones.esFechaValida(producto.fechaAdquisicion)) {
      throw new Error("La fecha de adquisición no tiene un formato válido");
    }

    
    let yearAdquisicion = producto.fechaAdquisicion.split("-")[0];
    let countYear = await ProductoRepository.contarProductosByYear(yearAdquisicion);
    countYear++;

    producto.numInventario = `${yearAdquisicion}-${countYear.toString().padStart(3, "0")}`;
    return await ProductoRepository.updateProducto(id, producto);
  }

  async deleteProducto(id) {
    return await ProductoRepository.deleteProducto(id);
  }
}

module.exports = new ProductoService();
