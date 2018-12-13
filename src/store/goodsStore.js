import axios from "axios";

export let goodsStore = {
    namespaced: true,
    state: {
        hotList: [],
        indexGoodsList: [],
        defaultList: [],
        countPage: 0,
        page: 1,
        type: "",
        sort: null,
        isAsc: 1,
        searchKey: "",
        pageSize: 9,
        view: "col",
        goodsDetail: {},
        banner: [],
        findResult: {},
        showImgSrc: "",
        isActive: 0,
        prevClass: "show",
        nextClass: "show",
        grade: 0,
        writeT: false,
        text: "",
        commentList: [],
        commentListLength: 0,
        newPageSize: 4,
        currentPage: 1
    },
    mutations: {
        getHotList(state, arr) {
            state.hotList = arr;
        },
        getGoodsList(state, arr) {
            state.indexGoodsList = arr;
        },
        setDefaultList(state, obj) {
            state.defaultList = obj;
        },
        setCountPage(state, num) {
            state.countPage = Math.ceil(num / 9);
        },
        setPage(state, num) {
            state.page = num;
        },
        setType(state, { type, page }) {
            state.type = type;
            state.page = page;
        },
        setSort(state, { sort, isAsc }) {
            state.sort = sort;
            state.isAsc = isAsc;
        },
        setView(state, { view }) {
            state.view = view;
        },
        setFindResult(state, obj) {
            state.findResult = obj;
        },
        setGoodsDetail(state, obj) {
            state.goodsDetail = obj;
            state.banner = obj.banner;
        },
        setShowImg(state, num) {
            state.showImgSrc = state.banner[num];
        },
        setSearchKey(state, key) {
            state.searchKey = key;
        },
        setIsActive(state, { i }) {
            state.isActive = i;
        },
        setPrevClass(state) {
            if (state.page <= 1) {
                state.prevClass = "hide";
            } else {
                state.prevClass = "show";
            }
        },
        setNextClass(state) {
            if (state.page >= state.countPage) {
                state.nextClass = "hide";
            } else {
                state.nextClass = "show";
            }
        },
        changeWriteT(state, { flag }) {
            state.writeT = flag;
        },
        closeWrite(state) {
            state.writeT = false;
        },
        ok(state, { grade, text }) {
            state.grade = grade;
            state.text = text;
        },
        setCommentList(state, arr) {
            state.commentList = arr;
        },
        setCommentListLength(state, num) {
            state.commentListLength = num;
        },
        closeCommentList(state) {
            state.commentList = "";
        },
        setBanner(state, arr) {
            state.banner = arr;
        }
    },
    actions: {
        //获取热门商品  完成
        getHotList(store) {
            let IDList = [];
            axios("http://localhost:3000/vue/getHotList")
                .then((res) => {
                    IDList.push(res.data);
                    store.commit("getHotList", IDList);
                })
        },
        //获取首页商品列表  完成
        getGoodsList(store) {
            axios(`http://localhost:3000/vue/getList?pageSize=${8}&page=${1}`)
                .then((res) => {
                    store.commit("getGoodsList", res.data.list);
                })
        },
        //获取列表页以及商品总数  形成页码  完成
        getDefaultList(store,{key}) {
            store.commit("setSearchKey", key);
            // console.log(obj)
            if (!store.state.type) {
                axios(`http://localhost:3000/vue/getList?search=${store.state.searchKey}&page=${store.state.page}&pageSize=${store.state.pageSize}&sort=${store.state.sort}&isAsc=${store.state.isAsc}`)
                    .then((res) => {
                        store.commit("setDefaultList", res.data.list);
                        store.commit("setCountPage", res.data.count);
                    })
            } else {
                axios(`http://localhost:3000/vue/getList?search=${store.state.searchKey}&page=${store.state.page}&pageSize=${store.state.pageSize}&sort=${store.state.sort}&isAsc=${store.state.isAsc}&type=${store.state.type}`)
                    .then((res) => {
                        store.commit("setDefaultList", res.data.list);
                        store.commit("setCountPage", res.data.count);
                    })
            }
        },
        //改变数据模型的页码 完成
        changePage(store, obj) {
            store.commit("setPage", obj.page);
        },
        //改变数据模型的分类依据 完成
        changeType(store, { type, page }) {
            store.commit("setType", { type, page });
        },
        //改变排序 完成
        changeSort(store, { sort, isAsc }) {
            store.commit("setSort", { sort, isAsc })
        },
        //改变列表的视图 完成
        changeView(store, { view }) {
            store.commit("setView", { view });
        },
        //获取商品详情  完成
        getDetail(store, { goodsID }) {
            axios(`http://localhost:3000/vue/goodsDetail?goodsID=${goodsID.goodsID}`).then((res) => {
                let obj = {
                    code: res.data.code,
                    text: res.data.text
                };
                store.commit("setFindResult", obj);
                if (obj.code == 200) {
                    let data = res.data.result[0];
                    store.commit("setGoodsDetail", data);
                }
            })
        },
        //设置详情页的显示图  完成  
        setShow(store, { goodsID, num }) {
            axios(`http://localhost:3000/vue/goodsDetail?goodsID=${goodsID.goodsID}`).then(res => {
                let data = res.data.result[0];
                store.commit("setBanner", data.banner);
                store.commit("setShowImg", num);
            })
        },
        //改变页码中a标签的样式 完成
        setIsActive(store, { i }) {
            store.commit("setIsActive", { i });
        },
        //改变上一页的样式 完成
        changePrevClass(store) {
            store.commit("setPrevClass");
        },
        //改变下一页样式  完成
        changeNextClass(store) {
            store.commit("setNextClass");
        },
        //页码的移动  完成
        changeShowPage(store) {
            store.commit("changeShowPage");
        },
        //添加评价
        addAssess(store, { flag }) {
            store.commit("changeWriteT", { flag });
        },
        //关闭评论框
        closeWrite(store) {
            store.commit("closeWrite");
        },
        //添加评论
        ok(store, { goodsID, grade, text }) {
            let userID = localStorage.getItem('userID');
            let obj = {
                goodsID: goodsID,
                level: grade,
                content: text,
                userID
            }
            axios.post("http://localhost:3000/vue/addComment", obj).then(res => {
                store.commit("ok", { grade, text });
            })
        },
        setZt(store) {
            store.commit("ok", { grade: 0, text: "" });
        },
        //获取评价列表  完成
        getCommentList(store, { goodsID }) {
            axios(`http://localhost:3000/vue/getCommentList?goodsID=${goodsID}`).then(res => {
                store.commit("setCommentList", res.data);
            })
        },
        getCommentListLength(store, { goodsID }) {
            axios(`http://localhost:3000/vue/getCommentList?goodsID=${goodsID}`).then(res => {
                store.commit("setCommentListLength", res.data.length);
            })
        },
        closeCommentList(store) {
            store.commit("closeCommentList");
        }
    }
}