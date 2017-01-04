const fs = require('fs');
const tesseract = require('node-tesseract');
const gm = require('gm');

// 识别图片
const recognizer = (imgPath, options) =>{
    options = Object.assign({psm:7}, options);

    return new Promise((resolve, reject) => {
        tesseract
            .process(imgPath, options, (err, text) => {
                if (err) return reject(err);

                resolve(text.replace(/[\r\n\s]/gm,''));
            });
    });
}

// 处理图片
const processImg = (imgPath, newPath, thresholdVal) =>{
    return new Promise((resolve, reject) =>{
        gm(imgPath)
            .threshold(thresholdVal || 55)
            .write(newPath, (err)=>{
                if(err) return reject(err);

                resolve(newPath);
            });
    });
} 

// 输出结果
const outputRes = (path, newPath) =>{
    processImg(path, newPath)
        .then(recognizer)
        .then(text =>{
            console.log(`识别结果：${text}`);
            return text;
        })
        .catch(err =>{
            console.error(`识别失败：${err}`);
        })
}

exports.processImg = outputRes;
exports.recognizer = recognizer; 