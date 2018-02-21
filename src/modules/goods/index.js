const { routes } = require('./config.json');
const uuid = require('uuid');
const model = require('./goodsSchema.js');
const goodsValidCheck = require ('./validation.js');

module.exports = ({ ACTIONS, ROUTER, utils }) => {

  /**
   *****************************************
   * GET CORRECT ACTIONS NAMES FROM CONFIG *
   *****************************************
   */

   const { goods_auth,
           goods_get,
           goods_create,
           goods_update,
           goods_delete,
           goods_getAll } = utils.convertkeysToDots(routes);
    /**
   ***************************
   * SET MIDDLEWARES *
   ***************************
   *const firstMidleware = (req, res) => {};
   *const secondMidleware = (req, res) => {};
   *
   * ROUTER.set('middlewares', { firstMidleware, secondMidleware });
   */
   ROUTER.set('middlewares', { goodsValidCheck: goodsValidCheck(utils) });

  /**
   *************************************
   * ADD USERS ROUTES TO ACTIONS TREAD *
   *************************************
   */

  ROUTER.routes = Object.assign(ROUTER.routes, routes);


   /************************************
   * SUBSCRIBE TO USERS AUTHORIZATION *
   ************************************
   *
   * @param  {object} headers - http headers
   * @param  {object} query - parameters from the url
   * @param  {object} body - parameters from json body
   * @return {promise} - success response or error
   */

  ACTIONS.on(goods_auth, ({  query, body, headers }) => {


    const response = { name: 'John', surname: 'Dou' };

    return (response.name) ?
      Promise.resolve(response) :
      Promise.reject({ error: { message: 'name not exist!' } });

  });

  /**
   ************************************
   * SUBSCRIBE TO USERS GET *
   ************************************
   *
   * @param  {object} headers - http headers
   * @param  {object} query - parameters from the url
   * @param  {object} body - parameters from json body
   * @param  {object} params - parameters from json url
   * @return {promise} - success response or error
   */

  ACTIONS.on(goods_get, async ({ params, headers }) => {
    try {

        const settings = { model, payload: { id: params.id } };
        const response = await ACTIONS.send('database.read', settings );
        return response;

    } catch(error) {
      Promise.reject({ details: error.message, code: 101 })
    }


  });

   /**
   ************************************
   * SUBSCRIBE TO GET ALL GOODS*
   ************************************
   *
   * @param  {object} headers - http headers
   * @param  {object} query - parameters from the url
   * @param  {object} body - parameters from json body
   * @param  {object} params - parameters from json url
   * @return {promise} - success response or error
   */

  ACTIONS.on(goods_getAll, async ({ params, headers }) => {
    try {

        const settings = { model, payload: { id: params.id } };
        const response = await ACTIONS.send('database.read', settings );
        return response;

    } catch(error) {
      Promise.reject({ details: error.message, code: 101 })
    }


  });

  /**
   ************************************
   * SUBSCRIBE TO USERS CREATION *
   ************************************
   *
   * @param  {object} headers - http headers
   * @param  {object} query - parameters from the url
   * @param  {object} body - parameters from json body
   * @param  {object} params - parameters from json url
   * @return {promise} - success response or error
   */

   ACTIONS.on(goods_create, async ({ body, headers }) => {
    try {

      if( headers.validCheck ){

        const settings = {  model, payload: {
          name: body.name,
          price: body.price,
          id: uuid(),
          description: body.description,
          characteristics: body.characteristics
        }};
        const response = await ACTIONS.send('database.create', settings );
        return response;

      } else {
        return Promise.reject( 'ValidError' );
      }
    } catch(error) {
      Promise.reject({ details: error.message, code: 101 })
    }


  });

  /**
   ************************************
   * SUBSCRIBE TO USERS UPDATE *
   ************************************
   *
   * @param  {object} headers - http headers
   * @param  {object} query - parameters from the url
   * @param  {object} body - parameters from json body
   * @param  {object} params - parameters from json url
   * @return {promise} - success response or error
   */

  ACTIONS.on(goods_update, async ({ params, body, headers }) => {
    try {

      if(headers.validCheck && headers.authCheck){

        const settings = { model, payload: {
          name: body.name,
          price: body.price,
          id: params.id,
          description: body.description,
          characteristics: body.characteristics
        }};
        const response = await ACTIONS.send('database.update', settings );
        return response;

      } else {
        return Promise.reject( 'Valid/Auth Error' );
      }

    } catch(error) {
      Promise.reject({ details: error.message, code: 101 })
    }


  });

  /**
   ************************************
   * SUBSCRIBE TO USERS DELETE *
   ************************************
   *
   * @param  {object} headers - http headers
   * @param  {object} query - parameters from the url
   * @param  {object} body - parameters from json body
   * @param  {object} params - parameters from json url
   * @return {promise} - success response or error
   */

  ACTIONS.on(goods_delete, async ({ params, headers }) => {
    try {

      if( headers.authCheck ){

        const settings = { model, payload: { id: params.id } };
        const response = await ACTIONS.send('database.delete', settings );
        return response;

      } else {
        return Promise.reject( 'AuthError' );
      }

    } catch(error) {
      Promise.reject({ details: error.message, code: 101 })
    }


  });

  /**
   ***************************
   * CLEAR USER AUTH ACTIONS *
   ***************************
   * method for clean unstoppable functions
   * for example: listen port
   */
  ACTIONS.on('clear.users.auth', () => {

    return Promise.resolve();

  });

};
