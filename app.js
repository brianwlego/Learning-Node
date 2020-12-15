const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
require('dotenv').config();

const mongoConnect = require('./utility/database').mongoConnect;
const User = require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views')


//Pulling in route files
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const errorController = require('./controllers/error')

app.use(bodyParser.urlencoded({extended: false}));
//Pulling in static files ie CSS, HTML, JS files, etc.
app.use(express.static(path.join(__dirname, 'public')))

app.use((req,res,next) => {
  User.findById('5fd7faa27bbb211711fc4791')
    .then(user => {
      req.user = new User(user.username, user.email, user.cart, user._id);
      next();
    })
    .catch(console.log)
})

// //Using route declarations
//Namespacing the 'admin' routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
//Error catching 
app.use(errorController.get404);


mongoConnect(() => {

})
app.listen(3000)

