
exports.getLogin = (req, res, next) => {
  const login = req.get('Cookie').split('=')[1]
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: login
  })
}

exports.postLogin = (req, res, next) => {
  res.setHeader('Set-Cookie', 'logginIn=true')
  res.redirect('/')
}