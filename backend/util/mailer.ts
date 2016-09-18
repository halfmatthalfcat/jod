import * as mail from "nodemailer";
import * as jwt from "jwt-simple";
import {IUser} from "../../common/models/models";
import {Transporter} from "nodemailer";
import {SmtpOptions} from "nodemailer-smtp-transport";

export class Mailer {

  private client: Transporter;

  private jwtSecret: string;

  constructor(config: any) {
    this.client = mail.createTransport({
      pool: true,
      host: config.mail.host,
      port: config.mail.port,
      secure: true,
      auth: {
        user: config.mail.username,
        pass: config.mail.password
      }
    } as SmtpOptions);
    this.jwtSecret = config.jwt.secret;
  }

  public sendLoginMail(user: IUser): Promise<void> {
    console.log(user);
    const expiry = new Date();
    const jwtPayload = {
      iss: "joliverdecor.com",
      sub: user.userId,
      exp: expiry.setDate(expiry.getDate() + 3).valueOf()
    };
    const token = jwt.encode(jwtPayload, this.jwtSecret, "HS512");
    const mailOpts = {
      from: "admin <admin@joliverdecor.com>",
      to: user.email,
      subject: "JOliverDecor Login",
      text: `Hi, ${user.username}! Log into JOliverDecor with the link below.\n\nhttp://www.joliverdecor.com/login/${token}`
    };
    return new Promise<void>((resolve, reject) => {
      this.client.sendMail(mailOpts, (err, info) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }



}