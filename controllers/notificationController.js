const db = require('../models');
const sequelize = require('sequelize');
const admins = db.admin
const users = db.users
const subscriptions = db.subscriptions
const magazinesBrand = db.magazinesBrand
const magazines = db.magazines
const pages = db.pages
var crypto = require('crypto');
// const { contained } = require("sequelize/types/lib/operators")
var path = require('path');
var uuid = require('uuid');
const flash = require('connect-flash');
var nodemailer = require('nodemailer');

module.exports = {
  index: async function (req, res) {
    try {
    //console.log("hello");return
    get_users_all= await users.findAll({
      attributes:['id','name','email','address','subscription','subscription_id','delete_status','status','image',[sequelize.literal(`(SELECT plan_id FROM subscriptions WHERE user_id = users.id)`), 'plan_id']],
      order:[
        ['id','desc']
      ],
      raw:true
    })
   // console.log(get_users_all,"get_users_all");return
   res.render('notifications/notifications', { msg: req.flash('msg'),session: req.session,response:get_users_all, title: 'notifications' });
    } catch (error) {
      throw error
    }
  },
  send_email_user:async function(req,res){
    try{
 //console.log(req.body.id,"req.body.id");return

 var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youremail@gmail.com',
    pass: 'yourpassword'
  }
});

var mailOptions = {
  from: 'youremail@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
res.json(1)
    }catch(error){
      throw error
    }
  }

}