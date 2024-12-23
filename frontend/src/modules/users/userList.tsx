import React, { useState } from "react";
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
  DialogActions,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import UserForm from "./userForm"; // Importa el formulario de usuarios

const UserList: React.FC = () => {
  const [open, setOpen] = useState(false); // Estado para abrir/cerrar el UserForm
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Juan",
      lastName1: "Pérez",
      lastName2: "González",
      ci: "12345678",
      phone: "78965432",
      referencePhone: "71234567",
      address: "Calle Falsa 123",
      email: "juan@example.com",
      role: "Administrador",
      status: "Activo",
    },
  ]);

  // Manejar la apertura/cierre del UserForm
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Función para agregar un nuevo usuario desde el formulario
  const handleAddUser = (newUser: any) => {
    const newId = users.length + 1;
    setUsers((prev) => [...prev, { id: newId, ...newUser }]);
    handleClose();
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* Botón "Nuevo Usuario" */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 3,
        }}
      >
        <Typography variant="h5" sx={{ color: "#fff" }}>
          Lista de Usuarios
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          sx={{
            backgroundColor: "#25d162",
            "&:hover": { backgroundColor: "#20ba56" },
          }}
        >
          Nuevo Usuario
        </Button>
      </Box>

      {/* Tabla de usuarios */}
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "#1e1e1e", borderRadius: "12px" }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#333333" }}>
              <TableCell sx={{ color: "#fff" }}>#</TableCell>
              <TableCell sx={{ color: "#fff" }}>Nombre</TableCell>
              <TableCell sx={{ color: "#fff" }}>C.I.</TableCell>
              <TableCell sx={{ color: "#fff" }}>Teléfono</TableCell>
              <TableCell sx={{ color: "#fff" }}>Correo Electrónico</TableCell>
              <TableCell sx={{ color: "#fff" }}>Rol</TableCell>
              <TableCell sx={{ color: "#fff" }}>Estado</TableCell>
              <TableCell sx={{ color: "#fff" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{
                  "&:hover": { backgroundColor: "#2b2b2b" },
                }}
              >
                <TableCell sx={{ color: "#fff" }}>{user.id}</TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  {`${user.name} ${user.lastName1} ${user.lastName2}`}
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>{user.ci}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{user.phone}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{user.email}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{user.role}</TableCell>
                <TableCell sx={{ color: "#fff" }}>{user.status}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="text"
                    sx={{ color: "#25d162" }}
                  >
                    Editar
                  </Button>
                  <Button
                    size="small"
                    variant="text"
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

      {/* Formulario de Nuevo Usuario */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Nuevo Usuario</DialogTitle>
        <DialogContent>
          <UserForm onSubmit={handleAddUser} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "#ff4d4d" }}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserList;