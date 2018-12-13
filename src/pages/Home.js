import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import template from "../html/Home.html";
import { mapState } from "vuex";
import "../style/Home.less";


export let Home = {
    template,
    components: {
        Header, Footer
    },
    methods: {
        change() {
            this.$router.push({ name: "l" })
        },
        det(event, id, e) {
            e = window.event || e;
            e.stopPropagation();
            this.$router.push({ name: "s", params: { goodsID: id } })
        },
        addGoods(event, id, index, e) {
            e = window.event || e;
            e.stopPropagation();
            console.log(this.code)
            if (!this.isLogin) {
                this.$alert('您还没有登录', '用户提示', {
                    confirmButtonText: '立即登录',
                    callback: action => {
                        this.$router.push({ name: "r" });
                    }
                })
            } else {
                this.$store.dispatch("shopCar/addGoods", { id, num: 1 });
                this.$alert('加入购物车成功', '用户提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$store.dispatch("shopCar/getCarList");
                    }
                })
            }
        }
    },
    mounted() {
        //获取热门消息
        this.$store.dispatch("goods/getHotList");
        //获取首页商品列表
        this.$store.dispatch("goods/getGoodsList");
        //获取购物车列表 做判断
        this.$store.dispatch("shopCar/getCarList");
    },
    computed: {
        ...mapState({
            hotList: state => state.goods.hotList[0],
            goodsList: state => state.goods.indexGoodsList,
            banner: state => state.common.bannerList,
            code: state => state.shopCar.zt.code,
            isLogin:state => state.common.isLogin
        })
    }
}