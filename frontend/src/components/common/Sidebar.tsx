import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Box,
  useMediaQuery,
  Drawer,
  Collapse,
} from "@mui/material";
import {
  Menu as MenuIcon,
  X as CloseIcon,
  Home as HomeIcon,
  Box as InventoryIcon,
  Truck as SuppliersIcon,
  ShoppingCart as SalesIcon,
  Users as UsersIcon,
  BarChart as ReportsIcon,
  Settings as SettingsIcon,
  LogOut as LogOutIcon,
  Package as ProductsIcon,
  User as CustomersIcon,
  ChevronRight as ChevronRightIcon,
  ChevronDown as ChevronDownIcon,
  Tag as CategoryIcon,
  Layers as BrandIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)"); // Detecta si es pantalla móvil
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false); // Estado para submenú de productos

  const menuItems = [
    { name: "Dashboard", path: "/", icon: <HomeIcon /> },
    {
      name: "Productos",
      icon: <ProductsIcon />,
      subItems: [
        { name: "Nuevo Producto", path: "/products" },
        { name: "Categorías", path: "/categories", icon: <CategoryIcon /> },
        { name: "Marcas", path: "/brands", icon: <BrandIcon /> },
      ],
    },
    { name: "Inventarios", path: "/inventory", icon: <InventoryIcon /> },
    { name: "Clientes", path: "/customers", icon: <CustomersIcon /> },
    { name: "Proveedores", path: "/suppliers", icon: <SuppliersIcon /> },
    { name: "Ventas", path: "/sales", icon: <SalesIcon /> },
    { name: "Usuarios", path: "/users", icon: <UsersIcon /> },
    { name: "Reportes", path: "/reports", icon: <ReportsIcon /> },
    { name: "Configuración", path: "/settings", icon: <SettingsIcon /> },
    { name: "Cerrar Sesión", path: "/logout", icon: <LogOutIcon /> },
  ];

  const handleListItemClick = (path: string) => {
    navigate(path);
    if (isMobile) setMobileOpen(false); // Cierra el Drawer en móvil
  };

  const renderSidebarContent = () => (
    <>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: isOpen ? "space-between" : "center",
          px: 2,
          borderBottom: "1px solid #2b2b2b",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent={isOpen ? "flex-start" : "center"}
          flexGrow={1}
          overflow="hidden"
        >
          <motion.img
            src="../../../src/assets/logo.svg"
            alt="Logo"
            className="w-10 h-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{ marginLeft: 8 }}
            >
              <Typography variant="h6" noWrap>
                Dino Computer
              </Typography>
            </motion.div>
          )}
        </Box>
        <IconButton
          onClick={() => (isMobile ? setMobileOpen(false) : setIsOpen(!isOpen))}
          sx={{ color: "#ffffff" }}
        >
          {isOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
        </IconButton>
      </Toolbar>

      <List>
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            {item.subItems ? (
              <>
                <ListItem disablePadding sx={{ mb: 1 }}>
                  <ListItemButton
                    onClick={() => setProductsOpen(!productsOpen)}
                    sx={{
                      justifyContent: isOpen ? "flex-start" : "center",
                      px: isOpen ? 2 : 0,
                      transition: "all 0.3s ease",
                      borderRadius: "8px",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: "#ffffff",
                        justifyContent: "center",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ color: "#ffffff" }}
                      >
                        <ListItemText primary={item.name} />
                      </motion.div>
                    )}
                    {isOpen && (
                      <IconButton
                        size="small"
                        sx={{ color: "#ffffff", marginLeft: "auto" }}
                      >
                        {productsOpen ? (
                          <ChevronDownIcon size={16} />
                        ) : (
                          <ChevronRightIcon size={16} />
                        )}
                      </IconButton>
                    )}
                  </ListItemButton>
                </ListItem>
                <Collapse in={productsOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subItems.map((subItem, subIndex) => (
                      <ListItem disablePadding key={subIndex} sx={{ pl: 4 }}>
                        <ListItemButton
                          onClick={() => handleListItemClick(subItem.path!)}
                          sx={{
                            justifyContent: "flex-start",
                            px: 2,
                            transition: "all 0.3s ease",
                            borderRadius: "8px",
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              color: "#ffffff",
                              justifyContent: "center",
                            }}
                          >
                            {subItem.icon || <ChevronRightIcon size={16} />}
                          </ListItemIcon>
                          <ListItemText primary={subItem.name} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : (
              <Tooltip
                title={!isOpen ? item.name : ""}
                placement="right"
                arrow
                key={index}
              >
                <ListItem disablePadding sx={{ mb: 1 }}>
                  <ListItemButton
                    onClick={() => handleListItemClick(item.path!)}
                    sx={{
                      justifyContent: isOpen ? "flex-start" : "center",
                      px: isOpen ? 2 : 0,
                      transition: "all 0.3s ease",
                      borderRadius: "8px",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: "#ffffff",
                        justifyContent: "center",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ color: "#ffffff" }}
                      >
                        <ListItemText primary={item.name} />
                      </motion.div>
                    )}
                  </ListItemButton>
                </ListItem>
              </Tooltip>
            )}
          </React.Fragment>
        ))}
      </List>
    </>
  );

  return (
    <>
      {isMobile ? (
        <Drawer
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: 240,
              backgroundColor: "#1d1d1d",
              color: "#ffffff",
            },
          }}
        >
          {renderSidebarContent()}
        </Drawer>
      ) : (
        <motion.div
          initial={{ width: isOpen ? 240 : 60 }}
          animate={{ width: isOpen ? 240 : 60 }}
          transition={{ duration: 0.3 }}
          className="bg-dark text-white h-screen flex flex-col"
          style={{
            position: "fixed",
            overflow: "hidden",
            borderRight: "1px solid #4f4f4f",
          }}
        >
          {renderSidebarContent()}
        </motion.div>
      )}
    </>
  );
};

export default Sidebar;
