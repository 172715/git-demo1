module.exports=(req,res)=>{

	//标识 标识当前访问的是用户管理页面
	req.app.locals.currentLink='article';
	res.render('admin/article-edit.art')
}