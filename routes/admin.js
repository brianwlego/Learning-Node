// const path = require('path')
const express = require('express')

// const rootDir = require('../utility/path')

const adminController = require('../controllers/admin')

const router = express.Router();

router.get('/add-product', adminController.getAddProduct);
router.post('/add-product', adminController.postAddProduct)

router.get('/edit-product/:id', adminController.getEditProduct)

router.get('/products', adminController.getProducts)

router.post('/edit-product', adminController.postEditProduct)
router.post('/delete-product', adminController.postDeleteProduct)

module.exports = router;
