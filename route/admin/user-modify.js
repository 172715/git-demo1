const {User}=require('../../model/user');
const bcrypt=require('bcryptjs');
module.exports=async (req,res,next)=>{
	//接收客户端传递过来的请求参数
	const {username,email,role,state,password}=req.body;
	//即将要修改的用户id
	const id=req.query.id;

	// res.send(body.password);
	let user=await User.findOne({_id:id});

	const isValid=await bcrypt.compare(password,user.password)
	//密码比对
	if(isValid){
		// res.send('密码比对成功');
		await User.updateOne({_id:id},{
			username:username,
			email:email,
			role:role,
			state:state
		});

		//重定向用户列表页面
		res.redirect('/admin/user');
	}else{
		let obj={path:'/admin/user-edit',message:'密码比对失败，不能进行用户信息的修改',id:id}
		next(JSON.stringify(obj));
	}
	// res.send(user);
}