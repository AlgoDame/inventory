import { Schema, model, Document } from 'mongoose';
import { IUser } from '../models/user.model';

interface IInventory extends Document {
  name: string;
  price: number;
  qtyAvailable: number;
  qtySold: number;
  userId: IUser['_id'];
}


const inventorySchema = new Schema<IInventory>({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  qtyAvailable: {
    type: Number,
    required: true,
  },
  qtySold: {
    type: Number,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
}, { timestamps: true });

export const InventoryModel = model<IInventory>('Inventory', inventorySchema);