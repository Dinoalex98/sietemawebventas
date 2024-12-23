import { Router } from "express";
import {
  getCategorias,
  createCategoria,
  updateCategoria,
  deleteCategoria,
} from "../controllers/categoryController";

const router = Router();

router.get("/", getCategorias); // Obtener todas las categorías
router.post("/", createCategoria); // Crear una nueva categoría
router.put("/:id", updateCategoria); // Actualizar una categoría existente
router.delete("/:id", deleteCategoria); // Eliminar (inhabilitar) una categoría

export default router;
