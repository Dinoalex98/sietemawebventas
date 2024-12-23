import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import {
  ShoppingCart as SalesIcon,
  People as CustomersIcon,
  Inventory2 as InventoryIcon,
  MonetizationOn as RevenueIcon,
} from "@mui/icons-material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts";

// Datos de ejemplo para el gráfico de ventas
const salesData = [
  { month: "Ene", sales: 30 },
  { month: "Feb", sales: 50 },
  { month: "Mar", sales: 70 },
  { month: "Abr", sales: 40 },
  { month: "May", sales: 90 },
  { month: "Jun", sales: 60 },
  { month: "Jul", sales: 120 },
  { month: "Ago", sales: 80 },
  { month: "Sep", sales: 100 },
  { month: "Oct", sales: 110 },
  { month: "Nov", sales: 150 },
  { month: "Dic", sales: 200 },
];

// Datos de ejemplo para las métricas clave
const metrics = [
  {
    id: 1,
    title: "Ventas Totales",
    value: "1500",
    icon: <SalesIcon fontSize="large" />,
    gradient: "linear-gradient(135deg, #4caf50, #25d162)",
  },
  {
    id: 2,
    title: "Clientes Registrados",
    value: "230",
    icon: <CustomersIcon fontSize="large" />,
    gradient: "linear-gradient(135deg, #2196f3, #21cbf3)",
  },
  {
    id: 3,
    title: "Productos en Inventario",
    value: "120",
    icon: <InventoryIcon fontSize="large" />,
    gradient: "linear-gradient(135deg, #ff9800, #ffc107)",
  },
  {
    id: 4,
    title: "Ingresos Totales",
    value: "$50,000",
    icon: <RevenueIcon fontSize="large" />,
    gradient: "linear-gradient(135deg, #f44336, #ff5722)",
  },
];

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ padding: 3, backgroundColor: "#121212", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ color: "#fff", textAlign: "center", marginBottom: 3 }}>
        Dashboard - Sistema de Ventas
      </Typography>

      {/* Métricas clave */}
      <Grid container spacing={3} justifyContent="center" sx={{ marginBottom: 3 }}>
        {metrics.map((metric) => (
          <Grid item xs={12} sm={6} md={3} key={metric.id}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 2,
                color: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                background: metric.gradient,
                height: "100px",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                {metric.icon}
                <Box>
                  <Typography variant="h6" sx={{ fontSize: "16px" }}>
                    {metric.title}
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: "bold", fontSize: "24px" }}>
                    {metric.value}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Gráfico de ventas */}
      <Card
        sx={{
          backgroundColor: "#1e1e1e",
          color: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          padding: 3,
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Ventas Mensuales
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="month" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#25d162" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </Box>
  );
};

export default Dashboard;
