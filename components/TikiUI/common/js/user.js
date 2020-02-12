// 用户相关 登录注册什么的
import { req, com, nav, wxjs } from "./index.js"
let cf = {
    wxmpAppid: '', //微信 appid
    h5Appid: '', // h5 appid
    h5RedirectUri: '', // h5 redirect_uri
}
export default {
    /**
     * 设置配置
     * @param {JSON} config 配置参数
     */
    setConfig(config = {}) {
        cf = com.deepCopy(Object.assign(cf, config));
    },
    /**
     * 获取配置
     */
    getConfig(config = {}) {
        return cf
    },
    /**
     * 存储和获取用户信息
     * @param {String} type get 获取用户信息, set 设置用户信息 
     * @param {*} value 要存储的值
     */
    uInfo(type, value) {
        if (type == "set") {
            uni.setStorageSync("uinfo", value);
        } else if (type == "get") {
            return uni.getStorageSync("uinfo");
        }
    },
    /**
     * 存储uid opendid 微信信息
     * @param {String} type get 获取uId, set 设置uId
     * @param {*} value 
     */
    uId(type, value) {
        if (type == "set") {
            uni.setStorageSync("uId", value);
        } else if (type == "get") {
            return uni.getStorageSync("uId");
        }
    },
    /**
     * 存储token
     * @param {String} type get 获取token, set 设置token
     * @param {*} value 
     */
    uToken(type, value) {
        if (type == "set") {
            uni.setStorageSync("uToken", value);
        } else if (type == "get") {
            return uni.getStorageSync("uToken");
        }
    },
    /**
     * 检查用户是否给予微信小程序用户权限
     * @param {Function} sc 已微信小程序授权的回调
     * @param {Function} err 拒绝微信小程序授权的回调
     */
    ckWxMpAt(sc, err) {
        wx.getSetting({
            success(res) {
                if (JSON.stringify(res.authSetting) == "{}" || !res.authSetting['scope.userInfo']) {
                    if (err) {
                        err()
                    }
                } else {
                    if (sc) {
						console.log(sc,"sccccsss")
                        sc()
                    }
                }
            }
        })
    },
    /**
     * 微信小程序登录
     * @param {String} url 微信小程序登录地址
     * @param {Function} scFn 微信小程序登录成功的回调
     * @param {Function} errFn 微信小程序登录失败的回调
     */
    wxMpLogin(url, scFn, errFn) {
        let that = this
        uni.login({
            provider: "weixin",
            success: (loginRes) => {
                // 获取用户信息
                uni.getUserInfo({
                    provider: "weixin",
                    success: (infoRes) => {
						console.log(infoRes)
                        req.post(url, {
                            encryptedData: infoRes.encryptedData,
                            iv: infoRes.iv,
                            code: loginRes.code,
                            // appid: cf.wxmpAppid
                        }).then(d => {
                            if (scFn) {
                                scFn(d,infoRes)
                            }
                        }).catch(e => {
                            if (errFn) {
                                errFn(e)
                            }
                        })
                    },
                    fail: (res) => {
                        if (errFn) {
                            errFn(res)
                        }
                    }
                });
            }
        });
    },
    /**
     * 获取用户授权并返回code
     */
    wxH5Oauth2() {
        location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${cf.h5Appid}&redirect_uri=${cf.h5RedirectUri}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
    },
    /**
     * 微信H5配置
     * @param {String} appId 公众号的唯一标识
     * @param {String} timestamp 生成签名的时间戳
     * @param {String} nonceStr 生成签名的随机串
     * @param {String} signature 签名
     * @param {Array} jsApiList 需要使用的JS接口列表
     */
    wxh5SetConfig(appId, timestamp, nonceStr, signature, jsApiList) {
        wxjs.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId, // 必填，公众号的唯一标识
            timestamp, // 必填，生成签名的时间戳
            nonceStr, // 必填，生成签名的随机串
            signature,// 必填，签名
            jsApiList: com.empty(jsApiList) ?
                [
                    'updateAppMessageShareData',
                    'updateTimelineShareData',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'onMenuShareQZone',
                    'startRecord',
                    'stopRecord',
                    'onVoiceRecordEnd',
                    'playVoice',
                    'pauseVoice',
                    'stopVoice',
                    'onVoicePlayEnd',
                    'uploadVoice',
                    'downloadVoice',
                    'chooseImage',
                    'previewImage',
                    'uploadImage',
                    'downloadImage',
                    'translateVoice',
                    'getNetworkType',
                    'openLocation',
                    'getLocation',
                    'hideOptionMenu',
                    'showOptionMenu',
                    'hideMenuItems',
                    'showMenuItems',
                    'hideAllNonBaseMenuItem',
                    'showAllNonBaseMenuItem',
                    'closeWindow',
                    'scanQRCode',
                    'chooseWXPay',
                    'openProductSpecificView',
                    'addCard',
                    'chooseCard',
                    'openCard'
                ]
                : jsApiList // 必填，需要使用的JS接口列表
        });
    }
}