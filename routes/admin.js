// const path = require('path')
const express = require('express')

// const rootDir = require('../utility/path')

const adminController = require('../controllers/admin')

const router = express.Router();

//INDEX
router.get('/products', adminController.getProducts)
//FIND
router.get('/add-product', adminController.getAddProduct);
//CREATE
router.post('/add-product', adminController.postAddProduct)
//EDIT
router.get('/edit-product/:id', adminController.getEditProduct)
//UPDATE
router.post('/edit-product', adminController.postEditProduct)
//DESTROY
router.post('/delete-product', adminController.postDeleteProduct)

module.exports = router;
