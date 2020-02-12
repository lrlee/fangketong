<template>
	<view class="warp">
		<!-- <view class="top-pic">
			<image src="/static/img/commissionRule/rule_pic.png" mode="widthFix"></image>
		</view>
		<view class="rule-con">
			<text class="rule-con-title">
				佣金规则
			</text>
			<text class="rule-con-txt">
				社会由种种规则维持着次序，不管这种规则是人为设定的还是客观存在的，只要是规则，便具有制约性。因为规则都具有绝对的或相对的约束力社会由种种规则维持着次序，不管这种规则是人为设定的还是客观存在的，只要是规则，便具有制约性。因为规则都具有绝对的或相对的约束力
			</text>
		</view> -->
		<view v-if='!rule' style="background-color: #f7f7f7;text-align: center;margin-top: 30rpx;">规则制定中...</view>
		<rich-text :nodes="rule"></rich-text>
	</view>
</template>

<script>
	import * as tki from "../../components/TikiUI/common/js/index.js";
	export default {
		data() {
			return {
				rule: ""
			};
		},
		onLoad() {
			return tki.req.post('index/commission_rule').then(d => {
				if (d.code === 200) {
					// 处理数据
					this.rule = d.data.info
				}
			}).catch(e => {
				tki.ui.showToast(e.message)
				console.log(e)
			})
		}
	}
</script>

<style lang="less">
@import "./commissionRule.less";
</style>
