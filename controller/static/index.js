import {ServerConfig} from "../../config";
import {readFileSync} from "fs";
import tempate from "./template";
const Corp = "砖雕艺术馆管理系统",
	LocalServer = `http://${ServerConfig.host}:${ServerConfig.port}`,
	Enum = [
		{
			route : "*",
			callback(req, res){
				res.end(readFileSync(`${process.cwd()}/resource/index.html`, "utf-8"));
			}
		}
	],
	Router = router => {
		Enum.map(list => {
			router.route(list.route).get((req, res) => {
				list.callback(req, res);
			});
		});
		return router;
	};
let Route = [];
Enum.map(list => {
	Route.push({
		route : list.route,
		signType : list.signType
	});
});
export {
	Route,
	Router
};