const { routes } = require('./config.json');
const model = require('./userSchema.js');

module.exports = (ACTIONS, utils) =>{

const { users_get } = utils.convertkeysToDots(routes);

    return function(req, res, next) {

        if (req.method == 'POST') {

            next();
            return true;

        }

        ACTIONS.on(users_get, async ({ params, headers }) => {
        try {

            const settings = { model, payload: { token: req.headers.authorization.split(' ')[1] } };
            const response = await ACTIONS.send('database.read', settings);
            console.log(response);
            next();

        } catch(error) {
          Promise.reject({ details: error.message, code: 101 })
        }


        });


        // User.findOne({ token }, (err, record) => {

        //     if (record) {

        //         req.headers.authCheck = true;
        //         next();
        //         return true;

        //     } else if (err) {

        //         console.log(err);
        //         req.headers.authCheck = false;
        //         next();
        //         return false;

        //      } else {

        //         console.log('USER NOT FOUND');
        //         req.headers.authCheck = false;
        //         next();
        //         return false;

        //      }

        // });

    };

};
