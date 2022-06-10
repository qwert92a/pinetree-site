import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

connectDB();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// view engine setup
app.set('views', path.join(__dirname, '/../frontend/views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.use('/products', productRoutes);
app.get('/detail', (req, res) => {
  res.render('shop-details');
});
app.get('/gallery', (req, res) => {
  res.render('gallery');
});
app.get('/contact', (req, res) => {
  res.render('contact');
});

const PORT = process.env.PORT | 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});
