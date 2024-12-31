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
import Swal from "sweetalert2";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import ProductForm from "./ProductForm";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  ProductData,
} from "../../services/productService";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ProductData | null>(null);

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error al cargar los productos:", error);
    }
  };

  useEffect(() => {
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
        await updateProduct(currentProduct._id, data);
        Swal.fire("¡Editado!", "El producto ha sido actualizado exitosamente.", "success");
      } else {
        await createProduct(data);
        Swal.fire("¡Guardado!", "El producto ha sido creado exitosamente.", "success");
      }
      handleClose();
      loadProducts(); // Recarga la lista de productos
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      Swal.fire("Error", "No se pudo guardar el producto.", "error");
    }
  };

  const handleDeleteProduct = async (id: string) => {
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
          await deleteProduct(id);
          Swal.fire("¡Eliminado!", "El producto ha sido eliminado.", "success");
          loadProducts(); // Recarga la lista de productos
        } catch (error) {
          console.error("Error al eliminar el producto:", error);
          Swal.fire("Error", "No se pudo eliminar el producto.", "error");
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
              <TableCell sx={{ color: "#fff", textAlign: "center" }}>N°</TableCell>
              <TableCell sx={{ color: "#fff", textAlign: "center" }}>Imagen</TableCell>
              <TableCell sx={{ color: "#fff", textAlign: "center" }}>Nombre</TableCell>
              <TableCell sx={{ color: "#fff", textAlign: "center" }}>Marca</TableCell>
              <TableCell sx={{ color: "#fff", textAlign: "center" }}>Categoría</TableCell>
              <TableCell sx={{ color: "#fff", textAlign: "center" }}>Modelo</TableCell>
              <TableCell sx={{ color: "#fff", textAlign: "center" }}>Especificaciones</TableCell>
              <TableCell sx={{ color: "#fff", textAlign: "center" }}>Estado</TableCell>
              <TableCell sx={{ color: "#fff", textAlign: "center" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow
                key={product._id}
                sx={{
                  "&:hover": { backgroundColor: "#2b2b2b" },
                  textAlign: "center",
                }}
              >
                <TableCell sx={{ textAlign: "center", color: "#fff" }}>
                  {index + 1}
                </TableCell>
                <TableCell>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </TableCell>
                <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                  {product.name}
                </TableCell>
                <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                  {typeof product.brand === "object"
                    ? product.brand.name
                    : product.brand}
                </TableCell>
                <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                  {typeof product.category === "object"
                    ? product.category.name
                    : product.category}
                </TableCell>
                <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                  {product.productModel}
                </TableCell>
                <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                  {product.specifications}
                </TableCell>
                <TableCell sx={{ color: "#fff", textAlign: "center" }}>
                  {product.state ? "Activo" : "Inactivo"}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Button
                    size="medium"
                    variant="text"
                    onClick={() => handleOpen(product)}
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
                    onClick={() => handleDeleteProduct(product._id)}
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

