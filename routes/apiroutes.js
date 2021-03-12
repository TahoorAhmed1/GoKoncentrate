const express = require('express');
const router = express.Router();
const security = require('../config/securitykey')
const auth = require('../config/auth')
const validate = require('../config/validation')
const userSchema =require('../schemas/user.json')
const {checkSchema}=require('express-validator')
const userController = require('../controllers/user_controller')

router.post('/upload', security.checkSecurityKey, userController.upload)
router.post('/signup', security.checkSecurityKey, checkSchema(userSchema.signup),validate,userController.signup)
router.post('/login', security.checkSecurityKey,checkSchema(userSchema.login),validate ,userController.login)
router.post('/forgot/password', security.checkSecurityKey,checkSchema(userSchema.forgotPassword),validate, userController.forgot_password);
router.post('/sociallogin',security.checkSecurityKey,userController.socialLogin2)
router.get('/profile',security.checkSecurityKey,auth.checkToken,userController.getProfile)

router.post('/resend/otp',security.checkSecurityKey,auth.checkToken,userController.resendOtp)
router.post('/verify/otp',security.checkSecurityKey,auth.checkToken,userController.verifyOtp)


module.exports = router
