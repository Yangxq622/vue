

export let commonStore = {
    namespaced:true,
    state:{
        navList:[
            {title:"首页",name:"h"},
            {title:"商品列表",name:"l"},
            {title:"购物车",name:"s"},
            {title:"登录",name:"r"}
        ],
        bannerList:[
            "https://img.zcool.cn/community/01e06b554213ba0000019ae96b207b.jpg@1280w_1l_2o_100sh.jpg",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541934369793&di=ac71d0ce84183fb84291bcb6fb56f82c&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01fe10554213ba0000019ae90bc7fb.jpg%402o.jpg",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541829231130&di=ea68b37cac81e2bcb6228276bceed113&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F18%2F41%2F25%2F10k58PICRpU_1024.jpg"
        ],
        isLogin:localStorage.getItem("isLogin")
    }
}