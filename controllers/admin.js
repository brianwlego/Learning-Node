const mongodb = require('mongodb')
const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product', 
    path: '/admin/add-product',
    editMode: false
  });
}
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit

  Product.findById(req.params.id)
    .then(product => {
      if (!product) {return res.redirect('/')}
      res.render('admin/edit-product', {
        product: product,
        editMode: editMode,
        pageTitle: 'Edit Product', 
        path: '/admin/edit-product'
      });
    })
    .catch(console.log)
};
exports.postEditProduct = (req, res, next) => {
  const product = new Product(req.body.title, req.body.price, req.body.description, req.body.imgUrl, req.body.productId)

  product.save()
    .then(res.redirect('/admin/products'))
    .catch(console.log)
}

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title, req.body.price, req.body.description, req.body.imgUrl, null, req.user._id)

  product.save()
    .then(result => {
      console.log("Created Product")
      res.redirect('/admin/products')
    })
    .catch(console.log)
}

exports.postDeleteProduct = (req, res, next) => {
  Product.deleteById(req.body.prodId)
    .then(res.redirect('/admin/products'))
    .catch(console.log)
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('admin/products', {
        pageTitle: 'Admin Products',
        prods: products,
        path: '/admin/products'
      })
    })
    .catch(console.log)
}