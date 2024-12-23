import axios from "axios";
import { API_BASE_URL } from "../config/api";

export const fetchBrands = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/brands`);
    return response.data; // Devuelve la lista de marcas
  } catch (error) {
    console.error("Error al obtener las marcas:", error);
    throw error;
  }
};

export const createBrand = async (brandData: { name: string; description: string }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/brands`, brandData);
    return response.data; // Devuelve la marca creada
  } catch (error: any) {
    console.error("Error al crear la marca:", error.message);
    throw error;
  }
};
// Actualizar una marca existente
export const updateBrand = async (id: string, brandData: { name: string; description: string }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/brands/${id}`, brandData);
      return response.data; // Devuelve la marca actualizada
    } catch (error: any) {
      console.error("Error al actualizar la marca:", error.message);
      throw error;
    }
  };
  
  // Eliminar una marca existente
  export const deleteBrand = async (id: string) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/brands/${id}`);
      return response.data; // Devuelve una respuesta de éxito
    } catch (error: any) {
      console.error("Error al eliminar la marca:", error.message);
      throw error;
    }
  };