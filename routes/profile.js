const router=require('express').Router();
const profile_controllers=require('../controllers/profile-controllers');
const multer=require('../config/multer')

router.post('/',multer.single('image'), profile_controllers.createProfile);
router.put('/',multer.single('image'), profile_controllers.editProfile);
router.get('/', profile_controllers.fetchProfile);

module.exports=router