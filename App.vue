<script>
    import socket from './socket/index.js';
    import * as tki from './components/TikiUI/common/js/index.js'
	export default {
		onLaunch: function() {
            socket(this.$store);
            uni.$on('submitHistory', (data) => {
                // 提交历史记录
                // const list = tki.com.json2str(this.$store.state.msgList[data.targetId].read);
                // debugger
                if(this.$store.state.msgList[data.targetId].read.length>0){
                    const fields = ["projectid","uid","adviserid","role_type","msg_type","content","create_time"];
                    const read = this.$store.state.msgList[data.targetId].read.map((v,i) => {
                        const obj = {};
                        fields.map((vv,ii) => {
                            obj[vv] = v[vv] || "";
                        })
                        return obj;
                    })
                    tki.req.post('consult/saveMessage',{
                       data: JSON.stringify(read)
                    }).then(d => {
                        if (d.code === 200) {
                            this.$store.commit("submitHistory", { targetId: data.targetId })
                        }
                    })
                }
            })
		},
        computed: {
            changeMsgList() {
              return this.$store.state.msgList;
            }
          },
        //监听执行
        watch: {
            changeMsgList(val) {
                uni.setStorage({
                    key: "msgList",
                    data: val
                })
            }
        },
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("/common/common.css");
	.border-b {
		border-bottom: 1px solid #ccc;;
	}
	button {
		padding: 0;
		margin: 0;
		margin: 0 auto;
		background: #b39766;
	}
	.swiper {
		height: 1100rpx;
		overflow-y: auto;
	}
</style>
