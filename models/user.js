const mongodb = require('mongodb')
const getDb = require('../utility/database').getDb;

class User {
  constructor(username, email, cart, id){
    this.username = username;
    this.email = email;
    this.cart = cart;  //{items: []}
    this._id = id;
  }

  save(){
    const db = getDb();
    return db.collection('users')
      .insertOne(this);
  }

  addToCart(product){
    const db = getDb();
    const cartProductsIndex = this.cart.items.findIndex(cp => cp.productId.toString() === product._id.toString())

    let newQuantity = 1
    const updatedCartItems = [...this.cart.items]

    if (cartProductsIndex >= 0) {
      newQuantity = this.cart.items[cartProductsIndex].qty + 1
      updatedCartItems[cartProductsIndex].qty = newQuantity
    } else {
      updatedCartItems.push({productId: new mongodb.ObjectId(product._id), qty: newQuantity})
    }
    
    const updatedCart = {items: updatedCartItems}

    return db.collection('users')
      .updateOne(
        {_id: new mongodb.ObjectId(this._id)},
        {$set: {cart: updatedCart}}
      )
  }

  getCart(){
    const db = getDb();
    const productsIds = this.cart.items.map(i => i.productId)
    
    return db.collection('products')
      .find({_id: { $in: productsIds }})
      .toArray()
      .then(products => {
        return products.map(p => {
          return {...p, qty: this.cart.items.find(i => i.productId.toString() === p._id.toString()).qty}
        })
      })
  }

  deleteItemFromCart(prodId){
    const updatedCartItems = this.cart.items.filter(i => i.productId.toString() !== prodId.toString())

    const db = getDb();
    return db.collection('users')
      .updateOne(
        {_id: new mongodb.ObjectId(this._id)},
        {$set: {cart: {items: updatedCartItems}}}
      )
  }

  addOrder(){
    const db = getDb();
    return this.getCart()
      .then(products => {
        const order = {
          items: products,
          user: {
            _id: new mongodb.ObjectId(this._id),
            username: this.username
          }
        }
        return db.collection('orders')
          .insertOne(order)
      })
      .then(() => {
        this.cart = {items: []}
        return db.collection('users')
          .updateOne(
            {_id: new mongodb.ObjectId(this._id)},
            { $set: { cart: {items: []}}}
          )
      })
  }

  getOrders(){
    const db = getDb();
    return db.collection('orders')
      .find({'user._id': new mongodb.ObjectId(this._id)})
      .toArray()
  }

  static findById(userId){
    const db = getDb();
    return db.collection('users')
      .findOne({_id: new mongodb.ObjectId(userId)});
  }

}


module.exports = User;