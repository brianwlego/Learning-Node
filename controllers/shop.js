const Product = require('../models/product')
const Order = require('../models/order')

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/index', {
        prods: products, 
        pageTitle: 'Shop', 
        path: '/',
        isAuthenticated: req.isLoggedIn
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
        isAuthenticated: req.isLoggedIn
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
        product: product,
        isAuthenticated: req.isLoggedIn
      })
    })
    .catch((err)=>console.log(err))
}
exports.getCart = (req, res, next) => {
  req.user.populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
        products: user.cart.items,
        isAuthenticated: req.isLoggedIn
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
  req.user.removeFromCart(req.body.productId)
    .then(() => res.redirect('/cart'))
    .catch((err)=>console.log(err))
}

exports.postOrder = (req, res, next) => {
  req.user.populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(i => {
        return {qty: i.qty, product: {...i.productId._doc}}
      });
      const order = new Order({
        user: {name: req.user.name, userId: req.user},
        products: products
      })
      return order.save();
    })
    .then(() => req.user.clearCart())
    .then(()=> res.redirect('/orders'))
    .catch((err)=>console.log(err))
}

exports.getOrders = (req, res, next) => {
  Order.find({'user.userId': req.user._id})
    .then(orders => {
      res.render('shop/orders', {
        pageTitle: 'Orders',
        path: '/orders', 
        orders: orders,
        isAuthenticated: req.isLoggedIn
      })
    })
    .catch((err)=>console.log(err))
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout',
    isAuthenticated: req.isLoggedIn
  })
}