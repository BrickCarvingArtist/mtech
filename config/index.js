const ServerConfig = {
		host : "127.0.0.1",
		port : 35000
	},
	MongoConfig = {
		host : "127.0.0.1",
		port : 35750,
		path : "/db",
		user : "BrickCarvingArtist",
		password : "NJGpqQn77kSoz3Dp6OtzH5XC1mUggq"
	},
	UploadConfig = {
		path : `${process.cwd()}/static/image`
	},
	OSSConfig = {
		accessKeyId : "LTAI1HnUyotO3lnX",
		accessKeySecret : "KpVfDwiaueDBXAwh0OabWBQtIbumT9",
		region : "oss-cn-hangzhou",
		bucket : "ikindness-static"
	};
export {
	ServerConfig,
	MongoConfig,
	UploadConfig,
	OSSConfig
};