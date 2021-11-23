<template>
	<div>
		<div class="shopcart">
			<div class="content">
				<div class="content-left" @click="toggleShow">
					<div class="logo-wrapper">
						<div class="logo" :class="{ highlight: totalCount }">
							<i class="iconfont icon-shopping_cart highlight"></i>
						</div>
						<div class="num" v-if="totalCount">{{ totalCount }}</div>
					</div>
					<div class="price" :class="{ highlight: totalCount }">
						￥{{ totolPrice }}
					</div>
					<div class="desc">另需配送费￥{{ info.deliveryPrice }}元</div>
				</div>
				<div class="content-right">
					<div class="pay" :class="payClass">{{ payText }}</div>
				</div>
			</div>
			<transition name="move">
				<div class="shopcart-list" v-show="listShow">
					<div class="list-header">
						<h1 class="title">购物车</h1>
						<span class="empty" @click="clearCart">清空</span>
					</div>
					<div class="list-content">
						<ul>
							<li class="food" v-for="(food, index) in cartFoods" :key="index">
								<span class="name">{{ food.name }}</span>
								<div class="price">
									<span>￥{{ food.price }}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<CartControl :food="food" />
								</div>
							</li>
						</ul>
					</div>
				</div>
			</transition>
		</div>
		<div class="list-mask" v-show="listShow" @click="toggleShow"></div>
	</div>
</template>
<script>
import { MessageBox,Toast } from 'mint-ui'
import BScroll from 'better-scroll'
import { mapState,mapGetters } from "vuex"
import CartControl from './CartControl'
export default {
	name: 'ShopCart',
	data() {
		return {
			isShow: false
		}
	},
	components: {
		CartControl
	},
	methods: {
		toggleShow() {
			if(this.totalCount>0) {
				this.isShow=!this.isShow
			}
		},
		// 清空购物车
		clearCart() {
			MessageBox.confirm("清空购物车?").then(
				action => {
					this.$store.dispatch('clearCart'),
						Toast("清空成功!")
					action
				},
				action => {
					action
				}
			)
		}

	},
	computed: {
		...mapState(['cartFoods','info']),
		...mapGetters(['totalCount','totolPrice']),
		payClass() {
			const { totolPrice }=this
			const { minPrice }=this.info
			return totolPrice>=minPrice? 'enough':'not-enough'
		},
		payText() {
			const { totolPrice }=this
			const { minPrice }=this.info
			if(totolPrice===0) {
				return `￥${minPrice}元起送`
			} else if(totolPrice<minPrice) {
				return `还差${minPrice-totolPrice}元起送`
			} else {
				return "去结算"
			}
		},
		// 显示隐藏购物车listShow
		listShow() {
			if(this.totalCount===0) {
				this.isShow=false
				console.log(this.isShow)
				return false
			}
			return this.isShow
			/* 如果总数量为0，直接不显示 */
		}
	},
	watch: {
		listShow() {
			this.$nextTick(() => {
				// 实现BScroll是一个单例
				if(!this.scroll) {
					this.scroll=new BScroll('.list-content',{
						click: true
					})
				} else {
					this.scroll.refresh();//让滚动条刷新一下；重新统计内容的高度
				}

			})
		}
	}
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
	transform: translateY(0px) !important;
}
.shopcart {
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 50;
	width: 100%;
	height: 48px;
}
.shopcart .content {
	display: flex;
	background: #141d27;
	font-size: 0;
	color: rgba(255, 255, 255, 0.4);
}
.shopcart .content .content-left {
	flex: 1;
}
.shopcart .content .content-left .logo-wrapper {
	display: inline-block;
	vertical-align: top;
	position: relative;
	top: -10px;
	margin: 0 12px;
	padding: 6px;
	width: 56px;
	height: 56px;
	box-sizing: border-box;
	border-radius: 50%;
	background: #141d27;
}
.shopcart .content .content-left .logo-wrapper .logo {
	width: 100%;
	height: 100%;
	border-radius: 50%;
	text-align: center;
	background: #2b343c;
}
.shopcart .content .content-left .logo-wrapper .logo.highlight {
	background: green;
}
.shopcart .content .content-left .logo-wrapper .logo .icon-shopping_cart {
	line-height: 44px;
	font-size: 24px;
	color: #80858a;
}
.shopcart .content .content-left .logo-wrapper .logo.highlight {
	color: #fff;
}
.shopcart .content .content-left .logo-wrapper .num {
	position: absolute;
	top: 0;
	right: 0;
	width: 24px;
	height: 16px;
	line-height: 16px;
	text-align: center;
	border-radius: 16px;
	font-size: 9px;
	font-weight: 700;
	color: #fff;
	background: #f01414;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
}
.shopcart .content .content-left .price {
	display: inline-block;
	vertical-align: top;
	margin-top: 5px;
	line-height: 24px;
	padding-right: 12px;
	box-sizing: border-box;
	font-size: 16px;
	font-weight: 700;
	color: #fff;
}
.shopcart .content .content-left .price.highlight {
	color: #fff;
}
.shopcart .content .content-left .desc {
	display: inline-block;
	vertical-align: bottom;
	margin-bottom: 15px;
	margin-left: -45px;
	font-size: 10px;
}
.shopcart .content .content-right {
	flex: 0 0 105px;
	width: 105px;
}
.shopcart .content .content-right .pay {
	height: 48px;
	line-height: 48px;
	text-align: center;
	font-size: 12px;
	font-weight: 700;
	color: #fff;
}
.shopcart .content .content-right .pay.not-enough {
	background: #2b333b;
}
.shopcart .content .content-right .pay.enough {
	background: #00b43c;
	color: #fff;
}
.shopcart .shopcart-list {
	position: absolute;
	left: 0;
	top: 0;
	z-index: -1;
	width: 100%;
	transform: translateY(-100%);
}
.shopcart .shopcart-list .list-header {
	height: 40px;
	line-height: 40px;
	background: #f3f5f7;
	border-bottom: 1px solid rgba(7, 17, 27, 0.1);
	display: flex;
	box-sizing: border-box;
}
.shopcart .shopcart-list .list-header .title {
	float: left;
	font-size: 14px;
	color: #07111b;
	width: 80%;
	border: 2px solid #eee;
	text-indent: 1rem;
}
.shopcart .shopcart-list .list-header .empty {
	float: right;
	font-size: 12px;
	color: #07111b;
	width: 20%;
	text-align: center;
}
.shopcart .shopcart-list .list-content {
	padding: 0 18px;
	max-height: 217px;
	overflow: hidden;
	background: #fff;
}
.shopcart .shopcart-list .list-content .food {
	position: relative;
	padding: 12px 0;
	box-sizing: border-box;
	border-bottom: rgba(7, 17, 27, 0.1);
}
.shopcart .shopcart-list .list-content .food .name {
	line-height: 24px;
	font-size: 14px;
	color: #07111b;
}
.shopcart .shopcart-list .list-content .food .price {
	position: absolute;
	right: 90px;
	bottom: 12px;
	line-height: 24px;
	font-size: 14px;
	font-weight: 700;
	color: #f01414;
}
.shopcart .shopcart-list .list-content .food .cartcontrol-wrapper {
	position: absolute;
	right: 0;
	bottom: 6px;
}
.list-mask {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 40;
	opacity: 1;
	background: rgba(7, 17, 27, 0.6);
}
</style>