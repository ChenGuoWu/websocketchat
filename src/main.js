/*
 * @Author: guowu
 * @Date: 2021-04-07 10:36:07
 * @LastEditTime: 2021-04-08 09:58:55
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false;
Vue.use(ElementUI);
//格式化
Date.prototype.dateFormat=function(str){
  let year = this.getFullYear();
  let month  = this.getMonth()+1;
  month = month<10?"0"+month:month;
  let day  = this.getDate();
  day = day<10?"0"+day:day;
  let hours= this.getHours()
  let minutes= this.getMinutes()
  minutes = minutes<10?"0"+minutes:minutes;
  let seconds= this.getSeconds()
  seconds = seconds<10?"0"+seconds:seconds;
  return  str.replace("yyyy",year).replace("mm",month).replace("dd",day).replace("hh",hours).replace("ff",minutes).replace("ss",seconds);

}
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
