
import tkiAuthorize from "./tki-authorize/tki-authorize.vue"
import tkiBarcode from "./tki-barcode/tki-barcode.vue"
import tkiCell from "./tki-cell/tki-cell.vue"
import tkiCellGroup from "./tki-cell-group/tki-cell-group.vue"
import tkiFloatKeyboard from "./tki-float-keyboard/tki-float-keyboard.vue"
import tkiGetcode from "./tki-getcode/tki-getcode.vue"
import tkiImgCompress from "./tki-img-compress/tki-img-compress.vue"
import tkiLoad from "./tki-load/tki-load.vue"
import tkiNavBar from "./tki-nav-bar/tki-nav-bar.vue"
import tkiPicker from "./tki-picker/tki-picker.vue"
import tkiQrcode from "./tki-qrcode/tki-qrcode.vue"
import tkiTab from "./tki-tab/tki-tab.vue"
import tkiTree from "./tki-tree/tki-tree.vue"
import tkiWatermark from "./tki-watermark/tki-watermark.vue"

export {
    tkiAuthorize,
    tkiBarcode,
    tkiCell,
    tkiCellGroup,
    tkiFloatKeyboard,
    tkiGetcode,
    tkiImgCompress,
    tkiLoad,
    tkiNavBar,
    tkiPicker,
    tkiQrcode,
    tkiTab,
    tkiTree,
    tkiWatermark,
}

const install = function (Vue, options) {
    const components = require.context('./', true, /.vue$/)
    components.keys().forEach(fileName => {
        const componentConfig = components(fileName)['default']
        Vue.component(componentConfig.name, componentConfig)
    })
}
export default install