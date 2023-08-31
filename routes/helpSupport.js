const router=require('express').Router()
const helpSuppor_controller=require('../controllers/helpSupport')
const multer =require('../config/multer');

router.post('/', helpSuppor_controller.reportBug)
router.post('/problem',multer.single('image'),helpSuppor_controller.reportProblem)

module.exports=router