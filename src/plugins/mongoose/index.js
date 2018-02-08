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
  ACTIONS.on('database.readAll', ({ model, payload }) =>
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
    new Promise((resolve, reject) => {
      const response = utils.callbackToPromise(resolve, reject);

      model.remove({ id: payload.id }, response);
    }));
};

