import Article from "../../model/article";
import upload from "./upload";
export default [
	{
		from : "fetch",
		method : "get",
		cross : 1,
		callback(req, res){
			(async () => {
				try{
					res.json({
						code : 0,
						data : await Article.fetch(),
						message : "success"
					});
				}catch(err){
					console.log(err);
					res.json({
						code : 400,
						message : "fetch data error"
					});
				}
			})();
		}
	},
	{
		from : "fetch/:id",
		method : "get",
		cross : 1,
		callback(req, res){
			(async () => {
				try{
					res.json({
						code : 0,
						data : await Article.where({
							_id : req.params.id
						}).select("-__v").findOne(),
						message : "success"
					});
				}catch(err){
					console.log(err);
					res.json({
						code : 400,
						message : "no such data searched"
					});
				}
			})();
		}
	},
	{
		from : "edit",
		method : "post",
		cross : 1,
		callback(req, res){
			upload(req, (err, file) => {
				if(err){
					console.log(err);
					res.json(err);
				}else{	
					(async () => {
						const _id = req.body._id;
						if(_id === "add"){
							delete req.body._id;
							try{
								res.json({
									code : 0,
									data : await new Article(Object.assign(req.body, {
										file,
										meta : {
											createTime : Date.now(),
											modifiedTime : Date.now()
										}
									})).save(),
									message : "mission success"
								});
							}catch(err){
								console.log(err);
								res.json({
									code : 400,
									message : "add article failed"
								});
							}
						}else{
							try{
								res.json({
									code : 0,
									data : await Article.findOneAndUpdate({
										_id
									}, {
										$set : Object.assign(req.body, {
											file,
											meta : {
												modifiedTime : Date.now()
											}
										})
									}),
									message : "misson success"
								});
							}catch(err){
								console.log(err);
								res.json({
									code : 0,
									message : "misson success"
								});
							}
						}
					})();
				}
			});
		}
	},
	{
		from : "delete/:id",
		method : "get",
		cross : 1,
		callback(req, res){
			(async () => {
				try{
					res.json({
						code : 0,
						data : await Article.remove({
							_id : req.params.id
						}),
						message : "misson success"
					});
				}catch(err){
					console.log(err);
					res.json({
						code : 400,
						message : "misson failed"
					});
				}
			})();
		}
	}
];