// login & register
const express = require('express')
const router = express.Router()

const User = require('../../models/User')
const bcrypt = require('bcrypt')
const gravatar = require('gravatar')

// $router /api/user/test
// @desc   返回json数据
// @access public
router.get('/test', (req, res) => {
  res.json({
    msg: 'test success'
  })
})

// $router /api/user/register
// @desc   返回json数据
// @access public
router.post('/register', (req, res) => {
  console.log(req.body)
  User.findOne({
    email: req.body.email
  }).then(user => {
    if(user) {
      res.status(400).json({email: '该邮箱已被注册！'})
    } else {
      const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'})
      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        avatar,
      })
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
          if(err) throw err
          newUser.password = hash
          newUser.save()
                 .then(user => {res.json(user)})
                 .catch(err => {console.log(err)})
        });
    });
    }
  })
})

// $router /api/user/login
// @desc   返回json数据
// @access public
router.post('/login', (req, res) => {
  User.findOne({
    email: req.body.email
  }).then(user => {
    if(!user) {
      res.status(404).json({email: '该用户不存在'})
    } else {
      bcrypt.compare(req.body.password, user.password)
            .then(isMatch => {
              if(isMatch) {
                res.json({msg: 'success'})
              } else {
                res.status(400).json({password: '密码错误'})
              }
            })
    }
  })
})

module.exports = router