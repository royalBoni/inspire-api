const router=require('express').Router()
const likes_contoller=require('../controllers/likes-controllers')

router.post('/:liker_id/:post_id',likes_contoller.createLike);
router.delete('/:liker_id/:post_id',likes_contoller.deleteLike);
router.get('/',likes_contoller.fetchLikes);


module.exports=router;