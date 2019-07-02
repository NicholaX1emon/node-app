// login & register
const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')
const passport = require('passport')

const User = require('../../models/User')
const keys = require('../../config/keys')


// $router POST /api/user/register
// @desc   注册
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
        identity: req.body.identity
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

// $router POST /api/user/login
// @desc   登录
// @access public
router.post('/login', (req, res) => {
  User.findOne({
    email: req.body.email
  }).then(user => {
    if(!user) {
      res.status(404).json('该用户不存在')
    } else {
      //密码匹配
      bcrypt.compare(req.body.password, user.password)
            .then(isMatch => {
              if(isMatch) {
                //配置token中可被解析出的数据
                const rule = {
                  id: user.id, 
                  name: user.username,
                  avatar: user.avatar,
                  identity: user.identity
                }
                jwt.sign(rule, keys.secretOrKey, {expiresIn: 3600}, (err, token) => {
                  if(err) console.error(err)
                  res.json({success: true, token: `Bearer ${token}`})
                })
              } else {
                res.status(400).json('密码错误')
              }
            })
    }
  })
})

// $router GET /api/user/info
// @desc   携带token请求私人信息
// @access private
router.get('/info', passport.authenticate('jwt', {session: false}), (req, res) => {
  //返回 passport 成功回调done()返回的user
  res.json(req.user)
})

module.exports = router