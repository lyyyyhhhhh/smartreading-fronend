<template>
	<view>
		<!-- 状态栏占位 -->
		<view class="status_bar"></view>

		<web-view style="margin-top: 60px;" :webview-styles="webviewStyles" :src="homeurl"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				homeurl: '',
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				}
			}
		},

		onLoad(option) {
			this.homeurl = option.url;
		},

		methods: {
			backLast() {
				uni.navigateBack();
			}

		}

	}
</script>

<style>
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
</style>