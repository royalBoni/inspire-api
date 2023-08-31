const router =require('express').Router()
const notification_controllers=require('../controllers/notification');

router.get('/:id',notification_controllers.fetchUserNotification);
router.post('/:initiator_id/:reciever_id',notification_controllers.createNotification)
router.delete('/:notification_id',notification_controllers.deleteNotification)

module.exports=router