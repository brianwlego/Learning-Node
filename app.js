const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
require('dotenv').config();

// const mongoConnect = require('./utility/database').mongoConnect;
const mongoose = require('mongoose')

const User = require('./models/user')

const app = express();

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

app.use((req,res,next) => {
  User.findById('5fd823936296355ae00b47ff')
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
    .then(user => {
      if (!user){
        const user = new User({
          name: 'Brian', 
          email: 'brian@brian',
          cart: {
            items: [] 
          }
        })
        user.save()
      }
    })
    app.listen(3000)
  })


