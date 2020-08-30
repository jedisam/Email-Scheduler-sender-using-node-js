const User = require('../models/User');
const cron = require('node-cron'); // To Schedule an email with Day, Hour, Minute, Second
const email = require('./emailController');
const sms = require('./smsController');

// Get All Students
const getStudents = async grade => {
  const user = await User.find({ grade });
  if (!user) return;
  return user;
};

exports.addStudents = async (req, res) => {
  const newStudent = await User.create(req.body);
  return res.status(201).json({
    status: 'success',
    data: {
      data: newStudent,
    },
  });
};

// students Home Page
exports.studentsPage = (req, res) => res.json({ msg: 'Home Page' });

// send Notification with an Email or Sms
exports.sendNotification = (req, res) => {
  const { time1, time2, method } = req.body;

  // On the Video, I scheduled it for 6, 7 seconds. scheduled to be sent on work days

  if (method === 'email') {
    // send an email to Grade 9 & 12 students
    cron.schedule(`* ${time1} * * 1-5`, async () => {
      // get Grade 9 students
      const grade9 = await getStudents(9);
      // get grade 11 students
      const grade11 = await getStudents(11);
      // console.log(grade9);

      await Promise.all(
        grade9.map(async student => {
          await new email(student).sendLunchTimeAlert();
        }),
        grade11.map(async student => {
          await new email(student).sendLunchTimeAlert();
        })
      );
    });

    cron.schedule(`* ${time2} * * 1-5`, async () => {
      console.log('Hey');
      // get Grade 10 students
      const grade10 = await getStudents(10);
      // get grade 11 students
      const grade12 = await getStudents(12);
      // console.log(grade9);

      await Promise.all(
        grade10.map(async student => {
          await new email(student).sendLunchTimeAlert();
        }),
        grade12.map(async student => {
          await new email(student).sendLunchTimeAlert();
        })
      );
    });
  } else {
    cron.schedule(`* ${time1} * * 1-5`, async () => {
      console.log('Hey');
      // get Grade 9 students
      const grade9 = await getStudents(9);
      // get grade 11 students
      const grade11 = await getStudents(11);
      // console.log(grade9);

      await Promise.all(
        grade9.map(async student => {
          await new sms(student).sendMessage();
        }),
        grade11.map(async student => {
          await new sms(student).sendMessage();
        })
      );
    });

    cron.schedule(`* ${time1} * * 1-5`, async () => {
      console.log('Hey');
      // get Grade 10 students
      const grade10 = await getStudents(10);
      // get grade 11 students
      const grade12 = await getStudents(12);
      // console.log(grade9);

      await Promise.all(
        grade10.map(async student => {
          await new sms(student).sendMessage();
        }),
        grade12.map(async student => {
          await new sms(student).sendMessage();
        })
      );
    });
  }
};
