import axios from "axios";

export let registerStore = {
    namespaced: true,
    state: {
        reg: {
            user: {
                username: "",
                password: "",
                password1: ""
            },
            zt: {
                code: 0,
                text: ""
            }
        },
        log: {
            user: {
                username: "",
                password: ""
            },
            zt: {
                code: 0,
                text: ""
            },
            isLogin: 0
        }
    },
    mutations: {  //对象的监测对成都变化敏感 但无法监测数据的变化  或者因为数据的异步处理
        setAct(state, obj) {
            state.reg.zt.code = obj.code;
            state.reg.zt.text = obj.text;
        },
        setLog(state, obj) {
            state.log.zt.code = obj.code;
            state.log.zt.text = obj.text;
        },
        isLogin(state) {
            let key = state.log.user.username;
            state.log.isLogin = key;
            localStorage.setItem("isLogin", key);
        },
        exit(state) {
            localStorage.removeItem('isLogin');
            state.isLogin = 0;
            localStorage.removeItem('userID');
        }
    },
    actions: {
        register(store) {
            let obj = {
                username: store.state.reg.user.username,
                password: store.state.reg.user.password,
                password1: store.state.reg.user.password1
            }
            let usernameReg = /[0-9a-zA-Z]{3,10}/;
            let passwordReg = /[0-9a-z-A-Z]{6,12}/;
            if (obj.password != obj.password1) {
                let arr = {
                    code: 1,
                    text: "两次密码不一致"
                }
                store.commit("setAct", arr);
            } else if (!usernameReg.test(obj.username) || !passwordReg.test(obj.password)) {
                let arr = {
                    code :1,
                    text:"用户名或密码不合法"
                }
                store.commit("setAct",arr);
            } else {
                delete obj.password1;
                axios.post("http://localhost:3000/vue/register", obj)
                    .then((res) => {
                        store.commit("setAct", res.data);
                    })
            }
        },
        login(store) {
            let obj = {
                username: store.state.log.user.username,
                password: store.state.log.user.password
            }
            axios.post("http://localhost:3000/vue/login", obj)
                .then((res) => {
                    store.commit("setLog",res.data);
                    if(res.data.code == 200){
                        store.commit("isLogin");
                        localStorage.setItem("userID",res.data.result[0]._id);
                    }
                })
        },
        exit(store) {
            store.commit("exit");
        }
    }
}