import axios from "axios";
import { API_BASE_URL } from "../config/api";

// Define la interfaz para el producto
export interface ProductData {
  _id: string;
  name: string;
  brand: { _id: string; name: string } | string;
  category: { _id: string; name: string } | string;
  productModel: string;
  specifications: string;
  image?: string;
  state: boolean;
}

// Obtener todos los productos
export const fetchProducts = async (): Promise<ProductData[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  } catch (error: any) {
    console.error("Error al obtener los productos:", error.message);
    throw error;
  }
};

// Crear un nuevo producto
export const createProduct = async (productData: Omit<ProductData, "_id">): Promise<ProductData> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/products`, productData);
    return response.data;
  } catch (error: any) {
    console.error("Error al crear el producto:", error.message);
    throw error;
  }
};

// Actualizar un producto existente
export const updateProduct = async (id: string, productData: Partial<ProductData>): Promise<ProductData> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/products/${id}`, productData);
    return response.data;
  } catch (error: any) {
    console.error("Error al actualizar el producto:", error.message);
    throw error;
  }
};

// Eliminar un producto
export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/products/${id}`);
  } catch (error: any) {
    console.error("Error al eliminar el producto:", error.message);
    throw error;
  }
};
