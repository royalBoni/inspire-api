const router=require('express').Router()
const resetSubmitEmailControllers=require('../controllers/resetSubmitEmail')
const {verifyJWT}=require('../middleware/verify.JWT')

router.post('/',resetSubmitEmailControllers.handleSubmitEmail)
router.post('/change',verifyJWT,resetSubmitEmailControllers.handleChangePassword)

module.exports=router