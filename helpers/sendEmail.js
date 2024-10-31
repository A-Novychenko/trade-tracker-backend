const nodemailer = require("nodemailer");

const {GMAIL_EMAIL, GMAIL_PASSWORD} = process.env;

const nodemailerConfig = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: GMAIL_EMAIL,
    pass: GMAIL_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = {...data, from: GMAIL_EMAIL};
  await transport.sendMail(email);
  return true;
};

module.exports = sendEmail;
// const nodemailer = require("nodemailer");

// const {UKR_NET_EMAIL, UKR_NET_PASSWORD} = process.env;

// const nodemailerConfig = {
//   host: "smtp.ukr.net",
//   port: 465,
//   secure: true,
//   auth: {
//     user: UKR_NET_EMAIL,
//     pass: UKR_NET_PASSWORD,
//   },
// };

// const transport = nodemailer.createTransport(nodemailerConfig);

// const sendEmail = async (data) => {
//   const email = {...data, from: UKR_NET_EMAIL};
//   await transport.sendMail(email);
//   return true;
// };

// module.exports = sendEmail;
