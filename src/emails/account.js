const sgMail = require("@sendgrid/mail");
const { response } = require("express");

const sendgridAPIKey =
  "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";

sgMail.setApiKey(sendgridAPIKey);

const sendWelcomeEmail = (email, name) => {
  sgMail
    .send({
      to: email,
      from: "lorent.sinani0@gmail.com",
      subject: "Thanks for joining in!",
      text: `Welcome to the app, ${name}. Let me know how you get along with the app!`,
    })
    .then((response) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);
    })
    .catch((error) => {
      console.log(error);
    });
};

const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "lorent.sinani@student.uni-pr.edu",
    subject: `Sorry to see you go ${name}`,
    text: `Before you leave ${name} could you tell us why are you leaving? Anything that we can improve?`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
};
