import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';
import productRoutes from './routes/productRoutes.js';
import gallery from './data/gallery.js';
import sendMail from './mailer.js';

dotenv.config();

connectDB();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// view engine setup
app.set('views', path.join(__dirname, '/../frontend/views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, '../frontend')));

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index', { gallery });
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.use('/products', productRoutes);
app.get('/detail', (req, res) => {
  res.render('shop-details');
});
app.get('/gallery', (req, res) => {
  const itemPerPage = 16;
  const numPages =
    gallery.length % itemPerPage
      ? parseInt(gallery.length / itemPerPage) + 1
      : parseInt(gallery.length / itemPerPage);
  const page = req.query.page;

  res.render('gallery', {
    numPages,
    page,
    gallery: gallery.slice(
      itemPerPage * (page - 1),
      itemPerPage * (page - 1) + itemPerPage
    ),
  });
});
app.get('/contact', (req, res) => {
  res.render('contact');
});
app.post('/contact', (req, res) => {
  if(sendMail('brotherplantation@gmail.com', req.body)) {
    res.json({success: true});
  } else {
    res.json({success: false});
  }
});

const PORT = process.env.PORT | 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});
