/* const bcrypt = require('bcrypt'); */
const config = require('./config');
// const contant = require('../constant');
const crypto = require('crypto');
const path=require('path');
const db = require('../models');
const users = db.users
var uuid = require('uuid');

// var apn = require('apn');

var moment = require('moment');

module.exports = {
    getRelativeTime: async function(data) {
        let date = new Date(data);

        let year = date.getFullYear().toString();
        let month = (date.getMonth() + 1).toString();
        let day = date.getDate().toString();
        let hour = date.getHours().toString();
        let minute = date.getMinutes().toString();
        let second = date.getSeconds().toString();

        if(month < 10) { month = '0'+month }
        if(day < 10) { day = '0'+day }
        if(hour < 10) { hour = '0'+hour }
        if(minute < 10) { minute = '0'+minute }
        if(second < 10) { second = '0'+second }

        let dateTime = year+month+day+hour+minute+second;

        let relativeTime = moment(dateTime, "YYYYMMDDHHmmss").fromNow();
        return relativeTime;
    },
     checkauth: async function(authhash){
        try{
            let checkvalid= await users.findOne({where:{authKey:authhash}});
            if(checkvalid){
                return checkvalid.toJSON();
            }else{
                return 0;
            }
        }catch(err){
            throw err;
        }
    },
    validObject: async function (required, non_required, res) {
        let message ='';
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
            res.status(400).json({
                // 'success': false,
                'message': message,
                'status': 400,
                'body': {}
            });
            return;
        } else {
            if (required.hasOwnProperty('security_key')) {
                if (required.security_key != "love2fy") {
                    message = "Invalid security key";
                    res.status(403).json({
                        // 'success': false,
                        'message': message,
                        'status': 403,
                        'body': {}
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

            if(required.hasOwnProperty('access_token')) {
                let findUser = await users.findOne({
                    where: {
                        access_token: required.access_token
                    }
                });

                if(findUser) {
                    findUser = findUser.toJSON();
                    required.user_id = findUser.id;
                } else {
                    let message = "Invalid auth key";

                    res.status(401).json({
                        // 'success': false,
                        'message': message,
                        'status': 401,
                        'body': {}
                    });
                    res.end();
                    return false;
                }
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
                                'status': 403,
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
                                'status': 403,
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
                        'status': 403,
                        'body': []
                    });
                    return false;
                }
            } */

            const marge_object = Object.assign(required, non_required);
            delete marge_object.checkexit;

            for(let data in marge_object){
                if(marge_object[data]==undefined){
                    delete marge_object[data];
                }else{
                    if(typeof marge_object[data]=='string'){
                        marge_object[data]=marge_object[data].trim();
                    } 
                }
            }

            return marge_object;
        }
    },
    
    error: function(res,err){
		console.log(err);
		console.log('error');
		// console.log(JSON.stringify(ReferenceError));
		// console.log(ReferenceError);
		// return false;
			let code=(typeof err==='object') ? ((err.statusCode) ? err.statusCode : ((err.code) ? err.code : 403)) : 403;
			let message=(typeof err==='object')? (err.message) : err;
			// console.log(code);
			// console.log(message);
			// return false;
			res.status(code).json({
				// 'success':false,
				'error_message':message,
				'status':code,
				'body':[]
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
 
    sendMail: function(object){
		const nodemailer = require('nodemailer');
        var transporter = nodemailer.createTransport('gmail',contant.mail_auth);
        
		var mailOptions = object;
		transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			console.log(error);
		} else {
            //console.log(info); 
			console.log('Email sent: ' + info.messageId);
		}
		});
    },
    Notification: function(object){
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
        
        fcm.send(message, function(err, response){
            if (err) {
                console.log("Something has gone wrong!");
            } else {
                console.log("Successfully sent with response: ", response);
            }
        });


    },
    
	create_auth() {
		try {
			let current_date = (new Date()).valueOf().toString();
			let random = Math.random().toString();
			return crypto.createHash('sha1').update(current_date + random).digest('hex');
		} catch (err) {
			throw err;
		}
	},
     send_emails: function(otp,email) {
        
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
                to: email,
                subject: 'Lovef2y: Password Assistance',
                html: 'Click here for change password <a href="http://localhost:3044/api/url/' + otp + '"> Click</a>'      
                };                
                transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                console.log(error);
                } else {
                console.log(info);
                res.send('Email send');
                }
              });
             return ;
        } catch (err) {
          throw err;
        }
        }, 
            
    createSHA1: function() {
        let key = 'abc'+new Date().getTime();
        return crypto.createHash('sha1').update(key).digest('hex');        
    },
    image_upload: async function(image){
       if (image) {
            var extension = path.extname(image.name);
            var filename = uuid() + extension;
            var sampleFile = image;
            sampleFile.mv(process.cwd() + '/public/images/users/' + filename, (err) => {
                if (err) throw err;
            });

            return filename;
        }

    },
    new_image_Upload(image) {
		if (image) {
			
			var extension = path.extname(image.name);
			
			var filename = uuid() + extension;
			var sampleFile = image;
			//console.log(filename, "==========filename");

			sampleFile.mv(process.cwd() + '/public/images/users/' + filename, (err) => {
				if (err) throw err;
			});

			return filename;
		}
    },

    async getDbData(auth_key, column, res) {
        let check_auth = await users.findOne({
            where: {
                authKey: auth_key
            }
        });

        if(check_auth) {

        } else {
            let message = "Invalid auth key";

            res.status(401).json({
                'success': false,
                'message': message,
                'status': 401,
                'body': {}
            });
            res.end();
            return false;
        }
    },

    async p8(deviceTokens, message, notification_type, data_to_send, isGroup = 0) {
        var options = {
            token: {
                key: __dirname+"/AuthKey_4LD5GV7SK7.p8",
                keyId: "4LD5GV7SK7",
                teamId: "6R5227TJ7K"
            },
            production: false
        };
         
        var apnProvider = new apn.Provider(options);

        var note = new apn.Notification();
 
        // note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
        // note.badge = 3;
        note.sound = "ping.aiff";
        note.alert = message;
        // note.payload = {};
        note.payload = {
            notification_type: notification_type,
            data: data_to_send,
            isGroup: isGroup
        }
        note.topic = "com.live.grouptext";
        // note.body = {
        //     notification_type: notification_type,
        //     message: message
        // };

        console.log(note);
        // return

        apnProvider.send(note, deviceTokens).then( (result) => {
          // see documentation for an explanation of result
          console.log(result);
        });
    }
    
      
}