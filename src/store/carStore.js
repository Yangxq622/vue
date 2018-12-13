import axios from "axios";
import { regionData, CodeToText, TextToCode } from "element-china-area-data";

export let carStore = {
    namespaced: true,
    state: {
        carList: [],
        isAllActive: false,
        deleteAll: false,
        control: false,
        payList: [],
        options: regionData,
        selectedOptions: [],
        nameInfo: "",
        nameAdress: "",
        nameTel: null,
        zt: {
            code: 0,
            text: ""
        },
        show: true
    },
    mutations: {
        setText(state, { code, text }) {
            localStorage.setItem("localCode", code);
            localStorage.setItem("localText", text);
            state.zt.code = code;
            state.zt.text = text;
        },
        setCarList(state, arr) {
            state.carList = arr;
        },
        changeNum(state, obj) {
            state.carList[obj.index].number = obj.num;
        },
        deleteGoods(state, index) {
            state.carList.splice(index, 1);
        },
        setAllActive(state) {
            if (state.isAllActive) {
                state.isAllActive = false;
            } else {
                state.isAllActive = true;
            }
        },
        change1(state, { flag }) {
            state.isAllActive = flag;
        },
        changeDel(state, { flag }) {
            state.deleteAll = flag;
        },
        control(state, { flag }) {
            state.control = flag;
        },
        exit(state) {
            localStorage.setItem("isLogin", "");
            // localStorage.setItem("localCode", 400);
            // localStorage.setItem("localText", "请登录");
            localStorage.removeItem('userID');
            state.zt.code = 400;
        },
        addPayList(state, arr) {
            state.payList = arr;
        },
        changeName(state, value) {
            state.nameInfo = value;
        },
        changeDet(state, value) {
            state.nameAdress = value;
        },
        changeTel(state, value) {
            state.nameTel = value;
        },
        changeShow(state, flag) {
            state.show = flag;
        }
    },
    actions: {
        changeCheck(store) {
            store.commit("setAllActive");
        },
        change1(store, { flag }) {
            store.commit("change1", { flag });
        },
        //获取购物车列表  完成
        getCarList(store) {
            let userID = localStorage.getItem("userID");
            axios(`http://localhost:3000/vue/getCarList?userId=${userID}`).then(res => {
                store.commit("setCarList", res.data);
            })
        },
        //更改购物车数量  点击事件  完成
        changeNum(store, { flag, index }) {
            let userID = localStorage.getItem('userID');
            let goodsID = store.state.carList[index].goodsID;
            let goodsNum = store.state.carList[index].number;
            let add = goodsNum * 1 + 1;
            let reduce = goodsNum - 1;
            if (flag) {
                axios(`http://localhost:3000/vue/updateNum?goodsID=${goodsID}&number=${add}&userID=${userID}`).then(res => {
                    store.commit("changeNum", { index, num: add });
                })
            } else {
                axios(`http://localhost:3000/vue/updateNum?goodsID=${goodsID}&number=${reduce}&userID=${userID}`).then(res => {
                    store.commit("changeNum", { index, num: reduce });
                })
            }
        },
        //输入框的change事件  完成
        changeNumByInput(store, { index, value }) {
            let userID = localStorage.getItem('userID');
            let goodsID = store.state.carList[index].goodsID;
            axios(`http://localhost:3000/vue/updateNum?goodsID=${goodsID}&number=${value}&userID=${userID}`).then(res => {

                    store.commit("changeNum", { index, num: value });
            })
        },
        //删除事件  完成
        deleteNum(store, { id, index }) {
            let userID = localStorage.getItem('userID');
            axios(`http://localhost:3000/vue/del?goodsID=${id}&userID=${userID}`).then(res => {
                store.commit("deleteGoods", index);
            })
        },
        delAll(store) {
            if (store.state.deleteAll) {
                store.commit("changeDel", { flag: false });
            } else {
                store.commit("changeDel", { flag: true });
            }
        },
        //加入购物车 首先查询是否存在 完成
        addGoods(store, { id, num }) {
            let userID = localStorage.getItem('userID');
            axios(`http://localhost:3000/vue/addToCar?goodsID=${id}&number=${num}&userID=${userID}`);
            // axios("/zhuiszhu/shopCar/getList").then(res => {
            //     let list = res.data.list;
            //     if (list.length == 0) {
            //         axios(`/zhuiszhu/shopCar/addToCar?goodsID=${id}&number=${num}`);
            //     } else {
            //         let arr = [];
            //         list.map((item) => {
            //             arr.push(item.goodsID);
            //         })
            //         if (arr.indexOf(id) == -1) {
            //             axios(`/zhuiszhu/shopCar/addToCar?goodsID=${id}&number=${num}`);
            //         } else {
            //             axios("/zhuiszhu/shopCar/getList").then(res => {
            //                 for (let i = 0; i < res.data.list.length; i++) {
            //                     if (id == res.data.list[i].goodsID) {
            //                         let add = list[i].number * 1 + 1;
            //                         axios(`/zhuiszhu/comment/update?goodsID=${id}&number=${add}`).then(res => {
            //                             store.commit("changeNum", { index: i, num: add });
            //                         })
            //                     }
            //                 }
            //             })
            //         }
            //     }
            // })
            // return false;
        },
        control(store, { flag }) {
            store.commit("control", { flag });
        },
        exit(store) {
            store.commit("setText", { code: 400, text: "请登录" });
        },
        //结算取出对应信息，渲染进结算页面
        payfor(store, arr) {
            store.commit("addPayList", arr);
        },
        payForGoods(store) {
            let userID = localStorage.getItem('userID');
            store.state.payList.map(item => {
                axios(`http://localhost:3000/vue/del?goodsID=${item.goodsID}&userID=${userID}`);
            })
        },
        changeName(store, { value }) {
            store.commit("changeName", value);
        },
        changeDet(store, { value }) {
            store.commit("changeDet", value);
        },
        changeTel(store, { value }) {
            store.commit("changeTel", value);
        },
        saveInfo(store, { flag }) {
            store.commit("changeShow", flag);
        }
    }
}
