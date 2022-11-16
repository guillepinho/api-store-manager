const express = require('express');
const { salesController } = require('../controllers');

const router = express.Router();

router.post('/', salesController.registerNewSale);

router.get('/', salesController.listAllSales);

router.get('/:saleId', salesController.listSaleById);

router.put('/:saleId', salesController.updateSale);

router.delete('/:saleId', salesController.removeSale);

module.exports = router;