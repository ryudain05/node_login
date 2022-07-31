'use strict'

//로그인, 회원가입 컨트롤러 기능
const User = require('../../models/User')

const output = {
  hello: (req, res) => {
    //기능
    res.render('home/index')
  },

  login: (req, res) => {
    res.render('home/login')
  },
  register: (req, res) => {
    res.render('home/register')
  },
}

const process = {
  //로그인
  login: async (req, res) => {
    const user = new User(req.body)
    const response = await user.login()
    return res.json(response)
  },
  //회원가입
  register: async (req, res) => {
    const user = new User(req.body)
    const response = await user.register()
    return res.json(response)
  },

  //중복확인
  overlapCheck: async (req, res) => {
    const user = new User(req.body)
    // console.log(req.body.checkType)
    const response = await user.overlapCheck(req.body.checkType)
    return res.json(response)
  },
}

module.exports = {
  output,
  process,
}
