<template>
    <scroll-view class="container" scroll-y>
        <view class="radio-box">
            <radio-group @change="radioChange">
                <label for="radio1"><radio color="#3394FF" class="radio" id="radio1" value="1" :checked="mode == 1"/>商业贷款</label>
                <label for="radio2"><radio color="#3394FF" class="radio" id="radio2" value="2" :checked="mode == 2"/>公积金贷款</label>
                <label for="radio3"><radio color="#3394FF" class="radio" id="radio3" value="3" :checked="mode == 3"/>组合贷款</label>
            </radio-group>
        </view>
        <view v-if="mode != 3" class="formulaMode-box">
            <view class="title1">计算方式：</view>
            <view class="mode-box">
                <radio-group @change="radioChange1">
                    <view>
                        <label for="radio4"><radio color="#3394FF" class="radio" id="radio4" value="1" :checked="formulaMode == 1"/>根据面积，单价计算</label>
                        <view v-if="formulaMode==1">
                            <view class="input-box">
                                单价：<input class="input" v-model="price" type="text" /> 元/平米
                            </view>
                            <view class="input-box">
                                面积：<input class="input" v-model="area" type="text" /> 平方米
                            </view>
                            <view class="input-box">
                                按揭成数：<picker class="picker" @change="bindPickerChange" :value="index" :range="array">
                                            <view class="uni-input">{{array[index] * 10}}成</view>
                                        </picker>
                            </view>
                        </view>
                    </view>
                    <view>
                        <label for="radio5"><radio color="#3394FF" class="radio" id="radio5" value="2" :checked="formulaMode == 2"/>根据贷款总额计算</label>
                        <view v-if="formulaMode==2" class="input-box">
                            贷款总额：<input class="input" v-model="totalSum" type="text" /> 万元
                        </view>
                    </view>
                </radio-group>
            </view>
        </view>
        <view v-if="mode==3" class="zuhe">
            <view class="title1">组合比例</view>
            <view class="input-box">
                商业性：<input class="input" v-model="zuheShang " type="text" /> 万元
            </view>
            <view class="input-box">
                公积金：<input class="input" v-model="zuheGong" type="text" /> 万元
            </view>
        </view>
        <view class="year">
            按揭年数：<picker class="picker" @change="bindPickerChange1" :value="yearIndex" :range="array1">
                        <view class="uni-input">{{array1[yearIndex]}}年({{ array1[yearIndex] * 12 }}期)</view>
                    </picker>
        </view>
        <view class="lilv">
            <view class="lilv-picker">
                <text>贷款利率：</text>
                <picker class="picker" @change="bindPickerChange2" :value="lilvIndex" :range="array2" range-key="name">
                    <view class="uni-input">{{array2[lilvIndex].name}}</view>
                </picker>
            </view>
            <view v-if="mode!=3">
                <input v-model="lilv" class="input" type="text" /> %
            </view>
            <view class="zuhe-lilv" v-if="mode==3">
                <text>商贷利率：</text><input v-model="sdlilv" class="input" type="text"  /> %
            </view>
            <view class="zuhe-lilv" v-if="mode==3">
                <text>公积金利率：</text><input v-model="gdlilv" class="input" type="text"  /> %
            </view>
        </view>
        <view class="type">
            <text>还款方式：</text>
            <radio-group @change="radioChange2">
                <label for="radio7"><radio color="#3394FF" class="radio" id="radio7" value="1" :checked="type == 1"/>等额本息</label>
                <label for="radio8"><radio color="#3394FF" class="radio" id="radio8" value="2" :checked="type == 2"/>等额本金</label>
            </radio-group>
        </view>
        <view class="btn-box">
            <button type="default" @click="submit">开始计算</button>
            <button type="default" @click="reset">重新填写</button>
        </view>
        <view class="result">
            <view class="title1"><text>查看结果</text></view>
            <view class="result-item">
                <text>房款总额：</text>
                <input type="text" class="input" disabled :value="houseTotalSum"/> 元
            </view>
            <view class="result-item">
                <text>贷款总额：</text>
                <input type="text" class="input" disabled :value="loansSum"/> 元
            </view>
            <view class="result-item">
                <text>还款总额：</text>
                <input type="text" class="input" disabled :value="repaymentSum"/> 元
            </view>
            <view class="result-item">
                <text>支付利息款：</text>
                <input type="text" class="input" disabled :value="InteresSum"/> 元
            </view>
            <view class="result-item">
                <text>首期付款：</text>
                <input type="text" class="input" disabled :value="firstPayment"/> 元
            </view>
            <view class="result-item">
                <text>贷款月数：</text>
                <input type="text" class="input" disabled :value="loadMonth"/> 月
            </view>
            <view class="result-item">
                <text>月均还款：</text>
                <input type="text" class="input" disabled :value="monthPayment"/> 元
            </view>
        </view>
    </scroll-view>
