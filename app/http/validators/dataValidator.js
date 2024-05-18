const validator = require('./validator');
const { body, validationResult } = require('express-validator');

class dataValidator extends validator {
    handle() {
        return [
            body('name')
            .notEmpty().withMessage('فیلد نام نباید خالی باشد'),
            body('value')
            .isNumeric().withMessage('فیلد مقدار باید عدد باشد'),
            body('ts')
            .notEmpty().withMessage('فیلد زمان نباید خالی باشد'),
            (req, res, next) => {
              const errors = validationResult(req);
              if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
              }
              next();
            }
          ];
    
    }

    

}

module.exports = new dataValidator();
