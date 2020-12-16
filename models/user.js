const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }, 
  cart: {
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId, 
          ref:'Product', 
          required: true
        }, 
        qty: {
          type: Number, 
          required: true
        }
      }
    ]
  }
});

userSchema.methods.addToCart = function(product){
  const cartProductsIndex = this.cart.items.findIndex(cp => cp.productId.toString() === product._id.toString())

  let newQuantity = 1
  const updatedCartItems = [...this.cart.items]

  if (cartProductsIndex >= 0) {
    newQuantity = this.cart.items[cartProductsIndex].qty + 1
    updatedCartItems[cartProductsIndex].qty = newQuantity
  } else {
    updatedCartItems.push({productId: product._id, qty: newQuantity})
  }
  
  const updatedCart = {items: updatedCartItems}
  this.cart = updatedCart;
  return this.save()
}

userSchema.method.removeFromCart = function(prodId){
  const updatedCartItems = this.cart.items.filter(i => i.productId.toString() !== prodId.toString())
  this.cart.items = updatedCartItems;
  this.save();
}

userSchema.method.clearCart = function(){
  this.cart = {items: []};
  return this.save();
}


module.exports = mongoose.model('User', userSchema)




//   getOrders(){
//     const db = getDb();
//     return db.collection('orders')
//       .find({'user._id': new mongodb.ObjectId(this._id)})
//       .toArray()
//   }

//   static findById(userId){
//     const db = getDb();
//     return db.collection('users')
//       .findOne({_id: new mongodb.ObjectId(userId)});
//   }

// }


// module.exports = User;