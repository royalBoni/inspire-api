const router = require('express').Router();
const users_controllers =require('../controllers/users-controllers')
const {verifyJWT} =require('../middleware/verify.JWT')


router.post('/register', users_controllers.createUser);
router.post('/login', users_controllers.handleUserserLogin);
router.get('/info/:id', users_controllers.handleUserInfo);
router.post('/update/password', verifyJWT,users_controllers.editUser);
module.exports=router