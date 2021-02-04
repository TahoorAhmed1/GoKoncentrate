// const appModules = require('../config/appModules');
// const AuthMiddleware = require('../middlewares/auth');//Import the middleware.
// const AuthMiddleware_obj = new AuthMiddleware();//Create a object of Authmiddleware.
// const router = appModules.express.Router(); //Import the router module
// const multiparty = require('connect-multiparty');
// const MultipartyMiddleware = multiparty({uploadDir: '/images/users/'})
var admin = require('../controllers/AdminController.js');
var user = require('../controllers/userController.js');
var plan = require('../controllers/planController.js');
var magazine = require('../controllers/magazineController.js');
var notification = require('../controllers/notificationController.js');
var content = require('../controllers/contentController.js');
var subAdmin = require('../controllers/subAdminController.js');
// router.get('/', function(req, res){
//     res.render('login')
// });

// router.get('/authenticate', function(req, res){});
module.exports =function(app){

    app.route('/admin').get(admin.login);
    app.route('/admin/authenticate').post(admin.authenticate);
  //  app.route('/admin/login').post(admin.admin_login);
    app.route('/admin/dashboard').get(admin.admin_dashboard);
    app.route('/admin/admin_logout').get(admin.admin_logout);
    app.route('/admin/change_password').get(admin.change_password);
    app.route('/admin/update_password').post(admin.update_password);
    app.route('/admin/profile').get(admin.profileadmin);
    app.route('/admin/update_profile').post(admin.update_profile_admn);
    app.route('/admin/magazine_analytics').get(admin.magazine_analytics);
    app.route('/get_filtered_data').post(admin.get_filtered_data);
    app.route('/admin/get_magazines_pages').get(admin.get_magazines_pages);
    app.route('/admin/get_magazines_pages_couunt').get(admin.get_magazines_pages_couunt);
    app.route('/get_filtered__user_name').post(admin.get_filtered__user_name);
    app.route('/get_filtered_data_dashboard').post(admin.get_filtered_data_dashboard);
    app.route('/admin/get_count').get(admin.get_count);
    app.route('/get_user_subscripber').get(admin.get_user_subscripber);
    // user controller  /  

    app.route('/admin/users').get(user.user_index);
    app.route('/admin/view_user').get(user.view_user);
    app.route('/admin/delete_data').post(user.delete_data);
    app.route('/admin/edit_user').get(user.edit_user);
    app.route('/admin/update_userrrrr').post(user.update_user);
    app.route('/admin/update_status').post(user.update_status);
    app.route('/get_filter_age_gender').post(user.get_filter_age_gender);
    
    // plan controller 

    app.route('/admin/user_plans').get(plan.index);

    //  magazine controller

    app.route('/admin/magazines_brand').get(magazine.index);
    app.route('/admin/add_magazine_brand').get(magazine.add_magazine_brand);
    app.route('/admin/save_magazine_brand').post(magazine.magazine_brand_add);
    app.route('/admin/view_magazine_brand').get(magazine.view_magazine_brand);
    app.route('/admin/edit_magazine_brand').get(magazine.edit_magazine_brand);
    app.route('/admin/update_magazine_brand').post(magazine.update_magazine_brand);

    // magazine route
    app.route('/admin/magazines').get(magazine.get_index);
    app.route('/admin/edit_magazine').get(magazine.edit_magazine);
    app.route('/admin/update_magazine').post(magazine.update_magazine);
    app.route('/admin/add_page').post(magazine.add_page_magazine);
    app.route('/admin/edit_page').get(magazine.edit_page_magazine);
    app.route('/admin/update_page').post(magazine.update_page_magazine);
    app.route('/admin/view_magazine').get(magazine.view_magazine);
    app.route('/admin/view_page').get(magazine.view_page_magazine);
    app.route('/admin/add_magazine').get(magazine.add_magazine);
    app.route('/admin/save_magazine').post(magazine.save_magazine);
    app.route('/admin/delete_magazine_data').post(magazine.delete_magazine_data);


    // magazine issues route
    app.route('/admin/magazinesissues').get(magazine.issuesindex);
    app.route('/admin/add_magazine_issues').get(magazine.add_magazine_issues);
    app.route('/admin/save_magazine_issues').post(magazine.save_magazine_issues);
    
    //  notification controller  
    app.route('/admin/notifications').get(notification.index);
    app.route('/admin/send_email').post(notification.send_email_user);
    app.route('/getusers_list').post(notification.getusers_list);
    app.route('/admin/send_notification').post(notification.send_notification);
    
    // content controller
    app.route('/admin/privacy_policy').get(content.privacy_policy);
    app.route('/admin/update_privacy_policy').post(content.update_privacy_policy);
    app.route('/admin/about_us').get(content.get_about_us);
    app.route('/admin/update_about_us').post(content.update_about_us);
    app.route('/admin/termsconditions').get(content.termsconditions);
    app.route('/admin/update_terms_and_conditions').post(content.update_terms_and_conditions);
    app.route('/admin/faq').get(content.get_faq);
    app.route('/admin/update_faq').post(content.update_faq);


    // sub admin controller 
   
    app.route('/admin/sub_admin').get(subAdmin.index);
    app.route('/admin/add_subadmin').get(subAdmin.add_subadmin);
    app.route('/admin/save_sub_admin').post(subAdmin.save_sub_admin);
    app.route('/admin/edit_sub_admin').get(subAdmin.edit_sub_admin);
    app.route('/admin/sub_admin_edit').post(subAdmin.sub_admin_edit);
    app.route('/admin/view_sub_admin').get(subAdmin.view_sub_admin);

    /// magazine_pages



   
   // app.route('/video_page').get(magazine.video_page);
    app.route('/admin/add_pages_new').get(magazine.add_pages);
    app.route('/admin/add_video_page').post(magazine.add_video_page);
    app.route('/admin/add_music_page').post(magazine.add_music_page);

    app.route('/admin/edit_video_page').post(magazine.edit_video_page);
    app.route('/admin/edit_music').get(magazine.edit_music);
    app.route('/admin/edit_music_pageno').post(magazine.edit_music_pageno);


    //// article page 
    app.route('/admin/add_article_page_admin').post(magazine.add_article_page_admin);
    app.route('/admin/edit_articlepage').get(magazine.edit_articlepage);
    app.route('/admin/edit_article_page_admin').post(magazine.edit_article_page_admin);
    app.route('/admin/edit_article_photos').get(magazine.edit_article_photos);
    app.route('/edit_article_photos').get(magazine.edit_article_photosadmin);
    app.route('/admin/edit_article_pic').post(magazine.edit_article_pic);

    /////////// photo page

    app.route('/admin/add_photo_page_admin').post(magazine.add_photo_page_admin);
    app.route('/admin/editphotopage').get(magazine.editphotopage);
    app.route('/admin/edit_photo_page_admin').post(magazine.edit_photo_page_admin);
    app.route('/admin/edit_page_photos').get(magazine.edit_page_photos);
    app.route('/edit_page_photosadmin').get(magazine.edit_page_photosadmin);
    app.route('/admin/edit_photopage_pic').post(magazine.edit_photopage_pic);

    app.route('/admin/edit_single_video').get(magazine.edit_single_video);
    app.route('/admin/add_singlevideo').get(magazine.add_singlevideo);
    app.route('/admin/add_new_single_video').post(magazine.add_new_single_video);
    app.route('/admin/add_edit_singlemusic').get(magazine.add_edit_singlemusic);
    app.route('/admin/add_singlemusic').get(magazine.add_singlemusic);
    app.route('/admin/add_new_single_music').post(magazine.add_new_single_music);
    app.route('/admin/add_singlephotos').get(magazine.add_singlephotos);
    app.route('/admin/add_new_single_photos').post(magazine.add_new_single_photos);
    app.route('/admin/add_singlearticle_photos').get(magazine.add_singlearticle_photos);
    app.route('/admin/edit_article_picsingle').post(magazine.edit_article_picsingle);
}
///admin/add_new_single_video



