import express from 'express';
import dotenv from 'dotenv';
import products from './routes/products/products.js';
import categories from './routes/categories/categories.js';
import orders from './routes/orders/orders.js';
import cart from './routes/cart/cart.js';
import login from './routes/auth/login.js';
import signup from './routes/auth/signup.js';


dotenv.config();

const app = express();
app.use(express.json());

app.use('/products', products);
app.use('/categories', categories);
app.use('/orders', orders);
app.use('/cart', cart);
app.use('/login', login);
app.use('/signup', signup);

 
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});