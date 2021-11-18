<template>
	<section class="msite">
		<!--首页头部-->
		<HeaderTop :title="$store.state.address.name">
			<router-link class="header_search" slot="left" to="/search">
				<i class="iconfont icon-sousuo"></i>
			</router-link>
			<router-link
				class="header_login"
				slot="right"
				:to="userInfo._id ? '/userinfo' : '/login'"
			>
				<span class="header_login_text" v-if="!userInfo._id"> 登录|注册 </span>
				<span class="header_login_text" v-else>
					<i class="iconfont icon-person"></i>
				</span>
			</router-link>
		</HeaderTop>
		<!--首页导航-->
		<nav class="msite_nav" v-if="categorys.length">
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<div
						class="swiper-slide"
						v-for="(categorys, index) in categorysArr"
						:key="index"
					>
						<a
							href="javascript:"
							class="link_to_food"
							v-for="(category, index) in categorys"
							:key="index"
						>
							<div class="food_container">
								<img :src="baseImageUrl + category.image_url" />
							</div>
							<span>{{ category.title }}</span>
						</a>
					</div>
				</div>
				<!-- Add Pagination -->
				<div class="swiper-pagination"></div>
			</div>
		</nav>
		<img src="./images/msite_back.svg" alt="back" v-else />
		<!--首页附近商家-->
		<div class="msite_shop_list">
			<div class="shop_header">
				<i class="iconfont icon-xuanxiang"></i>
				<span class="shop_header_title">附近商家</span>
			</div>
			<ShopList />
		</div>
	</section>
</template>
<script>
import HeaderTop from "../components/HeaderTop";
import ShopList from "../components/ShopList";
import Swiper from "swiper";

import "swiper/dist/css/swiper.min.css";
import "swiper/dist/js/swiper.min.js";
import { mapState } from "vuex";
export default {
	name: "MSite",
	data() {
		return {
			baseImageUrl: "https://fuss10.elemecdn.com",
		};
	},
	components: {
		HeaderTop,
		ShopList,
	},
	watch: {
		categorys() {
			// 界面更新就立马创建Swiper对象
			this.$nextTick(() => {
				new Swiper(".swiper-container",{
					pagination: {
						el: ".swiper-pagination",
					},
				});
			});
		},
	},

	mounted() {
		console.log();
		this.$store.dispatch("getCategorys");
		this.$store.dispatch("getShops");
	},
	computed: {
		...mapState(["categorys",'userInfo']),
		/*
		根据categorys一维数组生成一个2维数组
		小数组中的元素个数最大是8
		 */
		categorysArr() {
			const { categorys }=this;
			/* 准备空的2维数组 */
			const arr=[];
			let minArr=[];
			/* 遍历categorys */

			categorys.forEach((c) => {
				/* 如果当前小数组已经满了，创建一个新的 */
				if(minArr.length===8) {
					minArr=[];
				}
				/* 如果当前minArr是空的，将小数组保存到大数组中 */
				if(minArr.length===0) {
					arr.push(minArr);
				}
				minArr.push(c);
			});
			return arr;
		},
	},
};
</script>
<style>
section.msite {
	width: 100%;
}
section.msite .msite_header {
	background-color: #02a774;
	position: fixed;
	z-index: 100;
	left: 0;
	top: 0;
	width: 100%;
	height: 45px;
}
section.msite .msite_header .header_search {
	position: absolute;
	left: 15px;
	top: 50%;
	transform: translateY(-50%);
	width: 10%;
	height: 50%;
}
section.msite .msite_header .header_search .icon-sousuo {
	font-size: 25px;
	color: #fff;
}
section.msite .msite_header .header_title {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 50%;
	color: #fff;
	text-align: center;
	margin-left: -5%;
}
section.msite .msite_header .header_title .header_title_text {
	font-size: 20px;
	color: #fff;
	display: block;
}
section.msite .msite_header .header_login {
	font-size: 14px;
	color: #fff;
	position: absolute;
	right: 15px;
	top: 50%;
	transform: translateY(-50%);
}
section.msite .msite_header .header_login .header_login_text {
	color: #fff;
}
section.msite .msite_nav {
	position: relative;
	margin-top: 45px;
	height: 200px;
	background: #fff;
}
section.msite .msite_nav::before {
	content: "";
	position: absolute;
	z-index: 200;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 1px;
	background-color: #e4e4e4;
	transform: scaleY(0.5);
}
section.msite .msite_nav .swiper-container {
	width: 100%;
	height: 100%;
}
section.msite .msite_nav .swiper-container .swiper-wrapper {
	width: 100%;
	height: 100%;
}
section.msite .msite_nav .swiper-container .swiper-wrapper .swiper-slide {
	display: flex;
	justify-content: center;
	align-items: flex-start;
	flex-wrap: wrap;
}
section.msite
	.msite_nav
	.swiper-container
	.swiper-wrapper
	.swiper-slide
	.link_to_food {
	width: 25%;
}
section.msite
	.msite_nav
	.swiper-container
	.swiper-wrapper
	.swiper-slide
	.link_to_food
	.food_container {
	display: block;
	width: 100%;
	text-align: center;
	padding-bottom: 10px;
	font-size: 0;
}
section.msite
	.msite_nav
	.swiper-container
	.swiper-wrapper
	.swiper-slide
	.link_to_food
	.food_container
	img {
	display: inline-block;
	width: 50px;
	height: 50px;
}
section.msite
	.msite_nav
	.swiper-container
	.swiper-wrapper
	.swiper-slide
	.link_to_food
	span {
	display: block;
	width: 100%;
	text-align: center;
	font-size: 13px;
	color: #666;
}
section.msite
	.msite_nav
	.swiper-container
	.swiper-pagination
	> span.swiper-pagination-bullet-active {
	background: #02a774;
}
section.msite .msite_shop_list {
	position: relative;
	margin-top: 10px;
	background: #fff;
}
section.msite .msite_shop_list::before {
	content: "";
	position: absolute;
	z-index: 200;
	left: 0;
	top: 0;
	width: 100%;
	height: 1px;
	background-color: #e4e4e4;
}
section.msite .msite_shop_list .shop_header {
	padding: 10px 10px 0;
}
section.msite .msite_shop_list .shop_header .shop_icon {
	margin-left: 5px;
	color: #999;
}
section.msite .msite_shop_list .shop_header .shop_header_title {
	color: #999;
	font-size: 14px;
	line-height: 20px;
}
</style>