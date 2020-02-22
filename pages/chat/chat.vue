<template>
	<view class="container" :style="{height: 'calc(100% - '+ keyboardHeight +'px)'}">
		<scroll-view class="scroll-list" :scroll-top="scrollTop" :scroll-with-animation="scrollAnimation" scroll-y="true" >
		    <view class="list-item" :class="itemClass(v) ? 'list-item-right':'list-item-left'" v-for="(v, i) in list" :key="i">
                <view class="headImg">
                    <image v-if="!itemClass(v)" :src="diyavatar" mode="aspectFill"></image>
                    <image v-if="itemClass(v)" :src="user.avatar" mode=""></image>
                    <!-- <open-data v-if="itemClass(v)" type="userAvatarUrl"></open-data> -->
                </view>
                <view class="box">
                    <view class="arrows"></view>
                    <view class="content">{{ v.content }}</view>
                </view>
            </view>
		</scroll-view>
        <view class="send-bar">
            <input class="msg-input" type="text" v-model="value" />
            <button @click="sendMsg(1)" class="send-btn" type="primary">发送</button>
        </view>
	</view>
</template>

<script>
    import * as tki from '../../components/TikiUI/common/js/index.js'
    import { mapState, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				targetId: '',
                projectid: '',
                adviser: {},
                history: [],
                keyboardHeight: 0,
                value: '',
                scrollAnimation: false,
                scrollTop: 0
			};
		},
        onLoad(e){
            this.targetId = e.targetId || '';
            this.projectid = e.projectid;
            uni.onKeyboardHeightChange(res => {
                this.keyboardHeight = res.height
            })
            this.hanglderMsgStatus(e);
        },
        onShow(){
            this.getHistory();
        },
        computed: {
            // ...mapState(['allMsgList']),
            list(){
                return [
                    ...this.history, 
                    ...this.$store.state.msgList[this.targetId] ? this.$store.state.msgList[this.targetId].read : [],
                    ...this.$store.state.msgList[this.targetId] ? this.$store.state.msgList[this.targetId].unread : []
                   ]
            },
            user(){
                return this.$store.state.user;
            },
            diyavatar(){
                return this.$store.state.msgList[this.targetId]&&this.$store.state.msgList[this.targetId].oppositeUser ? this.$store.state.msgList[this.targetId].oppositeUser.diyavatar : ''
            }
        },
        onUnload(){
            this.$store.commit('changeCurrentOpenChat');
            uni.$emit('submitHistory', {targetId: this.targetId});
        },
        methods:{
            // ...mapMutations(['addMsg', 'addList']),
            // 获取历史记录
            scroll(e){
                this.scrollHeight = e.detail.scrollHeight;
            },
            getHistory(){
                tki.req.post('consult/index',{
                    adviserid: this.user.role_type == 1 ? this.targetId : this.$store.state.user.uid,
                    uid: this.user.role_type == 1 ? this.$store.state.user.uid : this.targetId,
                    projectid: this.projectid,
                    role_type: this.user.role_type
                }).then(d => {
                	if (d.code === 200) {
                		this.history = d.data.list&&d.data.list.sort((a,b) => a.create_time - b.create_time) || [];
                        this.toBottom();
                        uni.setNavigationBarTitle({
                            title: this.user.role_type == 1 ? (d.data.adviser.realname || d.data.adviser.nickname) : (d.data.user.realname || d.data.user.nickname) 
                        })
                        if(!this.targetId){
                            if(this.user.role_type == 1) this.targetId = d.data.adviser.id;
                            if(this.user.role_type == 2) this.targetId = d.data.user.id;
                        }
                        this.$store.commit("saveHistory", { targetId: this.targetId, history: d.data.list.length>0 ? [ d.data.list[d.data.list.length-1] ]:[] });
                        this.$store.commit("getOppositeUser", {
                            targetId: this.targetId, 
                            oppositeUser: this.user.role_type == 1 ? d.data.adviser : d.data.user
                        })
                	}
                })
            },
            // 标记当前所在聊天人的页面，将未读消息标记为已读
            hanglderMsgStatus(e){
                this.$store.commit("changeCurrentOpenChat", e.targetId);
                this.$store.commit("hanglderStatus", {
                    targetId: e.targetId
                })
            },
            // 发送新消息
            sendMsg(type){
                if(type==1 && !this.value) return false;
                let data = {
                    projectid: this.projectid,
                    to_id: this.targetId,
                    role_type: this.user.role_type,
                    msg_type: type,
                    content: this.value,
                    create_time: parseInt(new Date().getTime()/1000)
                }
                tki.req.post("consult/sendMessage",data).then(d => {
                    if(d.code === 200){
                        data.adviserid = this.user.role_type == 1 ? this.targetId : this.$store.state.user.uid;
                        data.uid = this.user.role_type == 1 ? this.$store.state.user.uid : this.targetId;
                        delete data.to_id;
                        this.$store.commit("saveSendNewMessage", data);
                        this.value = '';
                        this.toBottom();
                    }
                })
            },
            toBottom(){
                // this.scrollTop = this.scrollTop;
                let scroll = uni.createSelectorQuery().select(".scroll-list");
                scroll.fields({
                    size: true,
                    scrollOffset: true
                }, data => {
                    this.$nextTick(function() {
                        this.scrollTop = data.scrollHeight;
                        if(!this.scrollAnimation) this.scrollAnimation = true;
                    });
                }).exec();
                
            },
            itemClass(v){
                // return this.user.role_type == v.role_type
                if(v.role_type == 1 ){
                    return this.user.uid == v.uid
                }else{
                    return this.user.uid == v.adviserid
                }
            },
            isAdviser(){
                return 
            }
        }
	}
</script>

<style lang="less" src="./chat.less">

</style>
