const model = require('./userSchema.js');

module.exports = (ACTIONS) =>{

    return (req, res, next) => {

        // if (req.method == 'POST') next();
        (req.method == 'POST') && next();

            const settings = { model, payload: {
               token: req.headers.authorization.split(' ')[1],
               },
            };
            ACTIONS.send('database.read', settings)
                .then((response)=>{
                    if (( (response || {}).success || [])[0]) {

                        req.headers.authCheck = true;
                        next();

                    }
                })
                .catch((error)=>{
                    console.log(error, 'err auth');
                    res.send(error.massage);
                });
            // if (( (response || {}).success || [])[0]) {

            //     req.headers.authCheck = true;
            //     next();

            // } else {

            //     req.headers.authCheck = false;
            //     next();

            // }

    };

};
