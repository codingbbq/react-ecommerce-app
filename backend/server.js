import express from 'express';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
dotenv.config();
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
const port = process.env.PORT;

connectDB(); // Connection to Mongo DB;

const app = express();

app.get('/', (req, res) => {
    res.send('API is running');
});

app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));