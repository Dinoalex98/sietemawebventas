import React, { useState } from "react";
import { Box, TextField, Button, MenuItem } from "@mui/material";

interface UserFormProps {
  onSubmit: (data: any) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    lastName1: "",
    lastName2: "",
    ci: "",
    phone: "",
    referencePhone: "",
    address: "",
    email: "",
    role: "",
    status: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: "",
      lastName1: "",
      lastName2: "",
      ci: "",
      phone: "",
      referencePhone: "",
      address: "",
      email: "",
      role: "",
      status: "",
    }); // Reinicia el formulario
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Nombre"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        variant="outlined"
      />
      <TextField
        label="Primer Apellido"
        name="lastName1"
        value={formData.lastName1}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        variant="outlined"
      />
      <TextField
        label="Segundo Apellido"
        name="lastName2"
        value={formData.lastName2}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="C.I."
        name="ci"
        value={formData.ci}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        variant="outlined"
      />
      <TextField
        label="Teléfono"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        variant="outlined"
      />
      <TextField
        label="Teléfono de Referencia"
        name="referencePhone"
        value={formData.referencePhone}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Dirección Domicilio"
        name="address"
        value={formData.address}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Correo Electrónico"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        variant="outlined"
      />
      <TextField
        label="Rol"
        name="role"
        select
        value={formData.role}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        variant="outlined"
      >
        <MenuItem value="Administrador">Administrador</MenuItem>
        <MenuItem value="Usuario">Usuario</MenuItem>
      </TextField>
      <TextField
        label="Estado"
        name="status"
        select
        value={formData.status}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        variant="outlined"
      >
        <MenuItem value="Activo">Activo</MenuItem>
        <MenuItem value="Inactivo">Inactivo</MenuItem>
      </TextField>
      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#25d162",
            "&:hover": { backgroundColor: "#20ba56" },
          }}
        >
          Guardar
        </Button>
      </Box>
    </Box>
  );
};

export default UserForm;
