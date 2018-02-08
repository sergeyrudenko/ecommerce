
module.exports = function (req, res, next)  {
	
	if(req.method == 'POST' || req.method == 'PUT'){
	
		const fields = [
		  { name: 'price', mask: /^[0-9.,]{1,10}$/g },
		  { name: 'name', mask: /^[ A-Za-z0-9.,/_-]{3,45}$/g }
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