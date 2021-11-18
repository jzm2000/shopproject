<template>
	<div>
		<div class="goods">
			<div class="menu-wrapper" ref="menuWrapper">
				<ul>
					<li
						class="menu-item"
						v-for="(good, index) in goods"
						:key="index"
						:class="{ current: currentIndex }"
					>
						<span class="text bottom-border-1px">
							<img class="icon" :src="good.icon" v-if="good.icon" />
							{{ good.name }}
						</span>
					</li>
				</ul>
			</div>
			<div class="foods-wrapper" ref="foodsWrapper">
				<ul ref="foodsUL">
					<li
						class="food-list-hook"
						v-for="(good, index) in goods"
						:key="index"
					>
						<h1 class="title">{{ good.name }}</h1>
						<ul>
							<li
								class="food-item bottom-border-1px"
								v-for="(food, index) in good.foods"
								:key="index"
							>
								<div class="icon">
									<img width="57" height="57" :src="food.icon" />
								</div>
								<div class="content">
									<h2 class="name">{{ food.name }}</h2>
									<p class="desc">{{ food.description }}</p>
									<div class="extra">
										<span class="count">月售 {{ food.sellCount }} 份</span>
										<span>好评率 {{ food.rating }}%</span>
									</div>
									<div class="price">
										<span class="now">￥{{ food.price }}</span>
										<span
											class="now"
											v-if="food.oldPrice"
											style="color: #9b9b9b; text-decoration: line-through"
											>￥{{ food.oldPrice }}</span
										>
									</div>
									<div class="cartcontrol-wrapper">CartControl</div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex'

import BScroll from 'better-scroll'
export default {
	name: 'ShopGoods',
	mounted() {
		this.$store.dispatch('getShopGoods')
	},
	watch: {
		goods() {
			this.$nextTick(() => {
				//初始化滚动条
				this._initScroll()
				//初始化tops
				this._initTops()
			})
		}
	},
	data() {
		return {
			scrollY: 0,//右侧滑动的Y轴坐标
			tops: [],//所有右侧分类li的top组成的数组
		}
	},
	computed: {
		...mapState(['goods']),
		// 计算得到当前分类的下标
		currentIndex() {

			return 0
		}
	},
	methods: {
		_initScroll() {
			new BScroll('.menu-wrapper',{
				scrollY: true,
				click: true
			})
			const foodsScroll=new BScroll('.foods-wrapper',{
				scrollY: true,
				click: true,
				probeType: 2/* 手指离开手不会触发 */
			})
			//给右侧列表绑定scroll监听
			foodsScroll.on('scroll',({ y }) => {
				this.scrollY=Math.abs(y)
				console.log(this.scrollY)
			})
		},
		_initTops() {
			// 初始化tops
			const tops=[]
			let top=0;
			tops.push(top)
			// 找到所有分类的li
			const lis=this.$refs.foodsUL.getElementsByClassName('.foods-wrapper')
			Array.prototype.slice.call(lis).forEach(li => {
				top+=li.clientHeight
				tops.push(top)
			})
			// 更新数据
			this.tops=tops
			console.log(tops)
		}
	}
}
</script>

<style scoped>
.current {
	background: #fff;
}
.goods {
	display: flex;
	position: absolute;
	top: 195px;
	bottom: 46px;
	width: 100%;
	background: #fff;
	overflow: hidden;
}
.goods .menu-wrapper {
	flex: 0 0 80px;
	width: 80px;
	background: #f3f5f7;
}
.goods .menu-wrapper .menu-item {
	display: table;
	height: 54px;
	width: 56px;
	padding: 0 12px;
	line-height: 14px;
}
.goods .menu-wrapper .menu-item .current {
	position: relative;
	z-index: 10;
	margin-top: -1px;
	color: rgba(7, 17, 27, 0.1);
	font-weight: 700;
}
.goods .menu-wrapper .menu-item .text .icon {
	display: inline-block;
	vertical-align: top;
	width: 12px;
	height: 12px;
	margin-right: 2px;
	background-size: 12px 12px;
	background-repeat: no-repeat;
}
.goods .menu-wrapper .menu-item .text {
	display: table-cell;
	width: 56px;
	vertical-align: middle;
	font-size: 12px;
}
.goods .foods-wrapper {
	flex: 1;
}
.goods .foods-wrapper h1 {
	padding-left: 14px;
	background: #f3f5f7;
}
.goods .foods-wrapper {
	height: 26px;
	line-height: 26px;
	border-left: 2px solid #d9dde1;
	font-size: 12px;
	color: #93999f;
	background: #fff;
	height: 100%;
}
.goods .foods-wrapper .food-item {
	display: flex;
	margin: 18px;
	padding-bottom: 18px;
	color: rgba(7, 17, 27, 0.1);
	position: relative;
}
.goods .foods-wrapper .food-item:last-child,
.goods .foods-wrapper .food-item,
.goods .foods-wrapper .food-item margin-bottom,
.goods .foods-wrapper .food-item .icon {
	flex: 0 0 57px;
	margin-right: 10px;
}
.goods .foods-wrapper .food-item .content {
	flex: 1;
}
.goods .foods-wrapper .food-item .content .name {
	margin: 2px 0 8px 0;
	height: 14px;
	line-height: 14px;
	font-size: 14px;
	color: #07111b;
}
.goods .foods-wrapper .food-item .content .desc,
.goods .foods-wrapper .food-item .content .extra {
	line-height: 10px;
	font-size: 10px;
	color: #93999f;
}
.goods .foods-wrapper .food-item .content .desc {
	line-height: 12px;
	margin-bottom: 8px;
}
.goods .foods-wrapper .food-item .content .extra .count {
	margin-right: 12px;
}
.goods .foods-wrapper .food-item .content .price {
	font-weight: 700;
	line-height: 24px;
}
.goods .foods-wrapper .food-item .content .price .now {
	margin-right: 8px;
	font-size: 14px;
	color: #fd3f31;
}
.goods .foods-wrapper .food-item .content .price .old {
	text-decoration: line-through;
	font-size: 10px;
	color: #93999f;
}
.goods .foods-wrapper .food-item .content .cartcontrol-wrapper {
	position: absolute;
	right: 0;
	bottom: 12px;
}
</style>
