export const API_BASE_URL = "http://localhost:5000/api";
import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:5000/api", // Cambia esta URL si tu backend tiene otra dirección
  timeout: 10000, // Tiempo de espera máximo (10 segundos)
  headers: {
    "Content-Type": "application/json", // Asegura que el contenido sea JSON
    Accept: "application/json", // Acepta respuestas en formato JSON
  },
});

// Interceptores de solicitud
API.interceptors.request.use(
  (config) => {
    // Puedes agregar lógica para incluir tokens de autenticación si es necesario
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Manejo de errores antes de enviar la solicitud
    return Promise.reject(error);
  }
);

// Interceptores de respuesta
API.interceptors.response.use(
  (response) => {
    // Lógica para procesar respuestas exitosas
    return response;
  },
  (error) => {
    // Manejo de errores en las respuestas
    if (error.response) {
      // Errores con respuestas del servidor
      console.error("Error en la respuesta del servidor:", error.response.data);
    } else if (error.request) {
      // Errores de red o sin respuesta del servidor
      console.error("Error en la solicitud de red:", error.request);
    } else {
      // Otros errores
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);
