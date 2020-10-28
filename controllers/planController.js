const db = require('../models');
const sequelize = require('sequelize');
const admins = db.admin
const users = db.users
const subscriptions = db.subscriptions
var crypto = require('crypto');
// const { contained } = require("sequelize/types/lib/operators")
var path = require('path');
var uuid = require('uuid');
const flash = require('connect-flash');
module.exports = {
  index: async function (req, res) {
    try {
    //   console.log("helloi");return
    get_users_all= await users.findAll({
      attributes:['id','name','email','address','subscription','subscription_id','delete_status','status','image',[sequelize.literal(`(SELECT plan_id FROM subscriptions WHERE user_id = users.id)`), 'plan_id']],
      order:[
        ['id','desc']
      ],
      raw:true
    })
   // console.log(get_users_all,"get_users_all");return
   res.render('user_plans/user_plans', { msg: req.flash('msg'),session: req.session,response:get_users_all, title: 'users_plan' });
    } catch (error) {
      throw error
    }
  }
}