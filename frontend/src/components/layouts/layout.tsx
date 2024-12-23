import React, { useState } from "react";
import Sidebar from "../common/Sidebar"; 
import Header from "../common/Header"; 
import { Box } from "@mui/material";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true); // Estado para controlar el Sidebar
  const sidebarWidth = isOpen ? 240 : 60; // Ajusta el ancho del Sidebar
  const headerHeight = 64; // Altura fija del Header

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#121212",
        margin: 0, // Asegúrate de remover márgenes
      }}
    >
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Contenedor principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: `${sidebarWidth}px`,
          paddingTop: `${headerHeight}px`,
          transition: "margin-left 0.3s ease", // Transición suave al colapsar el Sidebar
        }}
      >
        {/* Header */}
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: `${isOpen ? sidebarWidth : 60}px`,
            right: 0,
            zIndex: 1000,
            backgroundColor: "#1d1d1d",
            height: `${headerHeight}px`,
            display: "flex",
            alignItems: "center",
            boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          <Header />
        </Box>

        {/* Contenido */}
        <Box sx={{ padding: 3, marginTop: `${headerHeight}px` }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;
