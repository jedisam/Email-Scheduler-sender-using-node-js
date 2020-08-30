const Nexmo = require('nexmo');

const nexmo = new Nexmo(
  {
    apiKey: process.env.apiKey,
    apiSecret: process.env.apiSecret,
  },
  { debug: true }
);

module.exports = class Sms {
  constructor(user) {
    this.number = user.number;
    this.message = `It's Lunch Time for Grade ${user.grade} students!`;
  }

  sendMessage = async () => {
    await nexmo.message.sendSms(
      '120348525',
      this.number,
      this.message,
      { type: 'unicode' },
      (err, res) => {
        if (err) console.log(err);
        else {
          // console.dir(res)
          const data = {
            id: res.messages[0]['message-id'],
            number: res.messages[0]['to'],
          };
        }
      }
    );
  };
};
