<template>
	<div class="floating-btn"></div>
</template>

<script>
</script>

<style>
	.floating-btn{
		margin: 10px 10px;
		position: relative;
		width: 40px;
		height: 40px;
		border-radius: 100%;
		background-image: linear-gradient(45deg, #52ffaf,#2196f3);
		box-shadow: 0 1px 2px 1px rgba(0,0,0,0.2);
	}
	.floating-btn::before,
	.floating-btn::after{
		content: '';
		position: absolute;
		left: 50%;
		top: 0;
		display: block;
		margin-left: -9px;
		border-radius: 3px;
		width: 18px;
		height: 3px;
		background-color: white;
		transition: all 0.2s ease;
	}
	.floating-btn::before{
		transform: translateY(12px);
		filter: drop-shadow(0 6px 0 white);
	}
	.floating-btn::after{
		transform: translateY(24px);
	}
	.floating-btn:hover::before{
		filter: none;
		transform: translateY(18px) rotate(-45deg);
	}
	.floating-btn:hover::after{
		filter: none;
		transform: translateY(18px) rotate(45deg);
	}
</style>
