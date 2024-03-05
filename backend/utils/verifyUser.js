const jwt = require('jsonwebtoken')

const verifyUser = (req, res, next) => {
  const token = req.cookies

  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(400).json({'message': 'user not logged in'})
      } else {
        req.user = decodedToken
        next()
      }
    })
  } else {
    return res.status(400).json({'message': 'user not logged in'})
  }
}

module.exports = verifyUser