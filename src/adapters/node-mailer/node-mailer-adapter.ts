import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer"

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.NODEMAILER_MAILTRAP_USER,
        pass: process.env.NODEMAILER_MAILTRAP_PASS
    }
});

export class NodeMailerMailAdapter implements MailAdapter {
    async sendmail({ subject, body }: SendMailData) {

        await transport.sendMail({
            from: "equipe feedget <contato@feedget.com>",
            to: "Fernando Moura <nandumoura@gmail.com>",
            subject,
            html: body
        })

    }

}
