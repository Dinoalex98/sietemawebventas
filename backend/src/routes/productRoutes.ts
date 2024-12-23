import { Router } from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";

const router = Router();

// Rutas para productos
router.get("/", getProducts); // Obtener todos los productos
router.post("/", createProduct); // Crear un nuevo producto
router.put("/:id", updateProduct); // Actualizar un producto existente
router.delete("/:id", deleteProduct); // Inhabilitar un producto

export default router;
