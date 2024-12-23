import axios from "axios";
import { API_BASE_URL } from "../config/api";

interface SupplierData {
  company: string;
  nit: string;
  phone: string;
  address: string;
  email: string;
}

// Obtener todos los proveedores
export const fetchSuppliers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/proveedores`);
    return response.data; // Devuelve la lista de proveedores
  } catch (error: any) {
    console.error("Error al obtener los proveedores:", error.message);
    throw error;
  }
};

// Crear un nuevo proveedor
export const createSupplier = async (supplierData: SupplierData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/proveedores`, supplierData);
    return response.data; // Devuelve el proveedor creado
  } catch (error: any) {
    console.error("Error al crear el proveedor:", error.message);
    throw error;
  }
};

// Actualizar un proveedor existente
export const updateSupplier = async (id: string, supplierData: SupplierData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/proveedores/${id}`, supplierData);
    return response.data; // Devuelve el proveedor actualizado
  } catch (error: any) {
    console.error("Error al actualizar el proveedor:", error.message);
    throw error;
  }
};

// Eliminar un proveedor
export const deleteSupplier = async (id: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/proveedores/${id}`);
    return response.data; // Devuelve una confirmación de eliminación
  } catch (error: any) {
    console.error("Error al eliminar el proveedor:", error.message);
    throw error;
  }
};
