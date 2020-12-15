const Product = require('../models/product')

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('shop/index', {
        prods: products, 
        pageTitle: 'Shop', 
        path: '/', 
      });
    })
    .catch(console.log)
}
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products, 
        pageTitle: 'All Products', 
        path: '/products', 
      });
    })
    .catch(console.log)
}
exports.getProduct = (req, res, next) => {

  Product.findById(req.params.productId)
    .then(product => {
      console.log(product)
      res.render('shop/product-detail', {
        pageTitle: product.title,
        path: '/products',
        product: product
      })
    })
    .catch(console.log)
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
    .catch(console.log)
}

exports.postCart = (req, res, next) => {
  Product.findById(req.body.productId)
    .then(product => {
      return req.user.addToCart(product)
    })
    .then(() => {
      res.redirect('/cart')
    })
    .catch(console.log)
}

exports.postCartDeleteItem = (req, res, next) => {
  req.user.deleteItemFromCart(req.body.productId)
    .then(() => res.redirect('/cart'))
    .catch(console.log)
}

exports.postOrder = (req, res, next) => {
  req.user.addOrder()
    .then(() => {
      res.redirect('/orders')
    })
    .catch(console.log)
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
    .catch(console.log)
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout'
  })
}