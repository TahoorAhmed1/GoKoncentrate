module.exports = {

	true_status:  function(res,body,msg)
	{
		res.status(200).json({
			// 'success':1,
			'status':200,
			'message':msg,
			'body':body,
		});
		return false;
	},
	true_status_data: function(res,keys,body,msg)
	{
		res.status(200).json({
			// 'success':1,
			'status':200,
		    'count':keys,
			'message':msg,
			'body':body,
		});
		return false;
	},

	false_status: function(res, msg)
	{
		res.status(403).json({
			// 'success':0,
			'status':403,
			'message':msg,
			'body':{},
		});
		return false;
	},
	invalid_status: function(res, msg)
	{
		res.status(400).json({
			// 'success':0,
			'status':400,
			'message':msg,
			'body':{},
		});
		return false;
	},
	method_not_allowed: function(res, msg)
	{
		res.status(405).json({
			// 'success':0,
			'status':405,
			'message':msg,
			'body':{},
		});
		return false;
	}
}

