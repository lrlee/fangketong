<template>
	<view class="container">
		<view class="headerImg"><image src="../../static/icons/jianjie_h1.png" mode="widthFix"></image></view>
        <view class="tab">
            <view @click="active=0" :class="active === 0 ? 'tab-item active' : 'tab-item'">
                <image :src="`../../static/icons/jianjie${active===0 ? '_a':''}.png`" mode="widthFix"></image>
                <text>简介</text>
            </view>
            <view @click="active=1" :class="active === 1 ? 'tab-item active' : 'tab-item'">
                <image :src="`../../static/icons/licheng${active===1 ? '_a':''}.png`" mode="widthFix"></image>
                <text>历程</text>
            </view>
            <view @click="active=2" :class="active === 2 ? 'tab-item active' : 'tab-item'">
                <image :src="`../../static/icons/rongyu${active===2 ? '_a':''}.png`" mode="widthFix"></image>
                <text>荣誉</text>
            </view>
            <view @click="active=3" :class="active === 3 ? 'tab-item active' : 'tab-item'">
                <image :src="`../../static/icons/bujv${active===3 ? '_a':''}.png`" mode="widthFix"></image>
                <text>布局</text>
            </view>
        </view>
        <view class="content tab0" v-show="active===0">
            <view class="title">
                <text>简介</text>
            </view>
            <view class="introduction p">
                <view>中铁二局房地产集团有限公司是中国中铁二局的全资控股子公司，全面负责中铁二局一级土地整理和房地产开发业务。中铁二局房地产集团有限公司的控股股东中铁二局工程有限公司是世界企业500强、世界品牌500强中国中铁股份有限公司的成员企业。中铁二局房地产集团有限公司开发业务已布局四川、福建、海南、贵州、北京、浙江等全国10余个省（市、自治区）。</view>
                <view>中国中铁二局先后荣获鲁班奖24项、詹天佑土木工程奖15项，创中国企业新纪录19项。荣膺“全国抗震救灾英雄集体”、“全国五一劳动奖状”、“全国优秀施工企业”等称号。中国中铁二局进入“上市公司投资者管理关系百强”企业,位居“中国国有上市企业社会责任榜”第52位；同时被中国企业联合会评为全国20家“最具影响力企业”之一。</view>
            </view>
        </view>
        <view class="content tab1" v-show="active===1">
            <view class="title">
                <text>历程</text>
            </view>
            <view class="phases">
                <view class="phases-title"><text>第一阶段：</text></view>
                <view class="phases-con p">
                    <view>1988-2004年，初步涉足房地产开发</view>
                    <view class="phases-first">1988年7月，中铁二局集团成立房屋综合开发公司，在成都和贵阳进行房地产开发，开始进军房地产开发领域。</view>
                </view>
            </view>
            <view class="phases">
                <view class="phases-title"><text>第二阶段：</text></view>
                <view class="phases-con p">
                    <view>2005-2007年，实施城市运营开发战略</view>
                    <view>2005年，国资委批准房地产业为中国中铁的主营业务后，中铁二局集团提出了城市运营发展战略，先后在成都、达州、山东等地进行城市运营建设，同时进一步完善了城市运营商的发展构想，以房地产为主的城市化产业得到进一步发展。</view>
                </view>
            </view>
            <view class="phases">
                <view class="phases-title"><text>第三阶段：</text></view>
                <view class="phases-con p">
                    <view>2008-2011年，推进资源整合及集中管理</view>
                    <view>2008年3月，中铁二局集团通过增资将原房屋综合开发公司更名为中铁瑞城置业有限公司。并加快资源整合步伐，推进全面集中统一管理，企业逐步向扁平化、集约化方向发展。</view>
                </view>
            </view>
            <view class="phases">
                <view class="phases-title"><text>第四阶段：</text></view>
                <view class="phases-con p">
                    <view>2012年至今，实施战略调整，房地产开发业务快速发展</view>
                    <view>2012年5月，中铁二局集团将中铁瑞城置业有限公司更名为中铁二局房地产集团有限公司，将“城市运营商”的战略定位调整为“品牌房地产开发商”，确立了“以成都主城区项目开发为主，有选择地向外地扩张”的战略布局。</view>
                </view>
            </view>
        </view>
        <view class="content tab2" v-show="active===2">
            <view class="title">
                <text>荣誉</text>
            </view>
            <view class="honor">
                <view class="line"></view>
                <view class="honor-item">
                    <view class="honor-title">
                        <text></text>
                        <text>2014</text>
                    </view>
                    <view class="honor-con p">
                        <view>成为四川省商业地产联盟副会长单位</view>
                        <view>荣获成都市房地产开发企业协会“房地产开发优秀质量管理企业”奖</view>
                        <view>荣获四川日报报业集团、成都市城乡房产管理局“第十二届金芙蓉杯“楼市推动力”特别金奖”</view>
                    </view>
                </view>
                <view class="honor-item">
                    <view class="honor-title">
                        <text></text>
                        <text>2015</text>
                    </view>
                    <view class="honor-con p">
                        <view>荣获四川日报报业集团、成都市城乡房产管理局“第十三届金芙蓉杯楼市推动力企业特别金奖”</view>
                    </view>
                </view>
                <view class="honor-item">
                    <view class="honor-title">
                        <text></text>
                        <text>2017</text>
                    </view>
                    <view class="honor-con p">
                        <view>荣获成都广播电视台“成都市2017-2018年度城市贡献力房产企业奖金奖”</view>
                        <view>荣获成都广播电视台“成都市2017-2018年度城市贡献力房产企业奖”</view>
                    </view>
                </view>
                <view class="honor-item">
                    <view class="honor-title">
                        <text></text>
                        <text>2019</text>
                    </view>
                    <view class="honor-con p">
                        <view>荣获2018年第十四届房地产博鳌论坛颁发的“2018-2019中国地产100年度最具品牌价值百强企业”奖</view>
                        <view>荣获2018年成都房地产“广厦杯”颁发的“2018成都房地产突出贡献企业”奖</view>
                        <view>“2019成都房地产诚实守信企业”</view>
                        <view>“2019成都房地产党建工作先进单位”奖项</view>                           
                        <view>中铁城·温江荣获“2019四川房地产区域典型项目”</view>
                        <view>青城365南院、西郡府邸均荣获“2020成都房地产最值得期待项目”“2019年度党建引领发展先进企业”、“2019年度区域发展标杆企业”</view>     
                    </view>
                </view>
            </view>
        </view>
        <view class="content tab3" v-show="active===3">
            <view class="title">
                <text>布局</text>
            </view>
            <view class="layout">
                <image src="../../static/icons/map.png" mode="widthFix"></image>
            </view>
        </view>
        <view class="footer">
            <image src="../../static/icons/jingli_logo.png" mode="widthFix"></image>
        </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: 0
			};
		}
	}
</script>

<style lang="less" src="./introduction.less">

</style>
