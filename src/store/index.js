import Vue from "vue";
import Vuex from "vuex";
import {commonStore} from "./commonStore";
import {registerStore} from "./registerStore";
import {goodsStore} from "./goodsStore";
import {carStore} from "./carStore";

Vue.use(Vuex);

export let store = new Vuex.Store({
    modules:{
        common:commonStore,
        register:registerStore,
        goods:goodsStore,
        shopCar:carStore
    }
})