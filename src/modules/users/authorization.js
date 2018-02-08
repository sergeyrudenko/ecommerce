var mongoose = require('mongoose');
var User = require('./userSchema.js');



module.exports = function (req, res, next)  {

	if (req.method == 'POST'){
		next();
		return true;
	}

	const token = req.headers.authorization.split(' ')[1];	

	User.findOne({ token }, (err, record) => {

		if (record) { 
			req.headers.authCheck =  true;
			next();
			return true;
		} else if (err) {
			console.log (err);
			req.headers.authCheck =  false;
			next();
			return false;
		 } else {
		 	console.log ('USER NOT FOUND');
			req.headers.authCheck =  false;
			next();
			return false;
		 }

	});

};