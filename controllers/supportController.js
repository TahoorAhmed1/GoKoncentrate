const db = require('../models');
const sequelize = require('sequelize');
const admins = db.admin
const users = db.users
const subscriptions = db.subscriptions
const magazinesBrand = db.magazinesBrand
const magazines = db.magazines
const pages = db.pages
const content = db.content
const ads = db.ads
const billing = db.billing
const help = db.help
var crypto = require('crypto');
var nodemailer = require('nodemailer');
// const { contained } = require("sequelize/types/lib/operators")
var path = require('path');
var uuid = require('uuid');
const flash = require('connect-flash');
module.exports = {
  index: async function (req, res) {
    try {
      // console.log("hello");return
      var get_all_helps = await help.findAll({
        attributes: ['id', 'userId', 'description', 'status', 'created', [sequelize.literal(`ifnull((SELECT name FROM users WHERE id = help.user_id),'')`), 'userName'], [sequelize.literal(`ifnull((SELECT email FROM users WHERE id = help.user_id),'')`), 'userEmail']],
        order: [
          ['id', 'desc']
        ],
        raw: true
      });
      res.render('support/edit', { msg: req.flash('msg'), session: req.session, response: get_all_helps, title: 'support' });
      //console.log(get_all_helps,"get_all_helps");return

    } catch (error) {
      throw error
    }
  },
  sent_reply: async function (req, res) {
    try {
      var get_all_helps = await help.findOne({
        attributes: ['id', 'userId', 'description', 'status', 'created', [sequelize.literal(`ifnull((SELECT name FROM users WHERE id = help.user_id),'')`), 'userName'], [sequelize.literal(`ifnull((SELECT email FROM users WHERE id = help.user_id),'')`), 'userEmail']],
        where: {
          id: req.query.id
        },
        raw: true
      });
      res.render('support/edit', { msg: req.flash('msg'), session: req.session, response: get_all_helps, title: 'support' });
    } catch (error) {
      throw error
    }
  },
  send_help:async function(req,res){
    try{
      
      white_space= req.body.content.trim().length == 0;

      //console.log(white_space,"==");return
      if(white_space==true){
        req.flash('msg', 'Please write something in description')
        res.redirect(`/admin/sent_reply?id=${req.body.id}}`);
        return
      }
      let update_isreply= await help.update({
           status:1
      },{
          where:{
            id:req.body.id
          }
      })
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'cqlsystest52@gmail.com',
          pass: 'cqlsystest@123'
        }
      });
      
      var mailOptions = {
        from: 'cqlsystest52@gmail.com',
        to: req.body.email,
        subject: 'Gokoncentrate Support Team',
        html: req.body.content
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      req.flash('msg', 'Reply Sent successfully')
      res.redirect('/admin/support_section')
    }catch(error){
      throw error
    }
  }

}