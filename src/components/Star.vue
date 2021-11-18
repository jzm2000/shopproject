<template>
	<div class="star" :class="'star-' + size">
		<span class="star-item on" v-for="a in x" :key="a.index"></span>
		<!-- <span class="star-item on"></span> -->
		<!-- <span class="star-item on"></span> -->
		<span class="star-item half" v-for="a in z" :key="a.index"></span>
		<span class="star-item off" v-for="a in y" :key="a.index"></span>
	</div>
</template>
<script>
export default {
	name: "Star",
	data() {
		return {
			x: 0,
			y: 0,
			z: 0,
		};
	},
	props: {
		score: Number,
		size: Number,
	},
	mounted() {
		// console.log(this.score);
		// 判断是否为小数
		function isFloat(score) {
			return parseInt(score)<parseFloat(score);
		}

		if(isFloat(this.score)) {
			this.x=parseInt(this.score);
			this.z=1;
			this.y=5-this.x-1;
		} else {
			this.x=parseInt(this.score);
			this.z=0;
			this.y=5-this.x;
		}
	},
};
</script>
<style scoped>
.star {
	float: left;
	font-size: 0;
}

.star .star-item {
	display: inline-block;
	background-repeat: no-repeat;
}

.star.star-48 .star-item {
	width: 20px;
	height: 20px;
	margin-right: 22px;
	background-size: 20px 20px;
}

.star.star-48 .star-item:last-child {
	margin-right: 0;
}

.star.star-48 .star-item.on {
	background-image: url("./images/stars/star48_on@2x.png");
}
@media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
	.star.star-48 .star-item.on {
		background-image: url("./images/stars/star48_on@3x.png");
	}
}

.star.star-48 .star-item.half {
	background-image: url("./images/stars/star48_half@2x.png");
}
@media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
	.star.star-48 .star-item.half {
		background-image: url("./images/stars/star48_half@3x.png");
	}
}

.star.star-48 .star-item.off {
	background-image: url("./images/stars/star48_off@2x.png");
}
@media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
	.star.star-48 .star-item.off {
		background-image: url("./images/stars/star48_off@3x.png");
	}
}

.star.star-36 .star-item {
	width: 15px;
	height: 15px;
	margin-right: 6px;
	background-size: 15px 15px;
}

.star.star-36 .star-item:last-child {
	margin-right: 0;
}

.star.star-36 .star-item.on {
	background-image: url("./images/stars/star36_on@2x.png");
}
@media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
	.star.star-36 .star-item.on {
		background-image: url("./images/stars/star36_on@3x.png");
	}
}

.star.star-36 .star-item.half {
	background-image: url("./images/stars/star36_half@2x.png");
}
@media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
	.star.star-36 .star-item.half {
		background-image: url("./images/stars/star36_half@3x.png");
	}
}

.star.star-36 .star-item.off {
	background-image: url("./images/stars/star36_off@2x.png");
}
@media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
	.star.star-36 .star-item.off {
		background-image: url("./images/stars/star36_off@3x.png");
	}
}

.star.star-24 .star-item {
	width: 10px;
	height: 10px;
	margin-right: 3px;
	background-size: 10px 10px;
}

.star.star-24 .star-item:last-child {
	margin-right: 0;
}

.star.star-24 .star-item.on {
	background-image: url("./images/stars/star24_on@2x.png");
}
@media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
	.star.star-24 .star-item.on {
		background-image: url("./images/stars/star24_on@3x.png");
	}
}

.star.star-24 .star-item.half {
	background-image: url("./images/stars/star24_half@2x.png");
}
@media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
	.star.star-24 .star-item.half {
		background-image: url("./images/stars/star24_half@3x.png");
	}
}

.star.star-24 .star-item.off {
	background-image: url("./images/stars/star24_off@2x.png");
}
@media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
	.star.star-24 .star-item.off {
		background-image: url("./images/stars/star24_off@3x.png");
	}
}
</style>