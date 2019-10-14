<template>
	<div class="shopcar-container">
		<div class="goods-list">
			<!-- 商品列表区域 -->
			<div class="mui-card" v-for="(item,i) in infos" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch 
						:value.sync="$store.getters.getGoodsSelected[item.id]"
						@change="selectChanged(item.id,$store.getters.getGoodsSelected[item.id])"
						></mt-switch>
						<img :src="item.thumb_path" />
						<div class="info">
							<h1>{{item.title}}</h1>
							 <div class="info-content">
								 <span class="price">￥{{item.sell_price}}</span> 
								 <numbox :count="$store.getters.getGoodsCount[item.id]" 
								 :goodsid="item.id"></numbox>
								<a href="#" @click.prevent="remove(item.id,i)">删除</a>
							 </div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<!-- 结算区域 -->
		<div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner jiesuan">
					<div class="left">
						<p>总计（不包含运费）</p>
						<p>已勾选商品 
						<span class="red">￥{{$store.getters.getGoodsCountAndAmount.count}}</span> 
						件，总价 
						<span class="red">￥{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
					</div>
					<mt-button type="danger" size="small">去结算</mt-button>
				</div>
			</div>
		</div>
		<p>{{$store.getters.getGoodsSelected}}</p>
		<p>{{$store.getters.getGoodsCountAndAmount}}</p>
	</div>
</template>

<script>
import mui from '../../lib/mui/js/mui.js'
import numbox from '../subcomponents/numbox.vue'
export default{
	data(){
		return {
			flag:true,
			infos:[]
		}
	},
	created(){
		this.getGoodsList();
	},
	mounted(){
		
	},
	updated(){
		mui(".mui-numbox").numbox();
	},
	methods:{
		getGoodsList(){
			// 获取store中所有的商品id拼接为ids
			var ids = "";
			this.$store.state.car.forEach(item=>ids =ids + item.id+",");
			var idstr = ids.slice(0,-1)
			console.log(idstr);
			//如果购物车中没有商品直接return回去
			if(ids.length<=0) return
			this.$http.get("api/goods/getshopcarlist/"+idstr).then(result=>{
				if(result.body.status ===0){
					this.infos = result.body.message
				}
			})
		},
		remove(id, index){
			this.infos.splice(index,1)
			this.$store.commit("removeForCar", id)
		},
		selectChanged(id,val){
			this.$store.commit('updateGoodsSelected',{id:id,selected:!val})
		},
	},
	components:{
		numbox,
	}
	
}
</script>

<style lang="scss">
.shopcar-container{
	background-color: #eee;
	overflow: hidden;
	.goods-list{
		.mui-card-content-inner{
			display: flex;
			align-items: center;
		}
		img{
			width: 60px;
			height: 60px;
		}
		h1{
			font-size: 14px;
		}
		.info{
			.info-content{
				margin-top: 15px;
				display: flex;
				justify-content: space-between;
			}
			.mui-numbox{
				height: 25px;
				width: 115px;
			}
			.price{
				color: red;
				font-weight: bold;
			}
		}
		
	}
	.jiesuan{
		display: flex;
		justify-content: space-between;
		align-items: center;
		.red{
			color: red;
			font-weight: bold;
			font-size: 16px;
		}
	}
}
</style>
