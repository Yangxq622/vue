import template from "../html/Detail.html";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { mapState } from "vuex";
import "../style/Detail.less";

export let Detail = {
    template,
    components: {
        Header, Footer
    },
    mounted() {
        let goodsID = this.$route.params;
        this.$store.dispatch("goods/getDetail", { goodsID });
        let newId = this.$route.params.goodsID;
        this.$store.dispatch("goods/getCommentListLength", { goodsID: newId });
    },
    created() {
        this.$store.dispatch("goods/closeCommentList");
        let goodsID = this.$route.params;
        this.$store.dispatch("goods/setShow",{goodsID,num:0});
    },
    computed: {
        ...mapState({
            findResult: state => state.goods.findResult,
            goodsDetail: state => state.goods.goodsDetail,
            showImgSrc: state => state.goods.showImgSrc,
            banner: state => state.goods.banner,
            grade: state => state.goods.grade,
            writeT: state => state.goods.writeT,
            text: state => state.goods.text,
            commentList: state => state.goods.commentList,
            commentListLength: state => state.goods.commentListLength,
            newPageSize: state => state.goods.newPageSize,
            currentPage: state => state.goods.currentPage,
            code: state => state.shopCar.zt.code,
            isLogin:state => state.common.isLogin
        })
    },
    filters: {
        num(value) {
            return value.toFixed(2);
        }
    },
    methods: {
        add(id, num) {
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
        },
        buy(id, num) {
            if (!this.isLogin) {
                this.$alert('您还没有登录', '用户提示', {
                    confirmButtonText: '立即登录',
                    callback: action => {
                        this.$router.push({ name: "r" });
                    }
                })
            } else {
                this.$store.dispatch("shopCar/addGoods", { id, num: 1 });
                this.$alert('是否立即进入购物车', '用户提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$router.push({ name: "s" });
                    }
                })
            }
        },
        show(index) {
            let goodsID = this.$route.params;
            this.$store.dispatch("goods/setShow", { goodsID,num: index });
        },
        find() {
            let { goodsID } = this.$route.params;
            this.$store.dispatch("goods/getCommentList", { goodsID });
        },
        //评论框出现  内容要重置
        assess() {
            if (!this.isLogin) {
                this.$alert('您还没有登录', '用户提示', {
                    confirmButtonText: '立即登录',
                    callback: action => {
                        this.$router.push({ name: "r" });
                    }
                })
            } else {
                this.$store.dispatch("goods/addAssess", { flag: true });
                this.$store.dispatch("goods/setZt");
            }
        },
        closeWrite(goodsID, grade, text) {
            if (!text || grade == 0) {
                this.$alert('您还没有评价内容', '用户提示', {
                    confirmButtonText: '确定'
                })
            } else {
                this.$store.dispatch("goods/ok", { goodsID, grade, text });
                this.$alert('感谢您的评价', '用户提示', {
                    confirmButtonText: '确定',
                    callback: () => {
                        this.$store.dispatch("goods/addAssess", { flag: false });
                        let newId = this.$route.params.goodsID;
                        this.$store.dispatch("goods/getCommentListLength", { goodsID: newId });
                    }
                })
            }
        },
        closeBox() {
            this.$store.dispatch("goods/addAssess", { flag: false });
        },
        closeCommentList() {
            this.$store.dispatch("goods/closeCommentList");
        },

    }
}