require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // use your email service provider here, e.g., 'gmail'
    auth: {
        user: process.env.EMAIL_USER, // your email address
        pass: process.env.EMAIL_KEY  // your email password or app-specific password
    }
});


const sendOtpEmail = (to, otp) => {
    const subject = 'OTP Verification';
    //   const text = `Your OTP code is ${otp}. It is valid for 5 minutes.`;
    const html = `<div>AawaraEthincs</div>
            <div>
              <p>Your OTP for verification <b>${otp}</b>.Do not share this OTP with anyone.</p>
              <p>Thank You!</p>
            </div>`;

    const mailOptions = {
        from: process.env.EMAIL_USER, // sender address
        to: to,                       // list of receivers
        subject: subject,             // Subject line
        html: html                    // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('OTP email sent: %s', info.messageId);
    });
};

const sendOrderMail = () => {
    const subject = 'A Order has been placed!!';
    const html = `<div>AawaraEthincs</div>
            <div>
                <p>A new Order has been placed!</p>
                <p>Kindly Login and Check the Status!</p>
            </div>`;

    const mailOptions = {
        from: process.env.EMAIL_USER, // sender address
        to: 'jatinvardhani@gmail.com',                       // list of receivers
        subject: subject,             // Subject line
        html: html                    // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('new order placed');
    });
};


const sendIssueReported = (subject,main,orderid) => {
    const Subject = `${subject}`;
    const html = `<div>AawaraEthincs</div>
            <div>
                <p>A new issue has been reported for the ORDER_ID:${orderid}</p>
                <P>${main}</p>
                <p>Kindly Login and Check the Status!</p>
            </div>`;

    const mailOptions = {
        from: process.env.EMAIL_USER, // sender address
        to: 'jatinvardhani@gmail.com',                       // list of receivers
        subject: Subject,             // Subject line
        html: html                    // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('new issuse reported!');
    });
};




// module.exports = sendOrderMail
module.exports = {sendOtpEmail,sendOrderMail,sendIssueReported};
