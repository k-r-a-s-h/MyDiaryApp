const express = require('express')
const router = express.Router();
const { login } =require('../controllers/loginController')
const { loginValidation  } = require('../middlewares/loginValidation')

router.post('/',loginValidation,login)

module.exports = router;