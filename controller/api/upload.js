import formidable from "formidable";
import {UploadConfig} from "../../config";
export default (req, callback) => {
	let form = new formidable.IncomingForm(),
		error,
		path;
	form.encoding = "utf-8";
	form.maxFieldsSize = 5 * Math.pow(2, 20);
	form.uploadDir = UploadConfig.path;
	form.keepExtensions = 1;
	form.parse(req, (err, fields, files) => {
		if(err){
			return error = {
				code : 400,
				message : "file pause error"
			};
		}
		for(let i in fields){
			req.body[i] = fields[i];
		}
		let file = files.file;
		if(file){
			let s = file.name.split(/\./),
				type = s[s.length - 1],
				types = ["jpg", "jpeg", "gif", "bmp", "png", "pdf"];
			if(file.size >= 10 * Math.pow(2, 20)){
				return error = {
					code : 400,
					message : "上传文件大小不能超过10MB"
				};
			}
			if(!~types.indexOf(type.toLowerCase())){
				return error = {
					code : 400,
					message : `上传文件类型只能为${types.join("或")}`
				};
			}
			path = file.path;
		}else{
			return path = fields.file;
		}
	});
	form.on("error", err => {
		error = {
			code : 400,
			message : "上传文件过程出错，请尝试重新上传"
		};
	});
	form.on("progress", (bytesReceived, bytesExpected) => {
		// console.log(`${bytesReceived / bytesExpected * 100}%`);
	});
	form.on("end", (a, b, c) => {
		callback(error, path);
	});
};