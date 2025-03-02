import express from 'express';
import dotenv from 'dotenv';
import products from './routes/products/products.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/products', products);

app.get('/', (req, res) => {
  res.send('Hello World!');
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});