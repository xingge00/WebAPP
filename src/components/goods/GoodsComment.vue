<template>
	<div>
		<h3>商品评论</h3>
		<cmtbox :id="$route.params.id"></cmtbox>
	</div>
</template>

<script>
import cmtbox from '../subcomponents/comment.vue'
export default{
	components:{
		cmtbox,
	}
}
</script>

<style>
</style>
