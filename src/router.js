import Vue from 'vue';
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//1.创建组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import NewsList from './components/news/NwesList.vue'
import NewInfo from './components/news/NewInfo.vue'
import PhotosList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
import Goodslist from './components/goods/Goodslist.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'
import Test from './components/test.vue'

//2.配置路由
var routes = [
	{path: '/',redirect:'/home'},
	{path:'/test',component:Test},
	{path:'/home', component:HomeContainer},
	{path:'/member', component:MemberContainer},
	{path:'/shopcar', component:ShopcarContainer},
	{path:'/search', component:SearchContainer},
	{path:'/home/newslist',component:NewsList},
	{path:'/home/newsinfo/:id',component:NewInfo},
	{path:'/home/photoslist',component:PhotosList},
	{path:'/home/photoinfo/:id',component:PhotoInfo},
	{path:'/home/goodslist',component:Goodslist},
	{path:'/home/goodsinfo/:id',component:GoodsInfo},
	{path:'/home/goodsdesc/:id',component:GoodsDesc, name:"goodsdesc"},
	{path:'/home/goodscomment/:id',component:GoodsComment, name:"goodscomment"},
	
]

//3.实例化VueRouter
const router = new VueRouter({
	routes,
	linkActiveClass: 'mui-active'
})

export default router;