import config from "config";
import { convert } from "html-to-text";
import nodemailer from "nodemailer";
import pug from "pug";
import { User } from "../entities/user.entity";

const smtp = config.get<{
  host: string;
  port: number;
  user: string;
  pass: string;
}>("smtp");

export default class Email {
  firstName: string;
  to: string;
  from: string;

  constructor(private user: User, private url: string) {
    this.firstName = user.name.split(" ")[0];
    this.to = user.email;
    this.from = smtp.user;
  }

  private newTransport() {
    // if (process.env.NODE_ENV === 'production') {
    //   console.log('Hello')
    // }

    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtp.user,
        pass: smtp.pass,
      },
    });
  }

  private async send(template: string, subject: string) {
    // Generate HTML template based on the template string
    const html = pug.renderFile(`${__dirname}/../../views/${template}.pug`, {
      firstName: this.firstName,
      subject,
      url: this.url,
    });

    // Create mailOptions
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: convert(html),
      html,
    };

    // Send email
    const info = await this.newTransport().sendMail(mailOptions);
    console.log(nodemailer.getTestMessageUrl(info));
  }

  async sendVerificationCode() {
    await this.send("verificationCode", "Twój kod weryfikacyjny");
  }

  async sendPasswordResetToken() {
    await this.send(
      "resetPassword",
      "Twój token resetujący hasło (ważny tylko przez 10 minut)"
    );
  }
}
