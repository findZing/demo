import express from 'express';
import productController from '../controllers/product/productController';
import { verifyTokenAndAdmin } from '../middleware/verifyToken';
const router = express.Router();

router.post('/all', productController.getAllProducts)
router.post('/load',verifyTokenAndAdmin, productController.setProduct)
router.post('/update',verifyTokenAndAdmin, productController.updateProduct)
router.post('/delete',verifyTokenAndAdmin, productController.deleteProduct)
router.post('/get', productController.getProduct)
router.post('/images', productController.getAllImagesProduct)
router.post('/search', productController.searchProduct)

export default router