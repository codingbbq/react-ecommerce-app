import express from 'express';
import { getProducts, getProductById, createProduct, updateProduct } from '../controllers/productController.js';
import { protect, admin } from '../middleware/authHandler.js';
const router = express.Router();

router.route('/').get(getProducts);
router.route('/').post(protect, admin, createProduct);
router.route('/:id').get(getProductById);
router.route('/:id').put(protect, admin, updateProduct);

export default router;