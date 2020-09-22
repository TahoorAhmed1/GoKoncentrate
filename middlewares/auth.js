const appModules = require('../config/appModules');
require('dotenv').config(); //configure the .env file
const atob = require('atob');
const AdminModel = require('../models/admin.model'); //Import the adin model.
const AdminModel_obj = new AdminModel(); //Create an object of admin model.
const helpers = require('../config/helper');
const emailer = require('../config/emailer');
/**
 * Export the router.
 */
module.exports = appModules.router;

module.exports = class AuthMiddleware {


    verifyUser(){
        return (req, res, next) => {
            appModules.jwt.verify(req.session.token, "secret", function(err, authData){
                if(err){
                    req.flash('sessionExp', 'Session Expired !');
                    res.locals.flashMessages = req.flash();
                    res.render('login');
                } else {
                    AdminModel_obj.getUserModel(req, res, authData.id, function(err, details){
                        if( details.length == 0 ){
                            req.flash('sessionExp', 'Invalid User !');
                            res.locals.flashMessages = req.flash();
                            res.render('login');
                        } else {
                            next()
                        }
                    })
                }
            })
        } 
    }

    /**
     * This middleware is used to get login details of user.
     */
    loginDetails(){
        return (req, res, next) => {
            const email = req.body.email;
            const password = req.body.password;
            AdminModel_obj.loginModel(req, res, function(err, details){
                if( details.length == 0 ){
                    req.flash('invalidUser','Email not Exists !');
                    res.locals.flashMessages = req.flash();
                    res.render('login');
                } else {
                    const password = appModules.crypto.createHash('sha1').update(req.body.password).digest('hex');
                    if( password != details[0].password ){
                        req.flash('invalidPassword','Incorrect Password !');
                        res.locals.flashMessages = req.flash();
                        res.render('login');
                    } else {
                        req.session.admin_id = details[0].id;
                        req.session.name = details[0].name;
                        req.session.email = details[0].email;
                        req.session.password = details[0].password;
                        req.session.role = details[0].role;
                        req.session.image = details[0].image;
                        req.session.auth = true;
                        const credentials = {
                            id: details[0].id,
                          };
                        req.session.token = appModules.jwt.sign(credentials, 'secret',{ algorithm: 'HS256',expiresIn: '86400s' });
                        res.redirect('/admin/dashboard');
                    }
                }
            })
        }
    }

    /**
     * This middleware is used to get into dashboard and fetch the dashboard data.
     */
    getDashboard(){
        return (req, res, next) =>{
            AdminModel_obj.fetchDashboardData(req, res, function(err, details){
                res.render('dashboard/dashboard', {
                    session: req.session,
                    title: 'dashboard',
                    users: details[0].total_users,
                    magazines: details[0].total_magazines,
                    magazines_brand: details[0].total_magazines_brand,
                    msg: req.flash('msg')
                });
            })
            }
        }

    /**
     * This middleware is used to get the profile data of admin or sub admin.
     */
    getProfile(){
        return (req, res, next) => {
            AdminModel_obj.getUserModel(req, res, req.params.admin_id, function(err, details){
                res.locals.name = details[0].name;
                res.locals.email = details[0].email;
                res.locals.image = details[0].image;
                res.render('admin/profile', {
                    session: req.session,
                    title: '',
                    msg: req.flash('msg')
                })
            })
            }
        }

        /**
         * This middleware is used to edit the profile.
         */
        editProfile(){
            return (req, res, next) => {
                AdminModel_obj.getUserModel(req, res, req.params.admin_id, function(err, details){
                    res.render('admin/edit_profile', {
                        title: '',
                        response: details[0],
                        session: req.session
                    })
                })
            }
        }

        /**
         * This middleware is used to update the profile
         */
        updateProfile(){
            return (req, res, next) => {
                var id = parseInt(req.body.id,10);
                var image = '';
                AdminModel_obj.getUserModel(req, res, id, function(err, details){
                    if( req.files == null ){
                        const oldImage = details[0].image;
                        if( oldImage ){
                            image = oldImage;
                        } else {
                            image = '';
                        }
                    }else {
                        image = helpers.imageUpload(req.files.image);
                    }
                    AdminModel_obj.updateUser(req, res, image, function(err, result){
                        if( err == null ){
                            AdminModel_obj.getUserModel(req, res, id, function(err, details){
                            req.session.image = details[0].image;
                            req.session.name = details[0].name;
                            req.session.email = details[0].email;
                            req.flash('msg', 'Profile updated successfully');
                            res.redirect('/admin/profile/'+id);
                        })
                        } else {
                            res.redirect('/admin/profile/'+id);
                        }
                    })
                })
            }
        }

        /**
         * This middleware id used to change the password
         */
        changePassword(){
            return(req, res, next) => {
                res.render('admin/change_password', {
                    title: '',
                    session: req.session,
                    msg: req.flash('msg')
                })
            }
        }

        /**
         * This middleware is used to update the password.
         */
        updatePassword(){
            return (req, res, next) => {
                const oldPassword = appModules.crypto.createHash('sha1').update(req.body.old_password).digest('hex');
                var id = parseInt(req.body.id,10);
                AdminModel_obj.getUserModel(req, res, id, function(err, details){
                    if( oldPassword != details[0].password ){
                        req.flash('msg', 'Please enter your correct old password !');
                        req.flash('old_password', req.body.old_password);
                        req.flash('new_password', req.body.new_password);
                        req.flash('confirm_password', req.body.confirm_password);
                        res.redirect('/admin/change_password/'+id);
                    } else {
                        AdminModel_obj.updatePasswordModel(req, res, id,function(err, result){
                            req.flash('msg', 'Password updated successfully');
                            res.redirect('/admin/dashboard');
                        })
                    }
                })                
            }
        }

        /**
         * This middleware is used to logout 
         */
        adminLogout(){
            return (req, res, next) => {
                req.session = null;
                res.render('login', {
                    msg: 'Logout Successfully !'
                });
            }
        }

        /**
         * This middleware is used to view the Magazines Brand
         */
        viewMagazinesBrand(){
            return (req, res, next) => {
                AdminModel_obj.viewMagazinesBrandModel(req, res, function(err, details){
                    res.render('magazines_brand/magazines_brand',{
                        response: details,
                        title: 'magazines_brand',
                        session: req.session,
                        msg: req.flash('msg')
                    })
                })
            }
        }

        /**
         * This middleawre is used to edit the magazine
         */
        editMagazineBrand(){
            return (req, res, next) => {
                AdminModel_obj.editMagazineBrandModel(req, res, function(err, details){
                    res.render('magazines_brand/edit_magazine_brand',{
                        session: req.session,
                        title: 'magazines_brand',
                        magazine_brand: details[0],
                        msg: req.flash('msg')  
                    })
                })
            }
        }

        /**
         * This middleware is used to update the magazine brand
         */
        updateMagazineBrand(){
            return (req, res, next) => {
                var id = parseInt(req.body.id,10);
                var image = '';
                AdminModel_obj.editMagazineBrandModel(req, res, function(err, details){
                    if( req.files == null ){
                        const oldImage = details[0].image;
                        if( oldImage ){
                            image = oldImage;
                        } else {
                            image = '';
                        }
                    }else {
                        image = helpers.imageUpload(req.files.profile_pic);
                    }
                    AdminModel_obj.updateMagazineBrandModel(req, res, image, function(err, result){
                        if( err == null ){
                            req.flash('msg', 'Details of Magazine Brand updated successfully');
                            res.redirect('/admin/magazines_brand');
                        }
                    })
                })
            }
        }

        /**
         * This middleware is used to check the magazine brand name.
         */
        checkMagazineBrandName(){
            return (req, res, next) => {
                AdminModel_obj.viewMagazinesBrandModel(req, res, function(err, details){
                    var cnt = 0;
                    for( var i = 0; i < details.length; i++ ){
                        if( details[i].name == req.body.name && parseInt(req.body.id) != details[i].id ){
                            cnt = 1;
                            break;
                        }
                    }
                    if( cnt == 1 ){
                        res.send("false")
                    } else{
                        res.send("true")
                    }
                })
            }
        }

        checkMagazineBrandNameAtAdd(){
            return (req, res, next) => {
                AdminModel_obj.viewMagazinesBrandModel(req, res, function(err, details){
                    var cnt = 0;
                    for( var i = 0; i < details.length; i++ ){
                        if( details[i].name == req.body.name ){
                            cnt = 1;
                            break;
                        }
                    }
                    if( cnt == 1 ){
                        res.send("false")
                    } else{
                        res.send("true")
                    }
                })
            }
        }

        /**
         * This middleware is used to delete the data.
         */
        deleteData(){
            return (req, res, next) => {
                AdminModel_obj.deleteDataModel(req, res, function(err, details){
                    if( err == null ){
                        return res.json("1")
                    }
                })
            }
        }

        /**
         * This middleware is used to view the magazines brand and its magazines
         */
        viewMagazineBrand(){
            return (req, res, next) => {
                AdminModel_obj.editMagazineBrandModel(req, res, function(err, magazines_brand){
                    if( err == null ){
                        AdminModel_obj.fetchMagazinesByBrandId(req, res, function(err, magazines){
                            if( err == null ){
                                res.render('magazines_brand/view_magazine_brand', {
                                    session: req.session,
                                    title: 'magazines_brand',
                                    total_magazines: magazines.length,
                                    magazine_brand: magazines_brand[0],
                                    magazines: magazines
                                })
                            }
                        })
                    }
                })
            }
        }

        /**
         * This middleware is used to update the status
         */
        updateStatus(){
            return (req, res, next) => {
                AdminModel_obj.updateStatusModel(req, res, function(err, details){
                    if( err == null ){
                        if( details[0].data_status == 1 || details[0].data_status == '1' ){
                            return res.json('1')
                        } else {
                            return res.json('0');
                        }
                    }
                })
            }
        }

        /**
         * This middleware is used to add the magazine brand
         */
        addMagazineBrand(){
            return (req, res, next) => {
                res.render('magazines_brand/add_magazine_brand', {
                    session: req.session,
                    msg: req.flash('msg'),
                    title: 'magazines_brand'
                })
            }
        }

        /**
         * This middleware is used to save the magazine brand
         */
        saveMagazineBrand(){
            return (req, res, next) => {
                const image = helpers.imageUpload(req.files.profile_pic);
                AdminModel_obj.saveMagazineBrandModel(req, res, '/images/users/'+image, function(err, details){
                    if( err == null ){
                        req.flash('msg', 'Magazine Brand added successfully');
                        res.redirect('/admin/magazines_brand');
                    }
                })
            }
        }

        /**
         * This middleware is used to view the user plans
         */
        viewUserPlans(){
            return (req, res, next) => {
                AdminModel_obj.viewUserPlansModel(req, res, function(err, details){
                    res.render('user_plans/user_plans',{
                        response: details,
                        title: 'users_plan',
                        session: req.session,
                        msg: req.flash('msg')
                    })
                })
            }
        }

        /**
         * This middleware is used to view the users.
         */
        viewUsers(){
            return (req, res, next) => {
                AdminModel_obj.viewUserPlansModel(req, res, function(err, details){
                    res.render('users/users',{
                        response: details,
                        title: 'users',
                        session: req.session,
                        msg: req.flash('msg')
                    })
                })
            }
        }

        /**
         * This middleware is used to edit the details of the user.
         */
        editUser(){
            return (req, res, next) => {
                AdminModel_obj.editUserModel(req, res, function(err, details){
                    res.render('users/edit_user',{
                        session: req.session,
                        title: 'users',
                        user: details[0],
                        msg: req.flash('msg')  
                    })
                })
            }
        }

        /**
         * This model is used to check if email is exists or not.
         */
        editUserCheckEmail(){
            return (req, res, next) => {
                AdminModel_obj.viewUserPlansModel(req, res, function(err, details){
                    var cnt = 0;
                    for( var i = 0; i < details.length; i++ ){
                        if( ( details[i].email == req.body.email ) && ( details[i].user_id != parseInt(req.body.id, 10) ) ){
                            cnt  = 1;
                            break;
                        }
                    }
                    if( cnt == 1 ){
                        res.send("false")
                    } else{
                        res.send("true")
                    }
                })
            }
        }

        /**
         * This middleware is used to update the user.
         */
        updateUser(){
            return (req, res, next) => {
                var id = parseInt(req.body.id,10);
                var image = '';
                AdminModel_obj.editUserModel(req, res, function(err, details){
                    if( req.files == null ){
                        const oldImage = details[0].image;
                        if( oldImage ){
                            image = oldImage;
                        } else {
                            image = '';
                        }
                    }else {
                        image = helpers.imageUpload(req.files.profile_pic);
                    }
                    AdminModel_obj.updateUserModel(req, res, image, function(err, result){
                        if( err == null ){
                            req.flash('msg', 'Details of User updated successfully');
                            res.redirect('/admin/users');
                        }
                    })
                })
            }
        }

        /**
         * This middleware is used to view the user.
         */
        viewDetailedUser(){
            return (req, res, next) => {
                AdminModel_obj.editUserModel(req, res, function(err, user){
                    AdminModel_obj.fetchSubscriptionsById(req, res, function(err, subs){
                        if( subs.length > 0 ){
                            for( var i = 0; i < subs.length; i++ ){
                                subs[i].start_date = new Date(subs[i].start_date).toDateString();
                                subs[i].end_date = new Date(subs[i].end_date).toDateString();
                            }
                        }
                        res.render('users/view_user', {
                            session: req.session,
                            title: 'users',
                            user: user[0],
                            total_subs: subs.length,
                            subs: subs
                        })
                    })
                })
            }
        }

        /**
         * This middleware is used to view the privacy policy.
         */
        privacyPolicy(){
            return (req, res, next) => {
                AdminModel_obj.privacyPolicyModel(req, res, function(err, details){
                    res.render('contents/privacy_policy', {
                        session: req.session,
                        title: 'privacy_policy',
                        response: details[0],
                        msg: req.flash('msg'),
                    })
                })
            }
        }

        /**
         * This middleware is used to update the privacy policy.
         */
        updatePrivacyPolicy(){
            return (req, res, next) => {
                AdminModel_obj.updatePrivacyPolicyModel(req, res, function(err, details){
                    if( err == null ){
                        req.flash('msg', 'Privacy Policy updated successfully');
                        res.redirect('/admin/privacy_policy');
                    }
                })
            }
        }

        /**
         * This middleware is used to view the terms and conditions.
         */
        termsAndConditions(){
            return (req, res, next) => {
                AdminModel_obj.termsAndConditionsModel(req, res, 1, function(err, details){
                    if( err == null ){
                        res.render('contents/terms_and_conditions', {
                            session: req.session,
                            title: 'terms_and_conditions',
                            response: details[0],
                            msg: req.flash('msg'),
                        })
                    }
                })
            }
        }

        /**
         * This middleware is used to update terms and conditions.
         */
        updateTermsAndConditions(){
            return (req, res, next) => {
                AdminModel_obj.updateTermsAndConditionsModel(req, res, function(err, details){
                    if( err == null ){
                        req.flash('msg', 'Terms and conditions updated successfully');
                        res.redirect('/admin/termsconditions');
                    }
                })
            }
        }

        /**
         * This middleware is used to view the about us.
         */
        aboutUs(){
            return (req, res, next) => {
                AdminModel_obj.aboutUsModel(req, res, 3, function(err, details){
                    if( err == null ){
                        res.render('contents/about_us', {
                            session: req.session,
                            title: 'about_us',
                            response: details[0],
                            msg: req.flash('msg'),
                        })
                    }
                })
            }
        }

        /**
         * This middleware is used to update the about us.
         */
        updateAboutUs(){
            return (req, res, next) => {
                AdminModel_obj.updateAboutUsModel(req, res, function(err, details){
                    if( err == null ){
                        req.flash('msg', 'About us content updated successfully');
                        res.redirect('/admin/about_us');
                    }
                })
            }
        }

        /**
         * This middleware is used to select the user to send notifications.
         */
        notificationsToUser(){
            return (req, res, next) => {
                AdminModel_obj.viewUserPlansModel(req, res, function(err, details){
                    res.render('notifications/notifications',{
                        response: details,
                        title: 'notifications',
                        session: req.session,
                        msg: req.flash('msg')
                    })
                })
            }
        }

        /**
         * This middleware is used to send notification to the user.
         */
        sendNotificationEmail(){
            return (req, res, next) => {
                var ids = atob(req.body.id)
                ids = JSON.parse(ids)
                var idsArr = Object.keys(ids).map(function (key) { 
                    return Number(ids[key]); 
                }); 
                var obj = {};
                for( var i = 0; i < idsArr.length; i++ ){
                    obj[idsArr[i]] = 1;
                }
                AdminModel_obj.viewUserDetails(req, res, async function(err, details){
                    if( err == null ){
                        for( var i = 0; i < details.length; i++ ){
                            if( details[i].id in obj ){
                                var mailOptions = {
                                    from: 'test978056@gmail.com',
                                    to: details[i].email,
                                    subject: 'GoKoncentrate',
                                    html: '<p>'+'This Message is from GoKoncentrate Admin Panel'+'</p>'
                                };
                                await emailer.sendEMail(mailOptions);
                            }
                        }
                        res.send("1")
                    }
                })
                //res.send("1");
            }
        }

        /**
         * This middleware is used to view the magazines
         */
        viewMagazines(){
            return (req, res, next) => {

            }
        }
        
    }
