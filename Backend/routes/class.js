const express = require('express');
const router = express.Router();

const isAuth = require('../middleware/auth');
const classController = require('../controllers/class');
// POST /schedule/save-class
router.post('/save-classes',isAuth, classController.saveClasses)

router.get('/find-class/:subjectCode', isAuth, classController.findClass);

module.exports = router;
