const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
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


  login: async function (req, res) {
    try {
      //console.log("hello");return

      res.render('login', { msg: req.flash('msg') });
    } catch (error) {
      throw error
    }
  },
  authenticate: async function (req, res) {
    try {
      const confirm_password = crypto.createHash('sha1').update(req.body.password).digest('hex');

      let get_admin = await admins.findOne({
        attributes: ['id', 'name', 'email', 'image','module_id','role','magazine_id'],
        where: {
          email: req.body.email,
          password: confirm_password
        }
      })
      //  console.log(get_admin,"get_admin");return
      if (get_admin) {
        res.session = req.session;
        req.session.email = get_admin.dataValues.email;
        req.session.name = get_admin.dataValues.name;
        req.session.image = get_admin.dataValues.image;
        req.session.admin_id = get_admin.dataValues.id;
        req.session.module_id = get_admin.dataValues.module_id;
        req.session.magazine_id = get_admin.dataValues.magazine_id;
        req.session.role = get_admin.dataValues.role;
        // req.session.logo = users.dataValues.logo;
        req.session.id = get_admin.dataValues.id;
        /* console.log(req.session.admin_id,"hshuysg");*/
        res.session.auth = true;

        req.flash('msg', 'Login Successfully.')
        res.redirect('/admin/dashboard')
      } else {
        req.flash('msg', 'Invalid login details.')
        res.redirect('/admin')
      }

    } catch (error) {
      throw error
    }
  },
  admin_dashboard: async function (req, res) {
    // var get_total_user = await users.count({

    // })
    var admin_get= await admins.findOne({
      where:{
        id:req.session.admin_id
      },
      raw:true
    })
    if(admin_get.role==2){

    var brand_array= await admin_get.magazine_id.split(",")
    get_total_user= await users.findAll({
      attributes:['id','name','email','address','subscription','subscription_id','delete_status','status','image',[sequelize.literal(`(SELECT name FROM magazines_brand WHERE id = users.subscription_id)`), 'plan_id'],[sequelize.literal(`(SELECT id FROM magazines_brand WHERE id = users.subscription_id)`), 'plan_iddd']],
      order:[
        ['id','desc']
      ],
      having: { 'plan_iddd': brand_array},
      raw:true
    })
 //    console.log(get_total_user,"get_total_user");return
    // let admin_get= await admins.findOne({
    //   where:{
    //     id:req.session.admin_id
    //   },
    //   raw:true
    // })
    var get_all_mgazinebrand_count= await magazinesBrand.count({
      // where:{
      //   id:brand_array
      // }
    })
    var get_all_mgazine_count= await magazines.count({
      where:{
        brand_id:brand_array
      }
       
    })
    var active_user_count= await users.findAll({
      attributes:['id','name','email','address','subscription','subscription_id','delete_status','status','image',[sequelize.literal(`(SELECT name FROM magazines_brand WHERE id = users.subscription_id)`), 'plan_id'],[sequelize.literal(`(SELECT id FROM magazines_brand WHERE id = users.subscription_id)`), 'plan_iddd']],
      order:[
        ['id','desc']
      ],
      having: { 'plan_iddd': brand_array},
      raw:true,
      where:{
        status:1
      }
       
    })
    var inactive_user_count= await users.findAll({
      attributes:['id','name','email','address','subscription','subscription_id','delete_status','status','image',[sequelize.literal(`(SELECT name FROM magazines_brand WHERE id = users.subscription_id)`), 'plan_id'],[sequelize.literal(`(SELECT id FROM magazines_brand WHERE id = users.subscription_id)`), 'plan_iddd']],
      order:[
        ['id','desc']
      ],
      having: { 'plan_iddd': brand_array},
      raw:true,
      where:{
        status:0
      }
       
    })

    var subscribed_user_count= await users.count({
      
       where:{
        subscription_id:brand_array
       }
    })
    get_user_all= await users.findAll({
      attributes:['id','name','email','address','subscription','subscription_id','delete_status','status','image',[sequelize.literal(`(SELECT name FROM magazines_brand WHERE id = users.subscription_id)`), 'plan_id'],[sequelize.literal(`(SELECT id FROM magazines_brand WHERE id = users.subscription_id)`), 'plan_iddd']],
      order:[
        ['id','desc']
      ],
      having: { 'plan_iddd': brand_array},
      raw:true,
      order:[
        ['id','desc']
      ],
      raw:true,
      limit:5
    })

    // get_user_subscriber= await subscriptions.findAll({

    //   attributes:['id','user_id','plan_id',[sequelize.literal('(SELECT name FROM users WHERE id = subscriptions.user_id)'), 'name'],[sequelize.literal('(SELECT email FROM users WHERE id = subscriptions.user_id)'), 'email'],[sequelize.literal('(SELECT email FROM users WHERE id = subscriptions.user_id)'), 'email'],[sequelize.literal('(SELECT name FROM magazines_brand WHERE id = subscriptions.plan_id)'), 'planName']],
    //   where:{
    //     plan_id:brand_array
    //   },
    //   order:[
    //     ['id','desc']
    //   ],
    //   raw:true,
    //   limit:5
    // })
    get_user_subscriber= await users.findAll({

      // attributes:['id','user_id','plan_id',[sequelize.literal('(SELECT name FROM users WHERE id = subscriptions.user_id)'), 'name'],[sequelize.literal('(SELECT email FROM users WHERE id = subscriptions.user_id)'), 'email'],[sequelize.literal('(SELECT email FROM users WHERE id = subscriptions.user_id)'), 'email'],[sequelize.literal('(SELECT name FROM magazines_brand WHERE id = subscriptions.plan_id)'), 'planName']],
      attributes:['id','name','email',[sequelize.literal('(SELECT name FROM magazines_brand WHERE id = users.subscription_id)'), 'planName']],
      where:{
        subscription_id:brand_array
      },
      order:[
        ['id','desc']
      ],
      raw:true,
      limit:5
    })
    get_latest_magazine= await userVisit.findAll({
      attributes:['id','user_id','magazine_id','time_spent',[sequelize.literal('(SELECT name FROM magazines WHERE id = userVisit.magazine_id)'), 'magazineName'],[sequelize.literal('(SELECT name FROM magazines_brand WHERE id = userVisit.magazine_id)'), 'brandName'],[sequelize.literal('(SELECT name FROM users WHERE id = userVisit.user_id)'), 'userName'],[sequelize.literal('(SELECT name FROM magazines_brand WHERE id = userVisit.magazine_id)'), 'brandId']],
      order:[
        ['time_spent','desc']
      ],
      having: { 'brandId': brand_array},
      limit:5,
      raw:true
    })
  }else{
    // var brand_array= await admin_get.magazine_id.split(",")
    get_total_user= await users.findAll({
      attributes:['id','name','email','address','subscription','subscription_id','delete_status','status','image',[sequelize.literal(`(SELECT name FROM magazines_brand WHERE id = users.subscription_id)`), 'plan_id'],[sequelize.literal(`(SELECT id FROM magazines_brand WHERE id = users.subscription_id)`), 'plan_iddd']],
      order:[
        ['id','desc']
      ],
    //  having: { 'plan_iddd': brand_array},
      raw:true
    })
 //   console.log(get_total_user,"get_total_user");return
    // let admin_get= await admins.findOne({
    //   where:{
    //     id:req.session.admin_id
    //   },
    //   raw:true
    // })
    var get_all_mgazinebrand_count= await magazinesBrand.count({
      // where:{
      //   id:brand_array
      // }
    })
    
    var get_all_mgazine_count= await magazines.count({
      // where:{
      //   brand_id:brand_array
      // }
       
    })
   
    var active_user_count= await users.findAll({
      attributes:['id','name','email','address','subscription','subscription_id','delete_status','status','image',[sequelize.literal(`(SELECT name FROM magazines_brand WHERE id = users.subscription_id)`), 'plan_id'],[sequelize.literal(`(SELECT id FROM magazines_brand WHERE id = users.subscription_id)`), 'plan_iddd']],
      order:[
        ['id','desc']
      ],
     // having: { 'plan_iddd': brand_array},
      raw:true,
      where:{
        status:1
      }
       
    })
  
    var inactive_user_count= await users.findAll({
      attributes:['id','name','email','address','subscription','subscription_id','delete_status','status','image',[sequelize.literal(`(SELECT name FROM magazines_brand WHERE id = users.subscription_id)`), 'plan_id'],[sequelize.literal(`(SELECT id FROM magazines_brand WHERE id = users.subscription_id)`), 'plan_iddd']],
      order:[
        ['id','desc']
      ],
     // having: { 'plan_iddd': brand_array},
      raw:true,
      where:{
        status:0
      }
       
    })
   
    var subscribed_user_count= await users.count({
      
       where:{
      //  subscription_id:brand_array
       }
    })
   // console.log(subscribed_user_count,"subscribed_user_count");return
    get_user_all= await users.findAll({
      attributes:['id','name','email','address','subscription','subscription_id','delete_status','status','image',[sequelize.literal(`(SELECT name FROM magazines_brand WHERE id = users.subscription_id)`), 'plan_id'],[sequelize.literal(`(SELECT id FROM magazines_brand WHERE id = users.subscription_id)`), 'plan_iddd']],
      order:[
        ['id','desc']
      ],
      //having: { 'plan_iddd': brand_array},
      raw:true,
      order:[
        ['id','desc']
      ],
      raw:true,
      limit:5
    })

    // get_user_subscriber= await subscriptions.findAll({

    //   attributes:['id','user_id','plan_id',[sequelize.literal('(SELECT name FROM users WHERE id = subscriptions.user_id)'), 'name'],[sequelize.literal('(SELECT email FROM users WHERE id = subscriptions.user_id)'), 'email'],[sequelize.literal('(SELECT email FROM users WHERE id = subscriptions.user_id)'), 'email'],[sequelize.literal('(SELECT name FROM magazines_brand WHERE id = subscriptions.plan_id)'), 'planName']],
    //   // where:{
    //   //    id:brand_array
    //   // },
    //   order:[
    //     ['id','desc']
    //   ],
    //   raw:true,
    //   limit:5
    // })
    get_user_subscriber= await users.findAll({

      // attributes:['id','user_id','plan_id',[sequelize.literal('(SELECT name FROM users WHERE id = subscriptions.user_id)'), 'name'],[sequelize.literal('(SELECT email FROM users WHERE id = subscriptions.user_id)'), 'email'],[sequelize.literal('(SELECT email FROM users WHERE id = subscriptions.user_id)'), 'email'],[sequelize.literal('(SELECT name FROM magazines_brand WHERE id = subscriptions.plan_id)'), 'planName']],
      attributes:['id','name','email',[sequelize.literal('(SELECT name FROM magazines_brand WHERE id = users.subscription_id)'), 'planName']],
      // where:{
      //   subscription_id:brand_array
      // },
      order:[
        ['id','desc']
      ],
      raw:true,
      limit:5
    })
    get_latest_magazine= await userVisit.findAll({
      attributes:['id','user_id','magazine_id','time_spent',[sequelize.literal('(SELECT name FROM magazines WHERE id = userVisit.magazine_id)'), 'magazineName'],[sequelize.literal('(SELECT name FROM magazines_brand WHERE id = userVisit.magazine_id)'), 'brandName'],[sequelize.literal('(SELECT name FROM users WHERE id = userVisit.user_id)'), 'userName'],[sequelize.literal('(SELECT name FROM magazines_brand WHERE id = userVisit.magazine_id)'), 'brandId']],
      order:[
        ['time_spent','desc']
      ],
    //  having: { 'brandId': brand_array},
      limit:5,
      raw:true
    })
  }
 // console.log(get_latest_magazine,"get_latest_magazine");return
    response={
      'get_total_user':get_total_user.length,
      'get_all_mgazinebrand_count':get_all_mgazinebrand_count,
      'get_all_mgazine_count':get_all_mgazine_count,
      'active_user_count':active_user_count.length,
      'inactive_user_count':inactive_user_count.length,
      'subscribed_user_count':subscribed_user_count,
      'admin_get':admin_get
      
    }
     //console.log(response.get_total_user,"response=======");return
    res.render('dashboard/dashboard', { msg: req.flash('msg'),get_latest_magazine, title: 'dashboard',response,get_user_all,get_user_subscriber, session: req.session })


  },
  admin_logout: async function (req, res) {
    try {
      req.session.id = "";
      req.session.email = "";
      req.session.auth = false;

      req.flash('msg', 'Logout Successfully.')
      res.redirect('/admin');
    } catch (error) {
      throw error
    }
  },
  change_password: async function (req, res) {
    try {
      res.render('admin/change_password', { msg: req.flash('msg'), title: 'dashboard', session: req.session })
    } catch (error) {
      throw error
    }
  },
  update_password: async function (req, res) {
    try {
      var adminpassword = await admins.findOne({
        attributes: ['id', 'password'],
        where: {

          id: req.session.admin_id
        },
        raw: true
      });
      // if (admin) {
      //   admin = admin.map(value => {
      //     return value.toJSON();
      //   });
      // }

      const admin_password = crypto.createHash('sha1').update(req.body.old_password).digest('hex');

      if (adminpassword.password == admin_password) {

        var update_password = crypto.createHash('sha1').update(req.body.confirm_password).digest('hex');
        console.log(update_password, "sfduisdio");
        let save = await admins.update({

          password: update_password
        },
          {
            where: {
              id: req.session.admin_id
            }
          })
        console.log(save);
        req.flash('msg', 'Password updated successfully');
        res.redirect(`/admin/change_password?id=${req.body.id}`)


      } else {
        req.flash('msg', 'Please enter your correct old password');
        res.redirect(`/admin/change_password?id=${req.body.id}`)
      }
    } catch (error) {
      throw error
    }
  },
  profileadmin: async function (req, res) {
    try {
      const users_data = await admins.findOne({
        where: {
          id: req.session.admin_id
        },
        raw: true
      });

      // console.log(users);
      res.render('admin/edit_profile', { msg: req.flash('msg'), response: users_data, title: 'dashboard', session: req.session })
    } catch (error) {
      throw error
    }
  },
  update_profile_admn: async function (req, res) {
    try {

      if (req.body.name.indexOf(' ') == 0) {
        req.flash('msg', 'Please write something in name')
        res.redirect(`/admin/profile?id=${req.body.id}`)
        return
      }
      let requestdata = req.body;
      //console.log(requestdata);return false;
      const users = await admins.findOne({
        where: {
          id: requestdata.id
        }
      });
      // edit query



      image_user_url = ''
      if (req.files && req.files.image) {
        let image = req.files.image
        var extension = path.extname(image.name);
        var fileimage = uuid() + extension;
        image.mv(process.cwd() + '/public/images/users/' + fileimage, function (err) {

          if (err)
            console.log(err);
        });
        image_user_url = `/images/users/${fileimage}`
      } else {
        image_user_url = users.dataValues.image
      }

      req.session.image = image_user_url;
      req.session.name = requestdata.name;
      //  console.log(image_user_url,"image_user_url");return
      var user_update = await admins.update(
        {
          name: requestdata.name,
          email: requestdata.email,
          image: image_user_url,

        },
        {
          where:
          {
            id: requestdata.id
          }
        }
      );
      req.flash('msg', 'Admin updated successfully')
      res.redirect('/admin/dashboard')
    } catch (error) {
      throw error
    }
  },
  magazine_analytics:async function(req,res){
    try{
      var get_admim_data= await admins.findOne({
        where:{
          id:req.session.admin_id
        },
        raw:true
      })
      var brand_array= await get_admim_data.magazine_id.split(",")
     // console.log(brand_array,"brand_array");return
      if(get_admim_data.role==1){
      var get_magazine_analytics= await magazineAnalytics.findAll({
        attributes:['id','magazineId','userId','pageId', [sequelize.literal('(SELECT name FROM magazines_brand WHERE id= magazineAnalytics.magazine_id)'), 'MagazineName'],[sequelize.literal('(SELECT name FROM magazines WHERE id= magazineAnalytics.actual_magazine_id)'), 'ActualMagazineName'],[sequelize.literal('(SELECT name FROM users WHERE id= magazineAnalytics.user_id)'), 'userName'],[sequelize.literal('(SELECT count(*) FROM magazine_analytics where magazine_id=magazineAnalytics.magazine_id)'), 'magazinevisit'],[sequelize.literal('(SELECT count(*) FROM pages where magazine_id=magazineAnalytics.magazine_id)'), 'magazinecount']],
        order:[
          ['id','desc']
        ],
        raw:true,
        group:['magazineId'],
      })
    }else{
      var get_magazine_analytics= await magazineAnalytics.findAll({
        attributes:['id','magazineId','userId','pageId', [sequelize.literal('(SELECT name FROM magazines_brand WHERE id= magazineAnalytics.magazine_id)'), 'MagazineName'],[sequelize.literal('(SELECT name FROM magazines WHERE id= magazineAnalytics.actual_magazine_id)'), 'ActualMagazineName'],[sequelize.literal('(SELECT name FROM users WHERE id= magazineAnalytics.user_id)'), 'userName'],[sequelize.literal('(SELECT count(*) FROM magazine_analytics where magazine_id=magazineAnalytics.magazine_id)'), 'magazinevisit'],[sequelize.literal('(SELECT count(*) FROM pages where magazine_id=magazineAnalytics.magazine_id)'), 'magazinecount']],
        where:{
          magazineId:brand_array,
        },
        order:[
          ['id','desc']
        ],
        raw:true,
        group:['magazineId'],
      })
    }
      //console.log(get_magazine_analytics,"get_magazine_analytics");return
    res.render('magazine_analytics/magazines_analytics', { msg: req.flash('msg'), response: get_magazine_analytics, title: 'magazine_analytics', session: req.session }) 
    }catch(error){
      throw error
    }
  },
  get_filtered_data:async function(req,res){
    try{

   //   console.log(req.body.minId,"req.body.min")
      var min_date = new Date(req.body.minId).getTime()/1000
   
      var max_date = new Date(req.body.maxId).getTime()/1000
      var get_admim_data= await admins.findOne({
        where:{
          id:req.session.admin_id
        },
        raw:true
      })
      var brand_array= await get_admim_data.magazine_id.split(",")
     // console.log(brand_array,"brand_array");return
      if(get_admim_data.role==1){

      var get_magazine_analytics= await magazineAnalytics.findAll({
        attributes:['id','magazineId','userId', [sequelize.literal('(SELECT name FROM magazines_brand WHERE id= magazineAnalytics.magazine_id)'), 'MagazineName'],[sequelize.literal('(SELECT name FROM users WHERE id= magazineAnalytics.user_id)'), 'userName'],[sequelize.literal('(SELECT count(*) FROM magazines_brand where id=magazineAnalytics.magazine_id)'), 'magazinevisit'],[sequelize.literal('(SELECT count(*) FROM pages where magazine_id=magazineAnalytics.magazine_id)'), 'magazinecount']],
        where:{
           created:{
            [Op.between]: [min_date, max_date]
           }
        },
        order:[
          ['id','desc']
        ],
        group:['magazineId'],
      
        raw:true
      })
    }else{
      var get_magazine_analytics= await magazineAnalytics.findAll({
        attributes:['id','magazineId','userId', [sequelize.literal('(SELECT name FROM magazines_brand WHERE id= magazineAnalytics.magazine_id)'), 'MagazineName'],[sequelize.literal('(SELECT name FROM users WHERE id= magazineAnalytics.user_id)'), 'userName'],[sequelize.literal('(SELECT count(*) FROM magazines_brand where id=magazineAnalytics.magazine_id)'), 'magazinevisit'],[sequelize.literal('(SELECT count(*) FROM pages where magazine_id=magazineAnalytics.magazine_id)'), 'magazinecount'],[sequelize.literal('(SELECT id FROM magazines_brand where id=magazineAnalytics.magazine_id)'), 'brandId']],
        where:{
           created:{
            [Op.between]: [min_date, max_date]
           },
           
        },
        having: { 'brandId': brand_array},
        order:[
          ['id','desc']
        ],
        group:['magazineId'],
      
        raw:true
      })
 //     console.log(get_magazine_analytics,"get_magazine_analytics");return
    }
  
    res.send(get_magazine_analytics)
    }catch(error){
      throw error
    }
  },
  get_magazines_pages:async function(req,res){
    try{
       get_all_pages= await pages.findAll({
         attributes:['id','content','magazine_id',[sequelize.literal('(SELECT name FROM magazines WHERE id =pages.magazine_id )'), 'magazineName'],[sequelize.literal('(SELECT image FROM magazines WHERE id =pages.magazine_id )'), 'magazineImage'],[sequelize.literal('(SELECT count(*) FROM user_visit WHERE page_id =pages.id )'), 'total_visitcount']],
         where:{
          magazine_id:req.query.id
         },
         raw:true
       })
    // console.log(get_all_pages,"get_all_pages");return
      res.render('magazine_analytics/pages_analytics', { msg: req.flash('msg'), response: get_all_pages, title: 'magazine_analytics', session: req.session }) 
    }catch(error){
      throw error
    }
  },
  get_magazines_pages_couunt:async function(req,res){
    try{

      let get_user_visit= await magazineAnalytics.findAll({
        attributes:['id','user_id','magazine_id','actual_magazine_id','time_spent','created','pageId',[sequelize.literal('(SELECT name FROM users WHERE id =magazineAnalytics.user_id )'), 'userName'],[sequelize.literal('(SELECT email FROM users WHERE id =magazineAnalytics.user_id )'), 'userEmail'],[sequelize.literal('(SELECT name FROM magazines WHERE id =magazineAnalytics.actual_magazine_id )'), 'actualmagazinename']],
        order:[
          ['time_spent','desc']
        ],
        where:{
          magazine_id:req.query.id
        },
        raw:true
      })

      for(var i in get_user_visit){
        // for 12 hr
       /*  var start_time = moment.unix(slots[i].startTime).format("YYYY-MM-DD hh:mm:ss"); */
       // for 24 hr
        var start_time = moment.unix(get_user_visit[i].created).format("YYYY-MM-DD h:mm:ss");
        get_user_visit[i].start_time=start_time
    }
   // console.log(get_user_visit,"get_user_visit");return
      res.render('magazine_analytics/user_visit', { msg: req.flash('msg'), response: get_user_visit, title: 'magazine_analytics', session: req.session }) 
    ///  
       
    }catch(error){
      throw error
    }
  },
  get_filtered__user_name:async function(req,res){
    try{
      //console.log("hello");return
      var min_date = new Date(req.body.minId).getTime()/1000
      var max_date = new Date(req.body.maxId).getTime()/1000

      // let get_user_visit= await userVisit.findAll({
      //   attributes:['id','user_id','magazine_id','page_id','time_spent','created',[sequelize.literal('(SELECT name FROM users WHERE id =userVisit.user_id )'), 'userName'],[sequelize.literal('(SELECT email FROM users WHERE id =userVisit.user_id )'), 'userEmail']],
      //   order:[
      //     ['time_spent','desc']
      //   ],
      //   where:{
      //     created:{
      //       [Op.between]: [min_date, max_date]
      //      }
      //   },
      //   raw:true
      // })
      var get_admim_data= await admins.findOne({
        where:{
          id:req.session.admin_id
        },
        raw:true
      })
      var brand_array= await get_admim_data.magazine_id.split(",")
     // console.log(brand_array,"brand_array");return
      if(get_admim_data.role==1){
      var get_user_visit= await magazineAnalytics.findAll({
        attributes:['id','user_id','magazine_id','actual_magazine_id','time_spent','created','pageId',[sequelize.literal('(SELECT name FROM users WHERE id =magazineAnalytics.user_id )'), 'userName'],[sequelize.literal('(SELECT email FROM users WHERE id =magazineAnalytics.user_id )'), 'userEmail'],[sequelize.literal('(SELECT name FROM magazines WHERE id =magazineAnalytics.actual_magazine_id )'), 'actualmagazinename']],
        order:[
          ['time_spent','desc']
        ],
        where:{
            created:{
            [Op.between]: [min_date, max_date]
           }
        },
        raw:true
      })
    }else{
      var get_user_visit= await magazineAnalytics.findAll({
        attributes:['id','user_id','magazine_id','actual_magazine_id','time_spent','created','pageId',[sequelize.literal('(SELECT name FROM users WHERE id =magazineAnalytics.user_id )'), 'userName'],[sequelize.literal('(SELECT email FROM users WHERE id =magazineAnalytics.user_id )'), 'userEmail'],[sequelize.literal('(SELECT name FROM magazines WHERE id =magazineAnalytics.actual_magazine_id )'), 'actualmagazinename']],
        order:[
          ['time_spent','desc']
        ],
        where:{
            created:{
            [Op.between]: [min_date, max_date]
           },
           magazine_id:brand_array
        },
        raw:true
      })
    }

      for(var i in get_user_visit){
        // for 12 hr
       /*  var start_time = moment.unix(slots[i].startTime).format("YYYY-MM-DD hh:mm:ss"); */
       // for 24 hr
        var start_time = moment.unix(get_user_visit[i].created).format("YYYY-MM-DD hh:mm:ss");
        get_user_visit[i].start_time=start_time
    }
 //console.log(get_user_visit,"get_user_visit");return
    res.send(get_user_visit)
  
    }catch(error){
      throw error
    }
  },
  get_filtered_data_dashboard:async function(req,res){
    try{
   // console.log(req.body);return

    // get_user_all= await users.findAll({
    //   created:{
    //     [Op.between]: [min_date, max_date]
    //    },
    //   order:[
    //     ['id','desc']
    //   ],
    //   raw:true,
    //   limit:5
    // })
    var min_date = new Date(req.body.minId).getTime()/1000
    var max_date = new Date(req.body.maxId).getTime()/1000

    let get_admim_data= await admins.findOne({
      where:{
        id:req.session.admin_id
      },
      raw:true
    })
    let brand_array= await get_admim_data.magazine_id.split(",")
    if(get_admim_data.role==1){
    var total_users = await database.query(`select *,UNIX_TIMESTAMP(STR_TO_DATE(created_at, '%Y-%m-%d %H:%i:%s')) as created_att from users having created_att between ${min_date} and ${max_date}`, {

      model: users,
      mapToModel: true,
      type: database.QueryTypes.SELECT
    });

    if (total_users) {
      total_users = total_users.map(value => {
        return value.toJSON();
      });
    }

    get_latest_magazine= await userVisit.findAll({
      attributes:['id','user_id','magazine_id','time_spent',[sequelize.literal('(SELECT name FROM magazines WHERE id = userVisit.magazine_id)'), 'magazineName'],[sequelize.literal('(SELECT name FROM magazines_brand WHERE id = userVisit.magazine_id)'), 'brandName'],[sequelize.literal('(SELECT name FROM users WHERE id = userVisit.user_id)'), 'userName']],
      order:[
        ['time_spent','desc']
      ],
      where:{
        created:{
          [Op.between]: [min_date, max_date]
         }
      },
      limit:5,
      raw:true
    })

    get_least_magazine= await userVisit.findAll({
      attributes:['id','user_id','magazine_id','time_spent',[sequelize.literal('(SELECT name FROM magazines WHERE id = userVisit.magazine_id)'), 'magazineName'],[sequelize.literal('(SELECT name FROM magazines_brand WHERE id = userVisit.magazine_id)'), 'brandName'],[sequelize.literal('(SELECT name FROM users WHERE id = userVisit.user_id)'), 'userName']],
      order:[
        ['time_spent','asc']
      ],
      where:{
        created:{
          [Op.between]: [min_date, max_date]
         }
      },
      limit:5,
      raw:true
    })

    get_user_subscriber= await subscriptions.findAll({

      attributes:['id','user_id','plan_id',[sequelize.literal('(SELECT name FROM users WHERE id = subscriptions.user_id)'), 'name'],[sequelize.literal('(SELECT email FROM users WHERE id = subscriptions.user_id)'), 'email'],[sequelize.literal('(SELECT email FROM users WHERE id = subscriptions.user_id)'), 'email'],[sequelize.literal('(SELECT name FROM magazines_brand WHERE id = subscriptions.plan_id)'), 'planName']],
      order:[
        ['id','desc']
      ],
      raw:true,
      limit:5
    })

    // var get_user_subscriber = await database.query(`select id,user_id,plan_id,UNIX_TIMESTAMP(STR_TO_DATE(created_at, '%Y-%m-%d %H:%i:%s')) as created_att,(SELECT name FROM users WHERE id = subscriptions.user_id) as name,(SELECT email FROM users WHERE id = subscriptions.user_id) as email,(SELECT name FROM magazines_brand WHERE id = subscriptions.plan_id) as planName from subscriptions having created_att between ${min_date} and ${max_date} limit 5`, {

    //   model: subscriptions,
    //   mapToModel: true,
    //   type: database.QueryTypes.SELECT
    // });

    // if (get_user_subscriber) {
    //   get_user_subscriber = get_user_subscriber.map(value => {
    //     return value.toJSON();
    //   });
    // }

    // get_active_user= await users.count({
    //   where:{
    //     status:1,
    //     created:{
    //       [Op.between]: [min_date, max_date]
    //      }
    //   }
    // })
    var get_active_user = await database.query(`select id,UNIX_TIMESTAMP(STR_TO_DATE(created_at, '%Y-%m-%d %H:%i:%s')) as created_att from users where status=1 having created_att between ${min_date} and ${max_date}`, {

      model: subscriptions,
      mapToModel: true,
      type: database.QueryTypes.SELECT
    });

    if (get_active_user) {
      get_active_user = get_active_user.map(value => {
        return value.toJSON();
      });
    }
    var get_total_user = await database.query(`select id,UNIX_TIMESTAMP(STR_TO_DATE(created_at, '%Y-%m-%d %H:%i:%s')) as created_att from users having created_att between ${min_date} and ${max_date}`, {

      model: subscriptions,
      mapToModel: true,
      type: database.QueryTypes.SELECT
    });

    if (get_total_user) {
      get_total_user = get_total_user.map(value => {
        return value.toJSON();
      });
    }

    var get_inactive_user = await database.query(`select id,UNIX_TIMESTAMP(STR_TO_DATE(created_at, '%Y-%m-%d %H:%i:%s')) as created_att from users where status=0 having created_att between ${min_date} and ${max_date}`, {

      model: subscriptions,
      mapToModel: true,
      type: database.QueryTypes.SELECT
    });

    if (get_inactive_user) {
      get_inactive_user = get_inactive_user.map(value => {
        return value.toJSON();
      });
    }

  //console.log(get_user_subscriber,"get_user_subscriber");return
  }else{
    var total_users = await database.query(`select *,UNIX_TIMESTAMP(STR_TO_DATE(created_at, '%Y-%m-%d %H:%i:%s')) as created_att from users having created_att between ${min_date} and ${max_date} and subscription_id in(${brand_array})`, {

      model: users,
      mapToModel: true,
      type: database.QueryTypes.SELECT
    });

    if (total_users) {
      total_users = total_users.map(value => {
        return value.toJSON();
      });
    }

    get_latest_magazine= await userVisit.findAll({
      attributes:['id','user_id','magazine_id','time_spent',[sequelize.literal('(SELECT name FROM magazines WHERE id = userVisit.magazine_id)'), 'magazineName'],[sequelize.literal('(SELECT name FROM magazines_brand WHERE id = userVisit.magazine_id)'), 'brandName'],[sequelize.literal('(SELECT name FROM users WHERE id = userVisit.user_id)'), 'userName'],[sequelize.literal('(SELECT id FROM magazines_brand WHERE id = userVisit.magazine_id)'), 'brandId']],
      order:[
        ['time_spent','desc']
      ],

      where:{
        created:{
          [Op.between]: [min_date, max_date]
         }
      },
      having:{
        brandId:brand_array
      },
      limit:5,
      raw:true
    })

    get_least_magazine= await userVisit.findAll({
      attributes:['id','user_id','magazine_id','time_spent',[sequelize.literal('(SELECT name FROM magazines WHERE id = userVisit.magazine_id)'), 'magazineName'],[sequelize.literal('(SELECT name FROM magazines_brand WHERE id = userVisit.magazine_id)'), 'brandName'],[sequelize.literal('(SELECT name FROM users WHERE id = userVisit.user_id)'), 'userName'],[sequelize.literal('(SELECT id FROM magazines_brand WHERE id = userVisit.magazine_id)'), 'brandId']],
      order:[
        ['time_spent','asc']
      ],
      where:{
        created:{
          [Op.between]: [min_date, max_date]
         }
      },
      having:{
        brandId:brand_array
      },
      limit:5,
      raw:true
    })

    get_user_subscriber= await users.findAll({

      // attributes:['id','user_id','plan_id',[sequelize.literal('(SELECT name FROM users WHERE id = subscriptions.user_id)'), 'name'],[sequelize.literal('(SELECT email FROM users WHERE id = subscriptions.user_id)'), 'email'],[sequelize.literal('(SELECT email FROM users WHERE id = subscriptions.user_id)'), 'email'],[sequelize.literal('(SELECT name FROM magazines_brand WHERE id = subscriptions.plan_id)'), 'planName']],
      attributes:['id','name','email','subscription_id',[sequelize.literal('(SELECT name FROM magazines_brand WHERE id = users.subscription_id)'), 'planName']],
      where:{
        subscription_id:brand_array
      },
      order:[
        ['id','desc']
      ],
      raw:true,
      limit:5
    })

    // var get_user_subscriber = await database.query(`select id,user_id,plan_id,UNIX_TIMESTAMP(STR_TO_DATE(created_at, '%Y-%m-%d %H:%i:%s')) as created_att,(SELECT name FROM users WHERE id = subscriptions.user_id) as name,(SELECT email FROM users WHERE id = subscriptions.user_id) as email,(SELECT name FROM magazines_brand WHERE id = subscriptions.plan_id) as planName from subscriptions having created_att between ${min_date} and ${max_date} limit 5`, {

    //   model: subscriptions,
    //   mapToModel: true,
    //   type: database.QueryTypes.SELECT
    // });

    // if (get_user_subscriber) {
    //   get_user_subscriber = get_user_subscriber.map(value => {
    //     return value.toJSON();
    //   });
    // }

    // get_active_user= await users.count({
    //   where:{
    //     status:1,
    //     created:{
    //       [Op.between]: [min_date, max_date]
    //      }
    //   }
    // })
    var get_active_user = await database.query(`select id,UNIX_TIMESTAMP(STR_TO_DATE(created_at, '%Y-%m-%d %H:%i:%s')) as created_att from users where status=1 and subscription_id in(${brand_array}) having created_att between ${min_date} and ${max_date}`, {

      model: subscriptions,
      mapToModel: true,
      type: database.QueryTypes.SELECT
    });

    if (get_active_user) {
      get_active_user = get_active_user.map(value => {
        return value.toJSON();
      });
    }
    var get_total_user = await database.query(`select id,UNIX_TIMESTAMP(STR_TO_DATE(created_at, '%Y-%m-%d %H:%i:%s')) as created_att from users where subscription_id in(${brand_array}) having created_att between ${min_date} and ${max_date}`, {

      model: subscriptions,
      mapToModel: true,
      type: database.QueryTypes.SELECT
    });

    if (get_total_user) {
      get_total_user = get_total_user.map(value => {
        return value.toJSON();
      });
    }

    var get_inactive_user = await database.query(`select id,UNIX_TIMESTAMP(STR_TO_DATE(created_at, '%Y-%m-%d %H:%i:%s')) as created_att from users where status=0 and subscription_id in(${brand_array}) having created_att between ${min_date} and ${max_date}`, {

      model: subscriptions,
      mapToModel: true,
      type: database.QueryTypes.SELECT
    });

    if (get_inactive_user) {
      get_inactive_user = get_inactive_user.map(value => {
        return value.toJSON();
      });
    }
  }
 res.send({response:total_users,latest_magazine:get_latest_magazine,least_magazine:get_least_magazine,latest_subscriber:get_user_subscriber,active_user:get_active_user,total_user:get_total_user,inactive_user:get_inactive_user})
    


    }catch(error){
      throw error
    }
  },
  get_count:async function(req,res){
    try{
      var admin_get= await admins.findOne({
        where:{
          id:req.session.admin_id
        },
        raw:true
      })
      if(admin_get.role==2){
  
      
      var brand_array= await admin_get.magazine_id.split(",")
      get_active_user= await users.count({
        where:{
          status:1,
          subscription_id:brand_array
        }
      })
      get_total_user= await users.count({
        where:{
         
          subscription_id:brand_array
        }
      })

      get_inactive_user= await users.count({
        where:{
          status:0,
          subscription_id:brand_array
        }
      })

      get_subscriptions_user= await subscriptions.count({
        where:{
        //  status:1,
          id:brand_array
        }
      })
    }else{
      var brand_array= await admin_get.magazine_id.split(",")
      get_active_user= await users.count({
        where:{
          status:1,
        //  subscription_id:brand_array
        }
      })
      get_total_user= await users.count({
        where:{
         
         // subscription_id:brand_array
        }
      })

      get_inactive_user= await users.count({
        where:{
          status:0,
         // subscription_id:brand_array
        }
      })

      get_subscriptions_user= await subscriptions.count({
        where:{
        //  status:1,
         // id:brand_array
        }
      })
    }
      res.send({data:get_active_user,total:get_total_user,inactive:get_inactive_user,subscribed:get_subscriptions_user})

    }catch(error){
      throw error
    }
  },
  get_user_subscripber:async function(req,res){
    try{
      var getYear = new Date().getFullYear();
      var getMonth = new Date().getMonth() + 1;
      var Sequelize = new sequelize(config.database, config.username, config.password, config);
  
      var userData = [];
  
      var subscriberData = [];
  
      var Totalmonth = 12
  
      for (i = 1; i <= Totalmonth; i++) {
        if (i < 10) {
          var day = "0" + i;
        }
        else {
          day = i;
        }
  
        var fromDate = getYear + "-" + day + "-01";
  
        var endDate = getYear + "-" + day + "-30";
        var admin_get= await admins.findOne({
          where:{
            id:req.session.admin_id
          },
          raw:true
        })
        if(admin_get.role==2){
    
        
        var brand_array= await admin_get.magazine_id.split(",")
  
        var userquery = "select COUNT(*) as total from users where created_at between '" + fromDate + "' and '" + endDate + "' and subscription_id in("+brand_array+")";
  
        var subscriberquery = "select COUNT(*) as total from users where created_at between '" + fromDate + "' and '" + endDate + "' and subscription_id in("+brand_array+")";
  
        }else{
          var userquery = "select COUNT(*) as total from users where created_at between '" + fromDate + "' and '" + endDate + "' and subscription_id=0";
  
        var subscriberquery = "select COUNT(*) as total from users where created_at between '" + fromDate + "' and '" + endDate + "' and subscription_id!=0";
        }
        var [getUserCount] = await Sequelize.query(userquery);
  
        var [getSubscriberCount] = await Sequelize.query(subscriberquery);
  
        userData.push(getUserCount[0].total);
  
        subscriberData.push(getSubscriberCount[0].total);
  
  
      }
      var responseData = { userData: userData, subscriberData: subscriberData };
    //  console.log(responseData, "===============responseData1");return
      res.json(responseData);
    }catch(error){
      throw error
    }
  }
  

}