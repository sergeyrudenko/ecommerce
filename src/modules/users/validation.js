
module.exports = (utils) => {

  return (req, res, next) => {

    const checkModule = (req.url.indexOf('users') !==-1);
    if ( (req.method == 'POST' || req.method == 'PUT') && checkModule ) {

      const fields = [
        { name: 'login', mask: /^[a-z0-9_-]{5,15}$/g },
        { name: 'password', mask: /^[A-Za-z0-9_-]{8,15}$/g },
        { name: 'email', mask: /[a-z0-9_-]+\@[a-z0-9_-]+\.[a-z]+/g },
      ];
      req.headers.validCheck = utils.validateFields(req.body, fields);

    }
    next();
    return req.headers.validCheck;

  };

};
