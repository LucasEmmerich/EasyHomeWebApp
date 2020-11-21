const nodemailer = require('nodemailer');
const config = require('../../package.json').config;

module.exports = {
    sendMail: (To,text) => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: config.systemMail.email,
              pass: config.systemMail.password
            }
        });

        let info = await transporter.sendMail({
            from: config.systemMail.email,
            to: To, 
            subject: "EasyHome", 
            text: text,
            html: "", 
        });

        console.log(info);
    }
}