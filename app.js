const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
require('dotenv').config();
// const expressHbs = require('express-handlebars')

const app = express();

// app.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout.hbs'}));
// app.set('view engine', 'pug');

app.set('view engine', 'ejs');
app.set('views', 'views')


//Pulling in route files
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const errorController = require('./controllers/error')

const sequelize = require('./utility/database')
const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const Order = require('./models/order')
const OrderItem = require('./models/order-item')

app.use(bodyParser.urlencoded({extended: false}));
//Pulling in static files ie CSS, HTML, JS files, etc.
app.use(express.static(path.join(__dirname, 'public')))

app.use((req,res,next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(console.log)
})

//Using route declarations
//Namespacing the 'admin' routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
//Error catching 
app.use(errorController.get404);

//Defining Model associations
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem})
Product.belongsToMany(Cart, {through: CartItem})
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem})
Product.belongsToMany(Order, {through: OrderItem})


sequelize.sync()
  .then(result => {
    return User.findByPk(1)
  })
  .then(user => {
    if (!user){
      return User.create({name: "Brian", email: "brian@brian"})
    }
    return user;
  })
  .then(user => {
    return user.createCart();
  })
  .then(cart => {
    app.listen(3000);
  })
    //Port to start server on
  .catch(console.log)


