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
var crypto = require('crypto');
// const { contained } = require("sequelize/types/lib/operators")
var path = require('path');
var uuid = require('uuid');
const flash = require('connect-flash');
module.exports = {
  index:async function(req,res){
    try{
      let get_admin_data = await admins.findOne({
        where: {
          id: req.session.admin_id
        },
        raw: true
      })
      //  console.log(get_admin_data.role,"get_admin_data");return
      if (get_admin_data.role == 2) {

        var brand_array = await get_admin_data.magazine_id.split(",")
      var get_all_billing_requests= await billing.findAll({
        attributes:['id','magazineBrandId','userId','status','paymentStartDate','planType','price',[sequelize.literal(`(SELECT name FROM users WHERE id = billing.user_id)`), 'userName'],[sequelize.literal(`(SELECT name FROM magazines_brand WHERE id = billing.magazine_brand_id)`), 'magazineBrandName'],[sequelize.literal(`(SELECT id FROM magazines WHERE id = billing.magazine_brand_id)`), 'magazineId']],

       order:[
         ['id','desc']
       ],
       having:{
        magazineId:brand_array
       },
        raw:true
      });
    }else{
      var get_all_billing_requests= await billing.findAll({
        attributes:['id','magazineBrandId','userId','status','paymentStartDate','planType','price',[sequelize.literal(`(SELECT name FROM users WHERE id = billing.user_id)`), 'userName'],[sequelize.literal(`(SELECT name FROM magazines_brand WHERE id = billing.magazine_brand_id)`), 'magazineBrandName'],[sequelize.literal(`(SELECT id FROM magazines WHERE id = billing.magazine_brand_id)`), 'magazineId']],

       order:[
         ['id','desc']
       ],
      
        raw:true
      });
    }
     // console.log(get_all_billing_requests,"get_all_billing_requests");return
     res.render('billing/index', { msg: req.flash('msg'), session: req.session, response: get_all_billing_requests, title: 'billing' });

    }catch(error){
      throw error
    }
  },
  accept_reject_request:async function(req,res){
    try{
   // console.log(req.body,"req.body");return
   let update_data= await billing.update({
       status:req.body.type
   },{
      where:{
        id:req.body.id
      }
   })
   res.json(req.body.type)
    }catch(error){
      throw error
    }
  },
  view_billing:async function(req,res){
    try{

      var get_one_billing_requests= await billing.findOne({
        attributes:['id','magazineBrandId','userId','status','paymentStartDate','planType','paymentType','nextPaymentDate','cardNumber','price',[sequelize.literal(`(SELECT name FROM users WHERE id = billing.user_id)`), 'userName'],[sequelize.literal(`(SELECT name FROM magazines_brand WHERE id = billing.magazine_brand_id)`), 'magazineBrandName']],
        where:{
          id:req.query.id
        },
        raw:true
      });
      // console.log(get_one_billing_requests,"hello");return
      res.render('billing/view', { msg: req.flash('msg'), session: req.session, response: get_one_billing_requests, title: 'billing' });
 

    }catch(error){
      throw error
    }
  },
  cancelled_subscription:async function(req,res){
    try{
       // console.log("hello");return
       let update_data= await billing.update({
        status:3
    },{
       where:{
         id:req.body.id
       }
    })
    res.json(1)
    }catch(error){
      throw error
    }
  }

}