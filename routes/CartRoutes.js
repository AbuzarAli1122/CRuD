import express from 'express';
import { addToCart, getCart, updateCart, deleteCart, clearCart } from '../controllers/Cart.js';

const router = express.Router();

// Cart routes
router.post('/cart/:userId', addToCart);
router.get('/cart/:userId', getCart);
router.put('/cart/:cartId/item/:itemId', updateCart);
router.delete('/cart/:cartId/item/:itemId', deleteCart);
router.delete('/cart/:cartId', clearCart);

export default router;
