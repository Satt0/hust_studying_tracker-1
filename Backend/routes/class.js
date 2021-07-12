const express = require('express');
const router = express.Router();

const isAuth = require('../middleware/auth');
const classController = require('../controllers/class');
// POST /schedule/save-class
router.post('/save-schedule',isAuth, classController.saveSchedule);

router.get('/get-schedule', isAuth, classController.getSchedule);

router.post('/update-schedule', isAuth, classController.updateSchedule);

router.get('/find-class/:subjectCode', isAuth, classController.findClass);

//router.post('/add-subject', classController.addSubject);


module.exports = router;
