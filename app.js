import express from "express";
import {json, urlencoded} from "body-parser";
import mongoose from "mongoose";
import {Router as RouterApi} from "./controller/api";
import {Router as RouterStatic} from "./controller/static";
import {ServerConfig, MongoConfig} from "./config";
const app = express(),
	router = express.Router(),
	{
		host,
		port,
		path,
		user,
		password
	} = MongoConfig,
	ServerPort = ServerConfig.port;
(async () => {
	try{
		await mongoose.connect(`mongodb://${user}:${password}@${host}:${port}${path}`);
		console.log(`MongoDB started on port ${port}`);
		app.use(json());
		app.use(urlencoded({
			extended : 1
		}));
		app.use(express.static(`${__dirname}/resource`));
		app.use("/static", express.static(`${__dirname}/static`));
		app.use(RouterApi(router));
		app.use(RouterStatic(router));
		await app.listen(ServerPort);
		console.log(`Server started on port ${ServerPort}`);
	}catch(err){
		console.log(err.message);
	}
})();