module.exports = (utils) => {

  return (req, res, next) => {

    const checkModule = (req.url.indexOf('users') !==-1);
    if ( (req.method == 'POST' || req.method == 'PUT') && checkModule ) {

      const fields = [
        { name: 'login', mask: /^[a-z0-9_-]{5,15}$/g },
        { name: 'password', mask: /^[A-Za-z0-9_-]{8,25}$/g },
        {
          name: 'email',
          mask: /^[a-zA-Z0-9_-]{3,34}\@[a-z0-9]{2,6}\.[a-z0-9]{1,4}$/g,
        },
      ];

    req.headers.validation = utils.validateFields(req.body, fields, req.method);

    }

    next();

  };

};
