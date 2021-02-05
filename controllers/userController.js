const db = require('../models');
const sequelize = require('sequelize');
const fs = require('fs');
const admins = db.admin
const users = db.users
const subscriptions = db.subscriptions
const magazinesBrand = db.magazinesBrand
const magazines = db.magazines
const videoPageVideos = db.videoPageVideos
const musicPageAudio = db.musicPageAudio
const articlePhotos = db.articlePhotos
var crypto = require('crypto');
// const { contained } = require("sequelize/types/lib/operators")
var path = require('path');
var uuid = require('uuid');
const flash = require('connect-flash');
const photoPageImages = db.photoPageImages
var tables = {
  'admins': admins,
  'users': users,
  'magazinesBrand': magazinesBrand,
  'magazines': magazines,
  'videoPageVideos': videoPageVideos,
  'musicPageAudio': musicPageAudio,
  'photoPageImages': photoPageImages,
  'articlePhotos': articlePhotos
};

module.exports = {
  user_index: async function (req, res) {
    try {
      let admin_get = await admins.findOne({
        where: {
          id: req.session.admin_id
        },
        raw: true
      })
      var brand_array = await admin_get.magazine_id.split(",")
      if (admin_get.role == 1) {

        get_users_all = await users.findAll({
          attributes: ['id', 'name', 'email', 'address', 'subscription', 'subscription_id', 'delete_status', 'status', 'image', [sequelize.literal(`(SELECT name FROM magazines_brand WHERE id = users.subscription_id)`), 'plan_id']],
          order: [
            ['id', 'desc']
          ],
          raw: true
        })
      } else {
        // get_users_all = await users.findAll({
        //   attributes: ['id', 'name', 'email', 'address', 'subscription', 'subscription_id', 'delete_status', 'status', 'image', [sequelize.literal(`(SELECT name FROM magazines_brand WHERE id = users.subscription_id)`), 'plan_id']],
        //   where: {
        //     subscription_id: brand_array
        //   },
        //   order: [
        //     ['id', 'desc']
        //   ],
        //   raw: true
        // })
        get_users_all = await subscriptions.findAll({
          attributes: ['id','user_id', 'plan_id',[sequelize.literal(`(SELECT name FROM users WHERE id = subscriptions.user_id)`), 'name'],[sequelize.literal(`(SELECT email FROM users WHERE id = subscriptions.user_id)`), 'email'],[sequelize.literal(`(SELECT address FROM users WHERE id = subscriptions.user_id)`), 'address'],[sequelize.literal(`(SELECT subscription_id FROM users WHERE id = subscriptions.user_id)`), 'subscription_id'],[sequelize.literal(`(SELECT delete_status FROM users WHERE id = subscriptions.user_id)`), 'delete_status'],[sequelize.literal(`(SELECT status FROM users WHERE id = subscriptions.user_id)`), 'status'],[sequelize.literal(`(SELECT image FROM users WHERE id = subscriptions.user_id)`), 'image'],[sequelize.literal(`(SELECT name FROM magazines_brand WHERE id = subscription_id)`), 'plan_id']],
          where: {
            plan_id: brand_array
          },
          order: [
            ['id', 'desc']
          ],
          raw: true
        })
      }


      // console.log(get_users_all,"get_users_all");return
      res.render('users/users', { msg: req.flash('msg'), admin_get, session: req.session, response: get_users_all, title: 'users' });
    } catch (error) {
      throw error
    }
  },
  view_user: async function (req, res) {
    try {
      //  console.log(req.query.id,"===========");return
      get_users_all = await users.findOne({
        attributes: ['id', 'name', 'email', 'address', 'image', 'subscription', 'subscription_id', 'delete_status', 'status', 'image', [sequelize.literal(`(SELECT name FROM magazines_brand WHERE id = users.subscription_id)`), 'plan_id']],
        where: {
          id: req.query.id
        },
        raw: true
      })

      let get_all_subscription = await subscriptions.findAll({
        attributes: ['id', 'user_id', 'start_date', 'end_date', [sequelize.literal(`(SELECT name FROM magazines_brand WHERE id = subscriptions.plan_id)`), 'plan_id']],
        where: {
          user_id: req.query.id
        },
        raw: true
      })
      //console.log(get_users_all,"get_users_all");
      res.render('users/view_user', { msg: req.flash('msg'), total_subs: get_all_subscription, session: req.session, user: get_users_all, title: 'users' });
    } catch (error) {
      throw error
    }
  },
  delete_data: async function (req, res) {
    try {
      //console.log(req.body,"req.body");return

      // table_data= req.body.id
      //
      //  console.log(table_data,"table_data");return
      // console.log()

      let table = req.body.table
      //	console.log(data);
      if (tables.hasOwnProperty(table)) {
        table = tables[table];
      }
      // console.log(table==videoPageVideos,"table");
      //  console.log(req.body.id,"req.body.id");return
      //  if(table==videoPageVideos){
      let get_data = await table.findOne({

        where: {
          id: req.body.id
        },
        raw: true
      })
      // console.log(get_data,"get_data");return
      if (get_data.image!=undefined) {
        // console.log("innnnnnnn")
        url = 'public' + get_data.image

      } else if (get_data.video!=undefined) {

        url = 'public' + get_data.video
      } else if (get_data.music!=undefined) {

        url = 'public' + get_data.music
      } else {

        url = ''
      }
      // console.log(url,"url");return
      if (await fs.existsSync(url)) {
        //file exists
        delete_data = await fs.unlinkSync(url)
      }
      let destroy_all_data = await table.destroy({
        where: {
          id: req.body.id
        }
      })

      res.json(1)
    } catch (error) {
      throw error
    }
  },
  edit_user: async function (req, res) {
    try {
      get_users_all = await users.findOne({
        attributes: ['id', 'name', 'email', 'address', 'subscription', 'subscription_id', 'delete_status', 'status', 'image', [sequelize.literal(`(SELECT plan_id FROM subscriptions WHERE user_id = users.id)`), 'plan_id']],
        where: {
          id: req.query.id
        },
        raw: true
      })
      res.render('users/edit_user', { msg: req.flash('msg'), session: req.session, user: get_users_all, title: 'users' });
    } catch (error) {
      throw error
    }
  },
  update_user: async function (req, res) {
    try {
      //   console.log("innnnnnnnnnnnnnnnnnnnn");return

      if (req.body.name.indexOf(' ') == 0) {
        req.flash('msg', 'Please write something in name')
        res.redirect(`/admin/edit_user?id=${req.body.id}`)
        return
      }
      if (req.body.address.indexOf(' ') == 0) {
        req.flash('msg', 'Please write something in address')
        res.redirect(`/admin/edit_user?id=${req.body.id}`)
        return
      }
      var get_last_image = await users.findOne({
        attributes: ['id', 'image'],
        where: {
          id: req.body.id
        },
        raw: true
      })
      // console.log(req.files.profile_pic,"req.files");return
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
      // console.log(image_user_url,"image_user_url");return
      let update_user = await users.update({
        image: image_user_url,
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,

      }, {
          where: {
            id: req.body.id
          }
        })

      req.flash('msg', 'User updated successfully')
      res.redirect('/admin/users')

    } catch (error) {
      throw error
    }
  },
  update_status: async function (req, res) {
    try {
      let table = req.body.table
      //	console.log(req.body.id,"req.body.id;");return
      if (tables.hasOwnProperty(table)) {
        table = tables[table];
      }
      var id = req.body.id;

      var userss = await table.findOne({
        attributes: ['id', 'status'],
        where: {
          id: id
        }
      });

      /*console.log(userss.dataValues.status);*/
      var st = '';
      if (userss.dataValues.status == 1) {
        st = 0;
      } else {
        st = 1;
      }
      // update query ---------------------
      var user_update = await table.update(
        {
          status: st
        },
        {
          where:
          {
            id: id
          }
        }
      );

      res.json(st);

    } catch (error) {
      throw error
    }
  },
  get_filter_age_gender: async function (req, res) {
    try {
      // console.log(req.body,"hello");return
      var get_admim_data = await admins.findOne({
        where: {
          id: req.session.admin_id
        },
        raw: true
      })
      temp_obc = {}
      var brand_array = await get_admim_data.magazine_id.split(",")
      if (get_admim_data.role == 1) {

        if (req.body.age_value && req.body.age_value != '') {
          temp_obc.age = req.body.age_value
        }
        if (req.body.gender_value && req.body.gender_value != '') {
          temp_obc.gender = req.body.gender_value
        }
      } else {
        if (req.body.age_value && req.body.age_value != '') {
          temp_obc.age = req.body.age_value
          temp_obc.subscription_id = brand_array
        }
        if (req.body.gender_value && req.body.gender_value != '') {
          temp_obc.gender = req.body.gender_value
          temp_obc.subscription_id = brand_array
        }
      }

      get_users_all = await users.findAll({
        attributes: ['id', 'name', 'email', 'address', 'subscription', 'subscription_id', 'delete_status', 'status', 'image', [sequelize.literal(`(SELECT plan_id FROM subscriptions WHERE user_id = users.id)`), 'plan_id']],
        where: temp_obc,
        order: [
          ['id', 'desc']
        ],
        raw: true
      })
      for (var i in get_users_all) {
        if (get_users_all[i].plan_id == 1 || get_users_all[i].subscription == 0) {
          get_users_all[i].planName = 'Free'
        } else if (get_users_all[i].plan_id == 2) {
          get_users_all[i].planName = 'Silver'
        } else {
          get_users_all[i].planName = 'Premium'
        }
      }
      // console.log(get_users_all,"get_users_all")
      res.json({ response: get_users_all })
    } catch (error) {
      throw error
    }
  }



}