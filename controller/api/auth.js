export default [
	{
		from : "signIn",
		method : "get",
		cross : 1,
		callback(req, res){
			req.session.user = req.query.user;
			res.redirect(req.query.referer);
		}
	}
];