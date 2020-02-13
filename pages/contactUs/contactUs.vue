<template>
	<view class="container">
		<view class="qrcode-box">
		    <view>
                <image @click="previewImage(gwImg)" :src="gwImg" mode="widthFix"></image>
                <view class="text">官网</view>
            </view>
		    <view>
                <image @click="previewImage(gzhImg)" :src="gzhImg" mode="widthFix"></image>
                <view class="text">微信公众号</view>
            </view>
		</view>
        <view class="title-1">中铁二局地产集团有限公司</view>
        <view class="p-box">
            <view class="title"><text>关于我们</text></view>
            <view class="p">
                <view>中铁二局地产 发展历程</view>
                <view>第一阶段：1988-2004年，初步涉足房地产开发</view>
                <view>第二阶段：2005-2007年，实施城市运营开发战略</view>
                <view>第三阶段：2008-2011年，推进资源整合及集中管理</view>
                <view>第四阶段：2012年至今，实施战略调整，房地产开发业务快速发展</view>
            </view>
        </view>
        <view class="p-box">
            <view class="title"><text>所获奖项</text></view>
            <view class="p">
                <view>2014</view>
                <view>成为四川省商业地产联盟副会长单位</view>
                <view>2014</view>
                <view>荣获成都市房地产开发企业协会“房地产开发优秀质量管理企业”奖</view>
                <view>2014</view>
                <view>荣获四川日报报业集团、成都市城乡房产管理局“第十二届金芙蓉杯“楼市推动力”特别金奖”</view>
                <view>2015</view>
                <view>荣获四川日报报业集团、成都市城乡房产管理局“第十三届金芙蓉杯楼市推动力企业特别金奖”</view>
                <view>2017</view>
                <view>荣获成都广播电视台“成都市2017-2018年度城市贡献力房产企业奖金奖”</view>
                <view>2017</view>
                <view>荣获成都广播电视台“成都市2017-2018年度城市贡献力房产企业奖”</view>
                <view>2019</view>
                <view>荣获2018年第十四届房地产博鳌论坛颁发的“2018-2019中国地产100年度最具品牌价值百强企业”奖</view>
                <view>2019</view>
                <view>荣获2018年成都房地产“广厦杯”颁发的“2018成都房地产突出贡献企业”奖</view>
            </view>
        </view>
	</view>
</template>

<script>
    import gwImg from '@/static/icons/gw.png';
    import gzhImg from '@/static/icons/gzh.png';
	export default {
		data() {
			return {
				gwImg,
                gzhImg
			}
		},
		methods: {
            previewImage(url){
                uni.previewImage({
                    urls: [url]
                })
            }
		}
	}
</script>

<style lang="less" src="./contactUs.less">

</style>
