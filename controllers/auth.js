const User = require('../models/user')

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  })
}

exports.postLogin = (req, res, next) => {
  User.find({name: req.body.name, email: req.body.email})
    .then(user => {
      if (user[0]){
        console.log(user)
        req.session.isLoggedIn = true;
        req.session.user = user[0];
        res.redirect('/')
      }
    })
    .catch(err => console.log(err))
}

exports.postLogout = (req, res, next) => {
  req.session.destroy((err)=> {
    console.log(err)
    res.redirect('/')
  })
}