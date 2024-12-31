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
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import CategoryForm from "./categoryForm";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/categoryService";

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
        Swal.fire("Error", "No se pudieron cargar las categorías.", "error");
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
          prev.map((category) =>
            category._id === updatedCategory._id ? updatedCategory : category
          )
        );
        Swal.fire("¡Editado!", "La categoría ha sido actualizada.", "success");
      } else {
        // Crear nueva categoría
        const newCategory = await createCategory(data);
        setCategories((prev) => [...prev, newCategory]);
        Swal.fire("¡Creado!", "La categoría ha sido creada exitosamente.", "success");
      }
      handleClose();
    } catch (error) {
      console.error("Error al guardar la categoría:", error);
      Swal.fire("Error", "No se pudo guardar la categoría.", "error");
    }
  };

  const handleDeleteCategory = async (id: string) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCategory(id);
          setCategories((prev) => prev.filter((category) => category._id !== id));
          Swal.fire("¡Eliminado!", "La categoría ha sido eliminada.", "success");
        } catch (error) {
          console.error("Error al eliminar la categoría:", error);
          Swal.fire("Error", "No se pudo eliminar la categoría.", "error");
        }
      }
    });
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
              <TableCell sx={{ color: "#fff", textAlign: "center" }}>N°</TableCell>
              <TableCell sx={{ color: "#fff", textAlign: "center" }}>Nombre</TableCell>
              <TableCell sx={{ color: "#fff", textAlign: "center" }}>Descripción</TableCell>
              <TableCell sx={{ color: "#fff", textAlign: "center" }}>Estado</TableCell>
              <TableCell sx={{ color: "#fff", textAlign: "center" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category, index) => (
              <TableRow
                key={category._id}
                sx={{ "&:hover": { backgroundColor: "#2b2b2b" } }}
              >
                <TableCell sx={{ color: "#fff", textAlign: "center" }}>{index + 1}</TableCell>
                <TableCell sx={{ color: "#fff", textAlign: "center" }}>{category.name}</TableCell>
                <TableCell sx={{ color: "#fff", textAlign: "center" }}>{category.description}</TableCell>
                <TableCell sx={{ color: "#fff", textAlign: "center" }}>{category.state ? "Activo" : "Inactivo"}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Button
                    size="medium"
                    variant="text"
                    onClick={() => handleOpen(category)}
                    sx={{
                      color: "#25d162",
                      "&:hover": { color: "rgb(144,238,144)" },
                    }}
                  >
                    <EditIcon sx={{ fontSize: "28px" }} />
                  </Button>
                  <Button
                    size="medium"
                    variant="text"
                    onClick={() => handleDeleteCategory(category._id)}
                    sx={{
                      color: "#ff4d4d",
                      "&:hover": { color: "rgb(255,99,71)" },
                    }}
                  >
                    <DeleteIcon sx={{ fontSize: "28px" }} />
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
