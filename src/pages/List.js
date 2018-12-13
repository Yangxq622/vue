import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import template from "../html/List.html";
import { mapState } from "vuex";
import "../style/List.less";

export let List = {
    template,
    components: {
        Header, Footer
    },
    computed: {
        ...mapState({
            defaultList: state => state.goods.defaultList,
            countPage: state => state.goods.countPage,
            page: state => state.goods.page,
            type: state => state.goods.type,
            sort: state => state.goods.sort,
            isAsc: state => state.goods.isAsc,
            searchKey: state => state.goods.searchKey,
            pageSize: state => state.goods.pageSize,
            view: state => state.goods.view,
            isActive: state => state.goods.isActive,
            prevClass: state => state.goods.prevClass,
            nextClass: state => state.goods.nextClass,
            code: state => state.shopCar.zt.code,
            isLogin:state => state.common.isLogin
        })
    },
    methods: {
        all() {
            this.$store.dispatch("goods/changeType", { type: null, page: 1 });
            this.$store.dispatch("goods/getDefaultList",{key:this.searchKey});
        },
        xz() {
            this.$store.dispatch("goods/changeType", { type: "suit_all", page: 1 });
            this.$store.dispatch("goods/getDefaultList",{key:this.searchKey});
        },
        cs() {
            this.$store.dispatch("goods/changeType", { type: "shirt", page: 1 });
            this.$store.dispatch("goods/getDefaultList",{key:this.searchKey});
        },
        tx() {
            this.$store.dispatch("goods/changeType", { type: "t-shirt", page: 1 });
            this.$store.dispatch("goods/getDefaultList",{key:this.searchKey});
        },
        lf() {
            this.$store.dispatch("goods/changeType", { type: "dress", page: 1 });
            this.$store.dispatch("goods/getDefaultList",{key:this.searchKey});
        },
        xf() {
            this.$store.dispatch("goods/changeType", { type: "suit", page: 1 })
            this.$store.dispatch("goods/getDefaultList",{key:this.searchKey});
        },
        xk() {
            this.$store.dispatch("goods/changeType", { type: "trousers", page: 1 });
            this.$store.dispatch("goods/getDefaultList",{key:this.searchKey});
        },
        changeSort() {
            let value = this.$refs.name.value;
            console.log(value)
            switch (value) {
                case "p1":
                    this.$store.dispatch("goods/changeSort", { sort: "price", isAsc: 1 });
                    this.$store.dispatch("goods/getDefaultList",{key:this.searchKey});
                    break;
                case "p-1":
                    this.$store.dispatch("goods/changeSort", { sort: "price", isAsc: -1 });
                    this.$store.dispatch("goods/getDefaultList",{key:this.searchKey});
                    break;
                case "d1":
                    this.$store.dispatch("goods/changeSort", { sort: "discount", isAsc: 1 });
                    this.$store.dispatch("goods/getDefaultList",{key:this.searchKey});
                    break;
                case "d-1":
                    this.$store.dispatch("goods/changeSort", { sort: "discount", isAsc: -1 });
                    this.$store.dispatch("goods/getDefaultList",{key:this.searchKey});
                    break;
                case "t":
                    this.$store.dispatch("goods/changeSort", { sort: "type", isAsc: 1 });
                    this.$store.dispatch("goods/getDefaultList",{key:this.searchKey});
                    break;
                case "de":
                    this.$store.dispatch("goods/changeSort", { sort: null, isAsc: 1 });
                    this.$store.dispatch("goods/getDefaultList",{key:this.searchKey});
                    break;
            }
        },
        buy(event, id, e) {
            e = window.event || e;
            e.stopPropagation();
            if (this.code == 400) {
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
        add(event, id, index, e) {
            e = window.event || e;
            e.stopPropagation();
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
                    callback: () => {
                        this.$store.dispatch("shopCar/getCarList");
                    }
                })
            }
        },
        changePage(i) {
            this.$store.dispatch("goods/changePage", { page: i });
            this.$store.dispatch("goods/setIsActive", { i: i - 1 });
            this.$store.dispatch("goods/changePrevClass");
            this.$store.dispatch("goods/changeNextClass");
            this.$store.dispatch("goods/getDefaultList",{key:this.searchKey});
        },
        col() {
            this.$store.dispatch("goods/changeView", { view: "col" });
        },
        row() {
            this.$store.dispatch("goods/changeView", { view: "row" });
        },
        prev() {//为1则上一页不可点击
            if (this.page <= 1) {
                this.$store.dispatch("goods/changePage", { page: 1 });
                this.$store.dispatch("goods/setIsActive", { i: 0 });
                this.$store.dispatch("goods/changePrevClass");
                this.$store.dispatch("goods/changeNextClass");
            } else {
                this.$store.dispatch("goods/changePage", { page: this.page - 1 });
                this.$store.dispatch("goods/setIsActive", { i: this.page - 1 });
                this.$store.dispatch("goods/changePrevClass");
                this.$store.dispatch("goods/getDefaultList",{key:this.searchKey});
                this.$store.dispatch("goods/changeNextClass");
            }
        },
        next() {
            if (this.page >= this.countPage) {
                this.$store.dispatch("goods/changePage", { page: this.countPage });
                this.$store.dispatch("goods/setIsActive", { i: this.countPage - 1 });
                this.$store.dispatch("goods/changePrevClass");
                this.$store.dispatch("goods/changeNextClass");
            } else {
                this.$store.dispatch("goods/changePage", { page: this.page + 1 });
                this.$store.dispatch("goods/setIsActive", { i: this.page - 1 });
                this.$store.dispatch("goods/changePrevClass");
                this.$store.dispatch("goods/getDefaultList",{key:this.searchKey});
                this.$store.dispatch("goods/changeNextClass");
            }
        }
    },
    mounted() {
        //获取列表页数据 默认第一页 每页9条数据  需求：分页，排序,分类
        this.$store.dispatch("goods/getDefaultList",{key:this.searchKey});
        this.$store.dispatch("goods/changePrevClass");
    }
}