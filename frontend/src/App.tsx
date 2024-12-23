import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layouts/layout"; // Importa el Layout
import Products from "./modules/products/Productlist"; // Lista de Productos
import SupplierList from "./modules/supliers/supliersList"; // Ajusta la ruta si es necesario
import InventoryGallery from "./modules/Inventory/InventoryGallery"; // Galería de Inventario
import BrandList from "./modules/brands/brandList"; // Lista de Marcas
import CategoryList from "./modules/category/categoryList";
import UserList from "./modules/users/userList";
import ConfigurationForm from "./modules/settings/ConfigurationForm";
import SalesList from "./modules/sales/salesList";
import SalesProductList from "./modules/sales/salesproductlist"; // Nueva Lista de Productos para Ventas
import SalesForm from "./modules/sales/salesForm";
import Dashboard from "./features/dashboard/dashboard";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        {/* Contenido dinámico dentro del Layout */}
        <Routes>
        <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/inventory" element={<InventoryGallery />} />
          <Route path="/customers" element={<h1>Clientes</h1>} />
          <Route path="/suppliers" element={<SupplierList />} />
          <Route path="/brands" element={<BrandList />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/sales" element={<SalesList />} />
          <Route path="/sales/products" element={<SalesProductList />} />
          <Route path="/sales/form/:id" element={<SalesForm />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/reports" element={<h1>Reportes</h1>} />
          <Route path="/settings" element={<ConfigurationForm />} />
          <Route path="/logout" element={<h1>Cerrar Sesión</h1>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;