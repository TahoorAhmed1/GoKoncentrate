/* const bcrypt = require('bcrypt'); */
const config = require('./config');
//const contant = require('../constant');
const crypto = require('crypto');
const path = require('path');
const { v4: uuidv4 } = require('uuid');


module.exports = {
    vaildObject: async function (required, non_required, res) {
        let message = '';
        let empty = [];
        let table_name = (required.hasOwnProperty('table_name')) ? required.table_name : 'users';

        for (let key in required) {
            if (required.hasOwnProperty(key)) {
                if (required[key] == undefined || required[key] == '') {
                    empty.push(key);
                }
            }
        }

        if (empty.length != 0) {
            message = empty.toString();
            if (empty.length > 1) {
                message += " fields are required"
            } else {
                message += " field is required"
            }
            // res.status(400).json({
            //     'success': false,
            //     'message': message,
            //     'code': 400,
            //     'body': {}
            // });
            throw message;
            // return;
        } else {
            if (required.hasOwnProperty('security_key')) {
                if (required.security_key != "guardapp@001") {
                    message = "Invalid security key";
                    res.status(400).json({
                        'success': false,
                        'message': message,
                        'code': 400,
                        'body': []
                    });
                    res.end();
                    return false;
                }
            }
            if (required.hasOwnProperty('password')) {
                // const saltRounds = 10;
                // var myPromise = await new Promise(function (resolve, reject) {
                //     bcrypt.hash(required.password, saltRounds, function (err, hash) {
                //         if (!err) {

                //             resolve(hash);
                //         } else {
                //             reject('0');
                //         }
                //     });
                // });
                // // required.password= crypto.createHash('sha1').update(required.password).digest('hex');
                // required.password = myPromise;
                // required.password = await this.getBcryptHash(required.password);
            }

            /* if (required.hasOwnProperty('checkexit')) {
                if (required.checkexit === 1) {
                    if (required.hasOwnProperty('email')) {
                        required.email = required.email.toLowerCase();

                        if (await this.checking_availability(required.email, 'email', table_name)) {
                            message = "this email is already register kindly use another";
                            res.status(403).json({
                                'success': false,
                                'message': message,
                                'code': 403,
                                'body': []
                            });
                            res.end();
                            return false;
                        }
                    }
                    if (required.hasOwnProperty('name') && required.name != undefined) {
                        required.name = required.name.toLowerCase();

                        if (await this.checking_availability(required.name, 'name', table_name)) {
                            message = "name is already in use";
                            res.status(403).json({
                                'success': false,
                                'message': message,
                                'code': 403,
                                'body': []
                            });
                            return false;
                        }
                    }

                }
            }


            if (non_required.hasOwnProperty('name') && non_required.name != undefined) {
                non_required.name = non_required.name.toLowerCase();

                if (await this.checking_availability(non_required.name, 'name', table_name)) {
                    message = "name is already in use";
                    res.status(403).json({
                        'success': false,
                        'message': message,
                        'code': 403,
                        'body': []
                    });
                    return false;
                }
            } */

            const marge_object = Object.assign(required, non_required);
            delete marge_object.checkexit;

            for (let data in marge_object) {
                if (marge_object[data] == undefined) {
                    delete marge_object[data];
                } else {
                    if (typeof marge_object[data] == 'string') {
                        marge_object[data] = marge_object[data].trim();
                    }
                }
            }

            return marge_object;
        }
    },

    error: function (res, err) {
        console.log(err);
        console.log('error');
        // console.log(JSON.stringify(ReferenceError));
        // console.log(ReferenceError);
        // return false;
        let code = (typeof err === 'object') ? ((err.statusCode) ? err.statusCode : ((err.code) ? err.code : 403)) : 403;
        let message = (typeof err === 'object') ? (err.message) : err;
        // console.log(code);
        // console.log(message);
        // return false;
        res.status(code).json({
            'success': false,
            'error_message': message,
            'code': code,
            'body': []
        });
    },

    getBcryptHash: async (keyword) => {
        const saltRounds = 10;
        var myPromise = await new Promise(function (resolve, reject) {
            bcrypt.hash(keyword, saltRounds, function (err, hash) {
                if (!err) {

                    resolve(hash);
                } else {
                    reject('0');
                }
            });
        });
        // required.password= crypto.createHash('sha1').update(required.password).digest('hex');
        keyword = myPromise;
        return keyword;
    },

    comparePass: async (requestPass, dbPass) => {
        const match = await bcrypt.compare(requestPass, dbPass);
        return match;
    },

    // sendMail: function(object){
    // 	const nodemailer = require('nodemailer');
    //     var transporter = nodemailer.createTransport('SMTP',contant.mail_auth);

    // 	var mailOptions = object;
    // 	transporter.sendMail(mailOptions, function(error, info){
    // 	if (error) {
    // 		console.log(error);
    // 	} else {
    //        /*  console.log(info); */
    // 		console.log('Email sent: ' + info.messageId);
    // 	}
    // 	});
    // },
    Notification: function (object) {
        var FCM = require('fcm-node');
        var serverKey = 'YOURSERVERKEYHERE'; //put your server key here
        var fcm = new FCM(serverKey);

        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            to: '',
            /* collapse_key: 'your_collapse_key', */

            notification: {
                title: 'Title of your push notification',
                body: 'Body of your push notification'
            },

            data: {  //you can send only notification or only data(or include both)
                my_key: 'my value',
                my_another_key: 'my another value'
            }
        };

        fcm.send(message, function (err, response) {
            if (err) {
                console.log("Something has gone wrong!");
            } else {
                console.log("Successfully sent with response: ", response);
            }
        });


    },
    /* send_emails: function(otp,data,resu) {
       
       try {
           const nodemailer = require('nodemailer');
       
               var transporter = nodemailer.createTransport({
               service: 'gmail',
               auth: {
               user: 'test978056@gmail.com',
               pass: 'cqlsys123'
               }
               });
               var mailOptions = {
               from: 'test978056@gmail.com',
               to: data[0].email,
               subject: 'Streetfood: Forgot password',
               html: 'Click here for change password <a href="http://192.168.1.120:3000/api/url/' + auth_key + '"> Click</a>'
               
               };                
               transporter.sendMail(mailOptions, function (error, info) {
               if (error) {
               console.log(error);
               } else {
               console.log(info);
               res.send('Email send');
               }
             });
            return resu;
       } catch (err) {
         throw err;
       }
       }, */

    createSHA1: function () {
        let key = 'abc' + new Date().getTime();
        return crypto.createHash('sha1').update(key).digest('hex');
    },
    image_upload: async function (image) {
        if (image) {
            //path
            var extension = path.extname(image.name);
            var filename = uuidv4() + extension;
            var sampleFile = image;
            sampleFile.mv(process.cwd() + '/public/upload/' + filename, (err) => {
                if (err) throw err;
            });

            return filename;
        }

    },
    imageUpload: (file, folder) => {
        if (file.name == '') return;

        let file_name_string = file.name;
        var file_name_array = file_name_string.split(".");
        var file_extension = file_name_array[file_name_array.length - 1];
        var letters = "ABCDE1234567890FGHJK1234567890MNPQRSTUXY";
        var result = "";
        result = uuidv4();
        let name = result + '.' + file_extension;
        file.mv('public/images/' + folder + '/' + name, function (err) {
            if (err) throw err;
        });
        return name;
    },
    makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
    resendOtpEmail:function(req,otp,user){
        try{
            const nodemailer = require('nodemailer');

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'cqlsystest52@gmail.com',
                    pass: 'cqlsystest@123'
                }
            });
            var mailOptions = {
                from: 'cqlsystest52@gmail.com',
                to: data.dataValues.email,
                subject: 'GoKoncentrate app: Verification Otp',
                html: `

                <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
                <head>
                    <!--[if gte mso 9]>
                    <xml>
                        <o:OfficeDocumentSettings>
                        <o:AllowPNG/>
                        <o:PixelsPerInch>96</o:PixelsPerInch>
                        </o:OfficeDocumentSettings>
                    </xml>
                    <![endif]-->
                    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="format-detection" content="date=no" />
                    <meta name="format-detection" content="address=no" />
                    <meta name="format-detection" content="telephone=no" />
                    <meta name="x-apple-disable-message-reformatting" />
                    <!--[if !mso]><!-->
                    <link href="https://fonts.googleapis.com/css?family=PT+Sans:400,400i,700,700i&display=swap" rel="stylesheet" />
                    <!--<![endif]-->
                    <title>Email Template</title>
                    <!--[if gte mso 9]>
                    <style type="text/css" media="all">
                        sup { font-size: 100% !important; }
                    </style>
                    <![endif]-->
                    <!-- body, html, table, thead, tbody, tr, td, div, a, span { font-family: Arial, sans-serif !important; } -->
                    
                
                    <style type="text/css" media="screen">
                        body { padding:0 !important; margin:0 auto !important; display:block !important; min-width:100% !important; width:100% !important; background:#f4ecfa; -webkit-text-size-adjust:none }
                        a { color:#f3189e; text-decoration:none }
                        p { padding:0 !important; margin:0 !important } 
                        img { margin: 0 !important; -ms-interpolation-mode: bicubic; /* Allow smoother rendering of resized image in Internet Explorer */ }
                
                        a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; }
                        
                        .btn-16 a { display: block; padding: 15px 35px; text-decoration: none; }
                        .btn-20 a { display: block; padding: 15px 35px; text-decoration: none; }
                
                        .l-white a { color: #ffffff; }
                        .l-black a { color: #282828; }
                        .l-pink a { color: #f3189e; }
                        .l-grey a { color: #6e6e6e; }
                        .l-purple a { color: #9128df; }
                
                        .gradient { background: linear-gradient(to right, #9028df 0%,#f3189e 100%); }
                
                        .btn-secondary { border-radius: 10px; background: linear-gradient(to right, #9028df 0%,#f3189e 100%); }
                
                                
                        /* Mobile styles */
                        @media only screen and (max-device-width: 480px), only screen and (max-width: 480px) {
                            .mpx-10 { padding-left: 10px !important; padding-right: 10px !important; }
                
                            .mpx-15 { padding-left: 15px !important; padding-right: 15px !important; }
                
                            u + .body .gwfw { width:100% !important; width:100vw !important; }
                
                            .td,
                            .m-shell { width: 100% !important; min-width: 100% !important; }
                            
                            .mt-left { text-align: left !important; }
                            .mt-center { text-align: center !important; }
                            .mt-right { text-align: right !important; }
                            
                            .me-left { margin-right: auto !important; }
                            .me-center { margin: 0 auto !important; }
                            .me-right { margin-left: auto !important; }
                
                            .mh-auto { height: auto !important; }
                            .mw-auto { width: auto !important; }
                
                            .fluid-img img { width: 100% !important; max-width: 100% !important; height: auto !important; }
                
                            .column,
                            .column-top,
                            .column-dir-top { float: left !important; width: 100% !important; display: block !important; }
                
                            .m-hide { display: none !important; width: 0 !important; height: 0 !important; font-size: 0 !important; line-height: 0 !important; min-height: 0 !important; }
                            .m-block { display: block !important; }
                
                            .mw-15 { width: 15px !important; }
                
                            .mw-2p { width: 2% !important; }
                            .mw-32p { width: 32% !important; }
                            .mw-49p { width: 49% !important; }
                            .mw-50p { width: 50% !important; }
                            .mw-100p { width: 100% !important; }
                
                            .mmt-0 { margin-top: 0 !important; }
                        }
                
                            </style>
                </head>
                <body class="body" style="padding:0 !important; margin:0 auto !important; display:block !important; min-width:100% !important; width:100% !important; background:#f4ecfa; -webkit-text-size-adjust:none;">
                    <center>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 0; padding: 0; width: 100%; height: 100%;" bgcolor="#f4ecfa" class="gwfw">
                            <tr>
                                <td style="margin: 0; padding: 0; width: 100%; height: 100%;" align="center" valign="top">
                                    <table width="600" border="0" cellspacing="0" cellpadding="0" class="m-shell">
                                        <tr>
                                            <td class="td" style="width:600px; min-width:600px; font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td class="mpx-10">
                                                            
                                                            <!-- Container -->
                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                <tr>
                                                                    <td class="gradient pt-10" style="border-radius: 10px 10px 0 0; padding-top: 10px;" bgcolor="#f3189e">
                                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                            <tr>
                                                                                <td style="border-radius: 10px 10px 0 0;" bgcolor="#ffffff">
                                                                                    <!-- Logo -->
                                                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                        <tr>
                                                                                            <td class="img-center p-30 px-15" style="font-size:0pt; line-height:0pt; text-align:center; padding: 30px; padding-left: 15px; padding-right: 15px;">
                                                                                                <!-- <a href="#" target="_blank"><img src="../images/logo.png" width="112" height="43" border="0" alt="" /></a> -->
                                                                                            </td>
                                                                                        </tr>
                                                                                    </table>
                                                                                    <!-- Logo -->
                                                            
                                                                                    <!-- Main -->
                                                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                        <tr>
                                                                                            <td class="px-50 mpx-15" style="padding-left: 50px; padding-right: 50px;">
                                                                                                <!-- Section - Intro -->
                                                                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                                    <tr>
                                                                                                        <td class="pb-50" style="padding-bottom: 50px;">
                                                                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                                                <tr>
                                                                                                                    <td class="fluid-img img-center pb-50" style="font-size:0pt; line-height:0pt; text-align:center; padding-bottom: 50px;">
                                                                                                                        <img src="../images/img_intro_1.png" width="283" height="300" border="0" alt="" />
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td class="title-36 a-center pb-15" style="font-size:36px; line-height:40px; color:#282828; font-family:'PT Sans', Arial, sans-serif; min-width:auto !important; text-align:center; padding-bottom: 15px;">
                                                                                                                        <strong>Hey {{user.name}}!</strong>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td class="text-16 lh-26 a-center pb-25" style="font-size:16px; color:#6e6e6e; font-family:'PT Sans', Arial, sans-serif; min-width:auto !important; line-height: 26px; text-align:center; padding-bottom: 25px;">
                                                                                                                    Please use this otp below to verify you account.
                                                                                                                    <br>Otp : {{otp}}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                
                                                                                                            </table>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </table>
                                                                                                <!-- END Section - Intro -->
                                                            
                                                                                                <!-- Section - Separator Line -->
                                                                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                                    <!-- <tr>
                                                                                                        <td class="pb-50" style="padding-bottom: 50px;">
                                                                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                                                <tr>
                                                                                                                    <td class="img" height="1" bgcolor="#ebebeb" style="font-size:0pt; line-height:0pt; text-align:left;">&nbsp;</td>
                                                                                                                </tr>
                                                                                                            </table>
                                                                                                        </td>
                                                                                                    </tr> -->
                                                                                                </table>
                                                                                                <!-- END Section - Separator Line -->
                                                            
                                                                                            </td>
                                                                                        </tr>
                                                                                    </table>
                                                                                    <!-- END Main -->
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            <!-- END Container -->
                                                            
                                                            <!-- Footer -->
                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                    <tr>
                                                                        <td class="p-50 mpx-15" bgcolor="#949196" style="border-radius: 0 0 10px 10px; padding: 13px;">
                                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                
                                                                                <tr>
                                                                                    <td class="text-14 lh-24 a-center c-white l-white pb-20" style="font-size:14px; font-family:'PT Sans', Arial, sans-serif; min-width:auto !important; line-height: 24px; text-align:center; color:#ffffff; padding-bottom: 20px;">
                                                                                        Address name St. 12, City Name, State, Country Name
                                                                                        <br />
                                                                                        <a href="tel:+1111111111" target="_blank" class="link c-white" style="text-decoration:none; color:#ffffff;"><span class="link c-white" style="text-decoration:none; color:#ffffff;">(111) 111-1111</span></a> - <a href="tel:+1111111111" target="_blank" class="link c-white" style="text-decoration:none; color:#ffffff;"><span class="link c-white" style="text-decoration:none; color:#ffffff;">(111) 111-1111</span></a>
                                                                                        <br />
                                                                                        <a href="mailto:info@gokoncentrate.com" target="_blank" class="link c-white" style="text-decoration:none; color:#ffffff;"><span class="link c-white" style="text-decoration:none; color:#ffffff;">info@gokoncentrate.com</span></a> - <a href="www.gokoncentrate.com" target="_blank" class="link c-white" style="text-decoration:none; color:#ffffff;"><span class="link c-white" style="text-decoration:none; color:#ffffff;">www.gokoncentrate.com</span></a>
                                                                                    </td>
                                                                                </tr>
                                                                                
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </table>											<!-- END Footer -->
                                                            
                
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </center>
                </body>
                </html>
                `
            }
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(info);
                    res.send('Email send');
                }
            });
        }
        catch (err) {
            throw err;
        }
    },
    sendWelcomeEmail:function(req,otp,user){
        try{
            const nodemailer = require('nodemailer');

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'cqlsystest52@gmail.com',
                    pass: 'cqlsystest@123'
                }
            });
            var mailOptions = {
                from: 'cqlsystest52@gmail.com',
                to: data.dataValues.email,
                subject: 'GoKoncentrate app: Welcome Email',
                html: `

                <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
                <head>
                    <!--[if gte mso 9]>
                    <xml>
                        <o:OfficeDocumentSettings>
                        <o:AllowPNG/>
                        <o:PixelsPerInch>96</o:PixelsPerInch>
                        </o:OfficeDocumentSettings>
                    </xml>
                    <![endif]-->
                    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="format-detection" content="date=no" />
                    <meta name="format-detection" content="address=no" />
                    <meta name="format-detection" content="telephone=no" />
                    <meta name="x-apple-disable-message-reformatting" />
                    <!--[if !mso]><!-->
                    <link href="https://fonts.googleapis.com/css?family=PT+Sans:400,400i,700,700i&display=swap" rel="stylesheet" />
                    <!--<![endif]-->
                    <title>Email Template</title>
                    <!--[if gte mso 9]>
                    <style type="text/css" media="all">
                        sup { font-size: 100% !important; }
                    </style>
                    <![endif]-->
                    <!-- body, html, table, thead, tbody, tr, td, div, a, span { font-family: Arial, sans-serif !important; } -->
                    
                
                    <style type="text/css" media="screen">
                        body { padding:0 !important; margin:0 auto !important; display:block !important; min-width:100% !important; width:100% !important; background:#f4ecfa; -webkit-text-size-adjust:none }
                        a { color:#f3189e; text-decoration:none }
                        p { padding:0 !important; margin:0 !important } 
                        img { margin: 0 !important; -ms-interpolation-mode: bicubic; /* Allow smoother rendering of resized image in Internet Explorer */ }
                
                        a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; }
                        
                        .btn-16 a { display: block; padding: 15px 35px; text-decoration: none; }
                        .btn-20 a { display: block; padding: 15px 35px; text-decoration: none; }
                
                        .l-white a { color: #ffffff; }
                        .l-black a { color: #282828; }
                        .l-pink a { color: #f3189e; }
                        .l-grey a { color: #6e6e6e; }
                        .l-purple a { color: #9128df; }
                
                        .gradient { background: linear-gradient(to right, #9028df 0%,#f3189e 100%); }
                
                        .btn-secondary { border-radius: 10px; background: linear-gradient(to right, #9028df 0%,#f3189e 100%); }
                
                                
                        /* Mobile styles */
                        @media only screen and (max-device-width: 480px), only screen and (max-width: 480px) {
                            .mpx-10 { padding-left: 10px !important; padding-right: 10px !important; }
                
                            .mpx-15 { padding-left: 15px !important; padding-right: 15px !important; }
                
                            u + .body .gwfw { width:100% !important; width:100vw !important; }
                
                            .td,
                            .m-shell { width: 100% !important; min-width: 100% !important; }
                            
                            .mt-left { text-align: left !important; }
                            .mt-center { text-align: center !important; }
                            .mt-right { text-align: right !important; }
                            
                            .me-left { margin-right: auto !important; }
                            .me-center { margin: 0 auto !important; }
                            .me-right { margin-left: auto !important; }
                
                            .mh-auto { height: auto !important; }
                            .mw-auto { width: auto !important; }
                
                            .fluid-img img { width: 100% !important; max-width: 100% !important; height: auto !important; }
                
                            .column,
                            .column-top,
                            .column-dir-top { float: left !important; width: 100% !important; display: block !important; }
                
                            .m-hide { display: none !important; width: 0 !important; height: 0 !important; font-size: 0 !important; line-height: 0 !important; min-height: 0 !important; }
                            .m-block { display: block !important; }
                
                            .mw-15 { width: 15px !important; }
                
                            .mw-2p { width: 2% !important; }
                            .mw-32p { width: 32% !important; }
                            .mw-49p { width: 49% !important; }
                            .mw-50p { width: 50% !important; }
                            .mw-100p { width: 100% !important; }
                
                            .mmt-0 { margin-top: 0 !important; }
                        }
                
                            </style>
                </head>
                <body class="body" style="padding:0 !important; margin:0 auto !important; display:block !important; min-width:100% !important; width:100% !important; background:#f4ecfa; -webkit-text-size-adjust:none;">
                    <center>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 0; padding: 0; width: 100%; height: 100%;" bgcolor="#f4ecfa" class="gwfw">
                            <tr>
                                <td style="margin: 0; padding: 0; width: 100%; height: 100%;" align="center" valign="top">
                                    <table width="600" border="0" cellspacing="0" cellpadding="0" class="m-shell">
                                        <tr>
                                            <td class="td" style="width:600px; min-width:600px; font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td class="mpx-10">
                                                            
                                                            <!-- Container -->
                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                <tr>
                                                                    <td class="gradient pt-10" style="border-radius: 10px 10px 0 0; padding-top: 10px;" bgcolor="#f3189e">
                                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                            <tr>
                                                                                <td style="border-radius: 10px 10px 0 0;" bgcolor="#ffffff">
                                                                                    <!-- Logo -->
                                                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                        <tr>
                                                                                            <td class="img-center p-30 px-15" style="font-size:0pt; line-height:0pt; text-align:center; padding: 30px; padding-left: 15px; padding-right: 15px;">
                                                                                                <!-- <a href="#" target="_blank"><img src="../images/logo.png" width="112" height="43" border="0" alt="" /></a> -->
                                                                                            </td>
                                                                                        </tr>
                                                                                    </table>
                                                                                    <!-- Logo -->
                                                            
                                                                                    <!-- Main -->
                                                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                        <tr>
                                                                                            <td class="px-50 mpx-15" style="padding-left: 50px; padding-right: 50px;">
                                                                                                <!-- Section - Intro -->
                                                                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                                    <tr>
                                                                                                        <td class="pb-50" style="padding-bottom: 50px;">
                                                                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                                                <tr>
                                                                                                                    <td class="fluid-img img-center pb-50" style="font-size:0pt; line-height:0pt; text-align:center; padding-bottom: 50px;">
                                                                                                                        <img src="../images/img_intro_1.png" width="283" height="300" border="0" alt="" />
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td class="title-36 a-center pb-15" style="font-size:36px; line-height:40px; color:#282828; font-family:'PT Sans', Arial, sans-serif; min-width:auto !important; text-align:center; padding-bottom: 15px;">
                                                                                                                        <strong>Hey {{user.name}}, welcome!</strong>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td class="text-16 lh-26 a-center pb-25" style="font-size:16px; color:#6e6e6e; font-family:'PT Sans', Arial, sans-serif; min-width:auto !important; line-height: 26px; text-align:center; padding-bottom: 25px;">
                                                                                                                    Welcome to the Gokoncentrate family, Please use this otp below to verify you account.
                                                                                                                    <br>Otp : {{otp}}
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                
                                                                                                            </table>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </table>
                                                                                                <!-- END Section - Intro -->
                                                            
                                                                                                <!-- Section - Separator Line -->
                                                                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                                    <!-- <tr>
                                                                                                        <td class="pb-50" style="padding-bottom: 50px;">
                                                                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                                                <tr>
                                                                                                                    <td class="img" height="1" bgcolor="#ebebeb" style="font-size:0pt; line-height:0pt; text-align:left;">&nbsp;</td>
                                                                                                                </tr>
                                                                                                            </table>
                                                                                                        </td>
                                                                                                    </tr> -->
                                                                                                </table>
                                                                                                <!-- END Section - Separator Line -->
                                                            
                                                                                            </td>
                                                                                        </tr>
                                                                                    </table>
                                                                                    <!-- END Main -->
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                            <!-- END Container -->
                                                            
                                                            <!-- Footer -->
                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                    <tr>
                                                                        <td class="p-50 mpx-15" bgcolor="#949196" style="border-radius: 0 0 10px 10px; padding: 13px;">
                                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                
                                                                                <tr>
                                                                                    <td class="text-14 lh-24 a-center c-white l-white pb-20" style="font-size:14px; font-family:'PT Sans', Arial, sans-serif; min-width:auto !important; line-height: 24px; text-align:center; color:#ffffff; padding-bottom: 20px;">
                                                                                        Address name St. 12, City Name, State, Country Name
                                                                                        <br />
                                                                                        <a href="tel:+1111111111" target="_blank" class="link c-white" style="text-decoration:none; color:#ffffff;"><span class="link c-white" style="text-decoration:none; color:#ffffff;">(111) 111-1111</span></a> - <a href="tel:+1111111111" target="_blank" class="link c-white" style="text-decoration:none; color:#ffffff;"><span class="link c-white" style="text-decoration:none; color:#ffffff;">(111) 111-1111</span></a>
                                                                                        <br />
                                                                                        <a href="mailto:info@gokoncentrate.com" target="_blank" class="link c-white" style="text-decoration:none; color:#ffffff;"><span class="link c-white" style="text-decoration:none; color:#ffffff;">info@gokoncentrate.com</span></a> - <a href="www.gokoncentrate.com" target="_blank" class="link c-white" style="text-decoration:none; color:#ffffff;"><span class="link c-white" style="text-decoration:none; color:#ffffff;">www.gokoncentrate.com</span></a>
                                                                                    </td>
                                                                                </tr>
                                                                                
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </table>											<!-- END Footer -->
                                                            
                
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </center>
                </body>
                </html>
                `
            }
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(info);
                    res.send('Email send');
                }
            });
        }
        catch (err) {
            throw err;
        }
    },
    passwordReset_email: function (req, otp, data, resu) {

        try {
            const nodemailer = require('nodemailer');

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'cqlsystest52@gmail.com',
                    pass: 'cqlsystest@123'
                }
            });
            console.log(data.dataValues.email, "======================")
            var mailOptions = {
                from: 'cqlsystest52@gmail.com',
                to: data.dataValues.email,
                subject: 'GoKoncentrate app: Forgot password',
                html:`
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
	<!--[if gte mso 9]>
	<xml>
		<o:OfficeDocumentSettings>
		<o:AllowPNG/>
		<o:PixelsPerInch>96</o:PixelsPerInch>
		</o:OfficeDocumentSettings>
	</xml>
	<![endif]-->
	<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="format-detection" content="date=no" />
	<meta name="format-detection" content="address=no" />
	<meta name="format-detection" content="telephone=no" />
	<meta name="x-apple-disable-message-reformatting" />
	<!--[if !mso]><!-->
	<link href="https://fonts.googleapis.com/css?family=PT+Sans:400,400i,700,700i&display=swap" rel="stylesheet" />
	<!--<![endif]-->
	<title>Email Template</title>
	<!--[if gte mso 9]>
	<style type="text/css" media="all">
		sup { font-size: 100% !important; }
	</style>
	<![endif]-->
	<!-- body, html, table, thead, tbody, tr, td, div, a, span { font-family: Arial, sans-serif !important; } -->
	

	<style type="text/css" media="screen">
		body { padding:0 !important; margin:0 auto !important; display:block !important; min-width:100% !important; width:100% !important; background:#f4ecfa; -webkit-text-size-adjust:none }
		a { color:#f3189e; text-decoration:none }
		p { padding:0 !important; margin:0 !important } 
		img { margin: 0 !important; -ms-interpolation-mode: bicubic; /* Allow smoother rendering of resized image in Internet Explorer */ }

		a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; }
		
		.btn-16 a { display: block; padding: 15px 35px; text-decoration: none; }
		.btn-20 a { display: block; padding: 15px 35px; text-decoration: none; }

		.l-white a { color: #ffffff; }
		.l-black a { color: #282828; }
		.l-pink a { color: #f3189e; }
		.l-grey a { color: #6e6e6e; }
		.l-purple a { color: #9128df; }

		.gradient { background: linear-gradient(to right, #9028df 0%,#f3189e 100%); }

		.btn-secondary { border-radius: 10px; background: linear-gradient(to right, #9028df 0%,#f3189e 100%); }

				
		/* Mobile styles */
		@media only screen and (max-device-width: 480px), only screen and (max-width: 480px) {
			.mpx-10 { padding-left: 10px !important; padding-right: 10px !important; }

			.mpx-15 { padding-left: 15px !important; padding-right: 15px !important; }

			u + .body .gwfw { width:100% !important; width:100vw !important; }

			.td,
			.m-shell { width: 100% !important; min-width: 100% !important; }
			
			.mt-left { text-align: left !important; }
			.mt-center { text-align: center !important; }
			.mt-right { text-align: right !important; }
			
			.me-left { margin-right: auto !important; }
			.me-center { margin: 0 auto !important; }
			.me-right { margin-left: auto !important; }

			.mh-auto { height: auto !important; }
			.mw-auto { width: auto !important; }

			.fluid-img img { width: 100% !important; max-width: 100% !important; height: auto !important; }

			.column,
			.column-top,
			.column-dir-top { float: left !important; width: 100% !important; display: block !important; }

			.m-hide { display: none !important; width: 0 !important; height: 0 !important; font-size: 0 !important; line-height: 0 !important; min-height: 0 !important; }
			.m-block { display: block !important; }

			.mw-15 { width: 15px !important; }

			.mw-2p { width: 2% !important; }
			.mw-32p { width: 32% !important; }
			.mw-49p { width: 49% !important; }
			.mw-50p { width: 50% !important; }
			.mw-100p { width: 100% !important; }

			.mmt-0 { margin-top: 0 !important; }
		}

			</style>
</head>
<body class="body" style="padding:0 !important; margin:0 auto !important; display:block !important; min-width:100% !important; width:100% !important; background:#f4ecfa; -webkit-text-size-adjust:none;">
	<center>
		<table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 0; padding: 0; width: 100%; height: 100%;" bgcolor="#f4ecfa" class="gwfw">
			<tr>
				<td style="margin: 0; padding: 0; width: 100%; height: 100%;" align="center" valign="top">
					<table width="600" border="0" cellspacing="0" cellpadding="0" class="m-shell">
						<tr>
							<td class="td" style="width:600px; min-width:600px; font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td class="mpx-10">
											
											<!-- Container -->
											<table width="100%" border="0" cellspacing="0" cellpadding="0">
												<tr>
													<td class="gradient pt-10" style="border-radius: 10px 10px 0 0; padding-top: 10px;" bgcolor="#f3189e">
														<table width="100%" border="0" cellspacing="0" cellpadding="0">
															<tr>
																<td style="border-radius: 10px 10px 0 0;" bgcolor="#ffffff">
																	<!-- Logo -->
																	<table width="100%" border="0" cellspacing="0" cellpadding="0">
																		<tr>
																			<td class="img-center p-30 px-15" style="font-size:0pt; line-height:0pt; text-align:center; padding: 30px; padding-left: 15px; padding-right: 15px;">
																				<!-- <a href="#" target="_blank"><img src="../images/logo.png" width="112" height="43" border="0" alt="" /></a> -->
																			</td>
																		</tr>
																	</table>
																	<!-- Logo -->
											
																	<!-- Main -->
																	<table width="100%" border="0" cellspacing="0" cellpadding="0">
																		<tr>
																			<td class="px-50 mpx-15" style="padding-left: 50px; padding-right: 50px;">
																				<!-- Section - Intro -->
																				<table width="100%" border="0" cellspacing="0" cellpadding="0">
																					<tr>
																						<td class="pb-50" style="padding-bottom: 30px;">
																							<table width="100%" border="0" cellspacing="0" cellpadding="0">
																								<tr>
																									<td class="fluid-img img-center pb-50" style="font-size:0pt; line-height:0pt; text-align:center; padding-bottom: 50px;">
																										<img src="../images/img_intro_1.png" width="283" height="300" border="0" alt="" />
																									</td>
																								</tr>
																								<tr>
																									<td class="title-36 a-center pb-15" style="font-size:36px; line-height:40px; color:#282828; font-family:'PT Sans', Arial, sans-serif; min-width:auto !important; text-align:center; padding-bottom: 15px;">
																										<strong>Forgot Password</strong>
																									</td>
																								</tr>
																								<tr>
																									<td class="text-16 lh-26 a-center pb-25" style="font-size:16px; color:#6e6e6e; font-family:'PT Sans', Arial, sans-serif; min-width:auto !important; line-height: 26px; text-align:center; padding-bottom: 25px;">
																										Please use the password given below to login into your account. You can change your app password in the app settings. 
																									</td>
																								</tr>
																								
																							</table>
																						</td>
																					</tr>
                                                                                    <tr>
                                                                                        <td class="pb-30" style="padding-bottom: 30px;">
                                                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                                                <tbody><tr>
                                                                                                    <td class="title-22 a-center py-20 px-50 mpx-15" style="border-radius: 10px; border: 1px dashed #b4b4d4; font-size:22px; line-height:26px; color:#282828; font-family:'PT Sans', Arial, sans-serif; min-width:auto !important; text-align:center; padding-top: 20px; padding-bottom: 20px; padding-left: 50px; padding-right: 50px;" bgcolor="#f4ecfa">
                                                                                                        <strong>Password : <span class="c-purple" style="color:#9128df;">{{otp}}</span></strong>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </tbody></table>
                                                                                        </td>
                                                                                    </tr>
																				</table>
																				<!-- END Section - Intro -->
											
																				<!-- Section - Separator Line -->
																				<table width="100%" border="0" cellspacing="0" cellpadding="0">
																					<!-- <tr>
																						<td class="pb-50" style="padding-bottom: 50px;">
																							<table width="100%" border="0" cellspacing="0" cellpadding="0">
																								<tr>
																									<td class="img" height="1" bgcolor="#ebebeb" style="font-size:0pt; line-height:0pt; text-align:left;">&nbsp;</td>
																								</tr>
																							</table>
																						</td>
																					</tr> -->
																				</table>
																				<!-- END Section - Separator Line -->
											
																			</td>
																		</tr>
																	</table>
																	<!-- END Main -->
																</td>
															</tr>
														</table>
													</td>
												</tr>
											</table>
											<!-- END Container -->
											
											<!-- Footer -->
											<table width="100%" border="0" cellspacing="0" cellpadding="0">
													<tr>
														<td class="p-50 mpx-15" bgcolor="#949196" style="border-radius: 0 0 10px 10px; padding: 13px;">
															<table width="100%" border="0" cellspacing="0" cellpadding="0">
																
																<tr>
																	<td class="text-14 lh-24 a-center c-white l-white pb-20" style="font-size:14px; font-family:'PT Sans', Arial, sans-serif; min-width:auto !important; line-height: 24px; text-align:center; color:#ffffff; padding-bottom: 20px;">
																		Address name St. 12, City Name, State, Country Name
																		<br />
																		<a href="tel:+1111111111" target="_blank" class="link c-white" style="text-decoration:none; color:#ffffff;"><span class="link c-white" style="text-decoration:none; color:#ffffff;">(111) 111-1111</span></a> - <a href="tel:+1111111111" target="_blank" class="link c-white" style="text-decoration:none; color:#ffffff;"><span class="link c-white" style="text-decoration:none; color:#ffffff;">(111) 111-1111</span></a>
																		<br />
																		<a href="mailto:info@gokoncentrate.com" target="_blank" class="link c-white" style="text-decoration:none; color:#ffffff;"><span class="link c-white" style="text-decoration:none; color:#ffffff;">info@gokoncentrate.com</span></a> - <a href="www.gokoncentrate.com" target="_blank" class="link c-white" style="text-decoration:none; color:#ffffff;"><span class="link c-white" style="text-decoration:none; color:#ffffff;">www.gokoncentrate.com</span></a>
																	</td>
																</tr>
																
															</table>
														</td>
													</tr>
												</table>											<!-- END Footer -->
											

										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</center>
</body>
</html>
`
                // html: `<div style="background-color:#eeeeef;padding:50px 0 50px 0">
                // <div style="margin:0 auto 0 auto;max-width:640px">
                // <div style="background-color:#33333e;border-top-left-radius:3px;border-top-right-radius:3px;color:#fff;margin:0;padding:30px;text-align:center">
                // <h1>Login Details</h1>
                // </div>
                // <div style="background-color:rgb( 255 , 255 , 255 );padding:20px">
                
                // <p style="color:rgb( 85 , 85 , 85 );font-size:14px"> Please use the below password to Login to your app:</p>
                // <hr>
                // <p style="color:rgb( 85 , 85 , 85 );font-size:14px"></p>
                
                // <p>
                // <span style="color:rgb( 85 , 85 , 85 );font-size:14px;line-height:20px">Password: ${otp}</span>
                // </p>
                // <p style="color:rgb( 85 , 85 , 85 )"><br></p>
                // <p style="color:rgb( 85 , 85 , 85 );font-size:14px">
                // <b>Note:You can change your password from account settings section</b>
                // </p>
                // <p style="color:rgb( 85 , 85 , 85 )"><br></p>
                // <p style="color:rgb( 85 , 85 , 85 );font-size:14px">Powered By:
                // Pawskeeper
                // </p>
                // </div>
                // </div>
                // </div>`
                //     html :`<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><!--[if gte mso 9]><xml>
                //     <o:OfficeDocumentSettings>
                //     <o:AllowPNG/>
                //     <o:PixelsPerInch>96</o:PixelsPerInch>
                //     </o:OfficeDocumentSettings>
                // </xml><![endif]--><meta http-equiv="Content-type" content="text/html; charset=utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="format-detection" content="date=no"><meta name="format-detection" content="address=no"><meta name="format-detection" content="telephone=no"><meta name="x-apple-disable-message-reformatting"><!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=PT+Sans:400,400i,700,700i&display=swap" rel="stylesheet"><!--<![endif]--><title>Email Template</title><!--[if gte mso 9]><style type="text/css" media="all">
                //     sup { font-size: 100% !important; }
                // </style><![endif]--><style type="text/css" media="screen">body{padding:0!important;margin:0 auto!important;display:block!important;min-width:100%!important;width:100%!important;background:#f4ecfa;-webkit-text-size-adjust:none}a{color:#f3189e;text-decoration:none}p{padding:0!important;margin:0!important}img{margin:0!important;-ms-interpolation-mode:bicubic}a[x-apple-data-detectors]{color:inherit!important;text-decoration:inherit!important;font-size:inherit!important;font-family:inherit!important;font-weight:inherit!important;line-height:inherit!important}.btn-16 a{display:block;padding:15px 35px;text-decoration:none}.btn-20 a{display:block;padding:15px 35px;text-decoration:none}.l-white a{color:#fff}.l-black a{color:#282828}.l-pink a{color:#f3189e}.l-grey a{color:#6e6e6e}.l-purple a{color:#9128df}.gradient{background:linear-gradient(to right,#9028df 0,#f3189e 100%)}.btn-secondary{border-radius:10px;background:linear-gradient(to right,#9028df 0,#f3189e 100%)}@media only screen and (max-device-width:480px),only screen and (max-width:480px){.mpx-10{padding-left:10px!important;padding-right:10px!important}.mpx-15{padding-left:15px!important;padding-right:15px!important}u+.body .gwfw{width:100%!important;width:100vw!important}.m-shell,.td{width:100%!important;min-width:100%!important}.mt-left{text-align:left!important}.mt-center{text-align:center!important}.mt-right{text-align:right!important}.me-left{margin-right:auto!important}.me-center{margin:0 auto!important}.me-right{margin-left:auto!important}.mh-auto{height:auto!important}.mw-auto{width:auto!important}.fluid-img img{width:100%!important;max-width:100%!important;height:auto!important}.column,.column-dir-top,.column-top{float:left!important;width:100%!important;display:block!important}.m-hide{display:none!important;width:0!important;height:0!important;font-size:0!important;line-height:0!important;min-height:0!important}.m-block{display:block!important}.mw-15{width:15px!important}.mw-2p{width:2%!important}.mw-32p{width:32%!important}.mw-49p{width:49%!important}.mw-50p{width:50%!important}.mw-100p{width:100%!important}.mmt-0{margin-top:0!important}}</style></head><body class="body" style="padding:0!important;margin:0 auto!important;display:block!important;min-width:100%!important;width:100%!important;background:#f4ecfa;-webkit-text-size-adjust:none"><center><table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin:0;padding:0;width:100%;height:100%" bgcolor="#f4ecfa" class="gwfw"><tr><td style="margin:0;padding:0;width:100%;height:100%" align="center" valign="top"><table width="600" border="0" cellspacing="0" cellpadding="0" class="m-shell"><tr><td class="td" style="width:600px;min-width:600px;font-size:0;line-height:0;padding:0;margin:0;font-weight:400"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td class="mpx-10"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td class="text-12 c-grey l-grey a-right py-20" style="font-size:12px;line-height:16px;font-family:'PT Sans',Arial,sans-serif;min-width:auto!important;color:#6e6e6e;text-align:right;padding-top:20px;padding-bottom:20px"><a href="#" target="_blank" class="link c-grey" style="text-decoration:none;color:#6e6e6e"><span class="link c-grey" style="text-decoration:none;color:#6e6e6e">View this email in your browser</span></a></td></tr></table><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td class="gradient pt-10" style="border-radius:10px 10px 0 0;padding-top:10px" bgcolor="#f3189e"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td style="border-radius:10px 10px 0 0" bgcolor="#ffffff"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td class="img-center p-30 px-15" style="font-size:0;line-height:0;text-align:center;padding:30px;padding-left:15px;padding-right:15px"><a href="#" target="_blank"><img src="../images/logo.png" width="112" height="43" border="0" alt=""></a></td></tr></table><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td class="px-50 mpx-15" style="padding-left:50px;padding-right:50px"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td class="pb-50" style="padding-bottom:50px"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td class="fluid-img img-center pb-50" style="font-size:0;line-height:0;text-align:center;padding-bottom:50px"><img src="../images/img_intro_4.png" width="368" height="296" border="0" alt=""></td></tr><tr><td class="title-36 a-center pb-15" style="font-size:36px;line-height:40px;color:#282828;font-family:'PT Sans',Arial,sans-serif;min-width:auto!important;text-align:center;padding-bottom:15px"><strong>Forgot your password?</strong></td></tr><tr><td class="text-16 lh-26 a-center pb-25" style="font-size:16px;color:#6e6e6e;font-family:'PT Sans',Arial,sans-serif;min-width:auto!important;line-height:26px;text-align:center;padding-bottom:25px">Click on the button below to reset your password.</td></tr><tr><td align="center"><table border="0" cellspacing="0" cellpadding="0" style="min-width:200px"><tr><td class="btn-16 c-white l-white" bgcolor="#f3189e" style="font-size:16px;line-height:20px;mso-padding-alt:15px 35px;font-family:'PT Sans',Arial,sans-serif;text-align:center;font-weight:700;text-transform:uppercase;border-radius:25px;min-width:auto!important;color:#fff"><a href="${req.protocol}://${req.get('host')}/url_id/${otp}" target="_blank" class="link c-white" style="display:block;padding:15px 35px;text-decoration:none;color:#fff"><span class="link c-white" style="text-decoration:none;color:#fff">RESET PASSWORD</span></a></td></tr></table></td></tr></table></td></tr></table></td></tr></table></td></tr></table></td></tr></table><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td class="p-50 mpx-15" bgcolor="#949196" style="border-radius:0 0 10px 10px;padding:50px"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td align="center" class="pb-20" style="padding-bottom:20px"><table border="0" cellspacing="0" cellpadding="0"><tr><td class="img" width="34" style="font-size:0;line-height:0;text-align:left"><a href="#" target="_blank"><img src="../images/ico_facebook.png" width="34" height="34" border="0" alt=""></a></td><td class="img" width="15" style="font-size:0;line-height:0;text-align:left"></td><td class="img" width="34" style="font-size:0;line-height:0;text-align:left"><a href="#" target="_blank"><img src="../images/ico_instagram.png" width="34" height="34" border="0" alt=""></a></td><td class="img" width="15" style="font-size:0;line-height:0;text-align:left"></td><td class="img" width="34" style="font-size:0;line-height:0;text-align:left"><a href="#" target="_blank"><img src="../images/ico_twitter.png" width="34" height="34" border="0" alt=""></a></td><td class="img" width="15" style="font-size:0;line-height:0;text-align:left"></td><td class="img" width="34" style="font-size:0;line-height:0;text-align:left"><a href="#" target="_blank"><img src="../images/ico_pinterest.png" width="34" height="34" border="0" alt=""></a></td></tr></table></td></tr><tr><td class="text-14 lh-24 a-center c-white l-white pb-20" style="font-size:14px;font-family:'PT Sans',Arial,sans-serif;min-width:auto!important;line-height:24px;text-align:center;color:#fff;padding-bottom:20px">Address name St. 12, City Name, State, Country Name<br><a href="tel:+11111111" target="_blank" class="link c-white" style="text-decoration:none;color:#fff"><span class="link c-white" style="text-decoration:none;color:#fff">(111) 111-1111</span></a> - <a href="tel:+1111111111" target="_blank" class="link c-white" style="text-decoration:none;color:#fff"><span class="link c-white" style="text-decoration:none;color:#fff">(111) 111-1111</span></a><br><a href="mailto:info@pawskeeper.com" target="_blank" class="link c-white" style="text-decoration:none;color:#fff"><span class="link c-white" style="text-decoration:none;color:#fff">info@pawskeeper.com</span></a> - <a href="www.pawskeeper.com" target="_blank" class="link c-white" style="text-decoration:none;color:#fff"><span class="link c-white" style="text-decoration:none;color:#fff">www.website.com</span></a></td></tr><tr><td align="center"><table border="0" cellspacing="0" cellpadding="0"><tr><td class="img" width="117" style="font-size:0;line-height:0;text-align:left"><a href="#" target="_blank"><img src="../images/btn_appstore.png" width="117" height="40" border="0" alt=""></a></td><td class="img" width="15" style="font-size:0;line-height:0;text-align:left"></td><td class="img" width="117" style="font-size:0;line-height:0;text-align:left"><a href="#" target="_blank"><img src="../images/btn_gplay.png" width="117" height="40" border="0" alt=""></a></td></tr></table></td></tr></table></td></tr></table><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td class="text-12 lh-22 a-center c-grey- l-grey py-20" style="font-size:12px;color:#6e6e6e;font-family:'PT Sans',Arial,sans-serif;min-width:auto!important;line-height:22px;text-align:center;padding-top:20px;padding-bottom:20px"><a href="#" target="_blank" class="link c-grey" style="text-decoration:none;color:#6e6e6e"><span class="link c-grey" style="white-space:nowrap;text-decoration:none;color:#6e6e6e"></span></a> &nbsp;&nbsp; <a href="#" target="_blank" class="link c-grey" style="text-decoration:none;color:#6e6e6e"><span class="link c-grey" style="white-space:nowrap;text-decoration:none;color:#6e6e6e"> </span></a> &nbsp;&nbsp; <a href="#" target="_blank" class="link c-grey" style="text-decoration:none;color:#6e6e6e"><span class="link c-grey" style="white-space:nowrap;text-decoration:none;color:#6e6e6e"></span></a></td></tr></table></td></tr></table></td></tr></table></td></tr></table></center></body></html>`
                //  //   html: `Click here for change password <a href=${req.protocol}://${req.get('host')}/url_id/${otp}"> Click</a>`
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(info);
                    res.send('Email send');
                }
            });
            return resu;
        } catch (err) {
            throw err;
        }
    },
    convert_password_to_sha1: async function (password) {

        /* console.log(reqdata,"reqdata") */
        const converted_password = crypto.createHash('sha1').update(password).digest('hex');

        /* console.log(converted_password,"converted_password");return; */

        return converted_password;
    },
}
