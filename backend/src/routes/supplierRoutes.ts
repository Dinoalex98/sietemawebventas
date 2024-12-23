import { Router } from "express";
import {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "../controllers/supplierController";

const router = Router();

router.get("/", getSuppliers); // Obtener todos los proveedores
router.post("/", createSupplier); // Crear un proveedor
router.put("/:id", updateSupplier); // Actualizar un proveedor
router.delete("/:id", deleteSupplier); // Eliminar (inhabilitar) un proveedor

export default router;
