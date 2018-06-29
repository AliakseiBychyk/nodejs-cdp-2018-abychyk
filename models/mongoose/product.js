import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  id: { type: Number, required: true, index: true },
  name: { type: String, required: true, index: true },
  brand: { type: String, required: true, index: false },
  price: { type: Number, required: true, index: false },
  options: [
    {
      color: { type: String, required: false },
    },
    {
      size: { type: String, required: false },
    },
    {
      price: { type: Number, required: false },
    },
  ],
});

export default ProductSchema;
