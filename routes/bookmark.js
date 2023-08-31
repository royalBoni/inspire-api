const router=require('express').Router()
const bookmarks_contoller=require('../controllers/bookmarks-controllers')

router.post('/:bookmarker_id/:post_id',bookmarks_contoller.createBookmark);
router.delete('/:post_id/:bookmarker_id',bookmarks_contoller.deleteBookmark);
router.get('/',bookmarks_contoller.fetchBookmark);


module.exports=router;