<template>
	<div ref="tab-js">
		<ul>
			<li class="tab">tab1</li>
			<li class="tab">tab2</li>
		</ul>
		<div class="content">content1</div>
		<div class="content" style="display: none">content2</div>
	</div>
</template>
<style scoped>
	ul {
		display: flex;
		padding: 20px;
		border-bottom: 1px solid #ccc;
	}
	li {
		position: relative;
		width: 100px;
		text-align: center;
		cursor: pointer;
	}
	ul > li:first-child:after {
		position: absolute;
		top: 0;
		right: 0;
		content: '|';
		color: #ccc;
	}
	li.active {
		color: red;
	}
	@keyframes m {
		from {
			opacity: 0
		}
		to {
			opacity: 1
		}
	}
	.content {
		padding: 20px;
	}
	.content.active {
		animation: m .6s;
	}
</style>
<script>
	import tabJs from 'tab-js'
	export default {
		updated() {
			let tab = new tabJs(this.$refs.tab-js);
			tab.init();
		}
	}
</script>