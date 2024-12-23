import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app"; // Importa tu aplicación Express
import Product from "../models/product.model"; // Modelo de producto

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  // Inicia un servidor MongoDB en memoria
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri); // `useNewUrlParser` y `useUnifiedTopology` ya no son necesarios
});

afterAll(async () => {
  // Desconecta Mongoose y detén el servidor MongoDB en memoria
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  // Limpia la colección de productos antes de cada prueba
  await Product.deleteMany({});
});

describe("Pruebas de integración para productos", () => {
  test("Debe crear un producto", async () => {
    const productData = {
      name: "Laptop HP",
      brand: "HP",
      category: "Electronics",
      productModel: "HP1234",
      specifications: "8GB RAM, 256GB SSD",
      image: "http://example.com/image.jpg",
      state: true,
    };

    const response = await request(app)
      .post("/api/products")
      .send(productData)
      .expect(201);

    // Validar que el producto se haya creado correctamente
    expect(response.body.product).toHaveProperty("_id");
    expect(response.body.product.name).toBe(productData.name);
    expect(response.body.product.brand).toBe(productData.brand);
  });

  test("Debe obtener todos los productos", async () => {
    // Inserta un producto en la base de datos
    await Product.create([
      {
        name: "Laptop HP",
        brand: "HP",
        category: "Electronics",
        productModel: "HP1234",
        specifications: "8GB RAM, 256GB SSD",
        image: "http://example.com/image.jpg",
        state: true,
      },
    ]);

    // Realiza la solicitud para obtener todos los productos
    const response = await request(app).get("/api/products").expect(200);

    // Valida los datos obtenidos
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe("Laptop HP");
    expect(response.body[0].brand).toBe("HP");
  });
});
