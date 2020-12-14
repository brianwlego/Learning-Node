const mongodb = require('mongodb')
const getDb = require('../utility/database').getDb;

class Product{
  constructor(title, price, description, imgUrl, id){
    this.title = title;
    this.price = price;
    this.description = description;
    this.imgUrl = imgUrl;
    this._id = id
  }

  save(){
    const db = getDb();
    let dbOp;
    if (this._id){
      dbOp = db.collection('products').updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: this})
    } else {
      dbOp = db.collection('products').insertOne(this);
    }
    return dbOp;
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