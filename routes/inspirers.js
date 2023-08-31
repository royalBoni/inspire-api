const router=require('express').Router()
const inspirers_contoller=require('../controllers/inspirers-controllers')

router.post('/:fan_id/:inspirer_id',inspirers_contoller.createInspirer);
router.delete('/:fan_id/:follow_id',inspirers_contoller.deleteInspirer);
router.get('/',inspirers_contoller.fetchInspirers);

module.exports=router