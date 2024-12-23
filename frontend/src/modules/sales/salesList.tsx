import React from "react";
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
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const SalesList: React.FC = () => {
  const navigate = useNavigate();

  // Datos de ejemplo de ventas
  const sales = [
    {
      id: 1,
      date: "2023-07-10 11:33",
      code: "Venta-0002",
      client: "Jesús Barrientos",
      product: "Laptop HP",
      amount: 200,
    },
    {
      id: 2,
      date: "2023-07-10 17:30",
      code: "Venta-0001",
      client: "Raúl Briss",
      product: "Teclado Mecánico",
      amount: 5000,
    },
  ];

  // Función para redirigir a la lista de productos
  const handleNewSale = () => {
    navigate("/sales/products"); // Ruta de SalesProductList
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* Botón "Nueva Venta" */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 3,
        }}
      >
        <Typography variant="h5" sx={{ color: "#fff" }}>
          Ventas
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleNewSale} // Redirige a la ruta de productos
          sx={{
            backgroundColor: "#25d162",
            "&:hover": { backgroundColor: "#20ba56" },
          }}
        >
          Nueva Venta
        </Button>
      </Box>

      {/* Tabla de ventas */}
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "#1e1e1e", borderRadius: "12px" }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#333333" }}>
              <TableCell sx={{ color: "#fff" }}>#</TableCell>
              <TableCell sx={{ color: "#fff" }}>Fecha Creación</TableCell>
              <TableCell sx={{ color: "#fff" }}>Código</TableCell>
              <TableCell sx={{ color: "#fff" }}>Cliente</TableCell>
              <TableCell sx={{ color: "#fff" }}>Producto</TableCell>
              <TableCell sx={{ color: "#fff" }}>Monto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales.map((sale) => (
              <TableRow
                key={sale.id}
                sx={{
                  "&:hover": { backgroundColor: "#2b2b2b" },
                }}
              >
                <TableCell sx={{ color: "#fff" }}>{sale.id}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{sale.date}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{sale.code}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{sale.client}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{sale.product}</TableCell>
                <TableCell sx={{ color: "#fff" }}>${sale.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SalesList;
