import { ui, req, wxjs } from "./index.js"
function pay(sc, err, type, orderInfo, timeStamp, nonceStr, pkg, paySign) {
    ui.showLoading('支付中', true)
    uni.requestPayment({
        provider: type,
        orderInfo: orderInfo,
        // #ifdef MP-WEIXIN 
        timeStamp: timeStamp,
        nonceStr: nonceStr,
        package: pkg,
        signType: 'MD5',
        paySign: paySign,
        // #endif
        success: function (res) {
            ui.hideLoading()
            if (sc) {
                sc({ code: 1, msg: '支付成功', data: res })
            }
        },
        fail: function (er) {
            ui.hideLoading()
            if (err) {
                err({ code: 0, msg: '支付失败', data: er })
            }
        }
    });
}
export default {
    /**
     * 微信小程序支付
     * https://uniapp.dcloud.io/api/plugins/payment
     * @param {String} url 支付地址
     * @param {JSON} pr 参数
     * @param {Function} sc 支付成功回调
     * @param {Function} err 支付失败回调
     */
    wxMpPay(url, pr, sc, err) {
        let that = this
        ui.showLoading('请求支付数据', true)
        req.post(url, pr).then(d => {
            if (d.success) {
                pay(sc, err, 'wxpay', '', String(d.data.timeStamp), String(d.data.nonceStr), String('prepay_id=' + d.data.prepayId), String(d.data.paySign))
            } else {
                if (err) {
                    err({ code: -1, msg: '请求支付数据失败', data: d })
                }
            }
        }).catch(d => {
            if (err) {
                err({ code: -2, msg: '操作失败', data: d })
            }
        })
    },
    /**
     * 微信App支付
     * https://uniapp.dcloud.io/api/plugins/payment
     * @param {String} url 支付地址
     * @param {JSON} pr 参数
     * @param {Function} sc 支付成功回调
     * @param {Function} err 支付失败回调
     */
    wxAppPay(url, pr, sc, err) {
        let that = this
        ui.showLoading('请求支付数据', true)
        req.post(url, pr).then(d => {
            if (d.success) {
                pay(sc, err, 'wxpay', JSON.stringify(d.data))
            } else {
                if (err) {
                    err({ code: -1, msg: '请求支付数据失败', data: d })
                }
            }
        }).catch(d => {
            if (err) {
                err({ code: -2, msg: '操作失败', data: d })
            }
        })
    },
    /**
     * 微信H5支付
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
     * @param {String} url 支付地址
     * @param {JSON} pr 参数
     * @param {Function} sc 支付成功回调
     * @param {Function} err 支付失败回调
     */
    wxH5Pay(url, pr, sc, err) {
        let that = this
        ui.showLoading('请求支付数据', true)
        req.post(url, pr).then(d => {
            if (d.success) {
                // console.log(JSON.stringify(d.data))
                ui.showLoading('支付中', true)
                wxjs.chooseWXPay({
                    timestamp: String(d.data.timestamp),
                    nonceStr: String(d.data.nonceStr),
                    package: String('prepay_id=' + d.data.prepayId),
                    signType: 'MD5',
                    paySign: String(d.data.paySign),
                    success: function (res) {
                        ui.hideLoading()
                        if (sc) {
                            sc({ code: 1, msg: '支付成功', data: res })
                        }
                    },
                    fail: function (er) {
                        ui.hideLoading()
                        if (err) {
                            err({ code: 0, msg: '支付失败', data: er })
                        }
                    },
                    cancel: function (er) {
                        ui.hideLoading()
                        if (err) {
                            err({ code: -1, msg: '用户取消支付', data: er })
                        }
                    }
                });
            } else {
                if (err) {
                    err({ code: -2, msg: '请求支付数据失败', data: d })
                }
            }
        }).catch(d => {
            if (err) {
                err({ code: -3, msg: '操作失败', data: d })
            }
        })
    },
    /**
     * 支付宝App支付
     * https://uniapp.dcloud.io/api/plugins/payment
     * @param {String} url 支付地址
     * @param {JSON} pr 参数
     * @param {Function} sc 支付成功回调
     * @param {Function} err 支付失败回调
     */
    aliAppPay(url, pr, sc, err) {
        let that = this
        ui.showLoading('请求支付数据', true)
        req.post(url, pr).then(d => {
            if (d.success) {
                pay(sc, err, 'alipay', String(d.data))
            } else {
                if (err) {
                    err({ code: -1, msg: '请求支付数据失败', data: d })
                }
            }
        }).catch(d => {
            if (err) {
                err({ code: -2, msg: '操作失败', data: d })
            }
        })
    },
    /**
     * 苹果应用内App支付
     * https://uniapp.dcloud.io/api/plugins/payment
     * @param {String} url 支付地址
     * @param {JSON} pr 参数
     * @param {Function} sc 支付成功回调
     * @param {Function} err 支付失败回调
     */
    applePay(url, pr, sc, err) {
        let that = this,
            iapChannel = null;
        plus.payment.getChannels((channels) => {
            for (var i in channels) {
                var channel = channels[i];
                if (channel.id === 'appleiap') {
                    iapChannel = channel;
                    requestOrder();
                }
            }
            if (!iapChannel) {
                err({ msg: '操作失败', data: iapChannel })
            }
        }, (d) => {
            err({ msg: '操作失败', data: d })
        });
        function requestOrder() {
            ui.showLoading('请求支付数据', true)
            req.post(url, pr).then(d => {
                if (d.success) {
                    ui.showLoading('检测支付环境', true)
                    iapChannel.requestOrder(d.data, (orderList) => { //必须调用此方法才能进行 iap 支付
                        ui.hideLoading();
                        pay(sc, err, 'appleiap', String(d.data))
                    }, (d) => {
                        ui.hideLoading();
                        err({ msg: '无支付环境', data: d })
                    });
                } else {
                    if (err) {
                        err({ msg: '请求支付数据失败', data: d })
                    }
                }
            }).catch(d => {
                if (err) {
                    err({ msg: '操作失败', data: d })
                }
            })
        }
    },
}