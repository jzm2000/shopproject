<template>
	<div class="cartcontrol">
		<transition name="move">
			<div
				class="iconfont icon-remove_circle_outline"
				v-if="food.count"
				@click.stop="updateFoodCount(false)"
			></div>
		</transition>
		<div class="cart-count" v-if="food.count">{{ food.count || 0 }}</div>
		<div
			class="iconfont icon-add_circle"
			@click.stop="updateFoodCount(true)"
		></div>
	</div>
</template>
<script>
import { mapState } from 'vuex'
export default {
	name: 'CartControl',
	props: ['food'],
	computed: {
		...mapState(['goods'])
	},
	methods: {
		updateFoodCount(isAdd) {
			console.log(1)
			this.$store.dispatch('updateFoodCount',{ isAdd,food: this.food })
		},
	},
}
</script>
<style scoped>
.move-enter-active,
.move-leave-active {
	transition: all 0.3s;
}
.move-enter,
.move-leave-to {
	opacity: 0;
	transform: translateX(10px) rotate(180deg);
}
.cartcontrol {
	font-size: 0px;
	float: right;
}
.cartcontrol .cart-decrease {
	display: inline-block;
	padding: 6px;
	line-height: 24px;
	font-size: 24px;
	color: #00a0dc;
}
.cartcontrol .icon-remove_circle_outline {
	display: inline-block;
	padding: 6px;
	line-height: 24px;
	font-size: 24px;
	color: green;
}
.cartcontrol .cart-count {
	display: inline-block;
	vertical-align: top;
	width: 12px;
	padding-top: 6px;
	line-height: 24px;
	text-align: center;
	font-size: 10px;
	color: #93999f;
}
.cartcontrol .icon-add_circle {
	display: inline-block;
	padding: 6px;
	line-height: 24px;
	font-size: 24px;
	color: green;
}
</style>