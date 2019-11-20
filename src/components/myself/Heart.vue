<template>
	<div class="heart"></div>
</template>

<script>
</script>

<style>
.heart{
	display: flex;
	margin: 15px 10px;
	width: 40px;
	height: 30px;
	filter: drop-shadow(0 1px 1px #973340a3);
	animation: breath infinite 1.5s ease;
}
.heart::before,
.heart::after{
	content: '';
	flex: 1;
	height: 30px;
	border-radius: 20px 20px 4px 4px;
	transform-origin: 50% 6px;
}
.heart::before{
	transform: rotate(-45deg);
	background-image: linear-gradient(90deg,red,#ff6666);
}
.heart::after{
	transform: rotate(45deg);
	background-image: linear-gradient(0deg,red,#ff6666);
}
@keyframes breath{
	0%{
		transform: scale(1);
	}
	50%{
		transform: scale(1.1);
	}
	100%{
		transform: scale(1);
	}
}
</style>