</template>

<script>
    import calcute from './calcute.js';
	export default {
		data() {
			return {
                    mode: 1,
                    formulaMode: 1,
                    totalSum: '',
                    zuheShang: '',
                    zuheGong: '',
                    price: '',
                    area: '',
                    index: 6,
                    array: [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
                    percentage: 0.8,
                    yearIndex: 19,
                    year: 20,
                    array1: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,25,30],
                    lilvIndex: 0,
                    lilv: 4.90,
                    sdlilv: 4.90,
                    gdlilv: 3.25,
                    type: 1,
                    array2: [{
                        name: '基准利率',
                        mini: 4.75,
                        multitude: 4.90,
                        gmini: 2.75,
                        gmultitude: 3.25
                    },{
                        name: '1.1倍利率',
                        mini: (4.75 * 1.1).toFixed(2),
                        multitude: (4.90 * 1.1).toFixed(2),
                        gmini: (2.75 * 1.1).toFixed(2),
                        gmultitude: (3.25 * 1.1).toFixed(2)
                        
                    },{
                        name: '1.15倍利率',
                        mini: (4.75 * 1.15).toFixed(2),
                        multitude: (4.90 * 1.15).toFixed(2),
                        gmini: (2.75 * 1.15).toFixed(2),
                        gmultitude: (3.25 * 1.15).toFixed(2)
                    },{
                        name: '1.2倍利率',
                        mini: (4.75 * 1.2).toFixed(2),
                        multitude: (4.90 * 1.2).toFixed(2),
                        gmini: (2.75 * 1.2).toFixed(2),
                        gmultitude: (3.25 * 1.2).toFixed(2)
                    },{
                        name: '1.3倍利率',
                        mini: (4.75 * 1.3).toFixed(2),
                        multitude: (4.90 * 1.3).toFixed(2),
                        gmini: (2.75 * 1.3).toFixed(2),
                        gmultitude: (3.25 * 1.3).toFixed(2)
                    },{
                        name: '9折利率',
                        mini: (4.75 * 0.9).toFixed(2),
                        multitude: (4.90 * 0.9).toFixed(2),
                        gmini: (2.75 * 0.9).toFixed(2),
                        gmultitude: (3.25 * 0.9).toFixed(2)
                    },{
                        name: '85折利率',
                        mini: (4.75 * 0.85).toFixed(2),
                        multitude: (4.90 * 0.85).toFixed(2),
                        gmini: (2.75 * 0.85).toFixed(2),
                        gmultitude: (3.25 * 0.85).toFixed(2)
                    },{
                        name: '8折利率',
                        mini: (4.75 * 0.8).toFixed(2),
                        multitude: (4.90 * 0.8).toFixed(2),
                        gmini: (2.75 * 0.8).toFixed(2),
                        gmultitude: (3.25 * 0.8).toFixed(2)
                    },{
                        name: '7折利率',
                        mini: (4.75 * 0.7).toFixed(2),
                        multitude: (4.90 * 0.7).toFixed(2),
                        gmini: (2.75 * 0.7).toFixed(2),
                        gmultitude: (3.25 * 0.7).toFixed(2)
                    }],
                    houseTotalSum: '',
                    loansSum: '',
                    repaymentSum: '',
                    InteresSum: '',
                    firstPayment: '',
                    loadMonth: '',
                    monthPayment: ''
                }
		},
        onShow:function(){
            
        },
        methods: {
            // 贷款模式选择
            radioChange(e){
                this.mode = e.detail.value
                if(e.detail.value == 1){
                    if(this.year>5){
                        this.lilv = this.array2[this.lilvIndex].multitude;
                    }else{
                        this.lilv = this.array2[this.lilvIndex].mini;
                    }
                }else if(e.detail.value == 2){
                    if(this.year>5){
                        this.lilv = this.array2[this.lilvIndex].gmultitude;
                    }else{
                        this.lilv = this.array2[this.lilvIndex].gmini;
                    }
                }else{
                    if(this.year>5){
                        this.sdlilv = this.array2[this.lilvIndex].multitude;
                        this.gdlilv = this.array2[this.lilvIndex].gmultitude;
                    }else{
                        this.sdlilv = this.array2[this.lilvIndex].mini;
                        this.gdlilv = this.array2[this.lilvIndex].gmini;
                    }
                }
            },
            // 计算方式选择
            radioChange1(e){
                this.formulaMode = e.detail.value
            },
            radioChange2(e){
                this.type = e.detail.value
            },
            // 按揭成数选择
            bindPickerChange(e){
                this.index = e.detail.value;
                this.percentage = this.array[e.detail.value];
            },
            // 贷款年数选择
            bindPickerChange1(e){
                this.yearIndex = e.detail.value;
                this.year = this.array1[e.detail.value];
                if(this.array1[e.detail.value]>5){
                    this.lilv = this.array2[this.lilvIndex].multitude;
                    if(this.mode == 1){
                        this.lilv = this.array2[this.lilvIndex].multitude;
                    }else if(this.mode == 2){
                        this.lilv = this.array2[this.lilvIndex].gmultitude;
                    }else{
                        this.sdlilv = this.array2[this.lilvIndex].multitude;
                        this.gdlilv = this.array2[this.lilvIndex].gmultitude;
                    }
                }else{
                    if(this.mode == 1){
                        this.lilv = this.array2[this.lilvIndex].mini;
                    }else if(this.mode == 2){
                        this.lilv = this.array2[this.lilvIndex].gmini;
                    }else{
                        this.sdlilv = this.array2[this.lilvIndex].mini;
                        this.gdlilv = this.array2[this.lilvIndex].gmini;
                    }
                }
            },
            // 利率选择
            bindPickerChange2(e){
                this.lilvIndex = e.detail.value;
                if(this.year>5){
                    if(this.mode == 1){
                        this.lilv = this.array2[e.detail.value].multitude;
                    }else if(this.mode == 2){
                        this.lilv = this.array2[e.detail.value].gmultitude;
                    }else{
                        this.sdlilv = this.array2[this.lilvIndex].multitude;
                        this.gdlilv = this.array2[this.lilvIndex].gmultitude;
                    }
                }else{
                    if(this.mode == 1){
                        this.lilv = this.array2[e.detail.value].mini;
                    }else if(this.mode == 2){
                        this.lilv = this.array2[e.detail.value].gmini;
                    }else{
                        this.sdlilv = this.array2[this.lilvIndex].mini;
                        this.gdlilv = this.array2[this.lilvIndex].gmini;
                    }
                }
            },
            submit(){
                let dknum, options;
                if(this.mode == 3){
                    dknum = parseFloat(this.zuheShang) + parseFloat(this.zuheGong);
                    options = calcute.zuhe(this.type, parseFloat(this.zuheShang), parseFloat(this.zuheGong), this.year, this.year, this.sdlilv * 0.01, this.gdlilv * 0.01)
                    this.houseTotalSum = "略";
                    this.loansSum = ((parseFloat(this.zuheShang) + parseFloat(this.zuheGong)) * 10000).toFixed(2);
                    this.repaymentSum = options.totalPrice.toFixed(2);
                    this.InteresSum = options.totalLixi.toFixed(2);
                    this.firstPayment = (options.mouthdataArray[0].yuebenjin + options.mouthdataArray[0].yuelixi).toFixed(2);
                    this.loadMonth = this.year * 12;
                    this.monthPayment = options.yuegong.toFixed(2);
                }else{
                    if(this.formulaMode == 1){
                       dknum = (parseFloat(this.price) * parseFloat(this.area) * parseFloat(this.percentage))/10000;
                    }else if(this.formulaMode == 2){
                       dknum = parseFloat(this.totalSum);
                    }
                    options = calcute.singleDk(this.type, dknum, this.year, this.lilv * 0.01);
                    if(this.formulaMode == 1){
                        this.houseTotalSum = (parseFloat(this.price) * parseFloat(this.area)).toFixed(2);
                        this.loansSum = (parseFloat(this.price) * parseFloat(this.area) * parseFloat(this.percentage)).toFixed(2);
                    }else if(this.formulaMode == 2){
                        this.houseTotalSum = "略";
                        this.loansSum = (dknum * 10000).toFixed(2);
                    }
                    this.repaymentSum = options.totalPrice.toFixed(2);
                    this.InteresSum = options.totalLixi.toFixed(2);
                    this.firstPayment = (options.mouthdataArray[0].yuebenjin + options.mouthdataArray[0].yuelixi).toFixed(2);
                    this.loadMonth = this.year * 12;
                    this.monthPayment = options.yuegong.toFixed(2);
                }
            },
            reset(){
                this.totalSum = '';
                this.price = '';
                this.area = '';
                this.zuheShang = '';
                this.zuheGong = '';
                this.houseTotalSum = '';
                this.loansSum = '';
                this.repaymentSum = '';
                this.InteresSum = '';
                this.firstPayment = '';
                this.loadMonth = '';
                this.monthPayment = '';
            }
		}
	}
</script>

<style lang="less">
@import "./counter.less";
</style>
