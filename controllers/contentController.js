const db = require('../models');
const sequelize = require('sequelize');
const admins = db.admin
const users = db.users
const subscriptions = db.subscriptions
const magazinesBrand = db.magazinesBrand
const magazines = db.magazines
const pages = db.pages
const content = db.content
var crypto = require('crypto');
// const { contained } = require("sequelize/types/lib/operators")
var path = require('path');
var uuid = require('uuid');
const flash = require('connect-flash');
module.exports = {
  privacy_policy: async function (req, res) {
    try {

      get_content= await content.findOne({
        where:{
          type:1
        },
        raw:true
      })
      res.render('contents/privacy_policy', { msg: req.flash('msg'),session: req.session,response:get_content, title: 'privacy_policy' });
         
    } catch (error) {
      throw error
    }
  },
  update_privacy_policy:async function(req,res){
    try{

      let update_privacy= await content.update({
           content:req.body.privacy_policy
      },{
          where:{
            type:1
          }
      })
      req.flash('msg', 'Privacy policy updated successfully')
      res.redirect('/admin/privacy_policy')

    }catch(error){
      throw error
    }
  },
  get_about_us:async function(req,res){
    try{
      get_content= await content.findOne({
        where:{
          type:2
        },
        raw:true
      })
      res.render('contents/about_us', { msg: req.flash('msg'),session: req.session,response:get_content, title: 'about_us' });
    }catch(error){
      throw error
    }
  },
  update_about_us:async function(req,res){
    try{
      let update_privacy= await content.update({
        content:req.body.about_us
   },{
       where:{
         type:2
       }
   })
   req.flash('msg', 'About us updated successfully')
   res.redirect('/admin/about_us')
    
    }catch(error){
      throw error
    }
  },
  termsconditions:async function(req,res){
    try{
      get_content= await content.findOne({
        where:{
          type:3
        },
        raw:true
      })
      res.render('contents/terms_and_conditions', { msg: req.flash('msg'),session: req.session,response:get_content, title: 'terms_and_conditions' });
    }catch(error){
      throw error
    }
  },
  update_terms_and_conditions:async function(req,res){
    try{
      let update_privacy= await content.update({
        content:req.body.terms_and_conditions
   },{
       where:{
         type:3
       }
   })
   req.flash('msg', 'Terms and conditions updated successfully')
   res.redirect('/admin/termsconditions')
    
    }catch(error){
      throw error
    }
  },
  get_faq:async function(req,res){
    try{
      get_content= await content.findOne({
        where:{
          type:4
        },
        raw:true
      })
      res.render('contents/faq', { msg: req.flash('msg'),session: req.session,response:get_content, title: 'faq' });
    }catch(error){
      throw error
    }
  },
  update_faq:async function(req,res){
    try{
      let update_privacy= await content.update({
        content:req.body.faq
   },{
       where:{
         type:4
       }
   })
   req.flash('msg', 'Faqs updated successfully')
   res.redirect('/admin/faq')
    
    }catch(error){
      throw error
    }
  },
}