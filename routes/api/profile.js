// login & register
const express = require('express')
const router = express.Router()
const passport = require('passport')

const Profile = require('../../models/Profile')

// $router POST /api/profile/add
// @desc   添加条目
// @access private 
router.post('/add', passport.authenticate('jwt', {session:false}), (req, res) => {
  console.log(req.body)
  const {
    type,
    desc,
    income,
    expense,
    cash,
    comment
  } = req.body 

  const profileFileds = {}

  if(type) profileFileds.type = type
  if(desc) profileFileds.desc = desc
  if(income) profileFileds.income = income
  if(expense) profileFileds.expense = expense
  if(cash) profileFileds.cash = cash
  if(comment) profileFileds.comment = comment

  new Profile(profileFileds).save().then(profile => {
    res.json(profile)
  })
})

// $router GET /api/profile/:id
// @desc   获取单个
// @access private 
router.get('/:id', passport.authenticate('jwt', {session:false}), (req, res) => {
  Profile.findOne({
    _id: req.params.id
  }).then(profile => {
    if(!profile) res.status(404).json('不存在对应记录！')
    res.json(profile)
  }).catch(err => {
    res.status(400).json(err)
  })
})

// $router GET /api/profile/
// @desc   获取全部
// @access private 
router.get('/', (req, res) => {
  Profile.find()
         .then(profile => {
            if(!profile) res.status(404).json('不存在任何记录！')
            res.json(profile)
         })
         .catch(err => {
            res.status(400).json(err)
         })
})

// $router POST /api/profile/edit/:id
// @desc   编辑条目
// @access private 
router.post('/edit/:id', passport.authenticate('jwt', {session:false}), (req, res) => {
  console.log(req.body)
  const {
    type,
    desc,
    income,
    expense,
    cash,
    comment
  } = req.body 

  const profileFileds = {}

  if(type) profileFileds.type = type
  if(desc) profileFileds.desc = desc
  if(income) profileFileds.income = income
  if(expense) profileFileds.expense = expense
  if(cash) profileFileds.cash = cash
  if(comment) profileFileds.comment = comment

  Profile.findOneAndUpdate(
    {_id: req.params.id},
    {$set: profileFileds},
    {new: true}
  ).then(profile => res.json(profile))
})

// $router DELETE /api/profile/delete/:id
// @desc   删除条目
// @access private 
router.delete('/delete/:id', passport.authenticate('jwt', {session:false}), (req, res) => {
  Profile.findOneAndRemove({_id: req.params.id}).then(profile => {
    profile.save().then(res.json(profile))
  })
  .catch(err => res.status(404).json('删除失败！'))
})

module.exports = router