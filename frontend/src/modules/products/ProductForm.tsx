import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { fetchBrands } from "../../services/brandService";
import { fetchCategories } from "../../services/categoryService";

interface ProductFormProps {
  onSubmit: (data: {
    name: string;
    brand: string;
    category: string;
    productModel: string;
    specifications: string;
    image?: string;
    state: boolean;
  }) => void;
  initialData?: {
    name: string;
    brand: string;
    category: string;
    productModel: string;
    specifications: string;
    image?: string;
    state: boolean;
  };
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    brand: initialData?.brand || "",
    category: initialData?.category || "",
    productModel: initialData?.productModel || "",
    specifications: initialData?.specifications || "",
    image: initialData?.image || "",
    state: initialData?.state ?? true,
  });

  const [brands, setBrands] = useState<{ _id: string; name: string }[]>([]);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);

  // Cargar marcas y categorías al montar el componente
  useEffect(() => {
    const loadBrandsAndCategories = async () => {
      try {
        const loadedBrands = await fetchBrands();
        const loadedCategories = await fetchCategories();
        setBrands(loadedBrands);
        setCategories(loadedCategories);
      } catch (error) {
        console.error("Error al cargar marcas y categorías:", error);
      }
    };

    loadBrandsAndCategories();
  }, []);

  // Manejar cambios en los campos del formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Manejar el cambio de los select
  const handleSelectChange = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value as string }));
    }
  };

  // Manejar el cambio del interruptor de estado
  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, state: e.target.checked }));
  };

  // Manejar envío del formulario
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
        label="Nombre del Producto"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
      />
      <FormControl fullWidth required>
        <InputLabel id="brand-select-label">Marca</InputLabel>
        <Select
          labelId="brand-select-label"
          name="brand"
          value={formData.brand}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, brand: e.target.value as string }))
          }
        >
          {brands.map((brand) => (
            <MenuItem key={brand._id} value={brand._id}>
              {brand.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth required>
        <InputLabel id="category-select-label">Categoría</InputLabel>
        <Select
          labelId="category-select-label"
          name="category"
          value={formData.category}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, category: e.target.value as string }))
          }
        >
          {categories.map((category) => (
            <MenuItem key={category._id} value={category._id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Modelo"
        name="productModel"
        value={formData.productModel}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Especificaciones"
        name="specifications"
        value={formData.specifications}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="URL de Imagen"
        name="image"
        value={formData.image}
        onChange={handleChange}
        fullWidth
      />
      <FormControlLabel
        control={
          <Switch
            checked={formData.state}
            onChange={handleSwitchChange}
            name="state"
            color="primary"
          />
        }
        label="Activo"
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
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

export default ProductForm;
