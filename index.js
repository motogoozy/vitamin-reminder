#!/usr/bin/env node

const nodemailer = require('nodemailer');
const cron = require('node-cron');
const fs = require('fs');
require('dotenv').config();

function main() {
  console.log('Job started...');
  const emails = JSON.parse(fs.readFileSync('./config.json')).emails;
  const cronTime = '0 10 * * *';

  cron.schedule(cronTime, () => {
    const { OUTLOOK_EMAIL, OUTLOOK_PW } = process.env;

    let transporter = nodemailer.createTransport({
      host: 'smtp-mail.outlook.com',
      secure: false,
      port: 587, // default port for insecure
      auth: {
        user: OUTLOOK_EMAIL,
        pass: OUTLOOK_PW,
      },
    });

    let mailOptions = {
      from: `"Vitamin Reminder" <${OUTLOOK_EMAIL}`,
      to: emails,
      subject: 'IMPORTANT',
      text: 'This is goozybot reminding you to give Sophia her vitamin :)',
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Reminder sent - ${Date().toString()}`);
      }
    });
  });
}

main();
