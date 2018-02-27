module.exports = (utils) => {

  return (req, res, next) => {

    const checkModule = (req.url.indexOf('goods') !==-1);
    if ( (req.method == 'POST' || req.method == 'PUT') && checkModule ) {

      const fields = [
        { name: 'price', mask: /^[0-9.,]{1,10}$/g },
        { name: 'name', mask: /^[ A-Za-z0-9.,/_-]{3,45}$/g },
      ];

    req.headers.validation = utils.validateFields(req.body, fields, req.method);

    }
    next();

  };

};
