<template>
	<div>
		<mt-swipe :auto="2000" >
			<mt-swipe-item v-for="item in lunbotuList" :key="item.id" >
				<img :src="item.img" :class="{full:isfull}"/>
				</mt-swipe-item>
		</mt-swipe>
	</div>
</template>

<script>
	export default{
		props:["lunbotuList","isfull"],
	}
</script>

<style lang="scss" scoped="">
.mint-swipe{
	height: 200px;
	.mint-swipe-item{
		text-align: center;
		img{
			height: 100%;
			// 分离出full类
			// width: 100%;
		}
	}
}
.full{
	width: 100%;
}
</style>
