import * as tki from '../components/TikiUI/common/js/index.js';
function Socket(store){
    const socket = uni.connectSocket({
        // url: 'ws://47.92.172.168:47272',
        url: 'wss://zhongtie.h-passer.com:47272',
    })
    uni.onSocketOpen(function (res) {
        console.log('WebSocket连接已打开！');
    });
    uni.onSocketError(function (res) {
        Socket(store);
        console.log('WebSocket连接打开失败，请检查！');
    });
    uni.onSocketClose(function (res) {
        console.log('WebSocket连接已关闭');
    })
    uni.onSocketMessage(function (d) {
        const data = JSON.parse(d.data);
        console.log(data.type)
        switch(data.type){
            case "ping":
                break;
            case "init":
                tki.req.post('Consult/registerUid',{
                    client_id: data.client_id
                }).then(res => {
                	if (res.code == 200) {
                		store.commit("saveCurrentUser", res.data);
                	}
                })
                break;
            case "msg":
                let targetId;
                if(store.state.user.role_type == 1){
                    targetId = data.message.adviserid;
                }else{
                    targetId = data.message.uid;
                }
                if(!store.state.msgList[targetId]){
                    store.dispatch("getOppositeUser", data.message)
                }else{
                    store.commit("newMessage", data.message);
                }
                break;
            default:
                break;
        }
    })
}

export default Socket;