<template>
	<div class="cmt-container">
		<h3>发表评论</h3>
		<hr />
		<textarea placeholder="请输入评论" maxlength="120" v-model="msg"></textarea>
		<mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
		
		<div class="cmt-list">
			<div class="cmt-item" v-for="(item,key) in commentList" :key="item.key">
				<div class="cmt-title">
					第{{key+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间:{{item.add_time | dataFormat}}
				</div>
				<div class="cmt-body">
					{{item.content ===""?"此用户很懒啥也没说":item.content}}
				</div>
			</div>
		</div>
		
		<mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
	</div>
</template>

<script>
import {Toast} from 'mint-ui'
export default{
	data(){
		return{
			index:1,
			commentList:[],
			msg: ''
		}
	},
	created(){
		this.getComment();
	},
	methods:{
		getComment(){
			this.$http.get("api/getcomments/"+this.id+"?pageindex="+this.index).then(result=>{
				if(result.body.status ===0){
					// this.commentList = result.body.message;
					this.commentList = this.commentList.concat(result.body.message)
				}
			})
		},
		getMore(){
			this.index++
			this.getComment()
			
		},
		postComment(){
			if(this.msg.trim().length ===0){
				return Toast("评论内容不能为空")
			}
			
			// post请求
			// 参数1：请求的URL地址
			// 参数2：提交给服务器的数据对象 { content:this.msg }
			// 参数3：定义提交，表单中数据的格式 { emulateJSON:true } 全局设置的就不需要了
			this.$http.post("api/postcomment/"+this.id,{
				content:this.msg.trim()
			}).then(result=>{
				if(result.body.status ===0){
					Toast(result.body.message)
					var cmt = { user_name:'匿名用户',add_time:Date.now(),content:this.msg.trim()};
					this.commentList.unshift(cmt);
					this.msg = ''
				}else{
					Toast("评论失败")
				}
			})
		},
	},
	props:['id']
}
</script>

<style lang="scss" scoped="">
.cmt-container{
	h3{
		font-size: 18px;
	}
	textarea{
		font-size: 14px;
		height: 85px;
		margin: 0;
	}
	.cmt-list{
		margin: 10px 0;
		.cmt-item{
			font-size: 13px;
			.cmt-title{
				line-height: 30px;
				background-color: #ccc;
			}
			.cmt-body{
				line-height: 35px;
				text-indent:2em;
			}
		}
	}
}

</style>
