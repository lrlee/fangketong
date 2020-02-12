import Vue from 'vue'
import App from './App'
import { req, nav, ui, user } from './components/TikiUI/common/js/index'
import imgConfig from './common/config'
Vue.config.productionTip = false
let modelIsShow = false
req.setConfig({
    baseUrl: 'https://zhongtie.h-passer.com/api/',
	header:{
		'content-type':'application/x-www-form-urlencoded',
		'authentication': user.uToken("get")
	},
    resInterceptors: res => {
        // 响应拦截器
        // 没有登录跳去登录页面
        if (modelIsShow) {
            return false
        } else {
            if (res.data.code == 402) {
                modelIsShow = true
                ui.showModal('提示', '需要登录', res => {
                    modelIsShow = false
                    nav.navTo('/pages/login/login')
                })
                return false
            } else {
                return res
            }
        }
    }
})
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
Vue.mixin({
	data() {
		return {
			imgUrl: imgConfig.imgUrl
		}
	}
})