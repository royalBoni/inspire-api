const router =require('express').Router();
const comment_controller=require('../controllers/comments-controllers');

router.post('/:userID/:post_id',comment_controller.createComment);
router.delete('/:userID/:comment_id',comment_controller.deleteComment);
router.put('/:comment_id',comment_controller.editComment);
router.get('/',comment_controller.fetchComments);

module.exports=router;
