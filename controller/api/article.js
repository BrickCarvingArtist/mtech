import Article from "../../model/article";
export default [
	{
		from : "fetch",
		method : "get",
		cross : 1,
		callback(req, res){
			Article.fetch((err, data) => {
				res.json({
					code : 0,
					data,
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
		from : "edit",
		method : "post",
		cross : 1,
		callback(req, res){
			const _id = req.body._id;
			if(_id === "add"){
				delete req.body._id;
				const article = new Article(req.body);
				article.save((err, data) => {
					if(err){
						console.log(err);
						res.json({
							code : 400,
							message : "misson failed"
						});
					}else{
						res.json({
							code : 0,
							data,
							message : "mission success"
						});
					}
				});
			}else{
				Article.findOneAndUpdate({
					_id
				}, {
					$set : Object.assign(req.body, {
						meta : {
							modifiedTime : Date.now()
						}
					})
				}, (err, data) => {
					if(err){
						console.log(err);
						res.json({
							code : 400,
							message : "misson failed"
						});
					}else{
						res.json({
							code : 0,
							data,
							message : "misson success"
						});
					}
				});
			}
		}
	},
	{
		from : "delete/:id",
		method : "get",
		cross : 1,
		callback(req, res){
			Article.remove({
				_id : req.params.id
			}, (err, data) => {
				if(err){
					console.log(err);
					res.json({
						code : 400,
						message : "misson failed"
					});
				}else{
					res.json({
						code : 0,
						data,
						message : "misson success"
					});
				}
			});
		}
	}
];