<template>
	<div class="mui-numbox" data-numbox-min="1" data-numbox-max="10"  >
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<input id="test" class="mui-input-numbox" type="number"
			:value="count" 
			@change="countChanged" ref="numbox" readonly>
		<button class="mui-btn mui-btn-numbox-plus" type="button" >+</button>
	</div>
</template>

<script>
import mui from '../../lib/mui/js/mui.js'
export default{
	data(){
		return {}
	},
	mounted(){
		mui(".mui-numbox").numbox();
	},
	methods:{
		countChanged(){
			this.$store.commit('updateGoodsInfo',{id:this.goodsid,count:parseInt(this.$refs.numbox.value)});
		}
	},
	props:["count","goodsid"]
}
</script>

<style>
</style>
