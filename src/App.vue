<template>
	<div>
		<router-view></router-view>
		<FooterGuide v-show="$route.meta.ShowFooter" />
	</div>
</template>

<script>
import FooterGuide from "./components/FooterGuide.vue";
// import { reqFoodCategorys } from "./api";

export default {
	mounted() {
		this.$store.dispatch("getAddress");
		this.$store.dispatch("getUserInfo")
	},
	components: {
		FooterGuide,
	},
};
</script>

<style>
</style>
