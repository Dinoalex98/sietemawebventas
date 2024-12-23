import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  description: string;
  state: boolean;
}
const CategorySchema: Schema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  state: { type: Boolean, default: true },
});

export default mongoose.model<ICategory>("Category", CategorySchema);