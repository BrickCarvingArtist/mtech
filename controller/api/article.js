import OSS from "ali-oss";
import co from "co";
import {unlink} from "fs";
import mongoose from "mongoose";
import article from "../../../database/model/article";
import upload from "./upload";
import {OSSConfig} from "../../config";
const client = new OSS(OSSConfig),
	Article = article(mongoose);
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
						data : await Article.find().select("title modifiedTime"),
						message : "获取文章列表成功"
					});
				}catch(err){
					res.json({
						code : 400,
						message : "获取文章列表失败"
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
						}).findOne().select("-__v"),
						message : "获取文章详情成功"
					});
				}catch(err){
					res.json({
						code : 400,
						message : "没有这篇文章"
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
			(async () => {
				try{
					let file = await upload(req, "/article");
					req.body.file || file && (file = (await co(client.put(file.replace(`${process.cwd()}/`, ""), file))).url);
					const _id = req.body._id;
					if(_id === "add"){
						delete req.body._id;
						try{
							res.json({
								code : 0,
								data : await new Article(Object.assign(req.body, {
									file
								})).save(),
								message : "发表成功"
							});
						}catch(err){
							res.json({
								code : 400,
								message : "发表失败"
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
										modifiedTime : Date.now()
									})
								}),
								message : "发表成功"
							});
						}catch(err){
							res.json({
								code : 0,
								message : "发表失败"
							});
						}
					}
				}catch(err){
					res.json(err);
				}
			})();
		}
	},
	{
		from : "delete/:id",
		method : "get",
		cross : 1,
		callback(req, res){
			(async () => {
				try{
					const file = (await Article.where({
						_id : req.params.id
					}).findOne().select("-_id file")).file;
					if(file){
						await co(client.delete(file.replace("http://ikindness-static.oss-cn-hangzhou.aliyuncs.com/", "")));
						await unlink(file.replace("http://ikindness-static.oss-cn-hangzhou.aliyuncs.com", process.cwd()));
					}
					res.json({
						code : 0,
						data : await Article.remove({
							_id : req.params.id
						}),
						message : "删除成功"
					});
				}catch(err){
					res.json({
						code : 400,
						message : "删除失败"
					});
				}
			})();
		}
	}
];