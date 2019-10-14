import Vue from 'vue';
import App from './App.vue';

import VueResource from 'vue-resource'
// 配置vue-resource
Vue.use(VueResource)
// 设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';
Vue.http.options.emulateJSON = true

// 按需导入组件
import { Header,Swipe, SwipeItem,Button,Lazyload,Switch  } from 'mint-ui'
//注册
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.use(Lazyload);
Vue.component(Switch.name, Switch);

// 导入格式化时间插件
import moment from 'moment'
// 定义全局过滤器
Vue.filter('dataFormat', function(dataStr, pattern='YYYY-MM-DD HH:mm:ss'){
	return moment(dataStr).format(pattern)
})

// 安装缩略图插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 每次刚进入网站从本地存储中加载
var car = JSON.parse(localStorage.getItem('car') || '[]')
// 配置vuex
import Vuex from 'vuex'
Vue.use(Vuex)

var store = new Vuex.Store({
	state:{// this.$store.state.**
		car:car,// {id:商品id, count:数量, price:单价,selected:是否被选中}
		
	},
	mutations:{// this.$store.commit('方法名','唯一参数')
		add(state,obj){
			var flag = false
			state.car.forEach(item=>{
				if(item.id == obj.id){
					item.count += obj.count;
					flag =true
					return ;
				}
			})
			if(!flag){
				state.car.push(obj)
			}
			localStorage.setItem('car',JSON.stringify(state.car))
		},
		updateGoodsInfo(state,goodsinfo){
			//修改购物车的count
			state.car.forEach(item=>{
				if(item.id === goodsinfo.id){
					item.count = parseInt(goodsinfo.count)
					localStorage.setItem('car',JSON.stringify(state.car))
					return true
				}
			})
		},
		removeForCar(state,id){
			state.car.forEach((item,index)=>{
				if(item.id == id){
					state.car.splice(index, 1)
					localStorage.setItem('car',JSON.stringify(state.car))
					return true
				}
			})
		},
		updateGoodsSelected(state, obj){
			state.car.forEach(item=>{
				if(item.id == obj.id){
					item.selected = obj.selected
					return true
				}
			})
			localStorage.setItem("car",JSON.stringify(state.car))
		}
	},
	getters:{// this.$store.getters.**
		getAllCount(state){
			var c = 0;
			state.car.forEach(item=>{
				c += item.count;
			})
			return c;
		},
		getGoodsCount(state){
			var obj = {};
			state.car.forEach(item=>{
				obj[item.id] = item.count
			});
			return obj;
		},
		getGoodsSelected(state){
			var obj = {}
			state.car.forEach(item=>{
				obj[item.id] = item.selected
			})
			return obj
		},
		getGoodsCountAndAmount(state){
			var count = 0
			var amount = 0
			state.car.forEach(item=>{
				if(item.selected === true){
					count += item.count
					 amount += (item.price * item.count)
				}
			})
			return {count,amount}
		}
	}
})

import router from './router.js'

import 'mint-ui/lib/style.css'

import './lib/mui/css/icons-extra.css'
import './lib/mui/css/mui.css'


var vm = new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
})
