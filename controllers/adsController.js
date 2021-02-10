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
var crypto = require('crypto');
// const { contained } = require("sequelize/types/lib/operators")
var path = require('path');
var uuid = require('uuid');
const flash = require('connect-flash');
module.exports = {
  ads_section: async function (req, res) {
    try {
      //console.log("hello");return
      var get_all_ads = await ads.findAll({
        order: [
          ['id', 'desc']
        ],
        raw: true
      });
     //  console.log(get_all_ads,"-----------");return
      res.render('ads/index', { msg: req.flash('msg'), session: req.session, response: get_all_ads, title: 'ads' });
    } catch (error) {
      throw error
    }
  },
  ads_add: async function (req, res) {
    try {

      res.render('ads/add', { msg: req.flash('msg'), session: req.session, title: 'ads' })
    } catch (error) {
      throw error
    }
  },
  add_adss: async function (req, res) {
    try {
      // console.log(req.body,"=============")
      // console.log(req.files,"=============");return

      if (req.body.name.indexOf(' ') == 0) {
        req.flash('msg', 'Please write something in name')
        res.redirect(`/admin/ads_add`)
        return
      }

      if (req.body.advertisertype.indexOf(' ') == 0) {
        req.flash('msg', 'Please write something in advertiser type')
        res.redirect(`/admin/ads_add`)
        return
      }
      if (req.files && req.files.profile_pic) {
        let image = req.files.profile_pic
        var extension = path.extname(image.name);
        var fileimage = uuid() + extension;
        image.mv(process.cwd() + '/public/images/users/' + fileimage, function (err) {

          if (err)
            console.log(err);
        });
        image_user_url = `/images/users/${fileimage}`
      } else {
        image_user_url = ''
      }

      if (req.files && req.files.video) {
        let video = req.files.video
        var extension = path.extname(video.name);
        var filevideo = uuid() + extension;
        video.mv(process.cwd() + '/public/images/users/' + filevideo, function (err) {

          if (err)
            console.log(err);
        });
        video_user_url = `/images/users/${filevideo}`
      } else {
        video_user_url = ''
      }
      let create_ads = await ads.create({
        subAdminId: req.session.admin_id,
        video: video_user_url,
        image: image_user_url,
        content:req.body.content,
        price:req.body.price,
        advertiserType:req.body.advertisertype,
        name:req.body.name
      })
      req.flash('msg', 'Advertisment added successfully')
      res.redirect('/admin/ads_section')
    } catch (error) {
      throw error
    }
  },
  view_ads:async function(req,res){
    try{
       let get_one_ad= await ads.findOne({
         where:{
           id:req.query.id
         },
         raw:true
       });
      // console.log(get_one_ad,"get_one_ad");return
      res.render('ads/view', { msg: req.flash('msg'), response:get_one_ad, session: req.session, title: 'ads' })
    }catch(error){
      throw error
    }
  },
  edit_ads:async function(req,res){
    try{
      let get_one_ad= await ads.findOne({
        where:{
          id:req.query.id
        },
        raw:true
      });
     // console.log(get_one_ad,"get_one_ad");return
     res.render('ads/edit', { msg: req.flash('msg'), response:get_one_ad, session: req.session, title: 'ads' })

    }catch(error){
      throw error
    }
  },
  edit_adss:async function(req,res){
    try{
      if (req.body.name.indexOf(' ') == 0) {
        req.flash('msg', 'Please write something in name')
        res.redirect(`/admin/edit_ads?id=${req.body.id}`)
        return
      }
      if (req.body.advertisertype.indexOf(' ') == 0) {
        req.flash('msg', 'Please write something in advertiser type')
        res.redirect(`/admin/edit_ads?id=${req.body.id}`)
        return
      }
       var get_last_data= await ads.findOne({
         where:{
           id:req.body.id
         },
         raw:true
       })
      if (req.files && req.files.profile_pic) {
        let image = req.files.profile_pic
        var extension = path.extname(image.name);
        var fileimage = uuid() + extension;
        image.mv(process.cwd() + '/public/images/users/' + fileimage, function (err) {

          if (err)
            console.log(err);
        });
        image_user_url = `/images/users/${fileimage}`
      } else {
        image_user_url = get_last_data.image
      }

      if (req.files && req.files.video) {
        let video = req.files.video
        var extension = path.extname(video.name);
        var filevideo = uuid() + extension;
        video.mv(process.cwd() + '/public/images/users/' + filevideo, function (err) {

          if (err)
            console.log(err);
        });
        video_user_url = `/images/users/${filevideo}`
      } else {
        video_user_url = get_last_data.video
      }

      let update_data= await ads.update({
        video: video_user_url,
        image: image_user_url,
        content:req.body.content,
        price:req.body.price,
        advertiserType:req.body.advertisertype,
        name:req.body.name
      },{
            where:{
              id:req.body.id
            }
      })
      req.flash('msg', 'Advertisment updated successfully')
      res.redirect('/admin/ads_section')
    }catch(error){
      throw error
    }
  }
}