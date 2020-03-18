##### 使用方式(最好加入ES6特性)
```js
var autoCommonLib = require('auto-common-lib');
let {AutoLibSms,BackPressEvent,LogUtils} = autoCommonLib;
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


##### 如何开发调试nodejs模块

[你所不知道的模块调试技巧 - npm link](https://github.com/atian25/blog/issues/17)