const jsonData = require('./jsonData');

class Security {
    static async checkSecurityKey(req, res, next) {
        const token = req.header("securitykey");

        if (!token) {
            return jsonData.unauth_status3(res, 'securitykey is required!')
        }

        try {
            if (token != "GoKoncentrate") {
                throw ("Invalid security key!")
            }
            else {
                next();

            }

        } catch (ex) {

            return jsonData.unauth_status3(res, ex)

        }
    }
}
module.exports = Security;
