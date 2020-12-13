const Product = require('../models/product')

exports.getIndex = (req, res, next) => {
  Product.findAll()
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
  Product.findAll()
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
  //Alternative to show 'where' keyword
  //Returns an array
  //Product.findAll({where: {id: req.params.productId}})

  Product.findByPk(req.params.productId)
    .then(product => {
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
    .then(cart => {
      return cart.getProducts();
    })
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
  let fetchedCart;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({where: {id: req.body.productId}})
    })
    .then(products => {
      let product;
      if (products.length > 0){
        product = products[0]
      }
      let newQty = 1;
      if(product){
        const oldQuantity = product.cartItem.quantity
        newQty= oldQuantity + 1;
        return fetchedCart.addProduct(product, {through: {quantity: newQty}})
      }
      return Product.findByPk(req.body.productId)
        .then(product => {
          return fetchedCart.addProduct(product, { through: { quantity: newQty}});
        })
        .catch(console.log)
    })
    .then(() => res.redirect('/cart'))
    .catch(console.log)
  
}

exports.postCartDeleteItem = (req, res, next) => {

  req.user.getCart()
    .then(cart => {
      return cart.getProducts({where: {id: req.body.productId}})
    })
    .then(products => {
      const product = products[0]
      return product.cartItem.destroy()
    })
    .then(() => res.redirect('/cart'))
    .catch(console.log)
}

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user.getCart()
  .then(cart => {
    fetchedCart = cart;
      return cart.getProducts()
    })
    .then(products => {
      return req.user.createOrder()
      .then(order => {
        return order.addProducts(products.map(p => {
            p.orderItem = {quantity: p.cartItem.quantity}
            return p
          }))
        })
      })
      .then(() => {
        return fetchedCart.setProducts(null);
      })
      .then( () => {
      res.redirect('/orders')
    })
    .catch(console.log)
}

exports.getOrders = (req, res, next) => {
  req.user.getOrders({include: ['products']})
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