// router.post('/authenticate', AuthMiddleware_obj.loginDetails(), function(req, res){})
// router.get('/dashboard', [AuthMiddleware_obj.verifyUser(), AuthMiddleware_obj.getDashboard()],function(req, res){})

// router.get('/profile/:admin_id', [AuthMiddleware_obj.verifyUser(), AuthMiddleware_obj.getProfile()],function(req, res){})
// router.get('/edit_profile/:admin_id', [AuthMiddleware_obj.verifyUser(), AuthMiddleware_obj.editProfile()],function(req, res){})
// router.post('/update_profile', [AuthMiddleware_obj.verifyUser(), AuthMiddleware_obj.updateProfile()],function(req, res){})

// router.get('/change_password/:admin_id', [AuthMiddleware_obj.verifyUser(), AuthMiddleware_obj.changePassword()], function(req,res){})
// router.post('/update_password',[AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.updatePassword()], function(req,res){})

// router.get('/magazines_brand', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.viewMagazinesBrand()], function(req, res){})
// router.get('/edit_magazine_brand/:id', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.editMagazineBrand()], function(req, res){})
// router.post('/update_magazine_brand', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.updateMagazineBrand()], function(req, res){})
// router.post('/edit_magazine_check_name_exists', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.checkMagazineBrandName()], function(req, res){})
// router.post('/add_magazine_check_name_exists', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.checkMagazineBrandNameAtAdd()], function(req, res){})
// router.get('/view_magazine_brand/:id', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.viewMagazineBrand()], function(req, res){})
// router.get('/add_magazine_brand', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.addMagazineBrand()], function(req, res){})
// router.post('/save_magazine_brand', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.saveMagazineBrand()], function(req, res){})

