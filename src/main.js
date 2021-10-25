import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css'

import { Col, Row, Lazyload, Button, Cell, CellGroup, Icon, Image, Popup, Toast, Checkbox, CheckboxGroup, Field, Form, Picker, RadioGroup, Radio, Search, Stepper, Uploader, ActionSheet, Dialog, Loading, CountDown, List, Sticky, Tab, Tabs, TreeSelect, Divider, Collapse, CollapseItem, ImagePreview, PullRefresh, Step, Steps, Rate } from 'vant'
Vue.use(Button)
    .use(Col)
    .use(Row)
    .use(PullRefresh)
    .use(Cell)
    .use(CellGroup)
    .use(Icon)
    .use(Image)
    .use(Popup)
    .use(Toast)
    .use(Checkbox)
    .use(ImagePreview)
    .use(CheckboxGroup)
    .use(Field)
    .use(Form)
    .use(Picker)
    .use(RadioGroup)
    .use(Radio)
    .use(Search)
    .use(Stepper)
    .use(Uploader)
    .use(ActionSheet)
    .use(Dialog)
    .use(Loading)
    .use(CountDown)
    .use(List)
    .use(Sticky)
    .use(Tab)
    .use(Rate)
    .use(Tabs)
    .use(TreeSelect)
    .use(Divider)
    .use(Collapse)
    .use(CollapseItem)
    .use(Step)
    .use(Steps)
    .use(Lazyload, {
        lazyComponent: true
    })

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')