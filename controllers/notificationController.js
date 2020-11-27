const db = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;
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
    var get_admim_data= await admins.findOne({
      where:{
        id:req.session.admin_id
      },
      raw:true
    })
    var brand_array= await get_admim_data.magazine_id.split(",")
   //console.log(brand_array,"brand_array");return
    if(get_admim_data.role==1){
    get_users_all= await users.findAll({
      attributes:['id','name','email','address','subscription','subscription_id','delete_status','status','image',[sequelize.literal('(SELECT name FROM magazines_brand where id=users.subscription_id)'), 'planName']],
      
      order:[
        ['id','desc']
      ],
      raw:true
    })
  }else{
    get_users_all= await users.findAll({
      ttributes:['id','name','email','address','subscription','subscription_id','delete_status','status','image',[sequelize.literal('(SELECT name FROM magazines_brand where id=users.subscription_id)'), 'planName']],
      order:[
        ['id','desc']
      ],
      where:{
        subscription_id:brand_array
      },
      raw:true
    })
  }
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
  },
  getusers_list:async function(req,res){
    try{
      // console.log(req.body.id==1,"req.body");return
      var get_admim_data= await admins.findOne({
        where:{
          id:req.session.admin_id
        },
        raw:true
      })
      var brand_array= await get_admim_data.magazine_id.split(",")
     //console.log(brand_array,"brand_array");return
      if(get_admim_data.role==1){
      if(req.body.id==1){
         var get_users=await users.findAll({
           attributes:['id','name'],
           where:{
             subscription_id:0
           },
           raw:true
         })
      }else if(req.body.id==2){
        var get_users=await users.findAll({
          attributes:['id','name'],
          where:{
            subscription_id: {
              [Op.ne]: 0
            }
          },
          raw:true
        })
      }else{
        var get_users=await users.findAll({
          attributes:['id','name'],
          raw:true
        })
      }
    }else{
      if(req.body.id==1){
        var get_users=await users.findAll({
          attributes:['id','name'],
          where:{
            subscription_id:0
          },
          raw:true
        })
     }else if(req.body.id==2){
       var get_users=await users.findAll({
         attributes:['id','name'],
         where:{
           subscription_id: {
             [Op.ne]: 0
           },
           subscription_id:brand_array
         },
         raw:true
       })
     }else{
       var get_users=await users.findAll({
         attributes:['id','name'],
         where:{
          subscription_id:brand_array
         },
         raw:true
       })
     }
    }
     res.send(get_users)
    }catch(error){
      throw error
    }
  },
  send_notification:async function(req,res){
    try{
      req.flash('msg', 'Notification sent successfully')
      res.redirect('/admin/notifications')
    }catch(error){
      throw error
    }
  }

}