"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
// Cargar variables de entorno desde el archivo .env
dotenv_1.default.config();
// Configuración de la base de datos
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, // Nombre de la base de datos
process.env.DB_USER, // Usuario
process.env.DB_PASSWORD, // Contraseña
{
    host: process.env.DB_HOST, // Dirección del servidor
    dialect: "mssql", // Dialecto para SQL Server
    logging: false, // Deshabilitar logs de consultas SQL
});
// Función para conectar la base de datos
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate(); // Prueba la conexión
        console.log("Conexión a la base de datos exitosa.");
    }
    catch (error) {
        // Verificación segura del tipo del error
        if (error instanceof Error) {
            console.error("Error al conectar a la base de datos:", error.message);
        }
        else {
            console.error("Error desconocido al conectar a la base de datos");
        }
        process.exit(1); // Finaliza la aplicación si falla la conexión
    }
});
exports.connectDB = connectDB;
