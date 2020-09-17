var uuid = require('uuid');
var path  = require('path');
const crypto = require('crypto');
var nodemailer = require('nodemailer');

exports.imageUpload = image => {
    if (image) {
        var extension = path.extname(image.name);
        var filename = uuid() + extension;
        var sampleFile = image;

        sampleFile.mv(process.cwd() + '/public/images/users/' + filename, (err) => {
            if (err) throw err;
        });

        return filename;
    }
}

exports.imageUpload2 = image => {
    if (image) {
        var extension = path.extname(image.name);
        var filename = uuid() + extension;
        var sampleFile = image;

        sampleFile.mv(process.cwd() + '/public/images/posts/' + filename, (err) => {
            if (err) throw err;
        });

        return filename;
    }
}

exports.crypt = password => {
	const hash = crypto.createHmac('md5', password)
		.update('')
		.digest('hex');
	return hash;
}

exports.nodemailerContactreply = async (to, data) => {
    try {
        var transporter = await nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'test978056@gmail.com',
            pass: 'cqlsystesting123'
          }
        });
        
        var html = '';
        
        var subject = 'SkyApp replied to your message!';
        
        html = '<div class="col-md-12"><p><b>Your Message</b></p><p>'+data.message+'</p><p><b>Reply</b></p><p>'+data.reply+'</p></div>';

        var mailOptions = {
          from: 'test978056@gmail.com',
          to: to,
          subject: subject,
          html: html
        };

        const mail = await transporter.sendMail(mailOptions);
        return mail;
    } catch (err) {
        throw err;
    }
}

exports.sendHelpMail = async (to, data) => {
    try {
        var transporter = await nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'test978056@gmail.com',
            pass: 'cqlsystesting123'
          }
        });
        
        var html = '';
        var priority = '';
        
        var subject = data.subject;

        priority = '<div class="col-md-12"><h4 style="color: orange">PRIORITY:- '+data.priority.toUpperCase()+'</h4></div>';
        
        html = priority+data.message;

        var mailOptions = {
          from: 'test978056@gmail.com',
          to: to,
          subject: subject,
          html: html
        };

        const mail = await transporter.sendMail(mailOptions);
        return mail;
    } catch (err) {
        throw err;
    }
}

exports.nodemailerForgotPassword = async (to, data) => {
    try {
        var transporter = await nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'test978056@gmail.com',
            pass: 'cqlsystesting123'
          }
        });
        
        var html = '';
        
        var subject = "SkyApp Reset Password Code";

        html = '<div class="col-md-12">CODE:- '+data.code+'</div>';
        
        var mailOptions = {
          from: 'test978056@gmail.com',
          to: to,
          subject: subject,
          html: html
        };

        const mail = await transporter.sendMail(mailOptions);
        return mail;
    } catch (err) {
        throw err;
    }
}