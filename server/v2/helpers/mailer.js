import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

class Mailer {
  static async sendMail({
    id, title, firstname, lastname,
  }, { status }) {
    const transporter = nodemailer.createTransport(
      {
        service: 'gmail',
        auth: {
          user: process.env.USER_ACC,
          pass: process.env.USER_PASS,
        },
        logger: false,
        debug: false,
      },
      {
        from: 'Elvis Dev <elvissoftdeveloper@gmail.com>',
      },
    );

    const messageObj = {
      to: 'Elvis Rugamba <elvisrugamba@gmail.com>',
      subject: 'Incident status changed',
      text: `Hello ${firstname} ${lastname}`,
      html: `<p><b>Hello</b> ${firstname} ${lastname}</p>
            <p>Your incident status has been changed to <b>${status}</b></p>
            <p><b>IncidentId: </b>${id}</p>
            <p><b>Title: </b>${title}</p>`,
    };

    await transporter.sendMail(messageObj);
    transporter.close();
  }
}

export default Mailer;