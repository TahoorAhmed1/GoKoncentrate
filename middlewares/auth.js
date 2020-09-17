const appModules = require('../config/appModules');
require('dotenv').config(); //configure the .env file

const AdminModel = require('../models/admin.model'); //Import the adin model.
const AdminModel_obj = new AdminModel(); //Create an object of admin model.
const helpers = require('../config/helper');
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
    }
