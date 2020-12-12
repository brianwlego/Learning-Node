const fs = require('fs');
const path = require('path')
const rootDir = require('../utility/path')

const p = path.join(rootDir, 'data', 'products.json')

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err){ return cb([]);}
    cb(JSON.parse(fileContent));
  })
}

module.exports = class Product {
  constructor(title, imgUrl, description, price){
    this.title = title;
    this.imgUrl = imgUrl;
    this.description = description;
    this.price = price;
  }

  save(){
    this.id = Math.random();
    getProductsFromFile(products => {
      products.push(this)
      fs.writeFile(p, JSON.stringify(products), (err) => {console.log(err)})
    })
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

}