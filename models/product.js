const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema)

// class Product{
//   constructor(title, price, description, imgUrl, id, userId){
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imgUrl = imgUrl;
//     this._id = id ? new mongodb.ObjectId(id) : null;
//     this.userId = userId;
//   }

//   save(){
//     const db = getDb();
//     let dbOp;

//     if (this._id){
//       dbOp = db.collection('products').updateOne({_id: this._id}, {$set: this})
//     } else {
//       dbOp = db.collection('products').insertOne(this);
//     }
//     return dbOp;
//   }

//   static fetchAll(){
//     const db = getDb();
//     return db.collection('products').find().toArray();
//   }

//   static findById(id){
//     const db = getDb();
//     return db.collection('products').find({_id: new mongodb.ObjectId(id)}).next();
//   }

//   static deleteById(id){
//     const db = getDb();
//     return db.collection('products').deleteOne({_id: new mongodb.ObjectId(id)})
//   }

// }



// module.exports = Product;