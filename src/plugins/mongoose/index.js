const util = require('util');
const mongoose = require('mongoose');
const { credentials } = require('./config.json');

mongoose.connect(credentials.databaseUri,
  (err) => console.log((!err) ? '----- connect to modgoDB' : err)
);

module.exports = ({ ACTIONS, ROUTER, utils }) => {
  /**
   ***************************************
   * SUBSCRIBE TO CREATE DATABASE ENTITY *
   ***************************************
   *
   * @param  {object} model - entity model
   * @param  {object} payload - entity data
   * @return {promise} - success response or error
   */
  ACTIONS.on('database.create', ({ model, payload }) => 
  // {
  //   const create = util.promisify(model.create);
  //   return create(payload);
  // });
    new Promise((resolve, reject) => {
      const response = utils.callbackToPromise(resolve, reject);

      

      model.create(payload, response);
    }));

  /**
   ***************************************
   * SUBSCRIBE TO CREATE DATABASE ENTITY *
   ***************************************
   *
   * @param  {object} model - entity model
   * @param  {object} payload - entity data
   * @return {promise} - success response or error
   */
  ACTIONS.on('database.count', ({ model, payload }) => 
  // {
  //   const create = util.promisify(model.count);
  //   return create(payload);
  // });
    new Promise((resolve, reject) => {
      const response = utils.callbackToPromise(resolve, reject);

      model.count(payload, response);
    }));


  /**
   *************************************
   * SUBSCRIBE TO READ DATABASE ENTITY *
   *************************************
   *
   * @param  {object} model - entity model
   * @param  {object} payload - entity data
   * @return {promise} - success response or error
   */
  ACTIONS.on('database.read', ({ model, payload }) => 
  // {
  //   const create = util.promisify(model.findOne);
  //   return create(payload);
  // });
    new Promise((resolve, reject) => {
      const response = utils.callbackToPromise(resolve, reject);

      model.findOne(payload, response);
    }));

  /**
   *****************************************
   * SUBSCRIBE TO READ ALL DATABASE ENTITY *
   *****************************************
   *
   * @param  {object} model - entity model
   * @param  {object} payload - entity data
   * @return {promise} - success response or error
   */
  ACTIONS.on('database.all', ({ model, payload }) => 
  // {
  //   const create = util.promisify(model.find);
  //   return create(payload);
  // });
    new Promise((resolve, reject) => {
      const response = utils.callbackToPromise(resolve, reject);

      model.find(payload, response);
    }));

  /**
   ***************************************
   * SUBSCRIBE TO UPDATE DATABASE ENTITY *
   ***************************************
   *
   * @param  {object} model - entity model
   * @param  {object} payload - entity data
   * @return {promise} - success response or error
   */
  ACTIONS.on('database.update', ({ model, payload }) => 
  // {
  //   const create = util.promisify(model.findOneAndUpdate);
  //   return create({id: payload.id}, payload, {new: true});
  // });
    new Promise((resolve, reject) => {
      const response = utils.callbackToPromise(resolve, reject);

      model.findOneAndUpdate({id: payload.id}, payload, {new: true}, response);
    }));

  /**
   ***************************************
   * SUBSCRIBE TO DELETE DATABASE ENTITY *
   ***************************************
   *
   * @param  {object} model - entity model
   * @param  {object} payload - entity data
   * @return {promise} - success response or error
   */
  ACTIONS.on('database.delete', ({ model, payload }) => 
  // {
  //   console.log(util.promisify);
  //   console.log('model', model);
  //   const create = util.promisify(model.remove);
  //   // console.log('create', create({ id: payload.id }));
  //   return create({ id: payload.id }).catch(error => console.log(error));
  // });
    new Promise((resolve, reject) => {
      const response = utils.callbackToPromise(resolve, reject);

      model.remove({ id: payload.id }, response);
    }));
};

