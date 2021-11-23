<template>
	<div class="food" v-show="isShow">
		<div class="food-content">
			<div class="image-header">
				<transition name="v">
					<img :src="food.image" v-show="isShow" />
				</transition>
				<p class="foodpanel-desc">主、辅料:水、大米、南瓜、冰糖等</p>
				<div class="back" @click="toggleShow">
					<i class="iconfont icon-arrow_left"></i>
				</div>
			</div>
			<div class="content">
				<h1 class="title">{{ food.name }}</h1>
				<div class="detail">
					<span class="sell-count">月售 {{ food.sellCount }} 份</span>
					<span class="rating">好评率{{ food.rating }}%</span>
				</div>
				<div class="price">
					<span class="now">￥{{ food.price }}</span>
					<span class="old" v-show="food.oldPrice">￥{{ food.oldPrice }}</span>
				</div>
				<div class="cartcontrol-wrapper">
					<CartControl :food="food" />
				</div>
			</div>
		</div>
		<div class="food-cover" @click="toggleShow"></div>
	</div>
</template>
<script>
import CartControl from './CartControl'
export default {
	name: 'Food',
	props: ['food'],
	components: {
		CartControl
	},
	data() {
		return {
			isShow: false,
		}
	},
	methods: {
		toggleShow() {
			this.isShow=!this.isShow
		}
	},
}
</script>
<style lang="less" scoped>
.food {
	position: fixed;
	left: 0;
	width: 100%;
	z-index: 101;
	height: 65%;
	bottom: 120px;

	.food-cover {
		position: fixed;
		height: 100vh;
		width: 100%;
		background: rgba(0, 0, 0, 0.5);
		left: 0;
		top: 0;
		z-index: -1;
	}

	.food-content {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 80%;
		height: 100%;

		.image-header {
			position: relative;
			width: 100%;
			height: 75%;
			.back {
				position: absolute;
				left: 10px;
				top: 10px;
				color: #fff;
			}
			.v-enter-active,
			.v-leave-active {
				transition: all 0.5s;
			}
			.v-enter,
			.v-leave-to {
				opacity: 0;
			}
			img {
				height: 100%;
				width: 100%;
			}

			.foodpanel-desc {
				position: absolute;
				bottom: 7px;
				color: #fff;
				left: 10px;
				font-size: 14px;
			}
		}

		.content {
			height: 25%;
			width: 100%;
			background-color: #fff;
			display: flex;
			flex-direction: column;
			padding: 20px;
			box-sizing: border-box;
			position: relative;
			border-radius: 0 0 5px 5px;

			h1 {
				font-weight: bold;
			}

			.detail {
				font-size: 12px;
				color: #9b9b9b;
				margin-top: 10px;
			}

			.price {
				position: absolute;
				left: 20px;
				bottom: 9px;
				.now {
					color: #fd3f31;
					font-size: 18px;
				}
				.old {
					font-size: 14px;
					color: #9b9b9b;
					text-decoration: line-through;
					margin-left: 8px;
				}
			}

			.cartcontrol-wrapper {
				position: absolute;
				right: 20px;
				bottom: 9px;
			}
		}
	}
}
</style>