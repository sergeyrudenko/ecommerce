
module.exports = function (req, res, next)  {
	
	if(req.method == 'POST' || req.method == 'PUT'){
	
		const fields = [
		  { name: 'login', mask: /^[a-z0-9_-]{5,15}$/g },
		  { name: 'password', mask: /^[A-Za-z0-9_-]{8,15}$/g }
		];
		req.headers.validCheck = true;

		fields.forEach((field) => {

			if ( !field.mask.test(req.body[field.name]) ){req.headers.validCheck = false;}			

		});

		next();
		return req.headers.validCheck;

	}

	next();
	return;

};