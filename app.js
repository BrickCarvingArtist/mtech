import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import {Router as RouterApi} from "./controller/api";
import {Router as RouterStatic} from "./controller/static";
import {ServerConfig, MongoConfig} from "./config";
const mongoDBPort = MongoConfig.port,
	serverPort = process.env.PORT || ServerConfig.port,
	app = express(),
	router = express.Router();
mongoose.connect(`mongodb://${MongoConfig.host}:${mongoDBPort}/db`, err => {
	console.log(err ? err.message : `MongoDB started on port ${mongoDBPort}`);
});
app.use(bodyParser.urlencoded({
	extended : 1
}));
app.use(express.static(`${__dirname}/resource`));
app.use(RouterApi(router));
app.use(RouterStatic(router));
app.listen(serverPort, () => {
	console.log(`Server started on port ${serverPort}`);
});