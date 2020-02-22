<template>
	<view class="container">
		<scroll-view class="scroll-list" scroll-y="true">
		    <view @click="toChat(v)" class="list_item" v-for="(v,i) in handlelist" :key="i">
                <view class="head-box">
                    <image :src="v.oppositeUser.diyavatar" mode="widthFix"></image>
                </view>
                <view class="name-box">
                    <view class="item-top">
                        <text class="realname">{{ v.oppositeUser.realname || v.oppositeUser.nickname }}</text>
                        <text class="time">{{ time(v) }}</text>
                    </view>
                    <view class="item-bottom">
                        <text class="last-msg">{{ lastMsg(v) }}</text>
                        <text class="num" v-if="v.unread.length>0">{{ v.unread.length>99 ? "99+" : v.unread.length }}</text>
                    </view>
                </view>
            </view>
            <view v-if="!handlelist || handlelist.length==0" class="not">
                暂无消息
            </view>
		</scroll-view>
	</view>
</template>

<script>
	import * as tki from '../../components/TikiUI/common/js/index.js';
	export default {
		data() {
			return {
				
			};
		},
        onShow(){
            console.log(this.$store.state.msgList)
        },
        methods:{
            time(v){
                const l = [...v.history,...v.read,...v.unread];
                if(l.length>0){
                    const t = l[l.length-1].create_time;
                    const s = new Date(parseInt(t * 1000)).format("M月d日 H:m");
                    return s;
                }else{
                    return "";
                }
            },
            lastMsg(v){
                const l = [...v.history,...v.read,...v.unread];
                if(l.length>0){
                    const s = l[l.length-1].content;
                    return s;
                }else{
                    return "";
                }
            },
            toChat(v){
                tki.nav.navTo('/pages/chat/chat?targetId='+ v.oppositeUser.id + '&projectid=' + v.oppositeUser.projectid + '&realname='+ v.oppositeUser.realname)
            }
        },
        computed:{
            handlelist(){
                const all = this.$store.state.msgList;
                const arr = [];
                for(let key in all){
                    arr.push(all[key])
                }
                arr.sort((a,b) => {
                    const aList = [...a.history,...a.read,...a.unread];
                    const bList = [...b.history,...b.read,...b.unread];
                    console.log(aList.length, bList.length, a);
                    if(aList.length>0 && bList.length>0){
                        return bList[bList.length-1].create_time - aList[aList.length-1].create_time;
                    }else{
                        return 1
                    }
                })
                console.log("arr:" ,arr)
                return arr;
            }
        }
	}
</script>

<style lang="less" src="./msgList.less">

</style>
