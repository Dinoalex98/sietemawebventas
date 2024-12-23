import { Request, Response } from "express";
import Categoria from "../models/category.model";

export const getCategorias = async (req: Request, res: Response): Promise<void> => {
  try {
    const categorias = await Categoria.find();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener categorías", details: error });
  }
};

export const createCategoria = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, description } = req.body;

    // Validación: Verifica que el campo `name` no sea vacío o nulo
    if (!name || name.trim() === "") {
      return res.status(400).json({
        error: "Error al crear la categoría",
        message: "El nombre de la categoría es obligatorio y no puede estar vacío.",
      });
    }

    // Verificar si ya existe una categoría con el mismo nombre
    const existingCategoria = await Categoria.findOne({ name: name.trim() });
    if (existingCategoria) {
      return res.status(400).json({
        error: "Error al crear la categoría",
        message: "El nombre de la categoría ya existe.",
      });
    }

    // Crear una nueva categoría
    const nuevaCategoria = new Categoria({
      name: name.trim(), // Elimina espacios en blanco al inicio/final
      description,
    });

    // Guardar la categoría en la base de datos
    const savedCategoria = await nuevaCategoria.save();
    return res.status(201).json(savedCategoria);
  } catch (error: unknown) {
    // Manejo de error si no se puede guardar la categoría
    if (error instanceof Error) {
      return res.status(500).json({
        error: "Error al crear la categoría",
        details: error.message,
      });
    }
    return res.status(500).json({
      error: "Error desconocido al crear la categoría",
    });
  }
};

export const updateCategoria = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const categoriaActualizada = await Categoria.findByIdAndUpdate(id, req.body, { new: true });
    if (!categoriaActualizada) {
      res.status(404).json({ error: "Categoría no encontrada" });
      return;
    }
    res.status(200).json(categoriaActualizada);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la categoría", details: error });
  }
};

export const deleteCategoria = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const categoriaEliminada = await Categoria.findByIdAndDelete(id);
    if (!categoriaEliminada) {
      res.status(404).json({ error: "Categoría no encontrada" });
      return;
    }
    res.status(200).json({ message: "Categoría eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la categoría", details: error });
  }
};
