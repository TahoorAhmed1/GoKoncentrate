const db = require('../models');
const sequelize = require('sequelize');
const admins = db.admin
const users = db.users
const subscriptions = db.subscriptions
const magazinesBrand = db.magazinesBrand
const magazines = db.magazines
const pages = db.pages
const magazineIssues = db.magazineIssues
var crypto = require('crypto');
// const { contained } = require("sequelize/types/lib/operators")
var path = require('path');
var uuid = require('uuid');
const flash = require('connect-flash');
var moment = require('moment');
module.exports = {
  index: async function (req, res) {
    try {


      var get_all_magazines = await magazinesBrand.findAll({
        order: [
          ['id', 'desc']
        ],
        raw: true
      })

      //  console.log(get_magazine,"get_magazine");return


      res.render('magazines_brand/magazines_brand', { msg: req.flash('msg'), response: get_all_magazines, title: 'magazines_brand', session: req.session });
      //  console.log("hello");return
    } catch (error) {
      throw error
    }
  },
  add_magazine_brand: async function (req, res) {
    try {
      res.render('magazines_brand/add_magazine_brand', { msg: req.flash('msg'), title: 'magazines_brand', session: req.session });

    } catch (error) {
      throw error
    }
  },
  magazine_brand_add: async function (req, res) {
    try {

      if (req.body.name.indexOf(' ') == 0) {
        req.flash('msg', 'Please write something in name')
        res.redirect(`/admin/add_magazine_brand`)
        return
      }
      image_user_url = ''
      if (req.files && req.files.profile_pic) {
        let image = req.files.profile_pic
        var extension = path.extname(image.name);
        var fileimage = uuid() + extension;
        image.mv(process.cwd() + '/public/images/users/' + fileimage, function (err) {

          if (err)
            console.log(err);
        });
        image_user_url = `/images/users/${fileimage}`
      }

      let create_magazine_brand = await magazinesBrand.create({
        name: req.body.name,
        image: image_user_url
      })

      req.flash('msg', 'Magazine added successfully')
      res.redirect('/admin/magazines_brand')


    } catch (error) {
      throw error
    }
  },
  view_magazine_brand: async function (req, res) {
    try {

      let get_all_magazines = await magazinesBrand.findOne({
        where: {
          id: req.query.id
        },
        raw: true
      })

      let get_all_magazines_daat = await magazines.findAll({
        where: {
          brand_id: req.query.id
        },
        order: [
          ['id', 'desc']
        ],
        raw: true
      })
      res.render('magazines_brand/view_magazine_brand', { msg: req.flash('msg'), magazine_brand: get_all_magazines, title: 'magazines_brand', magazines: get_all_magazines_daat, session: req.session });
      //  console.log("hello");return
    } catch (error) {
      throw error
    }
  },
  edit_magazine_brand: async function (req, res) {
    try {

      let get_all_magazines = await magazinesBrand.findOne({
        where: {
          id: req.query.id
        },
        raw: true
      })

      // let get_all_magazines_daat= await magazines.findAll({
      //   where:{
      //     brand_id:req.query.id
      //   },
      //   raw:true
      // })
      res.render('magazines_brand/edit_magazine_brand', { msg: req.flash('msg'), magazine_brand: get_all_magazines, title: 'magazines_brand', session: req.session });
      //  console.log("hello");return
    } catch (error) {
      throw error
    }
  },
  update_magazine_brand: async function (req, res) {
    try {

      if (req.body.name.indexOf(' ') == 0) {
        req.flash('msg', 'Please write something in name')
        res.redirect(`/admin/edit_magazine_brand?id=${req.body.id}`)
        return
      }

      var get_last_image = await magazinesBrand.findOne({
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
      let update_user = await magazinesBrand.update({
        image: image_user_url,
        name: req.body.name,

      }, {
        where: {
          id: req.body.id
        }
      })

      req.flash('msg', 'Magazin brand updated successfully')
      res.redirect('/admin/magazines_brand')
      //  console.log("hello");return
    } catch (error) {
      throw error
    }
  },
  get_index: async function (req, res) {
    try {

      // console.log("hello");return
      let get_admin_data = await admins.findOne({
        where: {
          id: req.session.admin_id
        },
        raw: true
      })
    //  console.log(get_admin_data.role,"get_admin_data");return
      if (get_admin_data.role==2) {

        var brand_array = await get_admin_data.magazine_id.split(",")
        //console.log(brand_array,"brand_array");return
        var get_all_magazine = await magazines.findAll({

          order: [
            ['id', 'desc']
          ],
          where: {
            brand_id: brand_array
          },
          raw: true
        })

      } else {
        var get_all_magazine = await magazines.findAll({

          order: [
            ['id', 'desc']
          ],
          raw: true
        })
      }


       // console.log(get_all_magazine,"get_all_magazine");return

      for (var i in get_all_magazine) {
        // for 12 hr
        if (get_all_magazine[i].launch_date != '') {
          get_all_magazine[i].start_time = moment.unix(get_all_magazine[i].launch_date).format("YYYY-MM-DD");

        } else {
          get_all_magazine[i].start_time = 'Not Available'
        }
        // for 24 hr
        // var start_time = moment.unix(slots[i].startTime).format("YYYY-MM-DD H:mm:ss");
      }
      let get_admin_magazine = await admins.findOne({
        attributes: ['id', 'magazine_id'],
        where: {
          id: req.session.admin_id
        },
        raw: true
      })
      //  console.log(get_all_magazine,"get_all_magazine");return

      res.render('magazines/magazines', { msg: req.flash('msg'), magazines: get_all_magazine, get_admin_magazine, title: 'magazines', session: req.session });
    } catch (error) {
      throw error
    }
  },
  edit_magazine: async function (req, res) {
    try {
      var get_all_magazine = await magazines.findOne({
        where: {
          id: req.query.id
        },
        raw: true
      })
      get_all_magazine.start_time = moment.unix(get_all_magazine.launch_date).format("YYYY-MM-DD");
      // var get_all_magazine_brands = await magazinesBrand.findAll({
      //   attributes: ['id', 'name', 'image', 'delete_status', 'status'],
      //   where: {
      //     status: 1
      //   },
      //   order: [
      //     ['id', 'desc']
      //   ],
      //   raw: true
      // })
      if (req.session.role == 1) {
        var get_all_magazine_brands = await magazinesBrand.findAll({
          attributes: ['id', 'name', 'image', 'delete_status', 'status'],
          where: {
            status: 1,

          },
          order: [
            ['id', 'desc']
          ],
          raw: true
        })

      } else {


        var get_magazine_data = await admins.findOne({
          attributes: ['id', 'magazine_id'],
          where: {
            id: req.session.admin_id
          },
          raw: true
        })
        var nameArr = get_magazine_data.magazine_id.split(',');
        var get_all_magazine_brands = await magazinesBrand.findAll({
          attributes: ['id', 'name', 'image', 'delete_status', 'status'],
          where: {
            status: 1,
            id: nameArr

          },
          order: [
            ['id', 'desc']
          ],
          raw: true
        })

        // console.log(nameArr,"nameArr");return
      }
      //console.log(get_all_magazine_brands,"get_all_magazine_brands");return
      var get_all_magazine_page = await pages.findAll({
        where: {
          magazine_id: req.query.id
        },
        order: [
          ['id', 'desc']
        ],
        raw: true
      })
      res.render('magazines/edit_magazine', { msg: req.flash('msg'), magazine: get_all_magazine, magazine_brands: get_all_magazine_brands, pages: get_all_magazine_page, title: 'magazines', session: req.session });
    } catch (error) {
      throw error
    }
  },
  update_magazine: async function (req, res) {
    try {
      if (req.body.name.indexOf(' ') == 0) {
        req.flash('msg', 'Please write something in name')
        res.redirect(`/admin/edit_magazine?id=${req.body.id}`)
        return
      }
      //  console.log("return");return
      var get_last_image = await magazines.findOne({
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
      var timestampdate = new Date(req.body.date).getTime() / 1000
      let update_magazine_data = await magazines.update({
        image: image_user_url,
        brand_id: req.body.brand,
        name: req.body.name,
        launch_date: timestampdate
      }, {
        where: {
          id: req.body.id
        }
      })

      req.flash('msg', 'Magazine updated successfully')
      res.redirect('/admin/magazines')


    } catch (error) {
      throw error
    }
  },
  add_page_magazine: async function (req, res) {
    try {

      let create_magazine_pages = await pages.create({
        content: req.body.page,
        magazine_id: req.body.id
      })
      req.flash('msg', 'Magazine page added successfully')
      res.redirect('/admin/magazines')

    } catch (error) {
      throw error
    }
  },
  edit_page_magazine: async function (req, res) {
    try {
      let get_page = await pages.findOne({
        where: {
          id: req.query.id
        },
        order: [
          ['id', 'desc']
        ],
        raw: true
      })
      //  console.log(get_page,"get_page");return
      res.render('magazines/edit_magazine_page', { msg: req.flash('msg'), response: get_page, title: 'magazines', session: req.session });
    } catch (error) {
      throw error
    }
  },
  update_page_magazine: async function (req, res) {
    try {
      let update_magazine_page = await pages.update({
        content: req.body.magazine_page
      }, {
        where: {
          id: req.body.page_id
        }
      })

      req.flash('msg', 'Magazine page updated successfully')
      res.redirect('/admin/magazines')
    } catch (error) {
      throw error
    }
  },
  view_magazine: async function (req, res) {
    try {
      var get_all_magazine = await magazines.findOne({
        attributes: ['id', 'name', 'image', 'launch_date', [sequelize.literal(`(SELECT name FROM magazines_brand WHERE id = magazines.brand_id)`), 'brand_name']],
        where: {
          id: req.query.id
        },
        order: [
          ['id', 'desc']
        ],
        raw: true
      })
      get_all_magazine.start_time = moment.unix(get_all_magazine.launch_date).format("YYYY-MM-DD");
      //console.log(get_all_magazine_brands,"get_all_magazine_brands");return
      var get_all_magazine_page = await pages.findAll({
        where: {
          magazine_id: req.query.id
        },
        order: [
          ['id', 'desc']
        ],
        raw: true
      })
      res.render('magazines/view_magazine', { msg: req.flash('msg'), magazine: get_all_magazine, pages: get_all_magazine_page, title: 'magazines', session: req.session });

    } catch (error) {
      throw error
    }
  },
  view_page_magazine: async function (req, res) {
    try {
      let get_page = await pages.findOne({
        where: {
          id: req.query.id
        },
        order: [
          ['id', 'desc']
        ],
        raw: true
      })
      //  console.log(get_page,"get_page");return
      res.render('magazines/view_magazine_page', { msg: req.flash('msg'), response: get_page, title: 'magazines', session: req.session });
    } catch (error) {
      throw error
    }
  },
  add_magazine: async function (req, res) {
    try {

      if (req.session.role == 1) {
        var get_all_magazine_brands = await magazinesBrand.findAll({
          attributes: ['id', 'name', 'image', 'delete_status', 'status'],
          where: {
            status: 1,

          },
          order: [
            ['id', 'desc']
          ],
          raw: true
        })

      } else {


        var get_magazine_data = await admins.findOne({
          attributes: ['id', 'magazine_id'],
          where: {
            id: req.session.admin_id
          },
          raw: true
        })
        var nameArr = get_magazine_data.magazine_id.split(',');
        var get_all_magazine_brands = await magazinesBrand.findAll({
          attributes: ['id', 'name', 'image', 'delete_status', 'status'],
          where: {
            status: 1,
            id: nameArr

          },
          order: [
            ['id', 'desc']
          ],
          raw: true
        })

        // console.log(nameArr,"nameArr");return
      }

      //console.log(get_all_magazine_brands,"get_all_magazine_brands");return
      res.render('magazines/add_magazine', { msg: req.flash('msg'), magazine_brands: get_all_magazine_brands, title: 'magazines', session: req.session });
    } catch (error) {
      throw error
    }
  },
  save_magazine: async function (req, res) {
    try {
      //  console.log("hello");return
      if (req.body.name.indexOf(' ') == 0) {
        req.flash('msg', 'Please write something in name')
        res.redirect(`/admin/add_magazine`)
        return
      }

      image_user_url = ''
      if (req.files && req.files.profile_pic) {
        let image = req.files.profile_pic
        var extension = path.extname(image.name);
        var fileimage = uuid() + extension;
        image.mv(process.cwd() + '/public/images/users/' + fileimage, function (err) {
        });
        image_user_url = `/images/users/${fileimage}`
      }
      //  console.log(req.body.date,"req.body.date");return
      var timestampdate = new Date(req.body.date).getTime() / 1000
      // console.log(timestampdate,"timestampdate");return
      let create_magazine = await magazines.create({
        name: req.body.name,
        image: image_user_url,
        brand_id: req.body.brand,
        launch_date: timestampdate
      })
      req.flash('msg', 'Magazine added successfully')
      res.redirect('/admin/magazines')
    } catch (error) {
      throw error
    }
  },
  delete_magazine_data: async function (req, res) {
    try {

      let get_magazine_data = await magazines.findOne({
        where: {
          brand_id: req.body.id
        },
        raw: true
      })
      // console.log(get_magazine_data,"get_magazine_data");return
      if (get_magazine_data) {
        res.json(2)
      } else {
        let destroy_all_data = await magazines.destroy({
          where: {
            id: req.body.id
          }
        });
        res.json(1)
      }

    } catch (error) {
      throw error
    }
  },
  // magazine issues route
  issuesindex: async function (req, res) {
    try {
      // console.log("hello");return
      res.render('magazines_issues/magazines_issues', { msg: req.flash('msg'), magazines: '', title: 'magazineissue', session: req.session });
    } catch (error) {
      throw error
    }
  },
  add_magazine_issues: async function (req, res) {
    try {

      let get_all_magzines = await magazines.findAll({
        where: {
          status: 1
        },
        raw: true,
        order: [
          ['id', 'desc']
        ]
      })
      //  console.log(get_all_magzines,"get_all_magzines");return
      res.render('magazines_issues/add_magazine_issues', { msg: req.flash('msg'), get_all_magzines: get_all_magzines, title: 'magazineissue', session: req.session });
    } catch (error) {
      throw error
    }
  },
  save_magazine_issues: async function (req, res) {
    try {

    } catch (error) {
      throw error
    }
  }
}