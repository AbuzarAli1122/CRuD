import express from 'express';
import { addToCart, getCart, updateCart, deleteCart, clearCart } from '../controllers/Cart.js';

const router = express.Router();

// Cart routes
router.post('/cart/:userId', addToCart);
router.get('/cart/:userId', getCart);
router.put('/cart/update/:userId', updateCart);
router.delete('/cart/delete/:userId', deleteCart);
router.delete('/cart/:cartId', clearCart);

export default router;
