const mongodb = require('mongodb')
const getDb = require('../utility/database').getDb;

class Product{
  constructor(title, price, description, imgUrl){
    this.title = title;
    this.price = price;
    this.description = description;
    this.imgUrl = imgUrl;
  }

  save(){
    const db = getDb();
    return db.collection('products').insertOne(this);
  }

  static fetchAll(){
    const db = getDb();
    return db.collection('products').find().toArray();
  }

  static findById(id){
    const db = getDb();
    return db.collection('products').find({_id: new mongodb.ObjectId(id)}).next();
  }

}



module.exports = Product;