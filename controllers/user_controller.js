const db = require('../models');
const sequelize = require('sequelize');
const fs = require('fs');
const User = db.users
const UserLogin = db.user_logins
const helper = require('../config/helper')
var path = require('path');
var uuid = require('uuid');
const jsonData = require('../config/jsonData')
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const jwt = require('jsonwebtoken');
const { json } = require('sequelize');


module.exports = {
    verifyOtp: async (req, res) => {
        try {
            if (!req.body.otp) {
                throw ('Otp is required!')
            }
            else {
                let otp = req.body.otp;
                let findUser = await User.findOne({
                    where: {
                        id: req.user.id,
                        email_otp: otp
                    },
                    raw: true
                })
                if (!findUser) {
                    throw ('Incorrect otp!')
                }
                else {
                    let updateUser = await User.update({
                        email_otp: null,
                        is_verified: 1
                    }, {
                        where: {
                            id: req.user.id
                        }
                    })
                    let findUser2=await User.findOne({
                        where:{
                            id:req.user.id
                        },
                        raw:true
                    })
                    return jsonData.true_status(res,findUser2,"Otp verified successfully")
                }
            }

        }
        catch (err) {
            return jsonData.wrong_status(res, err)
        }
    },
    resendOtp: async (req, res) => {
        try {
            let findUser = await User.findOne({
                where: {
                    id: req.user.id
                },
                raw: true
            })
            let otp = findUser.email_otp
            helper.resendOtpEmail(req, otp, findUser)
            return jsonData.true_status(res, {}, "email sent successfully")
        }
        catch (err) {
            console.log(err)
            return jsonData.wrong_status(res, err)
        }
    },
    getProfile: async function (req, res) {
        try {
            let findUser = await User.findOne({
                where: {
                    id: req.user.id
                },
                raw: true
            })
            return jsonData.true_status(res, findUser, 'User profile fetched successfully')
        }
        catch (err) {
            console.log(err)
            return jsonData.wrong_status(res, err)
        }
    },
    socialLogin2: async function (req, res) {
        try {
            let inputs = req.body;
            let userExists;
            let param;
            if (inputs.fb_id) {
                userExists = await User.findOne({
                    where: {
                        [Op.or]: [
                            { email: inputs.email },
                            { fb_id: inputs.fb_id }
                        ]
                    }
                })
                param = { fb_id: inputs.fb_id, email: inputs.email }
            }
            else if (inputs.google_id) {
                userExists = await User.findOne({
                    where: {
                        [Op.or]: [
                            { email: inputs.email },
                            { google_id: inputs.google_id }
                        ]
                    }
                })
                param = { google_id: inputs.google_id, email: inputs.email }
            }
            else if (inputs.apple_id) {
                if (inputs.email) {
                    userExists = await User.findOne({
                        where: {
                            [Op.or]: [
                                { email: inputs.email },
                                { apple_id: inputs.apple_id }
                            ]
                        }
                    })
                    param = { apple_id: inputs.apple_id, email: inputs.email }

                }
                else {
                    userExists = await User.findOne({
                        where: {
                            apple_id: inputs.apple_id
                        }
                    })
                    param = { apple_id: inputs.apple_id }
                }
            }
            if (inputs.name) {
                param.name = inputs.name
            }
            if (inputs.image) {
                filename = inputs.image[0]
                param.image = filename
            }
            let user_id;
            let msg;
            if (userExists) {
                userExists = userExists.toJSON();
                let updateUser = await User.update({ ...param }, {
                    where: {
                        id: userExists.id
                    }
                })
                user_id = userExists.id
                msg = "User login successfully"
            }
            else {
                let createUser = await User.create(param)
                user_id = createUser.id
                msg = "User signup successfully"
            }
            let userData = await User.findOne({
                where: {
                    id: user_id
                }, raw: true
            })
            delete userData.password

            let jwt_data = { ...userData };
            let token = jwt.sign({ user: jwt_data }, 'secretkey')
            let deleteResult = await UserLogin.destroy({
                where: {
                    device_token: inputs.device_token
                }
            })
            let createUserLogin = await UserLogin.create({
                user_id: userData.id,
                auth_token: token,
                device_type: inputs.device_type,
                device_token: inputs.device_token
            })
            userData.token = token
            return jsonData.true_status(res, userData, msg)
        }
        catch (err) {
            console.log(err)
            return jsonData.wrong_status(res, err)
        }
    },
    forgot_password: async function (req, res) {
        try {
            if (!req.body.email) {
                throw ("Email is required!")
            }
            const data = await User.findOne({
                where: {
                    email: req.body.email,
                }
            });
            if (data) {
                let otp = await helper.makeid(10)
                const salt = genSaltSync(10);
                let hashPassword = hashSync(otp, salt)
                helper.passwordReset_email(req, otp, data);
                const save = await User.update({
                    password: hashPassword

                }, {
                    where: {
                        id: data.dataValues.id
                    }
                });
                let msg = 'Email sent successfully';
                var body = {}
                return jsonData.true_status(res, body, msg)

            } else {
                let msg = 'Email does not exist';
                return jsonData.wrong_status(res, msg)
            }
        } catch (error) {
            //throw error
            console.log(error)
            return jsonData.wrong_status(res, error)

        }

    },
    login: async function (req, res) {
        try {
            let inputs = req.body;
            let email = inputs.email
            let password = inputs.password
            let userExist = await User.findOne({
                where: {
                    email: inputs.email
                },
            })
            if (!userExist) {
                throw ("Incorrect email or password")
            }
            else {
                userExist = userExist.toJSON()
                let passwordResult = compareSync(password, userExist.password);
                if (!passwordResult) {
                    throw ("Incorrect email or password")
                }
                else {
                    delete userExist.password
                    let jwt_data = userExist;
                    let token = jwt.sign({ user: jwt_data }, 'secretkey')
                    userExist.token = token

                    let deleteResult = await UserLogin.destroy({
                        where: {
                            device_token: inputs.device_token
                        }
                    })
                    let createUserLogin = await UserLogin.create({
                        user_id: userExist.id,
                        auth_token: token,
                        device_type: inputs.device_type,
                        device_token: inputs.device_token
                    })
                    return jsonData.true_status(res, userExist, 'User login successfully')
                }
            }

        }
        catch (err) {
            console.log(err)
            return jsonData.wrong_status(res, err)
        }
    },
    signup: async (req, res) => {
        try {
            let userExists
            let inputs = req.body

            if (req.body.email) {
                userExists = await User.findOne({
                    where: {
                        email: req.body.email
                    },
                    raw: true
                })
                if (userExists) {
                    throw ("Email already in use!")
                }
            }
            let filename = "";
            if (req.body.image) {
                let images = req.body.image;
                filename = images[0]
            }

            const salt = genSaltSync(10);
            let hashPassword = hashSync(inputs.password, salt)
            let email_otp = await helper.makeid(6);
            let createUser = await User.create({
                name: inputs.name,
                email: inputs.email,
                email_otp: email_otp,
                password: hashPassword,
                image: filename,
                is_verified: 0
            })
            createUser = createUser.toJSON();
            let findUser = await User.findOne({
                where: {
                    id: createUser.id
                },
            })
            findUser = findUser.toJSON()
            delete findUser.password

            let jwt_data = findUser;
            let token = jwt.sign({ user: jwt_data }, 'secretkey')
            findUser.token = token
            let deleteResult = await UserLogin.destroy({
                where: {
                    device_token: inputs.device_token
                }
            })
            let createUserLogin = await UserLogin.create({
                user_id: findUser.id,
                auth_token: token,
                device_type: inputs.device_type,
                device_token: inputs.device_token
            })
            helper.sendWelcomeEmail(req, email_otp, findUser)

            return jsonData.true_status(res, findUser, 'User signup successfully')
        }
        catch (err) {
            console.log(err)
            return jsonData.wrong_status(res, err)
        }
    },
    upload: async (req, res) => {
        try {
            let type = req.body.type ? req.body.type : 0;
            let folder = "";
            let path = "";
            if (type == 0) {
                folder = "users";
                path = "/uploads/users/"
            }
            let images = req.files.images
            let filenames = []
            if (Array.isArray(images) == true) {
                await images.forEach(async (image) => {
                    let filename = await helper.imageUpload(image, folder);
                    filenames.push(path + filename)
                });
            }
            else {
                let filename = await helper.imageUpload(images, folder);
                filenames.push(path + filename)
            }
            return jsonData.true_status(res, filenames, 'filenames')
        }
        catch (err) {
            console.log(err)
            return jsonData.wrong_status(res, err)
        }
    },
}