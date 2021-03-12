const { check, validationResult, customValidators } = require('express-validator');
const jsonData = require('./jsonData');

module.exports = function (req, res, next) {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        let validationErrors=errors.array({ onlyFirstError: true }).map(i => `${i.msg}`).join(', ')
        return jsonData.wrong_status(res,validationErrors)
    } else {
        return next()
    }
}
