//脚本是否结束运行
let isCanFinish = false;
//定时器Id
let timeoutId;
/**
 * 双击退出脚本功能模块
 */
let BackPressEvent = {
    /**
     * 处理双击退出
     * @param event 事件
     * @param timeoutSetting 两次点击的间隔设置
     * 如何使用
     * ui.emitter.on("back_pressed", e => {
     *    BackPressEvent.handleBackEvent(e);
     * });
     */
    handleBackEvent:function(event,timeoutSetting){
        let timeout = timeoutSetting||200;
        if (!isCanFinish) {
            isCanFinish = true;
            timeoutId=setTimeout(() => {
                toastLog("双击退出脚本");
                isCanFinish = false;
            }, timeout);
            event.consumed = true;
        } else {
            clearTimeout(timeoutId);
            event.consumed = false;
        };
    }
}

export default BackPressEvent;