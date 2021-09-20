const express = require('express')
const router = express.Router();
const { signUpController } = require('../controllers/signUpController')
const { signUpValidation } = require('../middlewares/signupValidation')

router.post('/',signUpValidation,signUpController)

module.exports = router;