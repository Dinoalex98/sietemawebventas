import {
  Home as HomeIcon,
  Box as InventoryIcon,
  Truck as SuppliersIcon,
  ShoppingCart as SalesIcon,
  Users as UsersIcon,
  BarChart as ReportsIcon,
  Settings as SettingsIcon,
  LogOut as LogoutIcon,
} from "lucide-react";

export const sidebarConfig = [
  {
    title: "General", // Título de la sección
    items: [
      { name: "Dashboard", path: "/", icon: <HomeIcon /> },
    ],
  },
  {
    title: "Gestión de Productos", // Título de otra sección
    items: [
      { name: "Inventarios", path: "/inventory", icon: <InventoryIcon /> },
      { name: "Proveedores", path: "/suppliers", icon: <SuppliersIcon /> },
    ],
  },
  {
    title: "Ventas",
    items: [
      { name: "Ventas", path: "/sales", icon: <SalesIcon /> },
      { name: "Reportes", path: "/reports", icon: <ReportsIcon /> },
    ],
  },
  {
    title: "Administración",
    items: [
      { name: "Usuarios", path: "/users", icon: <UsersIcon /> },
      { name: "Configuración", path: "/settings", icon: <SettingsIcon /> },
    ],
  },
  {
    title: "Cerrar Sesión",
    items: [
      { name: "Cerrar Sesión", path: "/logout", icon: <LogoutIcon /> },
    ],
  },
];