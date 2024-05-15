const validator = require('./validator');
const { body, validationResult } = require('express-validator');
const Connection = require('app/models/connection');

class connectionValidator extends validator {
    handle() {
        return [
            body('value')
            .isNumeric().withMessage('فیلد مقدار باید عدد باشد'),
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

module.exports = new connectionValidator();
