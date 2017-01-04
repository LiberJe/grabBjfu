const fs = require('fs');
const request = require('request');
const superagent = require('superagent');
const { rl } = require('../utils/readLine.js');
const { getHostSession, getVerificationCode, getCode, formatCode, selectServer } = require('./getCode.js');
const { processImg, recognizer } = require('./imgProcess.js');
const { HOST_URL, CODE_URL, VERIFICATION_CODE_URL, STOP_URL, EDU_URL } = require('../constants/API.js');

const requestWithCookie = request.defaults({jar: true});

const login = () => {
    // 获取session
    let hostStation = getHostSession(HOST_URL);

    hostStation
        .then(cookie => {
            // 获取验证码图片
            let verificationCode = getVerificationCode(VERIFICATION_CODE_URL, cookie);

            verificationCode
                .then(() => {
                    // 识别验证码
                    const userInfo = {
                        userName: 130614101,
                        userPassword: '1995815jly'
                    }

                    const targetServer = selectServer(userInfo.userName);

                    const verficaCode = new Promise((resolve,reject)=>{
                        rl.question("请输入验证码:", (answer)=>{
                            resolve(answer);
                        })
                    })

                    const deCode = getCode(CODE_URL, cookie);

                    Promise.all([verficaCode, deCode])
                        .then(res => {
                            const deCoded = formatCode(res[1], userInfo);
                            const formList = {
                                useDogCode: '',
                                encoded: deCoded,
                                RANDOMCODE: res[0]
                            }
                            
                            superagent
                                .post(STOP_URL)
                                .set('Content-Type', 'application/x-www-form-urlencoded')
                                .set("Cookie",`JSESSIONID=${cookie.JSESSIONID}`)
                                .send(formList)
                                .end((err,res)=>{
                                    console.log(res);
                                })
                                
                            rl.close();
                        })
                })
        })

    // //获取验证码的值
    // verificationCode
    //     .then((cookie) => {
    //         let resultText;
    //         // 图像识别验证码，当前识别率较低。需要大量样本训练。
    //         // recognizer('./lib/codeImg/test.jpg')
    //         //     .then(text =>{
    //         //         resultText = text;
    //         //         console.log(text);
    //         //     });
}

exports.login=login;