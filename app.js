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

app.use(bodyParser.urlencoded({extended: false}));
//Pulling in static files ie CSS, HTML, JS files, etc.
app.use(express.static(path.join(__dirname, 'public')))

//Using route declarations
//Namespacing the 'admin' routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);
//Error catching 
app.use(errorController.get404);

sequelize.sync()
  .then(result => {
    //Port to start server on
    app.listen(3000);
  })
  .catch(console.log)


