import { Router } from "express";
import { getBrands, createMarca, updateMarca, deleteMarca,
} from "../controllers/brandController";

const router = Router();

router.get("/", getBrands); // Obtener todas las marcas
router.post("/", createMarca); // Crear una nueva marca
router.put("/:id", updateMarca); // Actualizar una marca existente
router.delete("/:id", deleteMarca); // Eliminar (inhabilitar) una marca

export default router;
