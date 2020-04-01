let _logUtils = require("./LogUtils");

let RetryPromise = {
    /**
     * 
     * @param {Promise} func 一个promise函数
     * @param {int} times 重试次数
     * @param {int} delay 延迟几毫秒执行
     */
    retry: function(func,times=3,delay=500,desc=''){
        // _logUtils.infoLog('[WARN]start update promise var...'+desc);
        let promise = new Promise(function(resolve, reject){
            let handle = function(){
                let innerPromise = func();
                // _logUtils.infoLog('[WARN]start RetryPromise.retry method...innerPromise:'
                // +JSON.stringify(innerPromise)+' '+desc);
                try{
                    // _logUtils.infoLog("类型解析(是否是Promise):"+( Promise.resolve(innerPromise) instanceof Promise)+" 状态:"+innerPromise._state+" 结果:"+innerPromise._result)
                    Promise.resolve(innerPromise).then(res=>{
                        try{
                            _logUtils.infoLog('执行函数成功,准备下发成功信息...');
                            resolve(res)
                            _logUtils.infoLog('执行函数成功:'+res);
                        }catch(err){
                            _logUtils.infoLog('执行函数异常,准备下发错误信息');
                            reject(err);
                            _logUtils.infoLog('执行函数异常:'+JSON.stringify(err));
                        }
                    }).catch(function(err){
                        if(times==0){
                            _logUtils.infoLog('执行函数失败,准备下发错误信息中..');
                            reject(err);
                            _logUtils.infoLog('执行函数失败,下发失败信息:'+err);
                        }else{
                            _logUtils.infoLog('执行函数失败,重试中:'+err);//+JSON.stringify(promise)
                            times --;
                            setTimeout(() => {
                                handle();
                            }, delay);
                        }
                    });
                }catch(err){
                    _logUtils.infoLog('内部错误'+JSON.stringify(err));
                    reject(err);
                }
                
            }
            handle();
        });
        return promise;
    }
}

module.exports = RetryPromise;