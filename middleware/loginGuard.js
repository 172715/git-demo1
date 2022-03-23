const guard=(req,res,next)=>{
	if(req.url!='/login' &&!req.session.username){
		res.redirect('/admin/login');
	}else{
		//如果用户是登录状态 并且是一个普通用户
		if(req.session.role=='normal'){
			return res.redirect('/home/')
		}
		next();
	}
}

module.exports=guard;