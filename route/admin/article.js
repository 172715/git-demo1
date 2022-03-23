//将文章集合的构造函数导入到当前文件中
const {Article}=require('../../model/article');
const pagination=require('mongoose-sex-page');
module.exports=async (req,res)=>{
    //接收客户端传递过来的页码
    const page=req.query.page;
	//标识 标识当前访问的是用户管理页面
	req.app.locals.currentLink='article';
	//查询所有文章数据
	// let articles=await Article.find().populate('author');
    // 从数据库中查询数据
// Pagination就是express-sex-page对象
// exec() 方法就是向数据库发送查询请求
 let datas = await pagination(Article).find().page(page).size(10).display(2).simple(true).populate('author').exec()

 
// 此时，代码会报错，报错位置就是lean() 无法解析为一个函数 具体参考完整报错内容 有兴趣的朋友的可以自己尝试一下
// res.send(datas)
 
// 解决方法(我们可以将查询的到的数据转化一次)
let str = JSON.stringify(datas);
let articles = JSON.parse(str);
// 然后将转化后的数据json 传递给页面

	// res.send(articles)
	res.render('admin/article.art',{
		articles:articles
	})
}