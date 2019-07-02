const express = require('express');
const scheduleController = require('../controllers/scheduleController');
const router = express.Router();
const expressValidator = require('express-validator');
router.use(expressValidator());

router.post('/schedule/', scheduleController.create);
router.get('/schedule/', scheduleController.get);
router.delete('/schedule/', scheduleController.remove);
router.put('/schedule/', scheduleController.edit);
//
//
//
module.exports = router;
