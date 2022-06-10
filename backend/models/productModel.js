import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  images: {
    type: [{ type: String }],
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  circumference: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
