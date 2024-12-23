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
import SupplierForm from "./supliersForm";
import { fetchSuppliers, createSupplier, updateSupplier, deleteSupplier } from "../../services/suplierService";

interface Supplier {
  _id: string;
  company: string;
  nit: string;
  phone: string;
  address: string;
  email: string;
  state: boolean;
}

const SupplierList: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [open, setOpen] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState<Supplier | null>(null);

  // Cargar la lista de proveedores desde el backend
  useEffect(() => {
    const loadSuppliers = async () => {
      try {
        const data = await fetchSuppliers();
        setSuppliers(data);
      } catch (error) {
        console.error("Error al cargar los proveedores:", error);
      }
    };
    loadSuppliers();
  }, []);

  const handleOpen = (supplier?: Supplier) => {
    setCurrentSupplier(supplier || null);
    setOpen(true);
  };

  const handleClose = () => {
    setCurrentSupplier(null);
    setOpen(false);
  };

  const handleSaveSupplier = async (data: {
    company: string;
    nit: string;
    phone: string;
    address: string;
    email: string;
  }) => {
    try {
      if (currentSupplier) {
        // Actualizar proveedor existente
        const updatedSupplier = await updateSupplier(currentSupplier._id, data);
        setSuppliers((prev) =>
          prev.map((supplier) =>
            supplier._id === updatedSupplier._id ? updatedSupplier : supplier
          )
        );
      } else {
        // Crear nuevo proveedor
        const newSupplier = await createSupplier(data);
        setSuppliers((prev) => [...prev, newSupplier]);
      }
      handleClose();
    } catch (error) {
      console.error("Error al guardar el proveedor:", error);
    }
  };

  const handleDeleteSupplier = async (id: string) => {
    try {
      await deleteSupplier(id);
      setSuppliers((prev) => prev.filter((supplier) => supplier._id !== id));
    } catch (error) {
      console.error("Error al eliminar el proveedor:", error);
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
          Lista de Proveedores
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
          Nuevo Proveedor
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "#1e1e1e", borderRadius: "12px" }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#333333" }}>
              <TableCell sx={{ color: "#fff" }}>Empresa</TableCell>
              <TableCell sx={{ color: "#fff" }}>NIT</TableCell>
              <TableCell sx={{ color: "#fff" }}>Teléfono</TableCell>
              <TableCell sx={{ color: "#fff" }}>Dirección</TableCell>
              <TableCell sx={{ color: "#fff" }}>Correo</TableCell>
              <TableCell sx={{ color: "#fff" }}>Estado</TableCell>
              <TableCell sx={{ color: "#fff" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers.map((supplier) => (
              <TableRow
                key={supplier._id}
                sx={{ "&:hover": { backgroundColor: "#2b2b2b" } }}
              >
                <TableCell sx={{ color: "#fff" }}>{supplier.company}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{supplier.nit}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{supplier.phone}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{supplier.address}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{supplier.email}</TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  {supplier.state ? "Activo" : "Inactivo"}
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="text"
                    startIcon={<EditIcon />}
                    onClick={() => handleOpen(supplier)}
                    sx={{ color: "#25d162" }}
                  >
                    Editar
                  </Button>
                  <Button
                    size="small"
                    variant="text"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteSupplier(supplier._id)}
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
        <DialogTitle>
          {currentSupplier ? "Editar Proveedor" : "Nuevo Proveedor"}
        </DialogTitle>
        <DialogContent>
          <SupplierForm
            onSubmit={handleSaveSupplier}
            initialData={
              currentSupplier
                ? {
                    company: currentSupplier.company,
                    nit: currentSupplier.nit,
                    phone: currentSupplier.phone,
                    address: currentSupplier.address,
                    email: currentSupplier.email,
                  }
                : undefined
            }
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default SupplierList;
