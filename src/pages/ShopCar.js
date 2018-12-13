import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import template from "../html/ShopCar.html";
import "../style/ShopCar.less";
import { mapState } from "vuex";

export let ShopCar = {
    template,
    components: {
        Header, Footer
    },
    computed: {
        ...mapState({
            code: state => state.shopCar.zt.code,
            text: state => state.shopCar.zt.text,
            carList: state => state.shopCar.carList,
            isAllActive: state => state.shopCar.isAllActive,
            deleteAll: state => state.shopCar.deleteAll,
            control: state => state.shopCar.control,
            isLogin:state => localStorage.getItem("isLogin")
        }),
        count() {
            let count = 0;
            this.carList.map((item) => {
                count += item.number * 1;
            })
            return count;
        },
        sum() {
            let sum = 0;
            if (this.isAllActive) {
                this.carList.map(item => {
                    if (item.isActive) {
                        sum += item.number * item.price
                    }
                })
            } else {
                this.carList.map(item => {
                    if (item.isActive) {
                        sum += item.number * item.price
                    }
                })
            }
            return sum;
        },
        trueC() {
            let a = 0;
            if (this.isAllActive) {
                this.carList.map(item => {
                    if (item.isActive) {
                        a += item.number * 1;
                    }
                })
            } else {
                this.carList.map(item => {
                    if (item.isActive) {
                        a += item.number * 1;
                    }
                })
            }
            return a;
        }
    },
    methods: {
        log() {
            this.$router.push({ name: "r" })
        },
        shopping() {
            this.$router.push({ name: "l" })
        },
        //更改购物车数据
        change(flag, index) {
            this.$store.dispatch("shopCar/changeNum", { flag, index });
        },
        changeByInput(index, value) {
            this.$store.dispatch("shopCar/changeNumByInput", { index, value });
        },
        del(id, index) {
            this.$store.dispatch("shopCar/deleteNum", { id, index });
        },
        changeCheck() {
            this.$store.dispatch("shopCar/changeCheck");
        },
        check_one() {
            let isSelectAll = true
            this.carList.map(item => {
                if (!item.isActive) {
                    isSelectAll = false
                }
            })
            this.$store.dispatch("shopCar/change1", { flag: isSelectAll });
            this.$store.dispatch("shopCar/control", { flag: true });
        },
        delByCheck() {
            this.$store.dispatch("shopCar/delAll");
            if (this.deleteAll) {
                for (let i = 0; i < this.carList.length; i++) {
                    if (this.carList[i].isActive) {
                        this.$store.dispatch("shopCar/deleteNum", { id: this.carList[i].goodsID, index: i });
                        this.$store.dispatch("shopCar/control", { flag: true });
                    }
                }
            }
            this.$router.go(0);
        },
        //结算
        payFor() {
            let arr = [];
            this.carList.map(item => {
                if (item.isActive) {
                    arr.push(item);
                }
            })
            //生成购物清单，同时删除购物车的这些商品
            if (arr.length != 0) {
                this.$store.dispatch("shopCar/payfor", arr);
                this.$router.push({ name: "p" })
            } else {
                this.$alert('您还没有选择结算商品', '用户提示', {
                    confirmButtonText: '确定'
                })
            }
        }
    },
    filters: {
        nu(value) {
            return value.toFixed(2);
        }
    },
    watch: {
        isAllActive() {
            let selectAll = true;

            if (this.isAllActive) {
                this.carList.map((item, index) => {
                    this.carList[index].isActive = this.isAllActive;
                    this.$store.dispatch("shopCar/control", { flag: true });
                })
            } else {//判断失效是由于用户点击还是程序自身控制
                this.carList.map(item => {  //全选失效是由程序自身控制
                    if (!item.isActive) {
                        selectAll = false;
                    }
                })
                if (selectAll) {
                    this.carList.map((item, i) => {
                        this.carList[i].isActive = this.isAllActive;
                        this.$store.dispatch("shopCar/control", { flag: false });
                    })
                }
            }
        }
    },
    created() {
        this.$store.dispatch("shopCar/getCarList");
    }
}