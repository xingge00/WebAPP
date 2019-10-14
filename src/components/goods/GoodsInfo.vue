<template>
	<div class="goodsinfo-container">
		<transition 
			@before-enter="beforeEnter"
			@enter="enter"
			@after-enter="afterEnter">
			<div class="ball" v-if="Ballflag" ref="ball"></div>
		</transition>
		<!-- 商品轮播图区域 -->
		<div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<swiper :lunbotuList="lunbotuList"></swiper>
				</div>
			</div>
		</div>
		
		<!-- 商品购买区域 -->
		<div class="mui-card">
				<div class="mui-card-header">{{goodsinfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
							市场价：<del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;
							销售价：<span class="now_price">￥{{goodsinfo.sell_price}}</span>
							
						</p>
						<p>购买数量：
							<div class="mui-numbox" data-numbox-min="1" :data-numbox-max="goodsinfo.stock_quantity">
								<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
								<input id="test" class="mui-input-numbox" type="number" value="1" ref="boxPosition">
								<button class="mui-btn mui-btn-numbox-plus" type="button" disabled="">+</button>
							</div>
						</p>
						<p>
							<mt-button type="primary" size="small">立即购买</mt-button>
							<mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
						</p>
					</div>
				</div>
			</div>
		
		<!-- 商品参数区域 -->
		<div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号：{{goodsinfo.goods_no}}</p>
						<p>库存情况：{{goodsinfo.stock_quantity}}</p>
						<p>上架时间：{{goodsinfo.add_time | dataFormat}}</p>
					</div>
				</div>
				<div class="mui-card-footer">
					<mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
					<mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
				</div>
			</div>
	</div>
</template>

<script>
import mui from '../../lib/mui/js/mui.js'
import swiper from '../subcomponents/swiper.vue'
export default{
	data(){
		return {
			id : this.$route.params.id,
			lunbotuList : [],
			goodsinfo : {},
			Ballflag: false,
		}
	},
	created(){
		this.getlunbo();
		this.getGoodsInfo();
	},
	mounted(){
		mui('.mui-numbox').numbox()
	},
	methods:{
		getlunbo(){
			this.$http.get("api/getthumimages/"+this.id).then(result=>{
				if(result.body.status ===0){
					result.body.message.forEach(item=>{
						item.img = item.src;
					})
					this.lunbotuList = this.lunbotuList.concat(result.body.message)
				}
			})
		},
		getGoodsInfo(){
			this.$http.get("api/goods/getinfo/"+this.id).then(result=>{
				if(result.body.status === 0){
					this.goodsinfo = result.body.message[0]
				}
			})
		},
		goDesc(id){
			// 跳转到图文介绍页面
			this.$router.push({"name":"goodsdesc",params:{id}})
		},
		goComment(id){
			// 跳转到评论界面
			this.$router.push({"name":"goodscomment",params:{id}})
		},
		addToShopCar(){
			this.Ballflag = !this.Ballflag;
			var id = parseInt(this.id);
			var count = parseInt(this.$refs.boxPosition.value);
			var price = parseInt(this.goodsinfo.sell_price);
			var obj = {
				id:id,
				count:count,
				price:price,
				selected:true,
				
			}
			this.$store.commit("add",obj)
		},
		beforeEnter(el){
			var boxPosition = this.$refs.boxPosition.getBoundingClientRect();
			var dist = boxPosition.y -413
			el.style.transform = "translate(0,"+dist+"px)";
			
			
		},
		enter(el,done){
			el.offsetWidth
			
			
			// 小球优化思路：
			// 不同分辨率位置不一样，需要动态计算位置
			
			
			// 获取 小球 在页面中的位置
			// var ballPosition = this.$refs.ball.getBoundingClientRect();
			// 获取 徽标 在页面中的位置
			// var badgePosition = document.getElementById("badge").getBoundingClientRect();
			// 
			// var xDist = badgePosition.left - ballPosition.left;
			// var yDist = badgePosition.top - ballPosition.top;
			
			var boxPosition = this.$refs.boxPosition.getBoundingClientRect();
			var badgePosition = document.getElementById("badge").getBoundingClientRect();
			var dist = boxPosition.y -413
			var xDist = badgePosition.left - boxPosition.left -10;
			var yDist = badgePosition.top - boxPosition.top + dist;
			
			el.style.transform = "translate("+xDist+"px, "+yDist+"px)";
			el.style.transition = "all 0.5s ease";
			done()
		},
		afterEnter(el){
			this.Ballflag = !this.Ballflag
		},
		
	},
	watch:{
		'goodsinfo':function(newVal,oldVal){
			mui('.mui-numbox')
			.numbox()
			.setOption('max',newVal.stock_quantity);
		}
	},
	components:{
		swiper,
	},
}
</script>

<style lang="scss">
.goodsinfo-container{
	background-color: #eee;
	overflow: hidden;
	margin-top: -10px;
	
	.now_price{
		color: red;
		font-size: 16px;
	}
	.mui-card-footer{
		display: block;
		button{
			margin: 15px 0;
		}
	}
	.ball{
		width: 15px;
		height: 15px;
		border-radius: 50%;
		background-color: red;
		position: fixed;
		// display: flex;
		z-index: 99;
		top: 413px;
		left: 80px;

	}
}
</style>
