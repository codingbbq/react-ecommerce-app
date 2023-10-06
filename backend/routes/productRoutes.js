import express from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct, createProductReview } from '../controllers/productController.js';
import { protect, admin } from '../middleware/authHandler.js';
const router = express.Router();

router.route('/').get(getProducts);
router.route('/').post(protect, admin, createProduct);
router.route('/:id').get(getProductById);
router.route('/:id').put(protect, admin, updateProduct);
router.route('/:id').delete(protect, admin, deleteProduct);
router.route('/:id/reviews').post(protect, createProductReview);

export default router;