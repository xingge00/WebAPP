<template>
	<div>
		<h3>新闻列表</h3>
		<ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
				<router-link :to="'/home/newsinfo/'+item.id">
					<img class="mui-media-object mui-pull-left" :src="item.img_url">
					<div class="mui-media-body">
						<h1>{{item.title}}</h1>
						<p class="mui-ellipsis">
							<span>发表时间：{{item.add_time |dataFormat}}</span>
							<span>点击：{{item.click}}</span>
						</p>
					</div>
				</router-link>
			</li>
			<li class="mui-table-view-cell mui-media">
				<router-link :to="'/home/newsinfo/'+'2'">
					<img class="mui-media-object mui-pull-left" src="https://ss0.baidu.com/73F1bjeh1BF3odCf/it/u=1030329999,2905022787&fm=85&s=1AB56E850C602815573DF00E0300B051">
					<div class="mui-media-body">
						<h1>幸福</h1>
						<p class="mui-ellipsis">
							<span>发表时间：2019-9-19 17:31:21</span>
							<span>点击：0次</span>
						</p>
					</div>
				</router-link>
			</li>

		</ul>
	</div>
</template>

<script>

export default{
	data(){
		return {
			newsList: [],
		}
	},
	created(){
		this.getNewsList()
	},
	methods:{
		getNewsList(){//获取新闻列表
			this.$http.get('api/getnewslist').then(result =>{
				if(result.body.status ===0 ){
					this.newsList = result.body.message
				}
			})
		}
	},
}
</script>

<style lang="scss" scoped="">
.mui-table-view{
	li{
		h1{font-size: 14px;}
	}
	.mui-ellipsis{
		font-size: 12px;
		color: #226aff;
		display: flex;
		justify-content: space-between;
	}
}
</style>
