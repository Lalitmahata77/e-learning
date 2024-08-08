import nodemailer from "nodemailer"
import path from "path"
import ejs from "ejs"
const sendEmail =async (options)=>{
    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASSWORD
          
        },
       
      });
      const {email,subject,template,data} = options
      const templatePath = path.join(__dirname,"../mails",template)
      const html = await ejs.renderFile(templatePath,data)
      const mailOption = {
        from : process.env.SMTP_EMAIL,
        to : email,
        subject,
        html
      }
      await transport.sendMail(mailOption)
    }
    export default sendEmail