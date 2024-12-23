import React from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

const SalesForm: React.FC = () => {
  const { id } = useParams(); // Obtener el ID del producto desde la URL
  const navigate = useNavigate();

  const handleSubmit = () => {
    alert("Venta registrada correctamente");
    navigate("/sales"); // Regresar a la lista de ventas después de registrar
  };

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: "#ffffff", // Fondo blanco
        borderRadius: "12px",
        maxWidth: "600px",
        margin: "0 auto",
        color: "#000", // Texto negro
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Sombra suave
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 3, fontWeight: "bold" }}>
        Registrar Venta para el Producto #{id}
      </Typography>
      <TextField
        fullWidth
        label="Cliente"
        type="text"
        sx={{ marginBottom: 2 }}
        InputLabelProps={{
          style: { color: "#000" }, // Color del texto del label
        }}
      />
      <TextField
        fullWidth
        label="Cantidad"
        type="number"
        sx={{ marginBottom: 2 }}
        InputProps={{ inputProps: { min: 1 } }}
        InputLabelProps={{
          style: { color: "#000" },
        }}
      />
      <TextField
        fullWidth
        label="Precio Unitario"
        type="number"
        sx={{ marginBottom: 2 }}
        InputProps={{ inputProps: { min: 1 } }}
        InputLabelProps={{
          style: { color: "#000" },
        }}
      />
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel style={{ color: "#000" }}>Método de Pago</InputLabel>
        <Select defaultValue="Efectivo">
          <MenuItem value="Efectivo">Efectivo</MenuItem>
          <MenuItem value="Tarjeta">Tarjeta</MenuItem>
          <MenuItem value="Transferencia">Transferencia</MenuItem>
        </Select>
      </FormControl>
      <Box display="flex" justifyContent="space-between">
        <Button
          variant="contained"
          color="error"
          onClick={() => navigate(-1)}
          sx={{
            backgroundColor: "#ff4d4d",
            "&:hover": { backgroundColor: "#e63939" },
          }}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#25d162",
            "&:hover": { backgroundColor: "#20ba56" },
          }}
        >
          Registrar Venta
        </Button>
      </Box>
    </Box>
  );
};

export default SalesForm;