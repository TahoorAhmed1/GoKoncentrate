const db = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const admins = db.admin
const users = db.users
const magazinesBrand = db.magazinesBrand
const magazines = db.magazines
const pages = db.pages
const magazineAnalytics = db.magazineAnalytics
const userVisit = db.userVisit
const subscriptions = db.subscriptions
const database = require('../db/db.js');
var moment = require('moment');
var crypto = require('crypto');
// const { contained } = require("sequelize/types/lib/operators")
var path = require('path');
var uuid = require('uuid');
const flash = require('connect-flash');
module.exports = {
  index: async function (req, res) {
    try {
      //console.log("hello");return
      let get_all_admin = await admins.findAll({
        where: {
          role: {
            [Op.ne]: 1
          }
        },
        order:[
          ['id','desc']
        ]
      })
      // console.log(get_all_admin,"get_all_admin");return
      res.render('subadmin/index', { msg: req.flash('msg'), response: get_all_admin, title: 'sub_admin', session: req.session })
    } catch (error) {
      throw error
    }
  },
  add_subadmin: async function (req, res) {
    try {
      res.render('subadmin/add', { msg: req.flash('msg'), title: 'sub_admin', session: req.session })
    } catch (error) {
      throw error
    }
  },
  save_sub_admin: async function (req, res) {
    try {
      // console.log(req.body,"===================")
      if (req.body.name.indexOf(' ') == 0) {
        req.flash('msg', 'Please write something in name')
        res.redirect(`/admin/add_subadmin`)
        return
      }
      let check_email = await admins.findOne({
        where: {
          email: req.body.email
        },
        raw: true
      })
      if (check_email) {
        req.flash('msg', 'Email Already Exist')
        res.redirect(`/admin/add_subadmin`)
        return
      }
      final_array = []
      var confirm_password = crypto.createHash('sha1').update(req.body.password).digest('hex');
      if (Array.isArray(req.body.modules_data)) {
        var module_valye = req.body.modules_data.join();

      } else {
        var module_valye = req.body.modules_data
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

      let create_sub_admin = await admins.create({
        name: req.body.name,
        email: req.body.email,
        password: confirm_password,
        real_password: req.body.password,
        module_id: module_valye,
        role: 2,
        image: image_user_url
      })

      req.flash('msg', 'Sub Admin added successfully')
      res.redirect('/admin/sub_admin')
    } catch (error) {
      throw error
    }
  },
  edit_sub_admin: async function (req, res) {
    try {

      let admin_get = await admins.findOne({
        where: {
          id: req.query.id
        },
        raw: true
      })
      //
      let split_data = admin_get.module_id.split(",")
      //  console.log(admin_get,"admin_get");return
      res.render('subadmin/edit_admin', { msg: req.flash('msg'), title: 'sub_admin', response: admin_get, split_data, session: req.session })
    } catch (error) {
      throw error
    }
  },
  sub_admin_edit: async function (req, res) {
    try {

      if (req.body.name.indexOf(' ') == 0) {
        req.flash('msg', 'Please write something in name')
        res.redirect(`/admin/edit_sub_admin?id=${req.body.id}`)
        return
      }
      let check_email = await admins.findOne({
        where: {
          email: req.body.email,
          id: {
            [Op.ne]: req.body.id
          }
        },
        raw: true
      })

      if (check_email) {
        req.flash('msg', 'Email Already Exist')
        res.redirect(`/admin/edit_sub_admin?id=${req.body.id}`)
        return
      }

      get_last_image = await admins.findOne({
        attributes: ['id', 'image'],
        where: {
          id: req.body.id
        },
        raw: true
      })

      var confirm_password = crypto.createHash('sha1').update(req.body.password).digest('hex');
      if (Array.isArray(req.body.modules_data)) {
        var module_valye = req.body.modules_data.join();

      } else {
        var module_valye = req.body.modules_data
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
        image_user_url = get_last_image.image
      }

      let update_admin = await admins.update({
        name: req.body.name,
        email: req.body.email,
        password: confirm_password,
        real_password: req.body.password,
        module_id: module_valye,
        role: 2,
        image: image_user_url
      }, {
        where: {
          id: req.body.id
        }
      })
      req.flash('msg', 'Sub Admin updated successfully')
      res.redirect('/admin/sub_admin')
    } catch (error) {
      throw error
    }
  }

}