<template>
	<div>
		<router-view></router-view>
		<FooterGuide v-show="$route.meta.ShowFooter" />
	</div>
</template>

<script>
import FooterGuide from "./components/FooterGuide.vue";
export default {
	name: "App",
	components: {
		FooterGuide,
	},
};
</script>

<style>
</style>
