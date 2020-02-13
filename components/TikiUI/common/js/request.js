// 网络相关
import com from "./common.js"
import socket from "./lib/plus-websocket-1.0.4.js";
// #ifdef APP-PLUS || H5
Object.assign(uni, socket)
// #endif
// 部分代码参考 
// 请求配置 https://ext.dcloud.net.cn/plugin?id=289
let cf = {
    baseUrl: '',
    url: '',
    data: {projectid: 17},
    dataType: 'json',
    responseType: 'text',
    header: {},
    reqInterceptors: '', //请求拦截器 必须有返回值
    resInterceptors: '', //响应拦截器 必须有返回值
}
// socket 配置项
let socketCf = {
    baseUrl: '',
    url: '',
    header: {},
    method: "GET",
    protocols: [],
}
// 上传文件配置
let upCf = {
    baseUrl: '', // 上传文件的baseUrl
    url: '',
    fileType: 'image',
    data: {},
    name: 'file',
    header: {},
}
// 下载文件配置
let downCf = {
    baseUrl: '', // 下载文件的baseUrl
    url: '',
    header: {},
}
// 网络请求
function _request(method, url, data, config = {}) {
    if (!com.empty(config.data)) data = com.jsonPush(data, config.data)
    if (!com.empty(config.url)) url = config.url
    let lastConfig = com.deepCopy(_merge(cf, com.jsonPush(config, { data, url })))
    if (lastConfig.reqInterceptors && typeof lastConfig.reqInterceptors === 'function') {
        let reqInterceptors = lastConfig.reqInterceptors(lastConfig);
        if (!reqInterceptors) {
            return false;
        } else if (Object.prototype.toString.call(reqInterceptors) === "[object Promise]") {
            return reqInterceptors;
        }
        lastConfig = com.deepCopy(reqInterceptors);
    }
    // console.log(lastConfig)
    return new Promise((resolve, reject) => {
        // console.log(lastConfig.header)
        uni.request({
            url: lastConfig.baseUrl + lastConfig.url,
            method: method,
            header: lastConfig.header,
            data: com.empty(lastConfig.data) ? '' : lastConfig.data,
            async complete(res) {
                if (lastConfig.resInterceptors && typeof lastConfig.resInterceptors === 'function') {
                    let resInterceptors = lastConfig.resInterceptors(res);
                    if (!resInterceptors) {
                        return false;
                    } else if (Object.prototype.toString.call(resInterceptors) === "[object Promise]") {
                        try {
                            let promiseRes = await resInterceptors;
                            resolve(promiseRes)
                        } catch (error) {
                            reject(error)
                        }
                    } else {
                        res = resInterceptors;
                    }
                }
                if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(res.data, res.statusCode, res.header);
                } else {
                    // res.msg = '请求失败!'
                    reject(res.data, res.statusCode, res.header);
                }
            }
        });
    });
}
// 合并参数
function _merge(oldConfig, newConfig) {
    let mergeConfig = com.deepCopy(oldConfig);
    if (!newConfig || !Object.keys(newConfig).length) return mergeConfig;
    for (let key in newConfig) {
        if (key !== 'header' && key !== 'data') {
            mergeConfig[key] = newConfig[key];
        } else {
            if (Object.prototype.toString.call(newConfig[key]) === '[object Object]') {
                for (let headerKey in newConfig[key]) {
                    mergeConfig[key][headerKey] = newConfig[key][headerKey];
                }
            }
        }
    }
    return mergeConfig;
}
// socket 请求
function _socket(url, config = {}) {
    let newConfig = com.deepCopy(_merge(socketCf, config))
    if (!com.empty(config.url)) url = config.url
    return uni.connectSocket({
        url: newConfig.baseUrl + url,
        header: newConfig.header,
        protocols: newConfig.protocols,
        method: newConfig.method,
        complete: (res)=> {
            uni.stopPullDownRefresh();
            uni.hideLoading();
        }
    });
}
let upFile, downFile;
export default {
    /**
     * 请求配置
     * @param {JSON} config 配置参数
     */
    setConfig(config = {}) {
        cf = com.deepCopy(_merge(cf, config));
    },
    /**
     * 获取配置
     */
    getConfig() {
        return cf
    },
    /**
     * 上传文件配置
     * @param {JSON} config 配置参数
     */
    setUpConfig(config = {}) {
        upCf = com.deepCopy(_merge(upCf, config));
    },
    /**
     * 获取上传文件配置
     */
    getUpConfig() {
        return upCf
    },
    /**
     * 下载文件配置
     * @param {JSON} config 配置参数
     */
    setDownConfig(config = {}) {
        downCf = com.deepCopy(_merge(downCf, config));
    },
    /**
     * 获取下载文件配置
     */
    getDownConfig() {
        return downCf
    },
    /**
     * socket配置
     * @param {JSON} config 配置参数
     */
    setSocketConfig(config = {}) {
        socketCf = com.deepCopy(_merge(socketCf, config));
    },
    /**
     * 获取socket配置
     */
    getSocketConfig() {
        return socketCf
    },
    /**
     * 发起POST请求
     * https://uniapp.dcloud.io/api/request/request?id=request
     * @param {String} url 接口地址
     * @param {JSON} data 传参
     * @param {JSON} config 配置项，本次请求可覆盖全局配置
     */
    async post(url, data, config) {
        return _request('POST', url, data, config)
    },
    /**
     * 发起GET请求
     * https://uniapp.dcloud.io/api/request/request?id=request
     * @param {String} url 接口地址
     * @param {JSON} data 传参
     * @param {JSON} config 配置项，本次请求可覆盖全局配置
     */
    async get(url, data, config) {
        return _request('GET', url, data, config)
    },
    /**
     * 上传文件
     * https://uniapp.dcloud.io/api/request/network-file?id=uploadfile
     * @param {String} url 接口地址
     * @param {JSON} data 参数  filePath 为要上传的文件路径，name 为服务器端接收的名字
     * @param {JSON} config 配置项，本次请求可覆盖全局配置
     * @param {Function} ProgressFn 上传进度回调
     */
    async upload(url, filePath, config = {}, ProgressFn) {
        let newConfig = com.deepCopy(_merge(upCf, config))
        if (!com.empty(config.url)) url = config.url
        // console.log(newConfig)
        return new Promise((resolve, reject) => {
            upFile = uni.uploadFile({
                url: newConfig.baseUrl + url,
                filePath: filePath,
                name: newConfig.name,
                fileType: newConfig.fileType,
                formData: newConfig.data,
                header: newConfig.header,
                complete: function (res) {
                    uni.stopPullDownRefresh();
                    uni.hideLoading();
                    if (res.statusCode == 200 && res.statusCode) {
                        resolve(res.data, res.statusCode, res.header);
                    } else {
                        reject(res);
                    }
                }
            });
            upFile.onProgressUpdate(function (res) {
                if (ProgressFn) {
                    ProgressFn(res);
                }
            });
        })
    },
    /**
     * 取消文件上传
     */
    abortUpload() {
        upFile.abort()
    },
    /**
     * 下载文件
     * https://uniapp.dcloud.io/api/request/network-file?id=downloadfile
     * @param {String} url 
     * @param {JSON} config 配置项，本次请求可覆盖全局配置
     * @param {Function} ProgressFn 下载进度回调
     */
    async download(url, config = {}, ProgressFn) {
        let newConfig = com.deepCopy(_merge(downCf, config))
        if (!com.empty(config.url)) url = config.url
        // console.log(newConfig)
        return new Promise((resolve, reject) => {
            downFile = uni.downloadFile({
                url: newConfig + url,
                header: newConfig.header,
                complete: function (res) {
                    uni.stopPullDownRefresh();
                    uni.hideLoading();
                    if (res.statusCode == 200 && res.statusCode) {
                        resolve(res.data, res.statusCode, res.header);
                    } else {
                        reject(res);
                    }
                }
            });
            downFile.onProgressUpdate(function (res) {
                if (ProgressFn) {
                    ProgressFn(res);
                }
            });
        })
    },
    /**
     * 取消下载
     */
    abortDownload() {
        downFile.abort()
    },
    /**
     * 创建一个 WebSocket 连接
     * https://uniapp.dcloud.io/api/request/websocket?id=connectsocket
     * @param {String} url 接口地址
     * @param {JSON} config 配置项，本次请求可覆盖全局配置
     */
    socket(url, config) {
        return _socket(url, config)
    },
}