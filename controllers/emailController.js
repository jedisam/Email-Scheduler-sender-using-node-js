const nodemailer = require('nodemailer');

module.exports = class Email {
  constructor(user) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.from = `Yididya Samuel <${process.env.EMAIL_FROM}>`;
    this.subject = `Lunch Time for Grade ${user.grade} Students`;
    this.html = `<br/>
                <b>${this.firstName},</b>    
                 <br/>
                   <h3>This is your Lunch TIme</h3>
                   <p>${this.from}</p>
                   <p>School Adminstrator</p>
                 </br>
                 `;
  }

  newTransport() {
    return nodemailer.createTransport({
      // host: process.env.EMAIL_HOST,
      // PORT: process.env.EMAIL_PORT,
      service: 'gmail',
      auth: {
        // user: process.env.EMAIL_USERNAME,
        // pass: process.env.EMAIL_PASSWORD,
        user: 'yidisam18@gmail.com',
        pass: process.env.pwd,
      },
    });
  }

  // send the actual email
  async send(subject) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      html: this.html,
    };

    // 3) create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  //function to be called in the userController
  async sendLunchTimeAlert() {
    await this.send(this.subject);
    console.log('Sent!');
  }
};
