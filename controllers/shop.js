const Product = require('../models/product')

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products)=> {
    res.render('shop/index', {
      prods: products, 
      pageTitle: 'Shop', 
      path: '/', 
    });
  });
}
exports.getProducts = (req, res, next) => {
  Product.fetchAll((products)=> {
    res.render('shop', {
      prods: products, 
      pageTitle: 'All Products', 
      path: '/products', 
    });
  });
}
exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    pageTitle: 'Your Cart',
    path: '/cart'
  })
}
exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout'
  })
}