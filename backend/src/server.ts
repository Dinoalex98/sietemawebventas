import dotenv from "dotenv";
import app from "./app"; // Importa la aplicación configurada

// Cargar variables de entorno
dotenv.config();

const PORT = process.env.PORT || 5000;

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
