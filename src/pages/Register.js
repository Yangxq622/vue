import "../style/Register.less";
import template from "../html/Register.html";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { mapState } from "vuex"

export let Register = {
    template,
    components: {
        Header, Footer
    },
    computed: {
        ...mapState({
            reginfo: state => state.register.reg.user,
            sta: state => state.register.reg.zt,
            loginfo:state => state.register.log.user,
            act:state => state.register.log.zt
        })
    },
    methods: {
        reg() {
            this.$store.dispatch("register/register");
            setTimeout(() => {
                if(this.sta.code == 200){
                    if(confirm("恭喜您，注册成功，可以去登录啦")){
                        this.$router.go(0);
                    }
                }
            },90)
        },
        log(){
            this.$store.dispatch("register/login");
            setTimeout(() => {
                if(this.act.code == 200){
                    this.$router.push({name:"l"})
                    window.location.reload();
                }
           },90)
        }
    }
}