import Vue from "vue";
import VueRouter from "vue-router";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { List } from "./pages/List";
import { ShopCar } from "./pages/ShopCar";
import { Detail } from "./pages/Detail";
import { Pay } from "./pages/Pay";

Vue.use(VueRouter);

let routes = [
    { path: "/", redirect: "/home" },
    { path: "/register", component: Register, name: "r" },
    { path: "/home", component: Home, name: "h" },
    { path: "/list", component: List, name: "l" },
    { path: "/shopcar", component: ShopCar, name: "s" },
    { path: "/detail/:goodsID", component: Detail, name: "d" },
    { path: "/pay", component: Pay, name: "p" }
]
export let router = new VueRouter({ routes });