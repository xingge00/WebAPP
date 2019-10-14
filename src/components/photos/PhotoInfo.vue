<template>
	<div class="photoinfo-container">
		<h3 class="h3">{{photoinfo.title}}</h3>
		<p class="subtitle">
			<span>发表时间:{{photoinfo.add_time | dataFormat}}</span>
			<span>点击{{photoinfo.click}}</span>
		</p>
		
		<hr />
		
		<!-- 缩略图区域 -->
		<vue-preview :slides="list" @close="handleClose" height="100px"></vue-preview>
		
		<!-- 图片内容区域 -->
		<div class="content" v-html="photoinfo.content"></div>
		
		<!-- 放置一个现成评论子组件 -->
		<cmt-box :id="id"></cmt-box>
	</div>
</template>

<script>
// 导入评论子组件
import comment from '../subcomponents/comment.vue'
export default{
	data() {
		return {
			id: this.$route.params.id,
			photoinfo:{},
			list:[],//缩略图的数组
		}
	},
	created(){
		this.getPhtotInfo();
		this.getThumbs();
	},
	methods: {
		getPhtotInfo() {
			this.$http.get("api/getimageInfo/"+this.id).then(result=>{
				if(result.body.status ===0){
					this.photoinfo = result.body.message[0]
				}
			})
		},
		getThumbs(){
			// 获取缩略图
			this.$http.get("api/getthumimages/"+this.id).then(result=>{
				if(result.body.status ===0){
					result.body.message.forEach(item=>{
						item.msrc = item.src
						item.w = 600;
						item.h = 400;
					})
					this.list = result.body.message
				}
			})
		},
		handleClose(){
			console.log('close event')
		},
	},
	components: {
		'cmt-box':comment,
	},
}
</script>

<style lang="scss" >
.photoinfo-container{
	padding: 3px;
	h3{
		color: #26A2FF;
		font-size: 15px;
		text-align: center;
		margin: 15px 0;
	}
	.subtitle{
		display: flex;
		justify-content: space-between;
		font-size: 13px
	}
	.content{
		font-size: 13px;
		line-height: 30px;
	}
	.my-gallery{
		display: flex;
		flex-wrap: wrap;//默认是换行的
		figure{
			margin: 0 10px;
			img{
				box-shadow: 0 0 8px #999;
				height: 100px;
			}
		}
	}
}
</style>
