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

  Product.findByPk(req.params.id)
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
  Product.findByPk(req.body.productId)
    .then(product => {
      product.title = req.body.title;
      product.imgUrl = req.body.imgUrl;
      product.price = req.body.price;
      product.description = req.body.description;
      return product.save();
    })
    .then(res.redirect('/admin/products'))
    .catch(console.log)
}

exports.postAddProduct = (req, res, next) => {
  req.user.createProduct({
    title: req.body.title,
    imgUrl: req.body.imgUrl,
    price: req.body.price,
    description: req.body.description
  })
    .then(result => {
      console.log("Created Product", result)
      res.redirect('/admin/products')
    })
    .catch(console.log)
}

exports.postDeleteProduct = (req, res, next) => {
  Product.findByPk(req.body.prodId)
    .then(product => {
      return product.destroy();
    })
    .then(res.redirect('/admin/products'))
    .catch(console.log)
}

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('admin/products', {
        pageTitle: 'Admin Products',
        prods: products,
        path: '/admin/products'
      })
    })
    .catch(console.log)
}