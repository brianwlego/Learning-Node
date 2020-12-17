const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product', 
    path: '/admin/add-product',
    editMode: false,
    isAuthenticated: req.session.isLoggedIn
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
        path: '/admin/edit-product',
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch((err)=>console.log(err))
};

exports.postEditProduct = (req, res, next) => {
  Product.findById(req.body.productId)
    .then(product => {
      product.title = req.body.title;
      product.price = req.body.price;
      product.description = req.body.description;
      product.imgUrl = req.body.imgUrl;
      return product.save()
    })
    .then(()=>res.redirect('/admin/products'))
    .catch((err)=>console.log(err))
}

exports.postAddProduct = (req, res, next) => {
  const product = new Product({
    title: req.body.title, 
    price: req.body.price, 
    description: req.body.description, 
    imgUrl: req.body.imgUrl, 
    userId: req.user
  })
  product.save()
    .then(()=>res.redirect('/admin/products'))
    .catch((err)=>console.log(err))
}

exports.postDeleteProduct = (req, res, next) => {
  Product.findByIdAndRemove(req.body.prodId)
    .then(()=>res.redirect('/admin/products'))
    .catch((err)=>console.log(err))
}

exports.getProducts = (req, res, next) => {
  Product.find().populate('userId')
    .then(products => {
      res.render('admin/products', {
        pageTitle: 'Admin Products',
        prods: products,
        path: '/admin/products',
        isAuthenticated: req.session.isLoggedIn
      })
    })
    .catch((err)=>console.log(err))
}