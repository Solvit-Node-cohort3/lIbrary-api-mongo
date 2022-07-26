const express = require('express')
const {register, login} = require('../controllers/users')

const router = express.Router({mergeParams:true});

router.route('/').post(register)
router.route('/login').post(login)

module.exports = router 