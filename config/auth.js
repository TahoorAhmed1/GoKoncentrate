const jwt = require("jsonwebtoken");
const jsonData = require('./jsonData');

class Auth {
  static async checkToken(req, res, next) {
    const token = req.header("authorization");

    if (!token) {
        return jsonData.unauth_status3(res,'Acces denied. No token provided!')
    }

    try {
      const decoded = jwt.verify(token, "secretkey");
      req.user = decoded.user;

      next();
    } catch (ex) {

      return jsonData.unauth_status3(res,"Access denied . Invalid token provided")

    }
  }
  static async checkOptionalToken(req, res, next) {
    const token = req.header("authorization");
    try {
      if (token) {
        const decoded = jwt.verify(token, "secretkey");
        req.user = decoded.user;
      }
      next();
    } catch (err) {
      return jsonData.unauth_status3(res,"Access denied . Invalid token provided")
    }
  }

}
module.exports = Auth;
