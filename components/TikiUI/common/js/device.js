import { wxjs } from "./index"
// 设备相关
export default {
    /**
     * 获取系统信息 getSystemInfoSync 
     * https://uniapp.dcloud.io/api/system/info?id=getsysteminfosync
     * @param {Function} successFn 成功回调
     * @param {Function} failFn 失败回调
     */
    getSystemInfo(successFn, failFn) {
        uni.getSystemInfoSync({
            success(e) {
                if (successFn) successFn(e);
            },
            fail(e) {
                if (failFn) failFn(e);
            }
        });
    },
    /**
     * 获取网络类型 getNetworkType 
     * https://uniapp.dcloud.io/api/system/network?id=getnetworktype
     * @param {Function} successFn 成功回调
     * @param {Function} failFn 失败回调
     */
    getNetworkType(successFn, failFn) {
        uni.getSystemInfoSync({
            success(e) {
                if (successFn) successFn(e);
            },
            fail(e) {
                if (failFn) failFn(e);
            }
        });
    },
    /**
     * 监听网络状态变化 onNetworkStatusChange 
     * https://uniapp.dcloud.io/api/system/network?id=onnetworkstatuschange
     * @param {Function} callbackFn 成功回调
     */
    onNetworkStatusChange(callbackFn) {
        uni.onNetworkStatusChange((res) => {
            if (callbackFn) callbackFn(res)
        });
    },
    /**
     * 监听加速度数据 onNetworkStatusChange 
     * https://uniapp.dcloud.io/api/system/accelerometer?id=onaccelerometerchange
     * @param {String} type start:开始监听 stop:停止监听
     * @param {Function} callbackFn 成功回调
     * @param {String} interval 监听评率 game:20ms/次 ui:60ms/次 normal:200ms/次(默认)
     */
    accelerometer(type = "start", callbackFn, interval = "normal") {
        if (type == "start") {
            uni.onAccelerometerChange((res) => {
                if (callbackFn) callbackFn(res)
            });
            if (interval) {
                uni.startAccelerometer({
                    interval: String(interval)
                });
            }
        } else {
            uni.stopAccelerometer();
        }
    },
    /**
     * 监听罗盘数据 onCompassChange
     * https://uniapp.dcloud.io/api/system/compass
     * @param {String} type start:开始监听 stop:停止监听
     * @param {Function} callbackFn 成功回调
     */
    compass(type = "start", callbackFn) {
        if (type == "start") {
            uni.onCompassChange((res) => {
                if (callbackFn) callbackFn(res)
            });
        } else {
            uni.stopCompass();
        }
    },
    /**
     * 调起客户端扫码界面 scanCode
     * https://uniapp.dcloud.io/api/system/barcode?id=scancode
     * @param {Function} successFn 扫码成功后的回调
     * @param {JSON} ext 配置参数
     */
    scanCode(successFn, ext = {}) {
        let type = ["qrCode", "barCode", "datamatrix", "pdf417"]
        // #ifndef H5
        uni.scanCode({
            onlyFromCamera: ext.onlyFromCamera ? ext.onlyFromCamera : false,
            scanType: ext.scanType ? ext.scanType : type,
            success(e) {
                if (successFn) successFn(e)
            },
            fail(e) {
                if (ext.fail) ext.fail(e);
            }
        });
        // #endif
        // #ifdef H5
        wxjs.scanQRCode({
            needResult: 1,
            scanType: ext.scanType ? ext.scanType : type,
            success(e) {
                if (successFn) successFn(e)
            },
            fail(e) {
                if (ext.fail) ext.fail(e);
            },
            cancel(e) {
                if (ext.fail) ext.fail(e);
            }
        });
        // #endif
    },
    /**
     * 设置剪贴板 setClipboardData
     * https://uniapp.dcloud.io/api/system/clipboard?id=setclipboarddata
     * @param {String} val 设置到剪贴板的值
     * @param {Function} successFn 成功回调
     * @param {Function} failFn 失败
     */
    setClipboard(val, successFn, failFn) {
        // #ifndef H5
        uni.setClipboardData({
            data: String(val),
            success(e) {
                if (successFn) successFn(e)
            },
            fail(e) {
                if (failFn) failFn(e);
            }
        });
        // #endif
        // #ifdef H5
        // 创建临时Dom
        let tempDiv = document.createElement("div")
        tempDiv.id = "temp-clipboard-div"
        tempDiv.style.position = "fixed";
        tempDiv.style.top = '-99999px';
        tempDiv.style.zIndex = "-999";
        tempDiv.innerText = String(val)
        document.body.appendChild(tempDiv)
        let copyDom = document.querySelector('#temp-clipboard-div');
        //创建选中范围
        let range = document.createRange();
        range.selectNode(copyDom);
        //移除剪切板中内容
        window.getSelection().removeAllRanges();
        //添加新的内容到剪切板
        window.getSelection().addRange(range);
        //复制
        let successful = document.execCommand('copy');
        // 移除临时节点
        document.querySelector('body').removeChild(document.querySelector('#temp-clipboard-div'))
        if (successful) {
            if (successFn) successFn(successful)
        } else {
            if (failFn) failFn(successful);
        }
        // #endif
    },
    /**
     * 获取系统剪贴板内容 getClipboardData
     * https://uniapp.dcloud.io/api/system/clipboard?id=getclipboarddata
     * @param {Function} successFn 成功回调
     * @param {Function} failFn 失败
     */
    getClipboard(successFn, failFn) {
        // #ifndef H5
        uni.getClipboardData({
            success(e) {
                if (successFn) successFn(e)
            },
            fail(e) {
                if (failFn) failFn(e);
            }
        });
        // #endif
    },
    /**
     * 拨打电话 makePhoneCall
     * @param {String} phone 需要拨打的电话号码
     */
    makePhoneCall(phone) {
        uni.makePhoneCall({
            phoneNumber: String(phone)
        });
    },
    /**
     * 设置屏幕亮度 setScreenBrightness
     * https://uniapp.dcloud.io/api/system/brightness?id=setscreenbrightness
     * @param {Number} val 亮度值0-1
     * @param {Function} successFn 成功回调
     * @param {Function} failFn 失败
     */
    setScreenBrightness(val, successFn, failFn) {
        // #ifndef H5
        uni.setScreenBrightness({
            value: Number(val),
            success(e) {
                if (successFn) successFn(e)
            },
            fail(e) {
                if (failFn) failFn(e);
            }
        });
        // #endif
    },
    /**
     * 获取屏幕亮度 getScreenBrightness
     * https://uniapp.dcloud.io/api/system/brightness?id=getscreenbrightness
     * @param {Function} successFn 成功回调
     * @param {Function} failFn 失败
     */
    getScreenBrightness(successFn, failFn) {
        // #ifndef H5
        uni.getScreenBrightness({
            success(e) {
                if (successFn) successFn(e)
            },
            fail(e) {
                if (failFn) failFn(e);
            }
        });
        // #endif
    },
    /**
     * 设置屏幕是否常亮 setKeepScreenOn
     * https://uniapp.dcloud.io/api/system/brightness?id=setkeepscreenon
     * @param {Boolean} type 是否常亮
     * @param {Function} successFn 成功回调
     * @param {Function} failFn 失败
     */
    keepScreen(type, successFn, failFn) {
        // #ifndef H5
        uni.setKeepScreenOn({
            keepScreenOn: Boolean(type),
            success(e) {
                if (successFn) successFn(e)
            },
            fail(e) {
                if (failFn) failFn(e);
            }
        });
        // #endif
    },
}