import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import CategoryForm from "./categoryForm";
import { fetchCategories, createCategory, updateCategory, deleteCategory } from "../../services/categoryService";

interface Category {
  _id: string;
  name: string;
  description: string;
  state: boolean;
}

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error al cargar las categorías:", error);
      }
    };
    loadCategories();
  }, []);

  const handleOpen = (category?: Category) => {
    setCurrentCategory(category || null); // Si es edición, establece la categoría actual
    setOpen(true);
  };

  const handleClose = () => {
    setCurrentCategory(null); // Limpia la categoría seleccionada
    setOpen(false);
  };

  const handleSaveCategory = async (data: { name: string; description: string }) => {
    try {
      if (currentCategory) {
        // Actualizar categoría existente
        const updatedCategory = await updateCategory(currentCategory._id, data);
        setCategories((prev) =>
          prev.map((category) => (category._id === updatedCategory._id ? updatedCategory : category))
        );
      } else {
        // Crear nueva categoría
        const newCategory = await createCategory(data);
        setCategories((prev) => [...prev, newCategory]);
      }
      handleClose();
    } catch (error) {
      console.error("Error al guardar la categoría:", error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((category) => category._id !== id));
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 3,
        }}
      >
        <Typography variant="h5" sx={{ color: "#fff" }}>
          Lista de Categorías
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
          sx={{
            backgroundColor: "#25d162",
            "&:hover": { backgroundColor: "#20ba56" },
          }}
        >
          Nueva Categoría
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "#1e1e1e", borderRadius: "12px" }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#333333" }}>
              <TableCell sx={{ color: "#fff" }}>Nombre</TableCell>
              <TableCell sx={{ color: "#fff" }}>Descripción</TableCell>
              <TableCell sx={{ color: "#fff" }}>Estado</TableCell>
              <TableCell sx={{ color: "#fff" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category._id} sx={{ "&:hover": { backgroundColor: "#2b2b2b" } }}>
                <TableCell sx={{ color: "#fff" }}>{category.name}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{category.description}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{category.state ? "Activo" : "Inactivo"}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="text"
                    startIcon={<EditIcon />}
                    onClick={() => handleOpen(category)}
                    sx={{ color: "#25d162" }}
                  >
                    Editar
                  </Button>
                  <Button
                    size="small"
                    variant="text"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteCategory(category._id)}
                    sx={{ color: "#ff4d4d" }}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{currentCategory ? "Editar Categoría" : "Nueva Categoría"}</DialogTitle>
        <DialogContent>
          <CategoryForm
            onSubmit={handleSaveCategory}
            initialData={currentCategory || undefined}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CategoryList;
