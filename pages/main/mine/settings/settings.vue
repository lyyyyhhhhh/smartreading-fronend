<template>
	<view>
		<view class="status_bar">
			<view class="top_view"></view>
		</view>

		<uni-nav-bar left-icon="left" @clickLeft="backLast" :border="false" height="60px" title="设置"></uni-nav-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			backLast() {
				uni.switchTab({
					url: '/pages/main/mine/mine'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;

		background-color: white;
	}

	.top_view {
		height: var(--status-bar-height);
		width: 100%;
		position: fixed;
		background-color: white;
		top: 0;
		z-index: 999;
	}
</style>