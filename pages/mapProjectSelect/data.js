const data = [{
    name: "区域",
    value: "city",
    type: "hierarchy",
    submenu: [{
        name: "武侯区",
    },{
        name: "锦江区"
    },{
        name: "双流区"
    },{
        name: "青羊区"
    }]
},{
    name: "价格",
    value: "referenceprice",
    type: "hierarchy",
    submenu: [{
        name: "总价",
        value: "totalprice",
        submenu: [{
            name: "100万以下",
            value: [0, 100],
        },{
            name: "100-150万",
            value: [100,150]
        },{
            name: "150-2050万",
            value: [150,200]
        },{
            name: "200-500万",
            value: [200,500]
        },{
            name: "500-1000万",
            value: [500,1000]
        },{
            name: "1000万以上",
            value: [1000, -1]
        }]
    },{
        name: "单价",
        value: "unitprice",
        submenu: [{
            name: "1000元/m²以下",
            value: [0, 1000]
        },{
            name: "1000-2000/m²",
            value: [1000,2000]
        },{
            name: "2000-3000/m²",
            value: [2000,3000]
        },{
            name: "3000-5000/m²",
            value: [3000,5000]
        },{
            name: "5000-7000/m²",
            value: [5000,7000]
        },{
            name: "7000-10000/m²",
            value: [7000,10000]
        },{
            name: "10000/m²以上",
            value: [10000,-1]
        }]
    }]
},{
    name: "户型",
    value: "room",
    type: "hierarchy",
    submenu: [{
        name: "不限",
        value: "-1"
    },{
        name: "一室",
        value: "1"
    },{
        name: "二室",
        value: "2"
    },{
        name: "三室",
        value: "3"
    },{
        name: "四室",
        value: "4"
    },{
        name: "五室及以上",
        value: "5"
    }]
},{
    name: "筛选",
    value: "filter",
    type: "filter",
    submenu: [{
        name: "面积",
        value: "area",
        submenu: [{
            name: "50m²",
            value: [0,50]
        },{
            name: "50-70m²",
            value: [50,70]
        },{
            name: "70-90m²",
            value: [70,90]
        },{
            name: "90-110m²",
            value: [90,110]
        },{
            name: "110-130m²",
            value: [110,130]
        },{
            name: "130-150m²",
            value: [130,150]
        },{
            name: "150-200m²",
            value: [150,200]
        },{
            name: "200m²以上",
            value: [200,-1]
        }]
    },{
        name: "类型",
        value: "type",
        submenu: [{
            name: "住宅",
            value: 1
        },{
            name: "商铺",
            value: 2
        }]
    },{
        name: "标签",
        value: "tag",
        submenu: [{
            name: "不限购"
        }]
    }]
}]

export default data;