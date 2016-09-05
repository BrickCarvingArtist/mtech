import Article from "../../model/article";
export default [
	{
		from : "fetch",
		method : "get",
		callback(req, res){
			let length = req.query.length;
			Article.fetch((err, data) => {
				res.json({
					code : 0,
					data : length ? data.filter((list, index) => index < req.query.length) : data,
					message : "success"
				});
			});
		}
	},
	{
		from : "fetch/:id",
		method : "get",
		callback(req, res){
			Article.where({
				_id : req.params.id
			}).select("-__v").findOne((err, data) => {
				if(err){
					res.send({
						code : 400,
						message : "no such data searched"
					});
				}else{
					res.json({
						code : 0,
						data,
						message : "success"
					});
				}
			});
		}
	},
	{
		from : "add/:id",
		method : "get",
		callback(req, res){
			res.json({});
		}
	}
];