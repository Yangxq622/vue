import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import template from "../html/Pay.html";
import { mapState } from 'vuex';
import { pca, pcaa } from "area-data";
import "../style/Pay.less";

export let Pay = {
    template,
    components: {
        Header, Footer
    },
    computed: {
        ...mapState({
            options: state => state.shopCar.options,
            selectedOptions: state => state.shopCar.selectedOptions,
            payList: state => state.shopCar.payList,
            nameInfo: state => state.shopCar.nameInfo,
            nameAdress: state => state.shopCar.nameAdress,
            nameTel: state => state.shopCar.nameTel,
            show: state => state.shopCar.show
        }),
        count() {
            let sum = 0;
            this.payList.map(item => {
                sum += item.number * item.price;
            })
            return sum;
        },
        sum() {
            let count = 0;
            this.payList.map(item => {
                count += item.number * item.price;
            })
            return count;
        }
    },
    methods: {
        handleChange(value) {
            console.log(value);
        },
        pay() {
            if (this.show) {
                this.$alert('您还没有填写收货信息', '用户提示', {
                    confirmButtonText: '确定'
                })
            } else {
                this.$store.dispatch("shopCar/payForGoods");
                this.$alert('支付成功', '用户提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$router.go(-1);
                    }
                })
            }
        },
        changeName(value) {
            this.$store.dispatch("shopCar/changeName", { value });
        },
        changeDet(value) {
            this.$store.dispatch("shopCar/changeDet", { value });
        },
        changeTel(value) {
            this.$store.dispatch("shopCar/changeTel", { value });
        },
        save() {
            if (!this.nameAdress || !this.nameInfo || !this.nameTel) {
                this.$alert('您填写的信息有缺漏', '用户提示', {
                    confirmButtonText: '确定'
                })
            } else {
                this.$store.dispatch("shopCar/saveInfo", { flag: false });
                this.$alert('保存成功', '用户提示', {
                    confirmButtonText: '确定'
                })
            }
        },
        add() {
            this.$store.dispatch("shopCar/saveInfo", { flag: true });
        }
    },
    filters: {
        val(value) {
            return value.toFixed(2);
        }
    }
}