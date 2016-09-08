import formidable from "formidable";
import {UploadConfig} from "../../config";
export default (req, res, callback) => {
	let form = new formidable.IncomingForm(),
		_end = 0,
		path;
	form.parse(req, (err, fields, files) => {
		for(let i in fields){
			req.body[i] = fields[i];
		}
		if(files.file){
			if(files.file.size >= 10 * 1024 * 1024){
				_end = 1;
				return res.json({
					code : 400,
					message : "附件超出限定大小"
				});
			} 
			let s = files.file.name.split(/\./),
				type = s[s.length - 1],
				types = ["jpg", "jpeg", "gif", "bmp", "png", "pdf"];
			if(types.indexOf(s[s.length - 1].toLowerCase()) < 0){
				_end = 1;
				return res.json({
					code : 400,
					message : `上传资料格式不正确,支持的文件格式为:${types.join()}`
				});
			}
			path = files.file.path;
		}else{
			callback(fields.file);
			return _end = 1;
		}
	});
	form.on("error", e => {
		return res.json({
			code : 400,
			message : "文件上传过程出错,请尝试重新上传"
		});
	});
	form.encoding = "utf-8";
	form.maxFieldsSize = 5 * 1024 * 1024;
	form.uploadDir = UploadConfig.path;
	form.keepExtensions = 1;
	form.on("progress", (bytesReceived, bytesExpected) => {
		// console.log(`${bytesReceived / bytesExpected * 100}%`);
	});
	form.on("end", (a, b, c) => {
		if(_end){
			return;
		}
		callback(path);
	});
};