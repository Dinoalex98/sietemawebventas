import { Request, Response } from "express";
import Product from "../models/product.model"; // Ajusta esta ruta según tu estructura de carpetas
import Brand from "../models/brand.model";
import Category from "../models/category.model";


export const createProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, brand, category, productModel, specifications, image, state } = req.body;

    // Validar campos requeridos
    const requiredFields = { name, brand, category, productModel, specifications };
    const missingFields = Object.entries(requiredFields)
      .filter(([key, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Faltan campos requeridos: ${missingFields.join(", ")}`,
      });
    }

    // Crear el producto
    const newProduct = new Product({
      name,
      brand,
      category,
      productModel,
      specifications,
      image,
      state,
    });

    // Guardar el producto en la base de datos
    const savedProduct = await newProduct.save();

    return res.status(201).json({
      message: "Producto creado exitosamente",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error en createProduct:", error);
    return res.status(500).json({
      message: "Error al crear el producto",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

// Obtener todos los productos
export const getProducts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const products = await Product.find(); // Los nombres ya están almacenados directamente
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return res.status(500).json({
      message: "Error al obtener los productos",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};





// Actualizar un producto
export const updateProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { name, brand, category, productModel, specifications, image, state } = req.body;

    // Verificar que todos los campos requeridos estén presentes
    if (!name || !brand || !category || !productModel || !specifications) {
      return res.status(400).json({
        message: "Todos los campos requeridos deben estar presentes",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, brand, category, productModel, specifications, image, state },
      { new: true } // Retornar el documento actualizado
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "El producto no fue encontrado",
      });
    }

    return res.status(200).json({
      message: "Producto actualizado exitosamente",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error en updateProduct:", error);
    return res.status(500).json({
      message: "Error al actualizar el producto",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};


// Eliminar un producto
export const deleteProduct = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.status(200).json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("Error en deleteProduct:", error);
    return res.status(500).json({
      message: "Error al eliminar el producto",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};
