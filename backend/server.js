const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/api/products', (req, res) => {
   
});

app.listen(5000, () => {
  console.log(`Server running on port 5000`);
});
