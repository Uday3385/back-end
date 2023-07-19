const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    // host: constants.SMTP_HOST,
    // port: constants.SMTP_PORT,
    secure: false,
    socketTimeout: 50000,
    auth: {
        // user: constants.SMTP_AUTH_USER,
        // pass: process.env.NO_REPLY_PWD,
    },
});

exports.sendMail = async (toEmail, subject, emailHTML) => {
    try {
        const info = await transporter.sendMail({
            from: 'sohail.shaikh@intely.io',
            to: toEmail,
            subject: subject,
            html: emailHTML,
        });
        return { info: info };
    } catch (error) {
        return { message: error.message, error: error };
    }
};
