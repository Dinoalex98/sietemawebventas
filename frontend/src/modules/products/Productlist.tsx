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
import ProductForm from "./ProductForm"; // Asegúrate de tener este componente listo
import { fetchProducts, createProduct, updateProduct, deleteProduct, ProductData } from "../../services/productService";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ProductData | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
    };
    loadProducts();
  }, []);

  const handleOpen = (product?: ProductData) => {
    setCurrentProduct(product || null);
    setOpen(true);
  };

  const handleClose = () => {
    setCurrentProduct(null);
    setOpen(false);
  };

  const handleSaveProduct = async (data: Omit<ProductData, "_id">) => {
    try {
      if (currentProduct) {
        const updatedProduct = await updateProduct(currentProduct._id, data);
        setProducts((prev) =>
          prev.map((product) => (product._id === updatedProduct._id ? updatedProduct : product))
        );
      } else {
        const newProduct = await createProduct(data);
        setProducts((prev) => [...prev, newProduct]);
      }
      handleClose();
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
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
          Lista de Productos
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
          Nuevo Producto
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "#1e1e1e", borderRadius: "12px" }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#333333" }}>
              <TableCell sx={{ color: "#fff" }}>Imagen</TableCell>
              <TableCell sx={{ color: "#fff" }}>Nombre</TableCell>
              <TableCell sx={{ color: "#fff" }}>Marca</TableCell>
              <TableCell sx={{ color: "#fff" }}>Categoría</TableCell>
              <TableCell sx={{ color: "#fff" }}>Modelo</TableCell>
              <TableCell sx={{ color: "#fff" }}>Especificaciones</TableCell>
              <TableCell sx={{ color: "#fff" }}>Estado</TableCell>
              <TableCell sx={{ color: "#fff" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id} sx={{ "&:hover": { backgroundColor: "#2b2b2b" } }}>
                <TableCell>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px" }}
                  />
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>{product.name}</TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  {typeof product.brand === "object" ? product.brand.name : product.brand}
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  {typeof product.category === "object" ? product.category.name : product.category}
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>{product.productModel}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{product.specifications}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{product.state ? "Activo" : "Inactivo"}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="text"
                    startIcon={<EditIcon />}
                    onClick={() => handleOpen(product)}
                    sx={{ color: "#25d162" }}
                  >
                    Editar
                  </Button>
                  <Button
                    size="small"
                    variant="text"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteProduct(product._id)}
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
        <DialogTitle>{currentProduct ? "Editar Producto" : "Nuevo Producto"}</DialogTitle>
        <DialogContent>
          <ProductForm
            onSubmit={handleSaveProduct}
            initialData={
              currentProduct
                ? {
                    name: currentProduct.name,
                    brand: currentProduct.brand as string,
                    category: currentProduct.category as string,
                    productModel: currentProduct.productModel,
                    specifications: currentProduct.specifications,
                    image: currentProduct.image,
                    state: currentProduct.state,
                  }
                : undefined
            }
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ProductList;
