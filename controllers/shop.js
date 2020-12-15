const Product = require('../models/product')

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/index', {
        prods: products, 
        pageTitle: 'Shop', 
        path: '/', 
      });
    })
    .catch((err)=>console.log(err))
}
exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/product-list', {
        prods: products, 
        pageTitle: 'All Products', 
        path: '/products', 
      });
    })
    .catch((err)=>console.log(err))
}
exports.getProduct = (req, res, next) => {
  Product.findById(req.params.productId)
    .then(product => {
      res.render('shop/product-detail', {
        pageTitle: product.title,
        path: '/products',
        product: product
      })
    })
    .catch((err)=>console.log(err))
}
exports.getCart = (req, res, next) => {
  req.user.getCart()
    .then(cartProducts => {
      res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
        products: cartProducts
      })
    })
    .catch((err)=>console.log(err))
}

exports.postCart = (req, res, next) => {
  Product.findById(req.body.productId)
    .then(product => {
      return req.user.addToCart(product)
    })
    .then(() => {
      res.redirect('/cart')
    })
    .catch((err)=>console.log(err))
}

exports.postCartDeleteItem = (req, res, next) => {
  req.user.deleteItemFromCart(req.body.productId)
    .then(() => res.redirect('/cart'))
    .catch((err)=>console.log(err))
}

exports.postOrder = (req, res, next) => {
  req.user.addOrder()
    .then(() => {
      res.redirect('/orders')
    })
    .catch((err)=>console.log(err))
}

exports.getOrders = (req, res, next) => {
  req.user.getOrders()
    .then(orders => {
      res.render('shop/orders', {
        pageTitle: 'Orders',
        path: '/orders', 
        orders: orders,
        
      })
    })
    .catch((err)=>console.log(err))
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout'
  })
}