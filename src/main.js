import Vue from "vue";
import ElementUI from 'element-ui';
import "element-ui/lib/theme-chalk/index.css";
import { router } from "./router";
import { App } from "./App";
import { store } from "./store";
import "./iconfont/iconfont.css";

Vue.use(ElementUI);


new Vue({
    el: "#app",
    template: `
        <App />
    `,
    components: {
        App
    },
    router,
    store,
    created() {
        if (localStorage.getItem("isLogin") === null) {
            localStorage.setItem("isLogin", "");
            // localStorage.setItem("localCode",0);
            // localStorage.setItem("localText","");
        }
        this.$store.state.register.log.isLogin = localStorage.getItem("isLogin");//设置用户名为本地持久储存
        // this.$store.state.shopCar.zt.code = localStorage.getItem("localCode");
        // this.$store.state.shopCar.zt.text = localStorage.getItem("localText");
    }
})