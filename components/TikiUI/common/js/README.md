### request.js 案例、说明
#### 拦截器、配置项
``` javascript
// 在main.js引入，
import { req, user, nav } from "./components/TikiUI/common/js/index";
// 请求配置
req.setConfig({
    baseUrl: 'http://api.yngfwy.com/api/',
    header: {
        'Authorization': `Bearer ${user.uToken("get")}`
    },
    reqInterceptors: res => { return requestFn(res) },
    resInterceptors: res => { return responseFn(res) }
})
// 请求拦截器 必须有返回值
function requestFn(res => {
    // res.baseUrl = "xxx" 可直接覆盖setConfig配置项

    // 可以写一些逻辑什么的

    // return false 表示阻止请求
    // return res 返回修改的内容
    // return Promise.reject('error from request interceptors'); // 向外层抛出错误，用catch捕获
    return res
})
// 响应拦截器 必须有返回值
function responseFn(res) {
    // return false;    // 阻止返回,页面不会接收返回值
    // return {message: '自定义值，来自拦截器'};   // 返回您自定义的值，将覆盖原始返回值
    // return Promise.reject('error from response interceptors') // 向外层抛出错误，用catch捕获

    // 可以写一些逻辑什么的

    // return false 表示阻止请求
    // return res 返回修改的内容
    uni.stopPullDownRefresh();
    uni.hideLoading();
    if (res.data.code == 202) {
        // 需要绑定房源
        return false
    } else if (res.statusCode == 401) {
        // token 失效
        nav.reLa('/pages/login/login/login')
        return false
    } else {
        return res
    }
}
// 上传文件配置
req.setUpConfig({
    baseUrl: 'http://www.baidu.com/',
    data: {
        'sfs': 'sezfefef'
    }
})
// 下载文件配置
req.setDownConfig({
    baseUrl: 'http://www.baidu2.com/',
    header: {
        'sfs': 'sssss'
    }
})
```
#### 请求 get\post\up\down
``` javascript
// 方式一
getData() {
    let that = this;
    return tki.req.post('resident/getBalance.do').then(d => {
        if (d.success) {
            that.userInfo = d.data
        } else {
            tki.ui.showToast(d.msg)
        }
    }).catch(e => {
        tki.ui.showToast(e.msg)
    })
}
// 方式二
async getData() {
    let that = this;
    let res = await tki.req.post('resident/getBalance.do')
}

// 调用异步写法
async test1(){
    await getData()
    await getData()
}

// 调用同步写法
test1(){
    getData()
    getData()
}
```