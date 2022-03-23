//引用express框架
const express=require('express');
const path=require('path');
//引入body-parser模块 用来处理post请求参数
const bodyParser=require('body-parser');
const moment=require('moment');
const template = require('art-template');


const morgan=require('morgan');


const config=require('config');
// 导入模板变量
template.defaults.imports.moment = moment;
//导入express-session模块
const session=require('express-session');
//创建网站服务器
const app=express();
//数据库连接
require('./model/connect');
//处理post请求参数
app.use(bodyParser.urlencoded({extended:false}));
//配置session
app.use(session({
	secret:'secret key',
	saveUninitialized:false,
	cookie:{
		maxAge:24*60*60*1000
	}
}));
//告诉express框架模板所在的位置
app.set('views',path.join(__dirname,'views'));
//告诉express框架模板的默认后缀是什么
app.set('view engine','art');
//当渲染后缀为art的模板时 所使用的模板引擎时什么
app.engine('art',require('express-art-template'));
//开放静态资源
app.use(express.static(path.join(__dirname,'public')))
console.log(config.get('title'))

const home =require('./route/home');
const admin=require('./route/admin');
//拦截请求 判断用户登录状态
app.use('/admin',require('./middleware/loginGuard'))
//为路由匹配请求路径
app.use('/home',home);
app.use('/admin',admin);

//获取系统环境变量 返回值是对象
// console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV=='development'){
	//当前是开发环境
	//在开发环境中 将客户端发送到服务器端的请求信息打印到控制台中
	// console.log(app.use(morgan('dev')));
	console.log('当前是开发环境')
}else{
	//当前是生产环境
}

app.use((err,req,res,next)=>{
	//将字符串对象转换为对象类型
	//JSON.parse()
	const result=JSON.parse(err);
	let params=[];
	for(let attr in result){
		if(attr !='path'){
			params.push(attr+'='+result[attr]);
		}
	}
	res.redirect(`${result.path}?${params.join('&')}`)
})


//实现退出功能
admin.get('/logout',(re,rs)=>{
	//删除session
	re.session.destroy(function(){
		//删除cookie
		rs.clearCookie('connect.sid');
		//重定向到用户登录页面
		rs.redirect('/admin/login')
	});
	
	
})

//监听端口
app.listen(80);
console.log('网站服务器启动成功，请访问localhost')