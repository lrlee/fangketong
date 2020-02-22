import Vue from 'vue'
import Vuex from 'vuex'
import * as tki from '../components/TikiUI/common/js/index.js';
Vue.use(Vuex);
let msgList = uni.getStorageSync("msgList") || {};
console.log(msgList)
const store = new Vuex.Store({
    state: {
        currentOptenChat: null,
        msgList: msgList,
        user: {
            role_type: 1, //1: 客户, 2: 顾问
            uid: 122,
            avatar: null
        }
    },
    mutations: {
        saveCurrentUser(state, user){
            if(user){
                state.user = {
                    ...state.user,
                    ...user
                };
            }else{
                state.user = {
                    role_type: null, //1: 客户, 2: 顾问
                    uid: null,
                    avatar: null
                };
            }
        },
        // 当前聊天用户
        changeCurrentOpenChat(state, currentId){
            if(currentId){
                state.currentOptenChat = currentId;
            }else{
                state.currentOptenChat = null;
            }
        },
        // 将未读标记为已读
        hanglderStatus(state, { targetId }){
            if(!targetId) return false;
            let obj = {};
            obj[targetId] = {
                read: [], unread: [], history: [],
                ...state.msgList[targetId]
            }
            // obj[targetId] = state.msgList[targetId] || { read: [], unread: [], history: [] };
            obj[targetId] = {
                ...obj[targetId], 
                read: [... obj[targetId].read, ... obj[targetId].unread], 
                unread: []
            };
            state.msgList = {
                ...state.msgList, ...obj
            }
        },
        // 提交历史记录后清空已读列表
        submitHistory(state, { targetId }){
            if(!targetId) return false;
            let obj = {};
            obj[targetId] = {
                read: [], unread: [], history: [],
                ...state.msgList[targetId]
            }
            // obj[targetId] = state.msgList[targetId] || { read: [], unread: [], history: [] };
            obj[targetId] = {
                ...obj[targetId], 
                history: state.msgList[targetId].read.length>0 ? [ state.msgList[targetId].read[state.msgList[targetId].read.length-1] ] : state.msgList[targetId].history,
                read: []
            };
            state.msgList = {
                ...state.msgList, ...obj
            }
        },
        saveSendNewMessage(state, msg){
            let obj = {};
            let targetId = state.user.role_type == 1 ? msg.adviserid : msg.uid;
            if(!targetId) return false;
            obj[targetId] = {
                read: [], unread: [], history: [],
                ...state.msgList[targetId]
            }
            // obj[targetId] = state.msgList[targetId] || { read: [], unread: [], history: [] };
            obj[targetId] = {
                ...obj[targetId],
                read: [...obj[targetId].read, msg]
            };
            state.msgList = {
                ...state.msgList, ...obj
            }
        },
        // 保存一条历史记录用于列表显示
        saveHistory(state, { targetId, history }){
            if(!targetId) return false;
            let obj = {};
            obj[targetId] = {
                read: [], unread: [], history: [],
                ...state.msgList[targetId]
            }
            // obj[targetId] = state.msgList[targetId] || { read: [], unread: [], history: [] };
            obj[targetId] = {
                ...obj[targetId], 
                history
            };
            state.msgList = {
                ...state.msgList, ...obj
            }
        },
        // 接收新消息
        newMessage(state, msg){
            let obj = {};
            let targetId = state.user.role_type == 1 ? msg.adviserid : msg.uid;
            if(!targetId) return false;
            obj[targetId] = {
                read: [], unread: [], history: [],
                ...state.msgList[targetId]
            }
            // obj[targetId] = state.msgList[targetId] || { read: [], unread: [], history: [] };
            if(targetId == state.currentOptenChat){
                obj[targetId] = {
                    ...obj[targetId],
                    read: [...obj[targetId].read, msg]
                };
            }else{
                obj[targetId] = {
                    ...obj[targetId],
                    unread: [...obj[targetId].unread, msg]
                };
            }
            state.msgList = {
                ...state.msgList, ...obj
            }
        },
        // 获取聊天对象的用户信息
        getOppositeUser(state, { targetId, oppositeUser }){
            if(!targetId) return false;
            let obj = {};
            obj[targetId] = {
                read: [], unread: [], history: [],
                ...state.msgList[targetId]
            }
            // obj[targetId] = state.msgList[targetId] || { read: [], unread: [], history: [] };
            obj[targetId] = {
                ...obj[targetId],
                oppositeUser
            }
            state.msgList = {
                ...state.msgList, ...obj
            }
        }
    },
    actions: {
        getOppositeUser(ctx, msg){
            tki.req.post('consult/index',{
                adviserid: msg.adviserid,
                uid: msg.uid,
                projectid: msg.projectid,
                role_type: ctx.state.user.role_type
            }).then(d => {
            	if (d.code === 200) {
                    let targetId;
                    if(ctx.state.user.role_type == 1){
                        targetId = msg.adviserid;
                    }else{
                        targetId = msg.uid;
                    }
                    ctx.commit("saveHistory", { targetId, history: d.data.list.length>0 ? [ d.data.list[d.data.list.length-1] ]:[] });
                    ctx.commit("getOppositeUser", {
                        targetId: targetId, 
                        oppositeUser: ctx.state.user.role_type == 1 ? d.data.adviser : d.data.client
                    })
                    ctx.commit("newMessage", msg);
            	}
            })
}
    }
})

export default store