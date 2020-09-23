const appModules = require('../config/appModules');
const connectDB = require('../database/db'); //Import the connection object.
require('dotenv').config(); //configure the .env file

/**
 * Export the router.
 */
module.exports = appModules.router;

/**
 * This class defines the function of admin model.
 */
module.exports = class AdminModel {

    loginModel(req, res, callback){
        connectDB.connection.getConnection(function(err){
            if(err) throw err;
            var sql = "CALL SpCheckLoginDetails(?,?)";
            var details = [req.body.email, req.body.password];
            connectDB.connection.query(sql, details, function(err, result, fields){
                if(err) throw err;
                var rows = JSON.parse(JSON.stringify(result));
                return callback(null, rows[0])
            })
        })
    }

    getUserModel(req, res, admin_id,callback){
        connectDB.connection.getConnection(function(err){
            if(err) throw err;
            var sql = "CALL SpVerifyUser(?)";
            var details = [admin_id];
            connectDB.connection.query(sql, details, function(err, result, fields){
                if(err) throw err;
                var rows = JSON.parse(JSON.stringify(result));
                return callback(null, rows[0])
            })
        })
    }

    /**
     * This model is used to update the details of the user.
     * @param {*} req 
     * @param {*} res 
     * @param {*} image
     * @param {*} callback 
     */
    updateUser(req, res, image, callback){
        connectDB.connection.getConnection(function(err){
            if(err) throw err;
            var sql = "CALL SpUpdateDetails(?,?,?,?)";
            var details = [parseInt(req.body.id,10), req.body.name, req.body.email,image[0] == '/' ? image: '/images/users/'+image]
            connectDB.connection.query(sql, details, function(err, fields){
                if(err) throw err;
                return callback(null, true)
            })
        })
    }
    
    /**
     * This model is used to update the password
     * @param {*} req 
     * @param {*} res 
     * @param {*} id 
     * @param {*} callback 
     */
    updatePasswordModel(req, res, id, callback){
        connectDB.connection.getConnection(function(err){
            if(err) throw err;
            var sql = "CALL SpUpdatePassword(?,?)";
            var newPassword = appModules.crypto.createHash('sha1').update(req.body.new_password).digest('hex');
            var details = [id, newPassword]
            connectDB.connection.query(sql, details, function(err, fields){
                if(err) throw err;
                return callback(null, true)
            })
        })
    }

    /**
     * This model is used to fetch the dashbaord data.
     * @param {*} req 
     * @param {*} res 
     * @param {*} callback 
     */
    fetchDashboardData(req, res, callback){
        connectDB.connection.getConnection(function(err){
            if(err) throw err;
            var sql = "CALL SpFetchDashboardData()";
            connectDB.connection.query(sql, function(err, result, fields){
                if(err) throw err;
                var rows = JSON.parse(JSON.stringify(result));
                return callback(null, rows[0])
            })
        })
    }

    /**
     * This model is used to view the Magazines Brand
     * @param {*} req 
     * @param {*} res 
     * @param {*} callback 
     */
    viewMagazinesBrandModel(req, res, callback){
        connectDB.connection.getConnection(function(err){
            if(err) throw err;
            var sql = "CALL SpFetchMagazinesBrand()";
            connectDB.connection.query(sql, function(err, result, fields){
                if(err) throw err;
                var rows = JSON.parse(JSON.stringify(result));
                return callback(null, rows[0])
            })
        })
    }

    /**
     * This model is used to edit the Magazines Brand
     * @param {*} req 
     * @param {*} res 
     * @param {*} callback 
     */
    editMagazineBrandModel(req, res, callback){
        connectDB.connection.getConnection(function(err){
            if(err) throw err;
            var sql = "CALL SpFetchDetailsById(?,?)";
            var details = [typeof(req.params.id) == 'undefined' ? parseInt(req.body.id,10):parseInt(req.params.id,10) , 'magazines_brand'];
            connectDB.connection.query(sql, details, function(err, result, fields){
                if(err) throw err;
                var rows = JSON.parse(JSON.stringify(result));
                return callback(null, rows[0])
            })
        })
    }

    /**
     * This model is used to update the Magazine Brand
     * @param {*} req 
     * @param {*} res 
     * @param {*} image 
     * @param {*} callback 
     */
    updateMagazineBrandModel(req, res, image, callback){
        connectDB.connection.getConnection(function(err){
            if(err) throw err;
            var sql = "CALL SpUpdateMagazineBrand(?,?,?)";
            var details = [parseInt(req.body.id,10), req.body.name, image[0] == '/' ? image: '/images/users/'+image]
            connectDB.connection.query(sql, details, function(err, fields){
                if(err) throw err;
                return callback(null, true)
            })
        });
    }

    /**
     * This model is used to delete the data.
     * @param {*} req 
     * @param {*} res 
     * @param {*} callback 
     */
    deleteDataModel(req, res, callback){
        connectDB.connection.getConnection(function(err){
            if(err) throw err;
            var sql = "CALL SpDeleteData(?,?)";
            var details = [parseInt(req.body.id, 10), req.body.table]
            connectDB.connection.query(sql, details, function(err, fields){
                if(err) throw err;
                return callback(null, true)
            })
        })
    }

    /**
     * This model is used to fetch the magazines by its brand id
     * @param {*} req 
     * @param {*} res 
     * @param {*} callback 
     */
    fetchMagazinesByBrandId(req, res, callback){
        connectDB.connection.getConnection(function(err){
            if(err) throw err;
            var sql = "CALL SpFetchMagazinesByBrandId(?)";
            connectDB.connection.query(sql, [parseInt(req.params.id, 10)], function(err, result, fields){
                if(err) throw err;
                var rows = JSON.parse(JSON.stringify(result));
                return callback(null, rows[0])
            })
        })
    }

    /**
     * This model is used to update the status
     * @param {*} req 
     * @param {*} res 
     * @param {*} callback 
     */
    updateStatusModel(req, res, callback){
        connectDB.connection.getConnection(function(err){
            if(err) throw err;
            var sql = "CALL SpUpdateStatus(?,?)";
            var details = [parseInt(req.body.id, 10), req.body.table];
            connectDB.connection.query(sql, details, function(err, result, fields){
                if(err) throw err;
                var rows = JSON.parse(JSON.stringify(result));
                return callback(null, rows[0])
            })
        })
    }

    /**
     * This model is used to save the magazine brand.
     * @param {*} req 
     * @param {*} res
     * @param {*} image 
     * @param {*} callback 
     */
    saveMagazineBrandModel(req, res, image, callback){
        connectDB.connection.getConnection(function(err){
            if(err) throw err;
            var sql = "CALL SpSaveMagazineBrand(?,?)";
            var details = [req.body.name, image];
            connectDB.connection.query(sql, details, function(err, fields){
                if(err) throw err;
                return callback(null, true)
            })
        })
    }

    /**
     * This model is used to view the user plans
     * @param {*} req 
     * @param {*} res 
     * @param {*} callback 
     */
    viewUserPlansModel(req, res, callback){
        connectDB.connection.getConnection(function(err){
            if(err) throw err;
            var sql = "CALL SpViewUsers()";
            connectDB.connection.query(sql, function(err, result, fields){
                if(err) throw err;
                var rows = JSON.parse(JSON.stringify(result));
                return callback(null, rows[0])
            })
        })
    }

    /**
     * This middleware is used to edit the user details.
     * @param {*} req 
     * @param {*} res 
     * @param {*} callback 
     */
    editUserModel(req, res, callback){
        connectDB.connection.getConnection(function(err){
            if(err) throw err;
            var sql = "CALL SpFetchDetailsById(?,?)";
            var details = [typeof(req.params.id) == 'undefined' ? parseInt(req.body.id,10):parseInt(req.params.id,10) , 'users'];
            connectDB.connection.query(sql, details, function(err, result, fields){
                if(err) throw err;
                var rows = JSON.parse(JSON.stringify(result));
                return callback(null, rows[0])
            })
        })
    }

    /**
     * This model is used to update the details of the user.
     * @param {*} req 
     * @param {*} res
     * @param {*} image 
     * @param {*} callback 
     */
    updateUserModel(req, res, image, callback){
        connectDB.connection.getConnection(function(err){
            if(err) throw err;
            var sql = "CALL SpUpdateUser(?,?,?,?,?)";
            var details = [parseInt(req.body.id,10), req.body.name.trim(), req.body.email, req.body.address.trim(),image[0] == '/' ? image: '/images/users/'+image]
            connectDB.connection.query(sql, details, function(err, fields){
                if(err) throw err;
                return callback(null, true)
            })
        });
    }

    /**
     * This model is used to fetch the subscription by id.
     * @param {*} req 
     * @param {*} res 
     * @param {*} callback 
     */
    fetchSubscriptionsById(req, res, callback){
        connectDB.connection.getConnection(function(err){
            if(err) throw err;
            var sql = "CALL SpFetchSubscriptions(?)";
            var details = [parseInt(req.params.id,10)]
            connectDB.connection.query(sql, details, function(err, result, fields){
                if(err) throw err;
                var rows = JSON.parse(JSON.stringify(result));
                return callback(null, rows[0])
            })
        });
    }

    /**
     * This model is used to view the privacy policy.
     * @param {*} req 
     * @param {*} res 
     * @param {*} callback 
     */
    privacyPolicyModel(req, res, callback){
        connectDB.connection.getConnection(function(err){
            if(err) throw err;
            var sql = "CALL SpFetchPrivacyPolicy()";
            connectDB.connection.query(sql, function(err, result, fields){
                if(err) throw err;
                var rows = JSON.parse(JSON.stringify(result));
                return callback(null, rows[0])
            })
        })
    }

    /**
     * This model is used to update the privacy policy.
     * @param {*} req 
     * @param {*} res 
     * @param {*} callback 
     */
    updatePrivacyPolicyModel(req, res, callback){
        connectDB.connection.getConnection(function(err){
            if(err) throw err;
            var sql = "CALL updatePrivacyPolicy(?)";
            connectDB.connection.query(sql, [req.body.privacy_policy], function(err, result, fields){
                if(err) throw err;
                return callback(null, true)
            })
        })
    }

    /**
     * This model is used to view the terms and conditions
     * @param {*} req 
     * @param {*} res
     * @param {*} type 
     * @param {*} callback 
     */
    termsAndConditionsModel(req, res,type, callback){
        connectDB.connection.getConnection(function(err){
            if(err) throw err;
            var sql = "CALL SpFetchContents(?)";
            connectDB.connection.query(sql, [type], function(err, result, fields){
                if(err) throw err;
                var rows = JSON.parse(JSON.stringify(result));
                return callback(null, rows[0])
            })
        });
    }

    /**
     * This model is used to update the terms and conditions
     * @param {*} req 
     * @param {*} res 
     * @param {*} callback 
     */
    updateTermsAndConditionsModel(req, res, callback){
        connectDB.connection.getConnection(function(err){
            if(err) throw err;
            var sql = "CALL updateTermsAndConditions(?)";
            connectDB.connection.query(sql, [req.body.terms_and_conditions], function(err, result, fields){
                if(err) throw err;
                return callback(null, true)
            })
        })
    }

    /**
     * This model is used to fetch the content of about us.
     * @param {*} req 
     * @param {*} res 
     * @param {*} type 
     * @param {*} callback 
     */
    aboutUsModel(req, res, type, callback){
        connectDB.connection.getConnection(function(err){
            if(err) throw err;
            var sql = "CALL SpFetchContents(?)";
            connectDB.connection.query(sql, [type], function(err, result, fields){
                if(err) throw err;
                var rows = JSON.parse(JSON.stringify(result));
                return callback(null, rows[0])
            })
        });
    }

    /**
     * This model is used to update the content of about us.
     * @param {*} req 
     * @param {*} res 
     * @param {*} callback 
     */
    updateAboutUsModel(req, res, callback){
        connectDB.connection.getConnection(function(err){
            if(err) throw err;
            var sql = "CALL SpupdateAboutUs(?)";
            connectDB.connection.query(sql, [req.body.about_us], function(err, result, fields){
                if(err) throw err;
                return callback(null, true)
            })
        })
    }

    /**
     * This model is used to fetch the details of the users.
     * @param {*} req 
     * @param {*} res 
     * @param {*} callback 
     */
    viewUserDetails(req, res, callback){
        connectDB.connection.getConnection(function(err){
            if(err) throw err;
            var sql = "CALL SpViewOnlyUsersData()";
            connectDB.connection.query(sql, function(err, result, fields){
                if(err) throw err;
                var rows = JSON.parse(JSON.stringify(result));
                return callback(null, rows[0])
            })
        });
    }

    /**
     * This model is used to fetch the magazines
     * @param {*} req 
     * @param {*} res 
     * @param {*} callback 
     */
    fetchMagazines(req, res, callback){
        connectDB.connection.getConnection(function(err){
            if(err) throw err;
            var sql = "CALL SpFetchMagazines()";
            connectDB.connection.query(sql, function(err, result, fields){
                if(err) throw err;
                var rows = JSON.parse(JSON.stringify(result));
                return callback(null, rows[0])
            })
        });
    }

    /**
     * This model is used to save the magazine
     * @param {*} req 
     * @param {*} res
     * @param {*} image 
     * @param {*} callback 
     */
    saveMagazineModel(req, res, image, callback){
        connectDB.connection.getConnection(function(err){
            if(err) throw err;
            var sql = "CALL SpSaveMagazine(?,?,?)";
            connectDB.connection.query(sql, [req.body.name, image, parseInt(req.body.brand, 10)], function(err, result, fields){
                if(err) throw err;
                return callback(null, true)
            })
        })
    }
    
    /**
     * This model is used to fetch the magazine by its Id.
     * @param {*} req 
     * @param {*} res 
     * @param {*} callback 
     */
    fetchMagazineById(req, res, callback){
        connectDB.connection.getConnection(function(err){
            if(err) throw err;
            var sql = "CALL SpFetchMagazineById(?)";
            var details = [typeof(req.params.id) == 'undefined' ? parseInt(req.body.id,10):parseInt(req.params.id,10)]
            connectDB.connection.query(sql, details,function(err, result, fields){
                if(err) throw err;
                var rows = JSON.parse(JSON.stringify(result));
                return callback(null, rows[0])
            })
        });
    }

    /**
     * This model is used to fetch the magazine page by id.
     * @param {*} req 
     * @param {*} res 
     * @param {*} callback 
     */
    fetchMagazinePageById(req, res, callback){
        connectDB.connection.getConnection(function(err){
            if(err) throw err;
            var sql = "CALL SpFetchMagazinePageById(?)";
            var details = [typeof(req.params.id) == 'undefined' ? parseInt(req.body.id,10):parseInt(req.params.id,10)]
            connectDB.connection.query(sql, details,function(err, result, fields){
                if(err) throw err;
                var rows = JSON.parse(JSON.stringify(result));
                return callback(null, rows[0])
            })
        });
    }

    /**
     * This model is used to fetch the magazine pages according to Id.
     * @param {*} req 
     * @param {*} res 
     * @param {*} callback 
     */
    fetchMagazinePages(req, res, callback){
        connectDB.connection.getConnection(function(err){
            if(err) throw err;
            var sql = "CALL SpFetchPagesContent(?)";
            var details = [typeof(req.params.magazine_id) == 'undefined' ? parseInt(req.body.magazine_id,10):parseInt(req.params.magazine_id,10)]
            connectDB.connection.query(sql, details,function(err, result, fields){
                if(err) throw err;
                var rows = JSON.parse(JSON.stringify(result));
                return callback(null, rows[0])
            })
        });
    }

    /**
     * This model is used to save the magazine page.
     * @param {*} req 
     * @param {*} res 
     * @param {*} pageno 
     * @param {*} orderno 
     * @param {*} content 
     * @param {*} callback 
     */
    saveMagazinePage(req, res, pageno, orderno, content, callback){
        connectDB.connection.getConnection(function(err){
            if(err) throw err;
            var sql = "CALL SpSaveMagazinePage(?,?,?,?,?)";
            connectDB.connection.query(sql, [pageno, orderno, content, req.body.contentType.slice(1), parseInt(req.body.magazine_id, 10)], function(err, result, fields){
                if(err) throw err;
                return callback(null, true)
            })
        })
    }

    /**
     * This model is used to save the maagzine details
     * @param {*} req 
     * @param {*} res 
     * @param {*} image 
     * @param {*} callback 
     */
    updateMagazineModel(req, res, image, callback){
        connectDB.connection.getConnection(function(err){
            if(err) throw err;
            var sql = "CALL SpUpdateMagazine(?,?,?,?)";
            connectDB.connection.query(sql, [parseInt(req.body.id, 10), req.body.name, image, parseInt(req.body.brand, 10)], function(err, result, fields){
                if(err) throw err;
                return callback(null, true)
            })
        })
    }
}