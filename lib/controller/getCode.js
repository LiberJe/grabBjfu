const fs = require("fs");
const request = require('request');
const superagent = require('superagent');
const cheerio = require('cheerio');

// 格式化code
const formatCode = (deCode, userInfo) =>{
	var scode = deCode.split("#")[0];
	var sxh = deCode.split("#")[1];
	var code = `${userInfo.userName}%%%${userInfo.userPassword}`;
	var encoded='';
	for(var i=0;i<code.length;i++){
		if(i<20){
			encoded=encoded+code.substring(i,i+1)+scode.substring(0,parseInt(sxh.substring(i,i+1)));
			scode = scode.substring(parseInt(sxh.substring(i,i+1)),scode.length);
		}else{
			encoded=encoded+code.substring(i,code.length);
			i=code.length; 
		}
	}
	return encoded;
}

// 获取decode
const getCode = (CODE_URL, cookie) =>{
	return new Promise((resolve,reject)=>{
		superagent
			.get(CODE_URL)
			.set('Content-Type', 'application/x-www-form-urlencoded')
			.set("Cookie",`JSESSIONID=${cookie.JSESSIONID}`)
			.end((err,res) => {
				resolve(res.text);
			})
	})
}

// 获取host session
const getHostSession = (HOST_URL) => {
	return new Promise((resolve, reject) => {
		superagent
			.get(HOST_URL)
			.end((err, res) => {
				if(!err && res.statusCode === 200){
					let headerCookie = res.headers['set-cookie'].toString();
					const cookie = {
						"JSESSIONID": headerCookie.substring(headerCookie.indexOf("=")+1,headerCookie.indexOf(";"))
					};
					console.log(cookie.JSESSIONID);
					resolve(cookie);
				}
			})
	})
}

// 获取验证码
const getVerificationCode = (VERIFICATION_CODE_URL, cookie) =>{
	return new Promise((resolve,reject)=>{
		superagent
			.get(VERIFICATION_CODE_URL)
			.set("Cookie",`JSESSIONID=${cookie.JSESSIONID}`)
			.pipe(fs.createWriteStream("./lib/codeImg/test.jpg"));
		resolve();
	})
}

//根据用户帐号选择登录服务器
const selectServer = (uName) =>{
	const enableServers = true;//是否启用多服务器 true/false
	let serversArray = new Array();//服务器列表
		
		serversArray[0] = "http://202.204.121.78:8080/jsxsd/";	
		serversArray[1] = "http://202.204.121.78:89/jsxsd/";	
		serversArray[2] = "http://202.204.121.79:80/jsxsd/";	
		serversArray[3] = "http://127.0.0.1:80/bjlydx_jsxsd11/";
	
	let loginUrl = "xk/LoginToXk";
	if(enableServers === true){
		if(!isNaN(uName)){//必须为数字
			const modVal = eval(uName % serversArray.length);
			loginUrl = serversArray[modVal] + loginUrl;
		}else{
			loginUrl = serversArray[0] + loginUrl;
		}
	}else{
		loginUrl = ""+ loginUrl;
	}
	return loginUrl;
}


exports.getCode = getCode;
exports.formatCode = formatCode;
exports.getHostSession = getHostSession;
exports.getVerificationCode = getVerificationCode;
exports.selectServer = selectServer;

