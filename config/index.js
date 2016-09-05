const ServerConfig = {
		host : "127.0.0.1",
		port : 35000
	},
	MongoConfig = {
		host : "127.0.0.1",
		port : 35750
	},
	UploadConfig = {
		path : `${process.cwd()}/src/upload/`
	},
	LogConfig = {
		path : `${process.cwd()}/log/`
	};
export {
	ServerConfig,
	MongoConfig,
	UploadConfig,
	LogConfig
};