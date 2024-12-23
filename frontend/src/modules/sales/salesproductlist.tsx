import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const SalesProductList: React.FC = () => {
  const navigate = useNavigate();

  // Datos de ejemplo de productos
  const products = [
    {
      id: 1,
      name: "Laptop HP",
      description: "Laptop HP 15.6\" Core i5",
      price: 1200,
      stock: 10,
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 2,
      name: "Mouse Gamer",
      description: "Mouse Gaming RGB 12000DPI",
      price: 25,
      stock: 50,
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 3,
      name: "Teclado Mecánico",
      description: "Teclado Mecánico RGB Switch Blue",
      price: 45,
      stock: 30,
      image: "https://via.placeholder.com/300x200",
    },
  ];

  // Función para navegar al formulario de venta con los datos del producto
  const handleSell = (productId: number) => {
    navigate(`/sales/form/${productId}`);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" sx={{ color: "#fff", marginBottom: 3 }}>
        Seleccione un Producto para Vender
      </Typography>

      {/* Galería de productos */}
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card
              sx={{
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.02)" },
              }}
            >
              {/* Imagen del producto */}
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                sx={{
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "12px 12px 0 0",
                }}
              />

              {/* Contenido */}
              <CardContent sx={{ padding: "16px" }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: "bold", marginBottom: 1 }}
                >
                  {product.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginBottom: 2 }}
                >
                  {product.description}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", color: "#25d162" }}
                >
                  ${product.price}
                </Typography>
              </CardContent>

              {/* Footer */}
              <Divider />
              <Box
                sx={{
                  padding: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontWeight: "bold" }}
                >
                  Stock: {product.stock}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => handleSell(product.id)}
                  sx={{
                    backgroundColor: "#25d162",
                    "&:hover": { backgroundColor: "#20ba56" },
                  }}
                >
                  Vender
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SalesProductList;