// router.get('/user_plans', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.viewUserPlans()], function(req, res){})

// router.get('/users', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.viewUsers()], function(req, res){})
// router.get('/edit_user/:id', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.editUser()], function(req, res){})
// router.post('/edit_user_check_email_exists', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.editUserCheckEmail()], function(req, res){})
// router.post('/update_user', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.updateUser()], function(req, res){})
// router.get('/view_user/:id', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.viewDetailedUser()], function(req, res){})

// router.post('/delete_data', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.deleteData()], function(req, res){})

// router.post('/update_status', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.updateStatus()], function(req, res){})

// router.get('/privacy_policy', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.privacyPolicy()], function(req, res){})
// router.post('/update_privacy_policy', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.updatePrivacyPolicy()], function(req, res){})

// router.get('/termsconditions', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.termsAndConditions()], function(req, res){})
// router.post('/update_terms_and_conditions', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.updateTermsAndConditions()], function(req, res){})

// router.get('/about_us', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.aboutUs()], function(req, res){})
// router.post('/update_about_us', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.updateAboutUs()], function(req, res){})

// router.get('/faq', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.viewFaq()], function(req, res){})
// router.post('/update_faq', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.updateFaq()], function(req, res){})

// router.get('/notifications', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.notificationsToUser()], function(req, res){})
// router.post('/send_email', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.sendNotificationEmail()], function(req, res){} )

// router.get('/magazines', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.viewMagazines()], function(req, res){})
// router.get('/add_magazine', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.addMagazine()], function(req, res){})
// router.post('/save_magazine', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.saveMagazine()], function(req, res){})
// router.post('/add_magazine_check_name_existance', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.checkMagazineExistance()], function(req, res){})
// router.get('/edit_magazine/:id', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.editMagazine()], function(req, res){})
// router.post('/add_magazine_page', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.addMagazinePage()], function(req, res){})
// router.post('/update_magazine', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.updateMagazine()], function(req, res){})
// router.get('/view_magazine/:id', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.viewMagazine()], function(req, res){})
// router.post('/add_page', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.addPage()], function(req, res){})
// router.get('/edit_page/:id', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.editPage()], function(req, res){})
// router.get('/view_page/:id', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.viewPage()], function(req, res){})
// router.post('/update_page', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.updatePage()], function(req, res){})
// router.post('/upload', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.uploadPageImage()], function(req, res){})

// router.get('/admin_logout', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.adminLogout()], function(req,res){})
//module.exports = router;