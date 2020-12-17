const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
require('dotenv').config();

// const mongoConnect = require('./utility/database').mongoConnect;
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);

const User = require('./models/user')

const app = express();
const store = new MongoDBStore({
  uri: `mongodb+srv://brian:${process.env.DBPASSWORD}@cluster0.11orq.mongodb.net/shop?retryWrites=true&w=majority`,
  collection: 'sessions'
})

app.set('view engine', 'ejs');
app.set('views', 'views')


//Pulling in route files
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const authRoutes = require('./routes/auth')
const errorController = require('./controllers/error')

app.use(bodyParser.urlencoded({extended: false}));
//Pulling in static files ie CSS, HTML, JS files, etc.
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: false, 
  store: store
}))

app.use((req,res,next) => {
  if (!req.session.user) return next();
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err))
})

// //Using route declarations
//Namespacing the 'admin' routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes)
//Error catching 
app.use(errorController.get404);


mongoose.connect(`mongodb+srv://brian:${process.env.DBPASSWORD}@cluster0.11orq.mongodb.net/shop?retryWrites=true&w=majority`)
  .then(() => {
    User.findOne()
    // .then(user => {
    //   if (!user){
    //     const user = new User({
    //       name: 'Brian', 
    //       email: 'brian@brian',
    //       cart: {
    //         items: [] 
    //       }
    //     })
    //     user.save()
    //   }
    // })
    app.listen(3000)
  })


