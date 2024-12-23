import React from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

const ConfigurationForm: React.FC = () => {
  return (
    <Box sx={{ padding: 3, backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
      <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: "bold" }}>
        Configuración
      </Typography>

      <Card
        sx={{
          marginBottom: 4,
          padding: 3,
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent>
          <Grid container spacing={3}>
            {/* Logo */}
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Logo
              </Typography>
              <TextField
                fullWidth
                placeholder="/images/logo.jpg"
                variant="outlined"
                sx={{
                  marginTop: 1,
                }}
              />
            </Grid>

            {/* Nombre de la empresa */}
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Nombre de la empresa
              </Typography>
              <TextField fullWidth placeholder="Nombre de la empresa" variant="outlined" />
            </Grid>

            {/* NIT */}
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                NIT
              </Typography>
              <TextField fullWidth placeholder="NIT" variant="outlined" />
            </Grid>

            {/* Correo Electrónico */}
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Correo electrónico
              </Typography>
              <TextField
                fullWidth
                placeholder="Correo electrónico"
                variant="outlined"
              />
            </Grid>

            {/* Teléfono */}
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Teléfono
              </Typography>
              <TextField fullWidth placeholder="Teléfono" variant="outlined" />
            </Grid>

            {/* Dirección */}
            <Grid item xs={12} md={8}>
              <Typography variant="subtitle1" fontWeight="bold">
                Dirección
              </Typography>
              <TextField
                fullWidth
                placeholder="Dirección"
                variant="outlined"
                multiline
                rows={2}
              />
            </Grid>

            {/* Sitio Web */}
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                Sitio Web
              </Typography>
              <TextField fullWidth placeholder="URL del sitio web" variant="outlined" />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* Botón de guardar */}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
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

export default ConfigurationForm;
