<template>
	<div class="goods-list">
		<router-link class="goods-item" v-for="item in goodslist" :key="item.id" 
		tag="div" :to="'/home/goodsinfo/'+item.id">
			<img :src="item.img_url" alt=""/>
			<h1 class="title">{{item.title}}</h1>
			<div class="info">
				<p class="price">
					<span class="now">{{item.sell_price}}</span>
					<span class="old">{{item.market_price}}</span>
				</p>
				<p class="sell">
					<span>热卖中</span>
					<span>剩{{item.stock_quantity}}件</span>
				</p>
			</div>
		</router-link>
		
		<mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
	</div>
</template>

<script>
	import {Toast} from 'mint-ui'
	export default{
		data(){
			return {
				index: 1,
				goodslist:[],
			}
		},
		created(){
			this.getGoodsList();
		},
		methods:{
			// 获取商品列表
			getGoodsList(){
				this.$http.get("api/getgoods?pageindex="+this.index).then(result=>{
					if(result.body.status ===0){
						this.goodslist = this.goodslist.concat(result.body.message)
						if(result.body.message.length===0){
							Toast("没有更多的数据了")
						}
					}
				})
			},
			getMore(){
				this.index++;
				this.getGoodsList();
			}
		}
	}
</script>

<style lang="scss">
.goods-list{
	display: flex;
	flex-wrap: wrap;
	padding: 7px;
	justify-content: space-between;
	
	.goods-item{
		width: 49%;
		border: 1px solid #ccc;
		box-shadow: 0 0 8px #ccc;
		border-radius: 5px;
		margin: 4px 1px;
		padding: 2px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-height: 269px;
		img{
			width: 100%
		}
		.title{
			font-size: 14px;
		}
		.info{
			p{
				margin: 0;
				padding: 5px;
			}
			background-color: #eee;
			.price{
				.now{
					color: red;
					font-size: 16px;
					font-weight: bold;
				}
				.old{
					text-decoration: line-through;
					font-size: 13px;
					margin-left: 10px;
				}
			}
			.sell{
				display: flex;
				justify-content: space-between
			}
		}
	}
}
</style>
