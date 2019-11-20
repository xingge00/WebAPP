<template>
	<div class="progress-bar"></div>
</template>

<script>
</script>

<style>
	.progress-bar{
		margin: 10px;
		position: relative;
		border-radius: 8px;
		width: 60px;
		height: 20px;
		background-color: #eee;
		transform: translateY(-34%);
	}
	.progress-bar::before{
		content: '';
		position: relative;
		z-index: 1;
		display: block;
		border-radius: 8px;
		height: 20px;
		width: 50%;
		background-image: linear-gradient(0deg ,#ff7a3b,#ffc107);
		box-shadow: 0 1px 2px 0 #FF7A3B;
		transition: all 0.2s ease;
	}
	.progress-bar::after{
		content: '50%';
		position: absolute;
		left: 50%;
		transform: scale(0.9) translate(-50%,20%);
		font-size: 12px;
		font-weight: bold;
		color: #54390f;
	}
	.progress-bar:hover::before{
		width: 100%;
	}
	.progress-bar:hover::after{
		content: '100%';
	}
	
</style>
