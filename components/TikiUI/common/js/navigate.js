// 导航相关
import com from "./common.js"
export default {
    /**
     * 打开页面 navigateTo 
     * https://uniapp.dcloud.io/api/router?id=navigateto
     * @param {String} url 要打开的页面地址
     * @param {JSON} param 携带参数
     * @param {Function} successFn 打开成功回调
     * @param {Function} failFn 打开失败回调
     */
    navTo(url, param, successFn, failFn) {
        if (com.empty(url)) return;
        if (!com.empty(param)) {
            url = url + com.json2str(param)
        }
		console.log(url,"url")
        uni.navigateTo({
            url: url,
            success(e) {
				console.log("success")
                if (successFn) successFn(e);
            },
            fail(e) {
				console.log(e,"fail")
                if (failFn) failFn(e);
            }
        });
    },
    /**
     * 回退页面 navigateBack
     * https://uniapp.dcloud.io/api/router?id=navigateback
     * @param {number} level 回退页面层级默认返回上一级
     * @param {Function} successFn 回退成功回调
     * @param {Function} failFn 回退失败回调
     */
    navBack(level = 1, successFn, failFn) {
        uni.navigateBack({
            delta: level,
            success(e) {
                if (successFn) successFn(e);
            },
            fail(e) {
                if (failFn) failFn(e);
            }
        });
    },
    /**
     * 刷新页面
     */
    rePage() {
        let that = this;
        let pagesStack = getCurrentPages(); // eslint-disable-line
        let activePage = pagesStack[pagesStack.length - 1];
        let pageParams = activePage.options;
        let url = (function () {
            let base = "";
            for (let i in pageParams) {
                base += "&" + i + "=" + pageParams[i];
            }
            let result = activePage.route + base.replace("&", "?");
            return result;
        })();
        uni.redirectTo({
            url: url
        });
    },
    /**
     * 关闭当前页面，跳转到应用内的某个页面 redirectTo
     * https://uniapp.dcloud.io/api/router?id=redirectto
     * @param {String} url 需要跳转的应用内非 tabBar 的页面的路径
     * @param {JSON} param 携带参数
     * @param {Function} successFn 跳转成功回调
     * @param {Function} failFn 跳转失败回调
     */
    reTo(url, param, successFn, failFn) {
        if (com.empty(url)) return;
        if (!com.empty(param)) {
            url = url + com.json2str(param)
        }
        uni.redirectTo({
            url: url,
            success(e) {
                if (successFn) successFn(e);
            },
            fail(e) {
                if (failFn) failFn(e);
            }
        });
    },
    /**
     * 打开tab页面并关闭所有非tab页面 switchTab
     * https://uniapp.dcloud.io/api/router?id=switchtab
     * @param {String} url 需要跳转的 tabBar 页面的路径 不可以带参数
     * @param {Function} successFn 成功回调
     * @param {Function} failFn 失败回调
     */
    swTab(url, successFn, failFn) {
        if (com.empty(url)) return;
        uni.switchTab({
            url: url,
            success(e) {
                if (successFn) successFn(e);
            },
            fail(e) {
                if (failFn) failFn(e);
            }
        });
    },
    /**
     * 关闭所有页面，打开到应用内的某个页面 reLaunch
     * https://uniapp.dcloud.io/api/router?id=relaunch
     * @param {String} url 需要跳转的应用内页面路径
     * @param {JSON} param 携带参数
     * @param {Function} successFn 成功回调
     * @param {Function} failFn 失败回调
     */
    reLa(url, param, successFn, failFn) {
        if (com.empty(url)) return;
        if (!com.empty(param)) {
            url = url + com.json2str(param)
        }
        uni.reLaunch({
            url: url,
            success(e) {
                if (successFn) successFn(e);
            },
            fail(e) {
                if (failFn) failFn(e);
            }
        });
    },
}