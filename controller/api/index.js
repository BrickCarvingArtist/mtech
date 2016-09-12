import article from "./article";
const
	Enum = {
		article
	},
	Route = [],
	Router = (router) => {
		let reqType;
		for(let i in Enum){
			reqType = `/api/${i}/`;
			Enum[i].map(list => {
				router.route(`${reqType}${list.from}`)[list.method]((req, res) => {
					list.cross && res.set({
						"Access-Control-Allow-Origin" : "*",
						"Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
						"Access-Control-Allow-Methods" : list.method
					});
					list.callback(req, res);
				});
			});
		}
		return router;
	};
export {
	Router
};