const Product = require('../models/product')
const Cart = require('../models/cart')

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
    res.render('shop/product-list', {
      prods: products, 
      pageTitle: 'All Products', 
      path: '/products', 
    });
  });
}
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    res.render('shop/product-detail', {
      pageTitle: product.title,
      path: '/products',
      product: product
    })
  })
}
exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (let product of products){
        const cProdData = cart.products.find(p => +p.id === product.id);
        if (cProdData){
          cartProducts.push({productData: product, qty: cProdData.qty})
        }
      }
      res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
        products: cartProducts
      })
    })
  })
}
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(+prodId, product => {
    Cart.addProduct(+prodId, +product.price)
  })
  res.redirect('/cart')
}

exports.postCartDeleteItem = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(+prodId, product => {
    Cart.deleteProduct(+prodId, +product.price)
    res.redirect('/cart')
  })
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout'
  })
}
exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: 'Orders',
    path: '/orders'
  })
}