// 界面相关
import com from "./common.js"
export default {
    /**
     * 提示框 showToast
     * https://uniapp.dcloud.io/api/ui/prompt?id=showtoast
     * @param {String} title 提示文字
     * @param {String} icon 图标
     * @param {Number} duration 提示时长
     * @param {Boolean} mask 是否有透明mask 默认false
     */
    showToast(title, icon, duration, mask) {
        uni.hideLoading();
        if (com.empty(title)) return false
        uni.showToast({
            title: title ? title : "未知",
            icon: icon ? icon : "none",
            duration: duration ? duration : 1500,
            mask: mask ? mask : false
        });
    },
    /**
     * 关闭提示框 hideToast
     * https://uniapp.dcloud.io/api/ui/prompt?id=hidetoast
     */
    hideToast() {
        uni.hideToast();
    },
    /**
     * 等待框 showLoading
     * https://uniapp.dcloud.io/api/ui/prompt?id=showloading
     * @param {String} title 提示文字
     * @param {Boolean} mask 是否有透明mask 默认false
     */
    showLoading(title, mask) {
        uni.showLoading({
            title: title ? title : "加载中",
            mask: mask ? mask : true
        });
    },
    /**
     * 关闭等待框 hideLoading
     * https://uniapp.dcloud.io/api/ui/prompt?id=hideloading
     */
    hideLoading() {
        uni.hideLoading();
    },
    /**
     * 显示模态弹窗 showModal
     * https://uniapp.dcloud.io/api/ui/prompt?id=showmodal
     * @param {String} title 标题
     * @param {String} content 提示内容
     * @param {Function} confirm 确定后的回调
     * @param {JSON} ext 扩展参数 
     */
    showModal(title, content, confirm, ext) {
        if (!ext) ext = {}
        // #ifndef APP-PLUS
        uni.showModal({
            title: title ? title : "提示",
            content: content ? content : "提示内容",
            showCancel: ext.showCancel ? ext.showCancel : false,
            cancelText: ext.cancelText ? ext.cancelText : '取消',
            confirmText: ext.confirmText ? ext.confirmText : '确定',
            success(res) {
                if (res.confirm) {
                    if (confirm) confirm()
                } else if (res.cancel) {
                    if (ext.cancel) ext.cancel()
                }
            }
        });
        // #endif
        // #ifdef APP-PLUS
        let btns = [ext.confirmText ? ext.confirmText : '确定']
        if (plus.os.name == 'Android') {
            if (ext.showCancel == true) btns.push(ext.cancelText ? ext.cancelText : '取消')
        } else {
            if (ext.showCancel == true) btns.unshift(ext.cancelText ? ext.cancelText : '取消')
        }
        plus.nativeUI.confirm(content ? content : "提示内容", function (e) {
            if (plus.os.name != 'Android') {
                if (e.index == 1) {
                    if (confirm) confirm()
                } else {
                    if (ext.cancel) ext.cancel()
                }
            } else {
                if (e.index == 0) {
                    if (confirm) confirm()
                } else {
                    if (ext.cancel) ext.cancel()
                }
            }
        }, {
                "title": title ? title : "提示",
                "buttons": btns,
            });
        // #endif
    },
    /**
     * 显示操作菜单 showActionSheet
     * https://uniapp.dcloud.io/api/ui/prompt?id=showactionsheet
     * @param {Array} item 菜单条数
     * @param {Function} success 点击菜单的回调
     * @param {String} color 颜色
     */
    showActionSheet(item, success, color) {
        uni.showActionSheet({
            itemList: item ? item : [],
            color: color ? color : '#000000',
            success(res) {
                if (success) success(res.tapIndex + 1)
            }
        });
    },
    /**
     * 动态设置当前页面的标题 setNavigationBarTitle
     * https://uniapp.dcloud.io/api/ui/navigationbar?id=setnavigationbartitle
     * @param {String} item 页面标题
     * @param {Function} successFn 成功回调
     * @param {Function} failFn 失败回调
     */
    setNavigationBarTitle(item, successFn, failFn) {
        uni.setNavigationBarTitle({
            title: String(item),
            success(e) {
                if (successFn) successFn(e);
            },
            fail(e) {
                if (failFn) failFn(e);
            }
        });
    },
    /**
     * 设置页面导航条颜色 setNavigationBarTitle
     * https://uniapp.dcloud.io/api/ui/navigationbar?id=setnavigationbarcolor
     * @param {String} fColor 前景颜色值
     * @param {String} bColor 背景颜色值
     * @param {Function} successFn 成功回调
     * @param {Function} failFn 失败回调
     */
    setNavigationBarColor(fColor = "#ffffff", bColor = "#ff0000", successFn, failFn) {
        uni.setNavigationBarTitle({
            frontColor: fColor,
            backgroundColor: bColor,
            success(e) {
                if (successFn) successFn(e);
            },
            fail(e) {
                if (failFn) failFn(e);
            }
        });
    },
    /**
     * 为 tabBar 某一项的右上角添加文本 setTabBarBadge
     * https://uniapp.dcloud.io/api/ui/tabbar?id=settabbarbadge
     * @param {Number} index tabBar的哪一项，从左边算起
     * @param {String} text 显示的文本，不超过 3 个半角字符
     * @param {Function} successFn 成功回调
     * @param {Function} failFn 失败回调
     */
    setTabBarBadge(index = 0, text, successFn, failFn) {
        uni.setTabBarBadge({
            index: Number(index),
            text: String(text),
            success(e) {
                if (successFn) successFn(e);
            },
            fail(e) {
                if (failFn) failFn(e);
            }
        });
    },
    /**
     * 移除 tabBar 某一项右上角的文本 removeTabBarBadge
     * https://uniapp.dcloud.io/api/ui/tabbar?id=removetabbarbadge
     * @param {Number} index tabBar的哪一项，从左边算起
     * @param {Function} successFn 成功回调
     * @param {Function} failFn 失败回调
     */
    removeTabBarBadge(index = 0, successFn, failFn) {
        uni.removeTabBarBadge({
            index: Number(index),
            success(e) {
                if (successFn) successFn(e);
            },
            fail(e) {
                if (failFn) failFn(e);
            }
        });
    },
    /**
     * 显示 tabBar 某一项的右上角的红点 showTabBarRedDot
     * https://uniapp.dcloud.io/api/ui/tabbar?id=showtabbarreddot
     * @param {Number} index tabBar的哪一项，从左边算起
     * @param {Function} successFn 成功回调
     * @param {Function} failFn 失败回调
     */
    showTabBarRedDot(index = 0, successFn, failFn) {
        uni.showTabBarRedDot({
            index: Number(index),
            success(e) {
                if (successFn) successFn(e);
            },
            fail(e) {
                if (failFn) failFn(e);
            }
        });
    },
    /**
     * 隐藏 tabBar 某一项的右上角的红点 hideTabBarRedDot
     * https://uniapp.dcloud.io/api/ui/tabbar?id=hidetabbarreddot
     * @param {Number} index tabBar的哪一项，从左边算起
     * @param {Function} successFn 成功回调
     * @param {Function} failFn 失败回调
     */
    hideTabBarRedDot(index = 0, successFn, failFn) {
        uni.hideTabBarRedDot({
            index: Number(index),
            success(e) {
                if (successFn) successFn(e);
            },
            fail(e) {
                if (failFn) failFn(e);
            }
        });
    },
    /**
     * 将页面滚动到目标位置 pageScrollTo
     * https://uniapp.dcloud.io/api/ui/scroll?id=pagescrollto
     * @param {Number} top 滚动到页面的目标位置（单位px）
     * @param {Number} duration 滚动动画的时长，默认300ms，单位 ms
     * @param {Function} successFn 成功回调
     * @param {Function} failFn 失败回调
     */
    pageScrollTo(top = 0, duration = 300, successFn, failFn) {
        uni.pageScrollTo({
            scrollTop: Number(top),
            duration: Number(duration),
            success(e) {
                if (successFn) successFn(e);
            },
            fail(e) {
                if (failFn) failFn(e);
            }
        });
    },
}