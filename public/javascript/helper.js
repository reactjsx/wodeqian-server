const jwt = require('jsonwebtoken');

const helper = {};
module.exports = helper;

helper.generateToken = (user) => {
  const u = {
    name: user.username,
    _id: user._id.toString()
  };
  
  return jwt.sign(u, 'Who The Fuck Are You', {
    expiresIn: 60 * 60
  });
};