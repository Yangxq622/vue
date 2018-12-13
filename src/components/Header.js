import template from "../html/Header.html";
import "../style/Header.less";
import { mapState } from "vuex";
import "../style/animate.min.css";


export let Header = {
    template,
    computed: {
        ...mapState({
            navList: state => state.common.navList,
            userinfo: state => state.register.log.user,
            searchKey: state => state.goods.searchKey,
            isLogin: state => state.register.log.isLogin,
            code: state => state.shopCar.zt.code,
            text: state => state.shopCar.zt.text
        })
    },
    methods: {
        sea() {
            this.$store.dispatch("goods/getDefaultList",{key:this.searchKey});
            this.$router.push({ name: "l" });
        },
        clear() {
            this.$store.dispatch("register/exit");
            this.$store.dispatch("shopCar/exit");
            this.$router.go(0);
        }
    }
}