const { errors } = require('./config.json');

module.exports = ({ ACTIONS, ROUTER }) => {
  /**
   *****************************
   * HANDLE APPLICATION ERRORS *
   *****************************
   */
  ACTIONS.on('error.handle', (error) => {
    return new Promise((resolve, reject) => {
      const errorTemplate = {
        code: 666,
        entity: 'system',
        details: 'error not found',
        hint: 'add error code or send other error from list',
      };

      if (error && error.code && errors[error.code]) {
        errors[error.code].details = error.details || '';
        error.entity ? errors[error.code].entity = error.entity : true;

        resolve(errors[error.code]);
      } else if (!errors[error.code]) {
        errorTemplate.details = `error with code ${error.code} not found`;
      }

      reject(errorTemplate);
    });
  });
};

