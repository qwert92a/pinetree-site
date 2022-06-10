import express from 'express';
const router = express.Router();
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';


// @desc  Fetch all products
// @route  GET /products?page=#
// @access  Public
router.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    const itemPerPage = 9;
    const numPages =
      products.length % itemPerPage
        ? parseInt(products.length / itemPerPage) + 1
        : parseInt(products.length / itemPerPage);
    const page = req.query.page;

    res.render('products', {
      numPages,
      page,
      products: products.slice(
        itemPerPage * (page - 1),
        itemPerPage * (page - 1) + itemPerPage
      ),
    });
  })
);

// @desc  Fetch single product
// @route  GET /products/:id
// @access  Public
router.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.render('product-detail', { product });
    } else {
      res.status(404);
    }
  })
);

export default router;
