import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

interface SupplierFormProps {
  onSubmit: (data: { company: string; nit: string; phone: string; address: string; email: string }) => void;
  initialData?: { company: string; nit: string; phone: string; address: string; email: string };
}

const SupplierForm: React.FC<SupplierFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    company: initialData?.company || "",
    nit: initialData?.nit || "",
    phone: initialData?.phone || "",
    address: initialData?.address || "",
    email: initialData?.email || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
    >
      <TextField
        name="company"
        value={formData.company}
        onChange={handleChange}
        label="Empresa"
        required
        fullWidth
      />
      <TextField
        name="nit"
        value={formData.nit}
        onChange={handleChange}
        label="NIT"
        required
        fullWidth
      />
      <TextField
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        label="Teléfono"
        required
        fullWidth
      />
      <TextField
        name="address"
        value={formData.address}
        onChange={handleChange}
        label="Dirección"
        required
        fullWidth
      />
      <TextField
        name="email"
        value={formData.email}
        onChange={handleChange}
        label="Correo"
        required
        fullWidth
      />
      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
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

export default SupplierForm;


