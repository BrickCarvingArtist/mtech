const ServerConfig = {
		host : "127.0.0.1",
		port : 35000
	},
	OSSConfig = {
		accessKeyId : "LTAI1HnUyotO3lnX",
		accessKeySecret : "KpVfDwiaueDBXAwh0OabWBQtIbumT9",
		region : "oss-cn-hangzhou",
		bucket : "ikindness-static"
	},
	MongoConfig = {
		host : "127.0.0.1",
		port : 35750
	},
	UploadConfig = {
		path : `${process.cwd()}/upload/`
	},
	LogConfig = {
		path : `${process.cwd()}/log/`
	};
export {
	ServerConfig,
	OSSConfig,
	MongoConfig,
	UploadConfig,
	LogConfig
};