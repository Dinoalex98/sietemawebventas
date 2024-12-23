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
import BrandForm from "./brandForm";
import { fetchBrands, createBrand, updateBrand, deleteBrand } from "../../services/brandService";

interface Brand {
  _id: string;
  name: string;
  description: string;
  state: boolean;
}

const BrandList: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [open, setOpen] = useState(false);
  const [currentBrand, setCurrentBrand] = useState<Brand | null>(null);

  useEffect(() => {
    const loadBrands = async () => {
      try {
        const data = await fetchBrands();
        setBrands(data);
      } catch (error) {
        console.error("Error al cargar las marcas:", error);
      }
    };
    loadBrands();
  }, []);

  const handleOpen = (brand?: Brand) => {
    setCurrentBrand(brand || null);
    setOpen(true);
  };

  const handleClose = () => {
    setCurrentBrand(null);
    setOpen(false);
  };

  const handleSaveBrand = async (data: { name: string; description: string }) => {
    try {
      if (currentBrand) {
        // Actualizar marca existente
        const updatedBrand = await updateBrand(currentBrand._id, data);
        setBrands((prev) =>
          prev.map((brand) => (brand._id === updatedBrand._id ? updatedBrand : brand))
        );
      } else {
        // Crear nueva marca
        const newBrand = await createBrand(data);
        setBrands((prev) => [...prev, newBrand]);
      }
      handleClose();
    } catch (error) {
      console.error("Error al guardar la marca:", error);
    }
  };

  const handleDeleteBrand = async (id: string) => {
    try {
      await deleteBrand(id);
      setBrands((prev) => prev.filter((brand) => brand._id !== id));
    } catch (error) {
      console.error("Error al eliminar la marca:", error);
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
          Lista de Marcas
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
          Nueva Marca
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
            {brands.map((brand) => (
              <TableRow key={brand._id} sx={{ "&:hover": { backgroundColor: "#2b2b2b" } }}>
                <TableCell sx={{ color: "#fff" }}>{brand.name}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{brand.description}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{brand.state ? "Activo" : "Inactivo"}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="text"
                    startIcon={<EditIcon />}
                    onClick={() => handleOpen(brand)}
                    sx={{ color: "#25d162" }}
                  >
                    Editar
                  </Button>
                  <Button
                    size="small"
                    variant="text"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteBrand(brand._id)}
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
        <DialogTitle>{currentBrand ? "Editar Marca" : "Nueva Marca"}</DialogTitle>
        <DialogContent>
          <BrandForm
            onSubmit={handleSaveBrand}
            initialData={currentBrand ? { name: currentBrand.name, description: currentBrand.description } : undefined}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default BrandList;

