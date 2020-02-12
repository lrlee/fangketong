import * as tki from "../../components/TikiUI/common/js/index.js";
/**
 * getList 获取列表数据的方法
 * list mixin里data的键值
 */
export const getList = {
    data() {
        return {
            list: {
                init: 0, // 0 onShow 时就调用方法 1 onLoad时 2 不自动调用
                url: '',
                data: [],
                keyword: '',
                page: 0,
                pageNum: 20,
                text: "加载中",
                isGet: false, // 是否获取过数据
                isloading: false, // 是否正在获取数据
                isNomore: false, // 是否还有更多数据
            },
        };
    },
    methods: {
        // 获取列表
        getList(type) {
            let that = this;
            // 如果数据正在获取中就返回
            if (that.list.isloading) {
                return false;
            }
            if (type == "down") {
                // that.list.data = []
                that.list.text = '加载中'
                that.list.page = 0
                that.list.isNomore = false
            }
            if (that.list.isNomore) {
                return false;
            }
            that.list.isloading = true
            return tki.req.post(that.list.url, {
                "currentPage": that.list.page + 1,
                "perPage": that.list.pageNum,
                "sort": "",
                "order": "",
                "keyword": that.list.keyword
            }).then(d => {
                that.list.isloading = false;
                if (d.code == 200) {
                    uni.stopPullDownRefresh()
                    that.list.isGet = true;
                    let list = d.data.list;
                    if ((list.length + that.list.data.length) <= 0 || (type == "down" && list.length == 0)) {
                        that.list.text = '无数据'
                        that.list.data = []
                        that.list.isNomore = true;
                    } else {
                        if (type == "down") {
                            that.list.data = list
                            uni.pageScrollTo({ scrollTop: 0 });
                        } else {
                            that.list.data.push(...list)
                        }
                        // if (d.body.lastPage) {
                        if (list.length >= 0 && list.length < that.list.pageNum) {
                            that.list.text = '无更多数据'
                            that.list.isNomore = true;
                        }
                        that.list.page = that.list.page + 1;
                    }
                } else {
                    that.list.text = "数据加载失败";
                }
            }).catch(e => {
                that.list.isloading = false;
                that.list.text = "数据加载失败";
            });
        },
    },
    onReachBottom() {
        this.getList("up")
    },
    onPullDownRefresh() {
        this.getList("down")
    },
    async onShow() {
        if (this.list.init == 0) {
            this.getList("down")
        }
    },
    async onLoad() {
        if (this.list.init == 1) {
            this.getList("down")
        }
    }
}
/**
 * getListTabs 获取列表数据TAB的方法
 * list mixin里data的键值
 */
export const getListTabs = {
    data() {
        return {
            list: {
                init: 0, // 0 onShow 时就调用方法 1 onLoad时 2 不自动调用
                index: 0,
                url: [],
                data: [],
                page: 0,
                pageNum: 20,
                text: "加载中",
                isGet: false, // 是否获取过数据
                isloading: false, // 是否正在获取数据
                isNomore: false, // 是否还有更多数据
            },
        };
    },
    methods: {
        // 切换tab
        tabIndex(e) {
            this.list.index = e.index
            this.getList("down", e.index)
        },
        // 获取列表
        getList(type, index = 0) {
            let that = this, url = '';
            // 如果数据正在获取中就返回
            if (that.list.isloading) {
                return false;
            }
            if (type == "down") {
                // that.list.data = []
                that.list.text = '加载中'
                that.list.page = 0
                that.list.isNomore = false
            }
            if (that.list.isNomore) {
                return false;
            }
            that.list.isloading = true
            url = that.list.url[index]
            return tki.req.post(url, {
                "currentPage": that.list.page + 1,
                "perPage": that.list.pageNum,
                "sort": "",
                "order": ""
            }).then(d => {
                that.list.isloading = false;
                if (d.success) {
                    uni.stopPullDownRefresh()
                    that.list.isGet = true;
                    let list = d.items;
                    // if (!Array.isArray(that.list.data[index])) {
                    //     let dataJp = {[index]:[]};
                    //     that.list.data = tki.com.deepCopy(Object.assign(that.list.data,dataJp),dataJp)
                    // }
                    if ((list.length + that.list.data[index].length) <= 0 || (type == "down" && list.length == 0)) {
                        that.list.text = '无数据'
                        that.list.data.splice(index, 1, [])
                        that.list.isNomore = true;
                    } else {
                        if (type == "down") {
                            // that.list.data[index] = list
                            // vue 不能观测如下方式设置 value：this.value[0] = 0 可通过splice 或 $set  参考下方  https://cn.vuejs.org/v2/guide/list.html#注意事项
                            that.list.data.splice(index, 1, list)
                            // that.$set(that.list.data,index,list)
                            uni.pageScrollTo({ scrollTop: 0 });
                        } else {
                            that.list.data[index].push(...list)
                        }
                        // if (d.body.lastPage) {
                        if (list.length >= 0 && list.length < that.list.pageNum) {
                            that.list.text = '无更多数据'
                            that.list.isNomore = true;
                        }
                        that.list.page = that.list.page + 1;
                    }
                } else {
                    that.list.text = "数据加载失败";
                }
            }).catch(e => {
                console.log(e)
                that.list.isloading = false;
                that.list.text = "数据加载失败";
            });
        },
    },
    beforeMount: function () {
        this.list.data = new Array(this.list.url.length).fill([])
    },
    onReachBottom: function () {
        this.getList("up", this.list.index)
    },
    onPullDownRefresh: function () {
        this.getList("down", this.list.index)
    },
    async onShow() {
        if (this.list.init == 0) {
            this.getList("down", this.list.index)
        }
    },
    async onLoad() {
        if (this.list.init == 1) {
            this.getList("down", this.list.index)
        }
    }
}