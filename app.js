const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
// const expressHbs = require('express-handlebars')

const app = express();

// app.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout.hbs'}));
// app.set('view engine', 'pug');

app.set('view engine', 'ejs');
app.set('views', 'views')


//Pulling in route files
const adminData = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(bodyParser.urlencoded({extended: false}));

//Pulling in static files ie CSS, HTML, JS files, etc.
app.use(express.static(path.join(__dirname, 'public')))

//Using route declarations
//Namespacing the 'admin' routes
app.use('/admin', adminData.routes);
app.use(shopRoutes);

//Error catching 
app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))

  res.status(404).render('404', {docTitle: 'Page Not Found'})
});

//Port to start server on
app.listen(3000);

