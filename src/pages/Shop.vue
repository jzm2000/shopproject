<template>
	<div>
		<ShopHeader />
		<div class="tab">
			<div class="tab-item">
				<router-link to="/shop/goods">点餐</router-link>
			</div>
			<div class="tab-item">
				<router-link to="/shop/info">评价</router-link>
			</div>
			<div class="tab-item">
				<router-link to="/shop/ratings">点餐</router-link>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>
<script>
import ShopHeader from '../components/ShopHeader'
export default {
	name: 'Shop',
	components: {
		ShopHeader
	},
	mounted() {
		this.$store.dispatch('getShopInfo')
	}
}
</script>
<style scoped>
@media only screen and (-webkit-device-pixel-ratio: 2) {
	.border-1px::before {
		transform: scaleY(0.5);
	}
}
@media only screen and (-webkit-device-pixel-ratio: 3) {
	.border-1px::before {
		transform: scaleY(0.333333);
	}
}
.tab {
	height: 40px;
	line-height: 40px;
	background: #fff;
	border-bottom: 1px rgba(7, 17, 27, 0.1) solid;
}
.tab .tab-item {
	float: left;
	width: 33.33333%;
	text-align: center;
	font-size: 14px;
	color: #4d555d;
}
.tab .tab-item a {
	display: block;
	position: relative;
}
.tab .tab-item a.router-link-active:hover {
	border-bottom: 1px solid #02a774;
}
.tab .tab-item a.router-link-active::after {
	content: "";
	position: absolute;
	left: 50%;
	bottom: 1px;
	width: 35px;
	height: 2px;
	transform: translateX(-50%);
	background: rgba(0, 34, 170, 0.467) 7;
}
</style>