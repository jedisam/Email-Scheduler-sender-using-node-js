const express = require('express');
const {
  addStudents,
  studentsPage,
  sendNotification,
} = require('../controllers/userController');
const router = express.Router();

router
  .route('/')
  .post(addStudents)
  .get((req, res) => {
    res.render('index', { title: 'Admin Page' });
  });
router.route('/send').post(sendNotification);

module.exports = router;
