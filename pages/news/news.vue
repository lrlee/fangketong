<template>
	<view class="news-warp">
		<view class="news-item" v-for="(v,i) in news" :key="i">
			<navigator :url="!v.link == '' ? '/pages/webView/webView?url=' + v.link : '/pages/news/newsDetails?type='+v.type+'&id='+ v.id" hover-class="navigator-hover">
				<view class="news-left">
					<image :src="v.thumb" />
					<view class="news-title-warp">
						<view class="news-title">{{v.title}}</view>
						<view class="news-time">{{v.createtime}}</view>
					</view>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	import * as tki from '../../components/TikiUI/common/js/index.js';
	export default {
		data() {
			return {
				news:[],
				type:null
			}
		},
		onLoad(options){
			console.log(options,"option")
			this.type = options.type || null
		},
		onShow(){
			this.news=[]
			this.getNewsList()
			this.getInfo()
			this.getNewsDetails()
		},
		methods: {
			getNewsList(){
				tki.req.get('index/news').then(d => {
				    if (d.code == 200) {
				       // this.news = d.data.list;
					   let data = d.data.list
					   data.length && data.map(v=>{
						   v.type = 1
						   v.createtime =new Date(Number(v.createtime * 1000)).format("yyyy-MM-dd")
					   })
					   this.news = this.news.concat(data)
					   console.log(this.news,"news111")
				    } else {
				        tki.ui.showToast(d.message)
				    }
				}).catch(e => {
				    tki.ui.showToast(e.message)
				})
			},
			getInfo(){
                let projectId = uni.getStorageSync('projectid')
				let url = this.type?'index/activity':'index/projectActivity'
				tki.req.get(url, {projectId}).then(d => {
				    if (d.code == 200) {
						let data = d.data.list
						data.length && data.map(v=>{
							v.type = 2
							v.createtime =new Date(Number(v.createtime * 1000)).format("yyyy-MM-dd")
						})
	
						this.news = this.news.concat(data)
				    } else {
				        tki.ui.showToast(d.message)
				    }
				}).catch(e => {
				    tki.ui.showToast(e.message)
				})
			}
		}
	}
</script>
<style lang="less" src="../message/list/message.less">
</style>
