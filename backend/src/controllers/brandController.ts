import { Request, Response } from "express";
import Brand from "../models/brand.model";

export const getBrands = async (req: Request, res: Response): Promise<Response> => {
  try {
    const brands = await Brand.find(); // Obteniendo todas las marcas desde la base de datos
    return res.status(200).json(brands);
  } catch (error) {
    console.error("Error al obtener las marcas:", error);
    return res.status(500).json({
      message: "Error al obtener las marcas",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const createMarca = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, description } = req.body;

    // Validación: Verifica que el campo `name` no sea vacío o nulo
    if (!name || name.trim() === "") {
      return res.status(400).json({
        error: "Error al crear la marca",
        message: "El nombre de la marca es obligatorio y no puede estar vacío.",
      });
    }

    // Verificar si ya existe una marca con el mismo nombre
    const existingMarca = await Brand.findOne({ name: name.trim() });
    if (existingMarca) {
      return res.status(400).json({
        error: "Error al crear la marca",
        message: "El nombre de la marca ya existe.",
      });
    }

    // Crear una nueva marca
    const nuevaMarca = new Brand({
      name: name.trim(), // Elimina espacios en blanco al inicio/final
      description,
    });

    // Guardar la marca en la base de datos
    const savedMarca = await nuevaMarca.save();
    return res.status(201).json(savedMarca);
  } catch (error: unknown) {
    // Manejo de error si no se puede guardar la marca
    if (error instanceof Error) {
      return res.status(500).json({
        error: "Error al crear la marca",
        details: error.message,
      });
    }
    return res.status(500).json({
      error: "Error desconocido al crear la marca",
    });
  }
};


export const updateMarca = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const marcaActualizada = await Brand.findByIdAndUpdate(id, req.body, { new: true });
    if (!marcaActualizada) {
      res.status(404).json({ error: "Marca no encontrada" });
      return;
    }
    res.status(200).json(marcaActualizada);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la marca", details: error });
  }
};

export const deleteMarca = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const marcaEliminada = await Brand.findByIdAndDelete(id);
    if (!marcaEliminada) {
      res.status(404).json({ error: "Marca no encontrada" });
      return;
    }
    res.status(200).json({ message: "Marca eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la marca", details: error });
  }
};
