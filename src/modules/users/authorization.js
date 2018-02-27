const model = require('./userSchema.js');

module.exports = (ACTIONS) =>{

    return (req, res, next) => {

        const checkModule = (req.url.indexOf('goods') !==-1);
        if (req.method == 'POST' || ( checkModule && req.method == 'GET' )) {

            next();
            return;

        }

            const settings = { model, payload: {
               token: req.headers.authorization.split(' ')[1],
               },
            };
            ACTIONS.send('database.read', settings)
                .then((response)=>{

                    if (response.success) {

                        next();

                    } else {

                    res.send({ message: 'Authorization error!' });

                    }

                })
                .catch((error)=>{

                    res.send(error.massage);

                });

    };

};
