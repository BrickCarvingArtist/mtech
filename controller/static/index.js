import {ServerConfig} from "../../config";
import tempate from "./template";
const Corp = "砖雕艺术馆管理系统",
	LocalServer = `http://${ServerConfig.host}:${ServerConfig.port}`,
	Enum = [
		{
			route : "/",
			callback(req, res){
				res.end(tempate({
					style : [
						"/css/home.css"
					],
					script : [
						"/js/home.js"
					],
					title : `${Corp}`,
					keyword : ["ikindness", "砖雕艺术家", "砖雕艺术馆", "前端", "前端开发", "前端培训"],
					description : "砖雕艺术馆科技中心管理系统",
					page : "首页"
				}));
			}
		},
		{
			route : "/article",
			callback(req, res){
				res.end(tempate({
					style : [
						"/css/article.css"
					],
					script : [
						"/js/article.js"
					],
					title : `文章管理-${Corp}`,
					keyword : ["ikindness", "砖雕艺术家", "砖雕艺术馆", "前端", "前端开发", "前端培训"],
					description : "砖雕艺术馆科技中心管理系统",
					page : "文章管理"
				}));
			}
		},
		{
			route : "*",
			callback(req, res){
				res.end(tempate({
					style : [],
					script : [],
					title : `努力建设中-${Corp}`,
					keyword : ["ikindness", "砖雕艺术家", "砖雕艺术馆", "前端", "前端开发", "前端培训"],
					description : "砖雕艺术馆科技中心管理系统",
					page : 404
				}));
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