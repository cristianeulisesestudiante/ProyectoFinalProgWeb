const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
   service: "gmail",
   secure: false,
   port: 587,
   auth: {
      user: "delacruzmaicol02@gmail.com",
      pass: "umtfotehummkjgam",
   },
   tls: {
      rejectUnauthorized: false,
   },
});

module.exports = transporter;
