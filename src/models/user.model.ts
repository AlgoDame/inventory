import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  companyName: string;
  email: string;
  apiKey: string;
}


const userSchema = new Schema<IUser>({
  companyName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  apiKey: {
    type: String,
    required: true,
    unique: true,
  }
}, { timestamps: true });

export const UserModel = model<IUser>('User', userSchema);