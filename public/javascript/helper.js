const jwt = require('jsonwebtoken');

const helper = {};
module.exports = helper;

helper.generateToken = (user) => {
  const u = {
    username: user.username,
    _id: user._id.toString()
  };
  
  return jwt.sign(u, 'Who The Fuck Are You', {
    expiresIn: 60 * 60
  });
};