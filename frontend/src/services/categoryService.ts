import axios from "axios";
import { API_BASE_URL } from "../config/api";

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categorias`);
    return response.data; // Devuelve la lista de categorías
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    throw error;
  }
};

export const createCategory = async (categoryData: { name: string; description: string }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/categorias`, categoryData);
    return response.data; // Devuelve la categoría creada
  } catch (error: any) {
    console.error("Error al crear la categoría:", error.message);
    throw error;
  }
};

// Actualizar una categoría existente
export const updateCategory = async (id: string, categoryData: { name: string; description: string }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/categorias/${id}`, categoryData);
      return response.data;
    } catch (error: any) {
      console.error("Error al actualizar la categoría:", error.message);
      throw error;
    }
  };
  
  // Eliminar una categoría
  export const deleteCategory = async (id: string) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/categorias/${id}`);
      return response.data;
    } catch (error: any) {
      console.error("Error al eliminar la categoría:", error.message);
      throw error;
    }
  };