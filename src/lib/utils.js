const R = require('ramda');

/**
 * Method for convertation object keys
 * from underscore to dots
 * @param  {object} reference - object for convertation
 * @return {object} - converted object
 */
const _convertkeysToDots = (reference = {}) => {

  const result = {};

  R.keys(reference).map((key) => result[key] = key.replace('_', '.'));

  return result;

};

/**
 * Method for compact transfer callback response
 * to returned promise
 * @param  {function} resolve - promise resolve method
 * @param  {function} reject - promise reject method
 * @return {function} - carried function
 */
const _callbackToPromise = (resolve = () => {}, reject = () => {}) => {

  return (error, success) => {

    return (!error) ? resolve({ success }) : reject({ error });

  };

};

/**
 * Method for compact transfer callback response
 * to returned promise
 * @param  {object} testF - filds to be checked
 * @param  {array} fields - filds for check
 * @return {boolean} - false if success or name of failed body field
 */
const _validateFields = (testF, fields) => {

 return !fields.some((field) => {

    return !field.mask.test(testF[field.name]);

  });

};

module.exports = {

  validateFields: _validateFields,
  convertkeysToDots: _convertkeysToDots,
  callbackToPromise: _callbackToPromise,

};
