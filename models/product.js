const fs = require('fs');
const path = require('path')
const rootDir = require('../utility/path')

const Cart = require('./cart')

const p = path.join(rootDir, 'data', 'products.json')

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err){ return cb([]);}
    cb(JSON.parse(fileContent));
  })
}

module.exports = class Product {
  constructor(id, title, imgUrl, description, price){
    this.id = id;
    this.title = title;
    this.imgUrl = imgUrl;
    this.description = description;
    this.price = price;
  }

  save(){
    getProductsFromFile(products => {
      if (this.id){
        const existingProdIdx = products.findIndex(p => p.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[existingProdIdx] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {console.log(err)})
      } else {
        this.id = Math.random();
        products.push(this)
        fs.writeFile(p, JSON.stringify(products), (err) => {console.log(err)})
      }
    })
  }

  static deleteById(id){
    getProductsFromFile(products => {
      const product = products.find(p => p.id === +id)
      const updatedProducts = products.filter(p => p.id !== +id);
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        if(!err){
          Cart.deleteProduct(+id, +product.price)
        }
      })
    })
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb){
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    })
  }

}