<template>
	<div class="newsinfo-container">
		<h3 class="title">{{newsInfo.title}}</h3>
		<p class="subtitle">
			<span>发表时间 {{newsInfo.add_time | dataFormat}}</span>
			<span>点击：{{newsInfo.click}}</span>
		</p>
		<hr />
		<div class="content" v-html="newsInfo.content">
			
		</div>
		<my-comment :id="id"></my-comment>
	</div>
</template>

<script>

	import comment from '../subcomponents/comment.vue'
	export default {
		data() {
			return {
				id: this.$route.params.id,
				newsInfo:{},
			}
		},
		created(){
			this.getNew()
		},
		methods:{
			getNew(){
				this.$http.get("api/getnew/"+this.id).then(result=>{
					if(result.body.status === 0){
						this.newsInfo = result.body.message[0]
					}
				})
			}
		},
		components:{
			'my-comment':comment,
		}
	}
</script>

<style lang="scss">
.newsinfo-container{
	.title{
		font-size: 16px;
		text-align: center;
		color: red;
	}
	.subtitle{
		font-size: 14px;
		color: #226aff;
		display: flex;
		justify-content: space-between;
	}
	.content{
		img{
			width: 100%
		}
	}
}
</style>
