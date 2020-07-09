import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        baseInfo: {}, //基本信息
        finishItem: [], //冲刺项目
        scoreTable: [], //绩效表
    },
    mutations: {
        baseInfo(state, args) {
            state.baseInfo = args;
        },
        finishItem(state, args) {
            state.finishItem = args;
        },
        scoreTable(state, args) {
            state.scoreTable = args;
        },
    },
    actions: {},
    modules: {},
});
