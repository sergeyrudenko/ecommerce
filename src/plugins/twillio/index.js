const twilio = require('twilio');
const { credentials } = require('./config.json');
const { numberTo, numberFrom, accountSid, authToken } = credentials;

const client = twilio(accountSid, authToken);

module.exports = ({ ACTIONS, utils }) => {

  ACTIONS.on('twillio.send', ({
    from = numberFrom,
    to = numberTo,
    body = 'don\'t forget the message!',
  }) => {

    return new Promise( async (resolve, reject) => {

      try {

        // const response = utils.callbackToPromise(resolve, reject);

        await client.messages.create({ to, from, body }, () => {
          
        });

      } catch (error) {

        console.log(error.message)

      }

      

    });

  });

};
