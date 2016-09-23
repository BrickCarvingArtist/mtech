import express from "express";
import {json, urlencoded} from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import mongoose from "mongoose";
import connectMongo from "connect-mongo";
import {Router as RouterApi} from "./controller/api";
import {Router as RouterStatic} from "./controller/static";
import {ServerConfig, SessionConfig, MongoConfig} from "./config";
const app = express(),
	router = express.Router(),
	ServerPort = ServerConfig.port,
	MongoStore = connectMongo(session),
	{
		host,
		port,
		path,
		user,
		password
	} = MongoConfig;
(async () => {
	try{
		app.use(cookieParser());
		app.use(session({
			secret : "auth",
			name : "mtech_user",
			resave : 1,
			saveUninitialized : 0,
			cookie : {
				maxAge : 60 * 60 * 1000
			},
			store : new MongoStore(SessionConfig)
		}));
		await mongoose.connect(`mongodb://${user}:${password}@${host}:${port}${path}`);
		console.log(`MongoDB started on port ${port}`);
		app.use(json());
		app.use(urlencoded({
			extended : 1
		}));
		app.use("/static", express.static(`${__dirname}/static`));
		app.use(RouterApi(router));
		app.use(RouterStatic(router));
		await app.listen(ServerPort);
		console.log(`Server started on port ${ServerPort}`);
	}catch(err){
		console.log(err.message);
	}
})();