const {Article}=require('../../model/article');
//导入分页模块
const pagination=require('mongoose-sex-page');
module.exports=async(req,res)=>{
	const page=req.query.page;
	//从数据库中查询数据
	let datas=await pagination(Article).page(1).size(6).display(5).find().simple(true).populate('author').exec();
	// res.send(result);
	// return;
	 // res.send('欢迎来到博客首页')
	 //渲染模板并传递数据
	 let str = JSON.stringify(datas);
	 let result = JSON.parse(str)
		// res.send(result);
		// return;

	 res.render('home/default.art',{
	 	result:result
	 });
}