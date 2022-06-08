const express = require('express');
const path = require('path');

const app = express();

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
app.get('/shop', (req, res) => {
  res.render('shop');
});
app.get('/gallery', (req, res) => {
  res.render('gallery');
});
app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/api/products', (req, res) => {});

app.listen(5000, () => {
  console.log(`Server running on port 5000`);
});
