const uuidv1 = require('uuid/v1')

module.exports = function(req, res, next) {
  if (!req.session.uid) {
    req.session.uid = uuidv1()
  }

  res.redirect('/app')
}