const router =require('express').Router()
const notificationCounter_controllers=require('../controllers/notificationCounter-controller');

router.post('/:userID',notificationCounter_controllers.createNotificationCounter)
router.get('/load/:userID',notificationCounter_controllers.LoadingNotificationCounter)
router.post('/unload/:userID',notificationCounter_controllers.UnloadingNotificationCounter)

module.exports=router