/*
 * @Author: guowu
 * @Date: 2021-04-07 10:36:07
 * @LastEditTime: 2021-04-07 16:15:32
 */
import Vue from "vue";
import Vuex from "vuex";
import user from './modules/user'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user
  },
});
