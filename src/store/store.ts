import {createStore} from "vuex";

const store=createStore({
    state:{
        board:{
            name:"Board1"
        },
        bilmiyom:"bilmiyom metni",
        permissions:[],
        ListsInActiveBoard:[],
        activeBoardId:"",
        activeBoardName:""
    },
    getters:{
        getActiveBoardId:(state)=>state.activeBoardId

    },
    mutations:{
        changeActiveBoardId(state,boardId){
            state.activeBoardId = boardId;
        },
        changeActiveBoardName(state,boardName){
            state.activeBoardName = boardName;
        }
    },
    actions:{
        setActiveBoardId({ commit }, boardId) {
            commit("changeActiveBoardId", boardId);
          },
          setActiveBoardName({ commit }, boardName) {
            commit("changeActiveBoardName", boardName);
          },
          setActiveBoard({ commit }, { boardId, boardName }) {
            commit("changeActiveBoardId", boardId);
            commit("changeActiveBoardName", boardName);
          },
    }

});

export default store;