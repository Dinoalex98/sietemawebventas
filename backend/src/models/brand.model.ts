import mongoose, { Schema, Document } from "mongoose";

export interface IBrand extends Document {
  name: string;
  description: string;
  state: boolean;
}

const BrandSchema: Schema = new Schema<IBrand>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  state: { type: Boolean, default: true },
});


export default mongoose.model<IBrand>("Brand", BrandSchema);
