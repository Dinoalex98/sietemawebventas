import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Badge,
  Divider,
} from "@mui/material";
import { Add as AddIcon, Inventory2 as StockIcon } from "@mui/icons-material";

const InventoryGallery: React.FC = () => {
  const products = [
    {
      id: 1,
      name: "Laptop HP",
      description: 'Laptop HP 15.6" Core i5',
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
    {
      id: 4,
      name: "Monitor Dell",
      description: 'Monitor Dell 24" Full HD',
      price: 180,
      stock: 15,
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 5,
      name: "Audífonos Sony",
      description: "Audífonos Sony WH-1000XM4",
      price: 300,
      stock: 20,
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 6,
      name: "Impresora Canon",
      description: "Impresora Canon PIXMA G6020",
      price: 250,
      stock: 8,
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 7,
      name: "Tarjeta Gráfica",
      description: "NVIDIA RTX 3060 Ti",
      price: 400,
      stock: 12,
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 8,
      name: "Disco Duro Externo",
      description: "Seagate 2TB USB 3.0",
      price: 80,
      stock: 40,
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 9,
      name: "Cargador Universal",
      description: "Cargador Universal 65W",
      price: 30,
      stock: 25,
      image: "https://via.placeholder.com/300x200",
    },
  ];

  return (
    <Box
      sx={{
        padding: 3,
        margin: 0, // Elimina cualquier margen adicional
        backgroundColor: "#121212", // Asegúrate de que el color de fondo coincida
      }}
    >
      {/* Botón "Nueva Entrada" */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 3,
        }}
      >
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: "#25d162",
            "&:hover": { backgroundColor: "#20ba56" },
          }}
        >
          Nueva Entrada
        </Button>
      </Box>

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
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold" }}
                  >
                    {product.name}
                  </Typography>
                  <Badge
                    badgeContent={`Stock: ${product.stock}`}
                    color={product.stock > 20 ? "success" : "error"}
                    sx={{
                      "& .MuiBadge-badge": {
                        fontSize: "0.75rem",
                        height: "auto",
                        padding: "4px 8px",
                      },
                    }}
                  >
                    <StockIcon sx={{ fontSize: "1rem" }} />
                  </Badge>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginTop: 1 }}
                >
                  {product.description}
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
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#25d162" }}
                >
                  ${product.price}
                </Typography>
                <Badge
                  color={product.stock > 20 ? "success" : "error"}
                  sx={{
                    "& .MuiBadge-badge": {
                      fontSize: "0.75rem",
                      height: "auto",
                      padding: "4px 8px",
                      backgroundColor:
                        product.stock > 20 ? "#25d162" : "#ff4d4d",
                      color: "#fff",
                    },
                  }}
                >
                  {product.stock > 20 ? "Disponible" : "Stock Bajo"}
                </Badge>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default InventoryGallery;

