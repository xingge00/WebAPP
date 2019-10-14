<template>
	<div>
		<div id="slider" class="mui-slider">
			<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted" data-scroll="1">
				<div class="mui-scroll" style="transform: translate3d(0px, 0px, 0px) translateZ(0px); transition-duration: 0ms; transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);">
					<a class="mui-control-item" 
					v-for="item in cates" :key="item.id" 
					:class="{'mui-active':flag == item.id}"
					@click="checkflag(item.id)">
						{{item.title}}
					</a>
				</div>
			</div>
		</div>

		<!-- 图片列表区域 -->
		<ul class="photo-list">
		  <router-link v-for="item in imglist" :key="item.id" :to="'/home/photoinfo/'+item.id"
		  tag="li">
			<img v-lazy="item.img_url">
			<div class="info">
				<h1 class="info-title">{{item.title}}</h1>
				<div class="info-body">{{item.zhaiyao}}</div>
			</div>
		  </router-link>
		</ul>
	</div>
</template>

<script>


export default{
	data(){
		return{
			flag:'全部',
			cates:[],
			imglist:[],
		}
	},
	created(){
		this.getAllCategory();
		this.checkflag(0);
	},
	
	methods:{
		getAllCategory(){
			this.$http.get("api/getimgcategory").then(result=>{
				if(result.body.status ===0){
					result.body.message.splice(0,3)
					result.body.message.unshift({title:"全部",id:0});
					this.cates = result.body.message;
				}
			})
		},
		checkflag(id){
			this.flag = id;
			this.$http.get("api/getimages/"+id).then(result=>{
				if(result.body.status ===0){
					this.imglist = result.body.message;
				}
			})
		}
	}
}

</script>

<style lang="scss" scoped="">

.photo-list{
	list-style: none;
	margin: 0;
	padding: 10px;
	padding-bottom: 0;
	li{
		background-color: #ccc;
		text-align: center;
		margin-bottom: 10px;
		box-shadow: 0 0 9px #999;
		position: relative;
	}
	img{
		width: 100%;
		vertical-align: middle;
	}
	img[lazy=loading] {
	  width: 40px;
	  height: 300px;
	  margin: auto;
	}
	.info{
		background-color: rgba(0,0,0,0.4);
		position: absolute;
		bottom: 0;
		color: white;
		max-height: 84px;
		.info-title{
			font-size: 14px;
			text-align: left;
		}
		.info-body{
			font-size: 13px;
			text-align: left;
		}
	}
}
</style>
