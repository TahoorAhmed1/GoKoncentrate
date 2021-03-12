module.exports = {

	true_status:  function(res,body,message)
	{
		res.status(200).json({
			'success':1,
			'code':200,
			'message':message,
			'body':body,
		});
		return false;
	},

	false_status: function(res, message)
	{
		res.status(400).json({
			'success':0,
			'code':400,
			'message':message,
			'body':[],
		});
		return false;
	},
	wrong_status: function(res, message)
	{
		res.status(400).json({
			'success':0,
			'code':400,
			'message':message,
			'body':{},
		});
		return false;
	},
	invalid_status: function(res, message)
	{
		res.status(401).json({
			'success':0,
			'code':401,
			'message':message,
			'body':[],
		});
		return false;
	},
	unauth_status: function(res, message)
	{
		res.status(403).json({
			'success':0,
			'code':403,
			'message':message,
			'body':{},
		});
		return false;
	},
	unauth_status2: function(res, message)
	{
		res.status(403).json({
			'success':0,
			'code':403,
			'message':message,
			'body':[],
		});
		return false;
	},

	unauth_status3: function(res, message)
	{
		res.status(401).json({
			'success':0,
			'code':401,
			'message':message,
			'body':[],
		});
		return false;
	}
	
}
