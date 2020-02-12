// 公共函数
export default {
    /**
     * 判定是否为空
     * @param {*} v 要判断的对象
     */
    empty(v) {
        let tp = typeof v,
            rt = false;
        if (tp == "number" && String(v) == "") {
            rt = true
        } else if (tp == "undefined") {
            rt = true
        } else if (tp == "object") {
            if (JSON.stringify(v) == "{}" || JSON.stringify(v) == "[]" || v == null) rt = true
        } else if (tp == "string") {
            if (v == "" || v == "undefined" || v == "null" || v == "{}" || v == "[]") rt = true
        } else if (tp == "function") {
            rt = false
        }
        return rt
    },
    /**
     * Json 对象扩充内容
     * @param {JSON} jp 要扩充的JSON对象 
     * @param {JSON} ext 要扩充的内容
     */
    jsonPush(jp, ext) {
        let tp = this.deepCopy(jp)
        if (!this.empty(ext)) {
            // for (const key in ext) {
            //     if (ext.hasOwnProperty(key)) {
            //         tp[key] = ext[key]
            //     }
            // }
            // return tp
            return Object.assign(tp, ext)
        }
    },
    /**
     * json 对象转为 ?xx=xx&xx=xx&x=x
     * @param {JSON} jp 要转换的JSON对象
     * @param {Boolean} q 是否在最前面添加'?' 默认不添加
     * @return ?xx=xx&xx=xx&x=x
     */
    json2str(jp, q) {
        let pr = ''
        if (!this.empty(jp)) {
            for (const key in jp) {
                if (jp.hasOwnProperty(key)) {
                    pr += `${key}=${jp[key]}&`
                }
            }
        }
        if (this.empty(q)) {
            // 是否带问号，默认带问号
            return '?' + pr.substring(0, pr.length - 1)
        } else {
            return pr.substring(0, pr.length - 1)
        }
    },
    /**
     * Object 对象克隆
     * @param {*} obj 需要克隆的对象 Object/Array
     */
    objectClone(obj) {
        return JSON.parse(JSON.stringify(obj))
    },
    /**
     * Object 深度拷贝
     * @param {Object} obj 需要拷贝的对象 Object/Array
     */
    deepCopy(obj) {
        let result = Array.isArray(obj) ? [] : {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'object') {
                    result[key] = this.deepCopy(obj[key]);
                } else {
                    result[key] = obj[key];
                }
            }
        }
        return result;
    },
    /**
     * 数字转货币样式
     * @param {Number} number 金额
     * @param {Number} places 保留小数
     * @param {String} symbol 货币符号
     * @param {String} thousand 分割符号
     * @param {String} decimal 小数点分割符号
     */
    formatMoney(number, places, symbol, thousand, decimal) {
        number = number || 0;
        places = !isNaN((places = Math.abs(places))) ? places : 2;
        symbol = symbol !== undefined ? symbol : "";
        thousand = thousand || ",";
        decimal = decimal || ".";
        var negative = number < 0 ? "-" : "",
            i =
                parseInt(
                    (number = Math.abs(+number || 0).toFixed(places)),
                    10
                ) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
        return (
            symbol +
            negative +
            (j ? i.substr(0, j) + thousand : "") +
            i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) +
            (places ?
                decimal +
                Math.abs(number - i)
                    .toFixed(places)
                    .slice(2) :
                "")
        );
    },
    /**
     * 去除数字后面的0,保留小数位
     * @param {Number} number 数字
     * @param {Number} places 保留位数
     */
    formatPlaces(number, places) {
        var pT = "1";
        for (var index = 0; index < places; index++) {
            pT += "0";
        }
        return Math.floor(number * Number(pT)) / Number(pT);
    },
    /**
     * 日期排序 
     * @param {JSON} obj 要排序的对象
     * @param {Key} key 要排序的键值
     * @param {String} type 排序方式 desc-降序 asc-升序
     */
    dataSort(obj, key, type = 'asc') {
        // 先把日期转换为时间戳
        let jp = this.deepCopy(obj)
        jp.forEach((v, i) => {
            jp[i].dataSort = new Date(jp[i][key].replace(/-/g, '/')).getTime()
        });
        if (type == 'desc') {
            jp.sort((a, b) => b.dataSort > a.dataSort ? 1 : -1)
        } else {
            jp.sort((a, b) => b.dataSort < a.dataSort ? 1 : -1)
        }
        return jp
    },
    /**
     * 获取地址栏参数 只有H5有效
     * @param {String} name 
     */
    getUrlSearch(name) {
        // 未传参，返回空
        if (!name) return null;
        // 查询参数：先通过search取值，如果取不到就通过hash来取
        var after = window.location.search;
        after = after.substr(1) || window.location.hash.split('?')[1];
        // 地址栏URL没有查询参数，返回空
        if (!after) return null;
        // 如果查询参数中没有"name"，返回空
        if (after.indexOf(name) === -1) return null;
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        // 当地址栏参数存在中文时，需要解码，不然会乱码
        var r = decodeURI(after).match(reg);
        // 如果url中"name"没有值，返回空
        if (!r) return null;
        return r[2];
    },
    /**
     * unicode转中文
     * @param {String} str 要转换的unicode
     */
    unicode2Ch(str) {
        if (!str) {
            return;
        }
        // 控制循环跃迁
        let len = 1;
        let result = '';
        // 注意，这里循环变量的变化是i=i+len 了
        for (let i = 0; i < str.length; i = i + len) {
            len = 1;
            let temp = str.charAt(i);
            if (temp == '\\') {
                // 找到形如 \u 的字符序列
                if (str.charAt(i + 1) == 'u') {
                    // 提取从i+2开始(包括)的 四个字符
                    let unicode = str.substr((i + 2), 4);
                    // 以16进制为基数解析unicode字符串，得到一个10进制的数字
                    result += String.fromCharCode(parseInt(unicode, 16).toString(10));
                    // 提取这个unicode经过了5个字符， 去掉这5次循环
                    len = 6;
                }
                else {
                    result += temp;
                }
            }
            else {
                result += temp;
            }
        }
        return result;
    },
    /**
     * 中文转Unicode
     * @param {String} str 要转换的中文
     */
    ch2Unicdoe(str) {
        if (!str) {
            return;
        }
        let unicode = '';
        for (let i = 0; i < str.length; i++) {
            let temp = str.charAt(i);
            if (isChinese(temp)) {
                unicode += '\\u' + temp.charCodeAt(0).toString(16);
            }
            else {
                unicode += temp;
            }
        }
        return unicode;
        // 是否是中文
        function isChinese(s) {
            return /[\u4e00-\u9fa5]/.test(s);
        }
    }
}