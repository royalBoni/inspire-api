const router=require('express').Router();
const inspiration_controller=require('../controllers/inspirations-controllers');
const multer =require('../config/multer');

router.post('/',multer.single('image'),inspiration_controller.createInspiration);
router.delete('/:inspirationID/:userID',inspiration_controller.deleteInspiration);
router.get('/', inspiration_controller.fetchInspirations)

module.exports=router;