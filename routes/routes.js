const appModules = require('../config/appModules');
const AuthMiddleware = require('../middlewares/auth');//Import the middleware.
const AuthMiddleware_obj = new AuthMiddleware();//Create a object of Authmiddleware.
const router = appModules.express.Router(); //Import the router module


router.get('/', function(req, res){
    res.render('login')
});

router.post('/authenticate', AuthMiddleware_obj.loginDetails(), function(req, res){})
router.get('/dashboard', [AuthMiddleware_obj.verifyUser(), AuthMiddleware_obj.getDashboard()],function(req, res){})

router.get('/profile/:admin_id', [AuthMiddleware_obj.verifyUser(), AuthMiddleware_obj.getProfile()],function(req, res){})
router.get('/edit_profile/:admin_id', [AuthMiddleware_obj.verifyUser(), AuthMiddleware_obj.editProfile()],function(req, res){})
router.post('/update_profile', [AuthMiddleware_obj.verifyUser(), AuthMiddleware_obj.updateProfile()],function(req, res){})

router.get('/change_password/:admin_id', [AuthMiddleware_obj.verifyUser(), AuthMiddleware_obj.changePassword()], function(req,res){})
router.post('/update_password',[AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.updatePassword()], function(req,res){})

router.get('/magazines_brand', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.viewMagazinesBrand()], function(req, res){})
router.get('/edit_magazine_brand/:id', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.editMagazineBrand()], function(req, res){})
router.post('/update_magazine_brand', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.updateMagazineBrand()], function(req, res){})
router.post('/edit_magazine_check_name_exists', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.checkMagazineBrandName()], function(req, res){})
router.post('/add_magazine_check_name_exists', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.checkMagazineBrandNameAtAdd()], function(req, res){})
router.get('/view_magazine_brand/:id', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.viewMagazineBrand()], function(req, res){})
router.get('/add_magazine_brand', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.addMagazineBrand()], function(req, res){})
router.post('/save_magazine_brand', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.saveMagazineBrand()], function(req, res){})

router.get('/user_plans', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.viewUserPlans()], function(req, res){})

router.get('/users', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.viewUsers()], function(req, res){})
router.get('/edit_user/:id', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.editUser()], function(req, res){})
router.post('/edit_user_check_email_exists', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.editUserCheckEmail()], function(req, res){})
router.post('/update_user', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.updateUser()], function(req, res){})
router.get('/view_user/:id', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.viewDetailedUser()], function(req, res){})

router.post('/delete_data', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.deleteData()], function(req, res){})

router.post('/update_status', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.updateStatus()], function(req, res){})

router.get('/privacy_policy', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.privacyPolicy()], function(req, res){})
router.post('/update_privacy_policy', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.updatePrivacyPolicy()], function(req, res){})

router.get('/termsconditions', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.termsAndConditions()], function(req, res){})
router.post('/update_terms_and_conditions', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.updateTermsAndConditions()], function(req, res){})

router.get('/about_us', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.aboutUs()], function(req, res){})
router.post('/update_about_us', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.updateAboutUs()], function(req, res){})

router.get('/faq', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.viewFaq()], function(req, res){})
router.post('/update_faq', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.updateFaq()], function(req, res){})

router.get('/notifications', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.notificationsToUser()], function(req, res){})
router.post('/send_email', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.sendNotificationEmail()], function(req, res){} )

router.get('/magazines', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.viewMagazines()], function(req, res){})
router.get('/add_magazine', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.addMagazine()], function(req, res){})
router.post('/save_magazine', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.saveMagazine()], function(req, res){})
router.post('/add_magazine_check_name_existance', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.checkMagazineExistance()], function(req, res){})
router.get('/edit_magazine/:id', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.editMagazine()], function(req, res){})
router.post('/add_magazine_page', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.addMagazinePage()], function(req, res){})
router.post('/update_magazine', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.updateMagazine()], function(req, res){})
router.get('/view_magazine/:id', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.viewMagazine()], function(req, res){})
router.post('/add_page', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.addPage()], function(req, res){})
router.get('/edit_page/:id', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.editPage()], function(req, res){})
router.get('/view_page/:id', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.viewPage()], function(req, res){})
router.post('/update_page', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.updatePage()], function(req, res){})
router.post('/upload', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.saveImages()], function(req, res){})

router.get('/admin_logout', [AuthMiddleware_obj.verifyUser(),AuthMiddleware_obj.adminLogout()], function(req,res){})
module.exports = router;