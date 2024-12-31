import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  brand: string; // Guardar solo el nombre de la marca
  category: string; // Guardar solo el nombre de la categoría
  productModel: string;
  specifications: string;
  image?: string;
  state: boolean;
}

const ProductSchema: Schema<IProduct> = new Schema<IProduct>({
  name: { type: String, required: true },
  brand: { type: String, required: true }, // Almacena solo el nombre
  category: { type: String, required: true }, // Almacena solo el nombre
  productModel: { type: String, required: true },
  specifications: { type: String, required: true },
  image: { type: String },
  state: { type: Boolean, default: true },
});

// Middleware para asignar el nombre de la marca y la categoría
ProductSchema.pre("save", async function (next) {
  try {
    const Brand = mongoose.model("Brand");
    const Category = mongoose.model("Category");

    // Busca la marca y categoría para asignar su nombre
    if (this.isModified("brand")) {
      const brandDoc = await Brand.findById(this.brand);
      if (brandDoc) {
        this.brand = brandDoc.name; // Solo guarda el nombre de la marca
      }
    }

    if (this.isModified("category")) {
      const categoryDoc = await Category.findById(this.category);
      if (categoryDoc) {
        this.category = categoryDoc.name; // Solo guarda el nombre de la categoría
      }
    }

    next(); // Llama al siguiente middleware
  } catch (error) {
    if (error instanceof Error) {
      next(error); // Pasa el error solo si es del tipo correcto
    } else {
      next(new Error("Error desconocido")); // Manejo de errores no esperados
    }
  }
});

export default mongoose.model<IProduct>("Product", ProductSchema);

