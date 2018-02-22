const model = require('./userSchema.js');

module.exports = (ACTIONS) =>{

    return async (req, res, next) => {

        if (req.method == 'POST') {
            next();
        }
        try {
            const settings = { model, payload: {
               token: req.headers.authorization.split(' ')[1]
               }
            };
            const response = await ACTIONS.send('database.read', settings);
            if(response.success[0]){
                req.headers.authCheck = true;
                next();
            } else{
                req.headers.authCheck = false;
                next();
            }
        } catch(error) {
          Promise.reject({ details: error.message, code: 101 })
        }

    };

};
