import {ServerConfig, SessionConfig} from "../../config";
import {readFileSync} from "fs";
import tempate from "./template";
const Corp = "砖雕艺术馆管理系统",
	{
		authHost
	} = SessionConfig,
	hostname = process.env.NODE_ENV === "DEVELOPMENT" ? `http://127.0.0.1:${ServerConfig.nginxPort}` : "http://manage.tech.ikindness.cn",
	Enum = [
		{
			route : "*",
			callback(req, res){
				if(req.session.user){
					res.end(readFileSync(`${process.cwd()}/resource/index.html`, "utf-8"));
				}else{
					res.redirect(`${authHost}?host=${hostname}&referer=${req.path}&auth=/api/auth/signIn`);
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