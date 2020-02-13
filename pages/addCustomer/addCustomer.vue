<template>
	<view>
		<view class="recommend-warp">
			<view class="recommend-item">
				<view class="recommend-title">
					客户姓名
				</view>
				<view class="recommend-input">
					<input class="name-input" v-model="name" placeholder="请输入姓名" />
				</view>
			</view>
			<view class="recommend-item">
				<view class="recommend-title">
					客户电话
				</view>
				<view class="recommend-input">
					<input class="tel-input" type="number" v-model="tel" placeholder="请输入电话" />
				</view>
			</view>
			<view class="recommend-item">
				<view class="recommend-title">
					推荐备注
				</view>
				<view class="recommend-input">
					<input class="beizhu-input" v-model="note" placeholder="准意向客户" />
				</view>
			</view>
			<view class="recommend-item">
				<view class="recommend-title">
					所属项目
				</view>
				<view class="recommend-input">
					<picker @change="bindProjectChange"  :value="projectIndex" :range-key="'projectname'" :range="projects">
				        <view class="uni-input">{{projects[projectIndex].projectname}}</view>
				    </picker>
				</view>
			</view>
			<!-- <view class="recommend-item">
				<view class="recommend-title">
					楼盘
				</view>
				<view class="recommend-input">
					<picker @change="bindLoupanChange" :value="lpIndex" :range="loupan">
                        <view class="uni-input">{{loupan[lpIndex]}}</view>
                    </picker>
				</view>
			</view> -->
			<view class="recommend-item">
				<view class="recommend-title">
					意向户型
				</view>
				<view class="recommend-input">
					<input class="beizhu-input" v-model="huxingText" placeholder="意向户型" />
				</view>
				<!-- <view class="recommend-input">
					<picker @change="bindHxChange" :value="hxIndex" :range="huxing">
			            <view class="uni-input">{{huxing[hxIndex]}}</view>
			        </picker>
				</view> -->
			</view>
			<view class="recommend-item">
				<view class="recommend-title">
					意向楼层
				</view>
				<view class="recommend-input">
					<input class="beizhu-input" v-model="floorText" placeholder="意向楼层" />
				</view>
				<!-- <view class="recommend-input">
					<picker @change="bindFloorChange" :value="floorIndex" :range="floor">
			            <view class="uni-input">{{floor[floorIndex]}}</view>
			        </picker>
				</view> -->
			</view>
			<view class="recommend-item">
				<view class="recommend-title">
					特殊需求
				</view>
				<view class="recommend-input">
					<input class="special-input" v-model="special" placeholder="请输入需求" />
				</view>
			</view>
		</view>
		<button type="warn" @tap="submitCustomer()" class="recommend-btn">提交</button>
	</view>
</template>

<script>
	import * as tki from '../../components/TikiUI/common/js/index.js';
	export default {
		data() {
			return {
				lpIndex: 0,
				loupan: [],  // 楼盘
				hxIndex: 0,
				huxing: [],  // 户型
				huxingText:'',
				floorIndex: 0,
				floor: [],   // 楼层
				floorText:'',
				name: '',
				tel: '',
				note: '',    // 备注
				special: '',
				projects:[],
				projectId:null,
				projectIndex:0,
				projectText:null
			};
		},
		onLoad(){
			const pid = uni.getStorageSync('projectid');
			this.projectId  = pid
		},
		onShow() {
			// 请求数据
			return tki.req.post('index/relation').then(d => {
				if (d.code === 200) {
					// 处理数据
					this.projects = d.data.project
					this.projectText = d.data.project[0].projectname
					if(!this.projectId){
						this.projectId = d.data.project[0].id
					}
					this.projects.map((v,i)=>{
						if(v.id==this.projectId){
							this.projectIndex = i
						}
					})
					// 楼盘
					// this.loupan = d.data.map(item => {
					// 	return item.title
					// }) 
					// // 楼层
					// this.floor = Object.values(d.data[this.lpIndex].floor_array)
					// // 户型
					// this.huxing = d.data[this.lpIndex].project_apartment.map(item => {
					// 	return item.title
					// }) 
				}
			}).catch(e => {
				tki.ui.showToast(e.message)
				console.log(e)
			})
		},
		methods: {
			//项目
			bindProjectChange:function(e){
				this.projectIndex = e.target.value
				this.projects.map((v,i)=>{
					if(i==this.projectIndex){
						this.projectId = v.id
						this.projectText = v.projectname
					}
				})
				
			},
			bindHxChange(e) {
				this.hxIndex = e.target.value
			},
			bindLoupanChange(e) {
				this.LpIndex = e.target.value
			},
			bindFloorChange(e) {
				this.floorIndex = e.target.value
			},
			submitCustomer() {
				if(this.name == "") {
					tki.ui.showToast("姓名不能为空")
				}else if(!/^(1)((3)|(4)|(5)|(7)|(8)|(9))\d{9}$/.test(this.tel)) {
					tki.ui.showToast("电话号码有误")
				} else {
					return tki.req.post('adviser/customeradd', {
						realname: this.name,
						mobile: this.tel,
						// intention1: this.loupan[this.lpIndex],  // 楼盘
						// intention2: this.huxing[this.hxIndex],   // 户型
						// intention3: this.floor[this.floorIndex],   // 楼层
						intention1:this.projectText,  //项目
						intention2:this.huxingText,  //户型
						intention3:this.floorText,  //楼层
						intention4: this.special,  // 特殊需求
						remark: this.note,   // 推荐备注
						projectId:this.projectId,
						location: "",
						identitytype:2 //顾问
					}).then(d => {
						if (d.code === 200) {
							tki.ui.showToast("提交成功")
						}else if(d.code === 402) {
							tki.ui.showToast(d.message)
						}
					}).catch(e => {
						tki.ui.showToast(e.message)
						console.log(e.message)
					})
				}
			}
		}
	}
</script>

<style lang="less">
@import "../recommend/recommend.less";
.recommend-warp {
	margin-top: 80rpx !important;
}
</style>
