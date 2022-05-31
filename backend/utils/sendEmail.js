const nodemailer = require("nodemailer")

module.exports = async ({email,subject,message}) =>{
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_EMAIL_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      const messageContent = {
        from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to:email,
        subject:subject,
        text:message
      }
      await transporter.sendMail(messageContent)
    } catch (error) {
      console.log(error)
    }
}

