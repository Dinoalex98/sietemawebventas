import mongoose, { Schema, Document } from "mongoose";

interface ISupplier extends Document {
  company: string;
  nit: string;
  phone: string;
  address: string;
  email: string;
  state: boolean;
}

const SupplierSchema: Schema = new Schema<ISupplier>({
  company: {
    type: String,
    required: [true, "El nombre de la empresa es obligatorio"],
    trim: true,
    unique: true,
  },
  nit: {
    type: String,
    required: [true, "El NIT es obligatorio"],
  },
  phone: {
    type: String,
    required: [true, "El número de teléfono es obligatorio"],
  },
  address: {
    type: String,
    required: [true, "La dirección es obligatoria"],
  },
  email: {
    type: String,
    required: [true, "El correo electrónico es obligatorio"],
    unique: true,
  },
  state: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model<ISupplier>("Supplier", SupplierSchema);
