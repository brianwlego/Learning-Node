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
  const prodId = req.params.id
  Product.findById(prodId, product => {
    if (!product) {return res.redirect('/')}
    res.render('admin/edit-product', {
      product: product,
      editMode: editMode,
      pageTitle: 'Edit Product', 
      path: '/admin/edit-product'
    });
  });
};
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId
  const updatedTitle = req.body.title;
  const updatedImgUrl = req.body.imgUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const updatedProduct = new Product(
    +prodId, 
    updatedTitle, 
    updatedImgUrl, 
    updatedDescription, 
    updatedPrice)
  updatedProduct.save();
  res.redirect('/admin/products')
}

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imgUrl = req.body.imgUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(
    null, 
    title, 
    imgUrl, 
    description, 
    price)
  product.save()
    .then(res.redirect('/'))
    .catch(console.log)

}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.prodId;
  Product.deleteById(prodId);
  res.redirect('/admin/products')
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      pageTitle: 'Admin Products',
      prods: products,
      path: '/admin/products'
    })
  })
}