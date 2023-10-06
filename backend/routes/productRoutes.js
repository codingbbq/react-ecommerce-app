import express from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { protect, admin } from '../middleware/authHandler.js';
const router = express.Router();

router.route('/').get(getProducts);
router.route('/').post(protect, admin, createProduct);
router.route('/:id').get(getProductById);
router.route('/:id').put(protect, admin, updateProduct);
router.route('/:id').delete(protect, admin, deleteProduct);

export default router;