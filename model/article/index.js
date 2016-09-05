import mongoose from "mongoose";
const Article = new mongoose.Schema({
	title : {
		type : String,
		required : 1
	},
	headImage : {
		type : String
	},
	description : {
		type : String,
		required : 1
	},
	keyword : {
		type : Array,
		required : 1
	},
	content : {
		type : String,
		required : 1
	},
	meta : {
		createTime : {
			type : Date,
			default : Date.now()
		},
		modifiedTime : {
			type : Date,
			default : Date.now()
		}
	}
});
Article.statics = {
	fetch(callback){
		return this.find({}).select("-__v").exec(callback);
	}
};
export default mongoose.model("Article", Article);