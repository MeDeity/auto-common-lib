/*
 * @Author: NickHopps
 * @Last Modified by: TonyJiangWJ
 * @Last Modified time: 2020-01-12 20:14:15
 * @Description: 自动化模块（多版本支持）
 */
// import _logUtils from '../common/LogUtils'; 不知道为什么 会触发 'TypeError: 无法修改只读属性：exports.' 错误

const hasRootPermission = function () {
  return files.exists("/sbin/su") || files.exists("/system/xbin/su") || files.exists("/system/bin/su")
}

function Automation_root () {

  this.check_root = function () {
    if (!(files.exists("/sbin/su") || files.exists("/system/xbin/su") || files.exists("/system/bin/su"))) throw new Error("未获取ROOT权限")
  }

  this.click = function (x, y) {
    this.check_root()
    return (shell("input tap " + x + " " + y, true).code === 0)
  }

  this.swipe = function (x1, y1, x2, y2, duration) {
    this.check_root()
    return (shell("input swipe " + x1 + " " + y1 + " " + x2 + " " + y2 + " " + duration, true).code === 0)
  }

  this.gesture = function (duration, points) {
    this.check_root()
    let len = points.length,
      step = duration / len,
      start = points.shift()

    // 使用 RootAutomator 模拟手势，仅适用于安卓5.0及以上
    let ra = new RootAutomator()
    ra.touchDown(start[0], start[1])
    sleep(step)
    points.forEach(function (el) {
      ra.touchMove(el[0], el[1])
      sleep(step)
    })
    ra.touchUp()
    ra.exit()
    return true
  }

  this.back = function () {
    this.check_root()
    return (shell("input keyevent KEYCODE_BACK", true).code === 0)
  }


}

function Automation () {

  this.click = function (x, y) {
    return click(x, y)
  }

  this.swipe = function (x1, y1, x2, y2, duration) {
    return swipe(x1, y1, x2, y2, duration)
  }

  this.gesture = function (duration, points) {
    return gesture(duration, points)
  }

  this.back = function () {
    return back()
  }

}

const _automator = (device.sdkInt < 24 || hasRootPermission()) ? new Automation_root() : new Automation();

let AutomatorOperate = {
    /**
     * 点击某个坐标点
     * @param {int} x 
     * @param {int} y 
     */
    click: function (x, y) {
        return _automator.click(x, y)
    },
    /**
     * 点击控件中心
     * @param {Object} obj 控件
     */
    clickCenter: function (obj) {
        return _automator.click(obj.bounds().centerX(), obj.bounds().centerY())
    },
    /**
     * 滑动
     * @param {int} x1 
     * @param {int} y1 
     * @param {int} x2 
     * @param {int} y2 
     * @param {int} duration 持续时间
     */
    swipe: function (x1, y1, x2, y2, duration) {
        return _automator.swipe(x1, y1, x2, y2, duration)
    },
    /**
     * 手势
     * @param {int} duration 
     * @param {Array} points 坐标数组
     */
    gesture: function (duration, points) {
        return _automator.gesture(duration, points)
    },
    /**
     * 返回
     */
    back: function () {
        return _automator.back()
    },

}

module.exports = AutomatorOperate;
