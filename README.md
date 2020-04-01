![](https://img.shields.io/npm/v/auto-common-lib.svg)

**本项目需要配合Autojs.Pro使用**


##### 如何安装

```js
npm i auto-common-lib
```
##### 使用方式(最好加入ES6特性)
```js
var autoCommonLib = require('auto-common-lib');
let {AutoLibSms,BackPressEvent,LogUtils,RetryPromise} = autoCommonLib;
```

#### 功能使用说明
```js
//获取短信验证码
let result = AutoLibSms.getPhoneNumberSmsFirstInBox("95561");

//双击退出脚本(常用于有UI界面的情况)
ui.emitter.on("back_pressed", e => {
   BackPressEvent.handleBackEvent(e);
});
```
#### 函数执行失败自动重试(RetryPromise)
目前暂不支持带参数的函数
```js
function work(){
   let promise = new Promise(function(resolve,reject){
      let number = Math.random()*10;
      if(number<=5){
         reject('不及格呀,继续努力');
      }else{
         resolve('很好已经达到要求了')
      }
   })
   return promise
}

function testRetryPromise(){
   RetryPromise.retry(work,3,500).then(res=>{
      console.info('恭喜,通过了考试')
   }).catch(error=>{
      console.info('很遗憾,补考也没通过,只能结业')
   })
}
```

#### 日志使用
```js
LogUtils.infoLog("待写入日志或者Toast的内容",true);
LogUtils.warnLog("待写入日志或者Toast的内容",true);
LogUtils.errorLog("待写入日志或者Toast的内容",true);
```


##### 如何开发调试nodejs模块

[你所不知道的模块调试技巧 - npm link](https://github.com/atian25/blog/issues/17)