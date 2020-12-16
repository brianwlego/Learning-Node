const mongoose = require('mongoose');

const orderScheme = new mongoose.Schema({
  products: [{
    product: {
      type: Object,
      required: true
    },
    qty: {
      type: Number,
      required: true
    }
  }], 
  user: {
    name: {type: String, required: true}, 
    userId: {
      type: mongoose.Schema.Types.ObjectId, 
      required: true,
      ref: 'User'
    }
  }
})


module.exports = mongoose.model('Order', orderScheme)