import { Request, Response } from "express";
import Supplier from "../models/supplier.model";

// Crear un proveedor
export const createSupplier = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { company, nit, phone, address, email } = req.body;

    const existingSupplier = await Supplier.findOne({ company });
    if (existingSupplier) {
      return res.status(400).json({
        error: "Error al crear el proveedor",
        message: "El nombre de la empresa ya existe",
      });
    }

    const newSupplier = new Supplier({ company, nit, phone, address, email });
    const savedSupplier = await newSupplier.save();
    return res.status(201).json(savedSupplier);
  } catch (error) {
    return res.status(500).json({
      error: "Error al crear el proveedor",
      details: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

// Obtener todos los proveedores
export const getSuppliers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const suppliers = await Supplier.find();
    return res.status(200).json(suppliers);
  } catch (error) {
    return res.status(500).json({
      error: "Error al obtener los proveedores",
      details: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

// Actualizar un proveedor
export const updateSupplier = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { company, nit, phone, address, email } = req.body;

    const existingSupplier = await Supplier.findOne({ company, _id: { $ne: id } });
    if (existingSupplier) {
      return res.status(400).json({
        error: "Error al actualizar el proveedor",
        message: "El nombre de la empresa ya existe",
      });
    }

    const updatedSupplier = await Supplier.findByIdAndUpdate(
      id,
      { company, nit, phone, address, email },
      { new: true }
    );

    if (!updatedSupplier) {
      return res.status(404).json({
        error: "Error al actualizar el proveedor",
        message: "Proveedor no encontrado",
      });
    }

    return res.status(200).json(updatedSupplier);
  } catch (error) {
    return res.status(500).json({
      error: "Error al actualizar el proveedor",
      details: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

// Eliminar (inhabilitar) un proveedor
export const deleteSupplier = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const deletedSupplier = await Supplier.findByIdAndUpdate(
      id,
      { state: false },
      { new: true }
    );

    if (!deletedSupplier) {
      return res.status(404).json({
        error: "Error al eliminar el proveedor",
        message: "Proveedor no encontrado",
      });
    }

    return res.status(200).json(deletedSupplier);
  } catch (error) {
    return res.status(500).json({
      error: "Error al eliminar el proveedor",
      details: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};
