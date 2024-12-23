import React, { useState, useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";

interface CategoryFormProps {
  onSubmit: (data: { name: string; description: string }) => void;
  initialData?: { name: string; description: string }; // Datos iniciales para editar
}

const CategoryForm: React.FC<CategoryFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData); // Establece los datos iniciales si se pasan
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData); // Envía los datos al componente padre
    setFormData({ name: "", description: "" }); // Limpia el formulario después de la creación
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Nombre de la Categoría"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        variant="outlined"
      />
      <TextField
        label="Descripción"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        variant="outlined"
      />
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

export default CategoryForm;
