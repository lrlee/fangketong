// 导出模块
// #ifndef H5
const wxjs = {}
// #endif
// #ifdef H5
import wxjs from "./lib/jweixin-1.5.0.js";
// #endif
import pro from "./prototype.js" // 原型
import cf from "./config.js" // 一些配置
import dev from "./device.js" // 设备相关
import reg from "./regexp.js" // 正则
import com from "./common.js" // 公告方法
import req from "./request.js" // 网络
import nav from "./navigate.js" // 导航
import ui from "./ui.js" // 界面
import user from "./user.js" // 用户 登录什么
import pay from "./pay.js" // 支付
export {
    /**
     * 原型
     */
    pro,
    /**
     * 配置对象
     */
    cf,
    /**
     * 设备相关
     */
    dev,
    /**
     * 微信 js-sdk 1.5.0  只有H5有效 其它端为 {}
     */
    wxjs,
    /**
     * 正则表达式
     */
    reg,
    /**
     * 公用函数
     */
    com,
    /**
     * 网络数据交互
     */
    req,
    /**
     * 路由
     */
    nav,
    /**
     * 界面相关
     */
    ui,
    /**
     * 用户信息相关
     */
    user,
    /**
     * 支付
     */
    pay,
}

// export default port