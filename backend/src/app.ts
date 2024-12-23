import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Importar las rutas
import productoRoutes from "./routes/productRoutes";
import marcaRoutes from "./routes/brandRoutes";
import categoriaRoutes from "./routes/categoryRoutes";
import proveedorRoutes from "./routes/supplierRoutes";

// Cargar variables de entorno
dotenv.config();

const app = express();

// Middleware para JSON
app.use(express.json());

// Configuración de CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Reemplaza con la URL de tu frontend si es diferente
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Headers permitidos
  })
);

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch((err) => console.error("Error al conectar con MongoDB:", err));

// Configuración de rutas
app.use("/api/products", productoRoutes); // Ruta para productos
app.use("/api/brands", marcaRoutes); // Ruta para marcas
app.use("/api/categorias", categoriaRoutes); // Ruta para categorías
app.use("/api/proveedores", proveedorRoutes); // Ruta para proveedores

// Ruta base
app.get("/", (req, res) => {
  res.send("API funcionando correctamente");
});

export default app; // Exportar la aplicación
