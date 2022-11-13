const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const UserModel = require('../models/User');
const secret = process.env.SECRET_KEY

const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        message: 'User already exists'
      })
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await UserModel.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`
    })
    console.log(secret);
    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: '1h'
    })
    return res.status(201).json({
      token, result
    })
  } catch (error) {
    return res.status(500).json({
      message: error
    })
  }
}
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        message: 'User does not exist'
      })
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'Password does not match'
      })
    }
    const result = { email: user.email, id: user._id, name: user.name }
    const token = jwt.sign(result, secret, {
      expiresIn: '1h'
    });
    return res.status(200).json({
      token, result
    })

  } catch (error) {
    return res.status(500).json({
      message: error
    })
  }
}

module.exports = {
  signup,
  login
}




