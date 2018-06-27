import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true, index: true },
  price: { type: Number, required: true, index: false },
  quantity: { type: Number, required: true, index: false },
});

export default ProductSchema;
