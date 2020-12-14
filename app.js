const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
require('dotenv').config();

const mongoConnect = require('./utility/database').mongoConnect;

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

// app.use((req,res,next) => {
//   // User.findByPk(1)
//   //   .then(user => {
//   //     req.user = user;
//   //     next();
//   //   })
//   //   .catch(console.log)
//   next();
// })

// //Using route declarations
//Namespacing the 'admin' routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
//Error catching 
app.use(errorController.get404);


mongoConnect(() => {
})
app.listen(3000)

