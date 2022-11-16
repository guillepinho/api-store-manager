const express = require('express');
const { productsController } = require('../controllers');

const router = express.Router();

router.get('/', productsController.listProducts);

router.get('/search', productsController.searchProduct);

router.get('/:productId', productsController.listProductById);

router.post('/', productsController.registerNewProduct);

router.put('/:productId', productsController.updateProduct);

router.delete('/:productId', productsController.deleteProduct);

module.exports = router;