import {ServerConfig} from "../../config";
import {readFileSync} from "fs";
import tempate from "./template";
const Corp = "砖雕艺术馆管理系统",
	port = ServerConfig.nginxPort ? `:${ServerConfig.nginxPort}` : "",
	Enum = [
		{
			route : "*",
			callback(req, res){
				if(req.session.user){
					res.end(readFileSync(`${process.cwd()}/resource/index.html`, "utf-8"));
				}else{
					res.redirect(`http://127.0.0.1:10000?referer=${req.protocol}://${req.hostname}${port}${req.path}`);
				}
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