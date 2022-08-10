import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "../mail-adapter";


export const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "2459b6ce98551d",
    pass: "2bc53deda2480c"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail(data: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feeget <oi.@feedget.com>',
      to: 'Pedro Henrique <pedrohenriquelimadelima@gmail.com>',
      subject: data.subject,
      html: data.body,
    });
  }
}