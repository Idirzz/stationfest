const router = require("express").Router();

const helloController = require('../controllers/room');

router.post('/postRooms', helloController.getRooms);
router.post('/bookRoom', helloController.bookRoom);
router.get('/getEquipements', helloController.getListEquipements);

module.exports = router;