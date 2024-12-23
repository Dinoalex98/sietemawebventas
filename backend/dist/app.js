"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db"); // Importa la función de conexión
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Conectar a la base de datos
(0, db_1.connectDB)();
// Middlewares
app.use(express_1.default.json());
// Rutas
app.get("/", (req, res) => {
    res.send("API en funcionamiento");
});
// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
