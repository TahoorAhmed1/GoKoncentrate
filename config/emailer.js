var nodemailer = require('nodemailer');//Import the nodemailer package.

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'test978056@gmail.com',
        pass: 'cqlsystesting123'
    }
});
sendEMail = (mailOptions) => {
    transporter
        .sendMail(mailOptions, function (error, info) {
            if (error) {
                //console.log(error);
		        //return res.status(500).json({"status": false, "message": error, "result": {}})

            } else {
               console.log('Email sent: ' + info.response);
            }
        })
}
module.exports.sendEMail = sendEMail;
