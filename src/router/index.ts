import {createRouter, createWebHashHistory} from "vue-router";

const routes=[
    {
        name:"AllBoardsPage",
        path:"/boards",
        component:()=>import("../views/Boards.vue")
    },
    {
        name:"BoardPage",
        path:"/board/:boardId",
           component:()=>import("../views/Board.vue")
    },
    {
        name:"DenemePage",
        path:"/deneme",
           component:()=>import("../views/Deneme.vue")
    }

]

const router=createRouter({
    routes,
    history:createWebHashHistory()
});

export default router;