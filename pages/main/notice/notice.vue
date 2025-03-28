<template>
	<view>
		<!-- 状态栏占位 -->
		<view class="status_bar"></view>
		<view style="height: 15rpx; background-color: #F6F7FB;"></view>
		<view
			style="height: 200rpx; display: flex; flex-direction: row; align-items: center; justify-content: space-between; margin-left: 70rpx; margin-right: 70rpx;">

			<view @click="tonotice">
				<uni-badge class="uni-badge-left-margin" :text="1" absolute="rightTop" size="normal">
					<view style="display: flex; flex-direction: column; align-items: center; ">
						<image src="../../../static/images/notice/notice_1.png" style="width: 70rpx;height: 70rpx;">
						</image>
						<view style="font-size: 20rpx; margin-top: 5rpx;">通知</view>
					</view>
				</uni-badge>
			</view>

			<view @click="tofollow">
				<uni-badge class="uni-badge-left-margin" :text="10" absolute="rightTop" size="normal">
					<view style="display: flex; flex-direction: column; align-items: center; ">
						<image src="../../../static/images/notice/notice_2.png" style="width: 70rpx;height: 70rpx;">
						</image>
						<view style="font-size: 20rpx; margin-top: 5rpx;">关注</view>
					</view>
				</uni-badge>
			</view>

			<view @click="torecover">
				<uni-badge class="uni-badge-left-margin" :text="7" absolute="rightTop" size="normal">
					<view style="display: flex; flex-direction: column; align-items: center; ">
						<image src="../../../static/images/notice/notice_3.png" style="width: 70rpx;height: 70rpx;">
						</image>
						<view style="font-size: 20rpx; margin-top: 5rpx;">回复</view>
					</view>
				</uni-badge>
			</view>

			<view @click="togivealike">
				<uni-badge class="uni-badge-left-margin" :text="3" absolute="rightTop" size="normal">
					<view style="display: flex; flex-direction: column; align-items: center; ">
						<image src="../../../static/images/notice/notice_4.png" style="width: 70rpx;height: 70rpx;">
						</image>
						<view style="font-size: 20rpx; margin-top: 5rpx;">点赞</view>
					</view>
				</uni-badge>
			</view>

		</view>
		<view style="height: 15rpx; background-color: #F6F7FB;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},

		onLoad() {
			uni.setTabBarItem({
				index: 0,
				text: ''
			});

			uni.setTabBarItem({
				index: 1,
				text: ''
			});

			uni.setTabBarItem({
				index: 2,
				text: '分类'
			});

			uni.setTabBarItem({
				index: 3,
				text: ''
			});
		},

		// 来一个监听底部导航栏被点击的方法
		onTabItemTap: function(e) {
			// console.log(e);
			// e的返回格式为json对象： {"index":0,"text":"首页","pagePath":"pages/index/index"}
			uni.setTabBarItem({
				index: 0,
				text: ''
			});

			uni.setTabBarItem({
				index: 1,
				text: ''
			});

			uni.setTabBarItem({
				index: 2,
				text: '分类'
			});

			uni.setTabBarItem({
				index: 3,
				text: ''
			});
		},

		methods: {
			tonotice() {
				console.log("查看通知");
			},
			tofollow() {
				console.log("查看关注");
			},
			torecover() {
				console.log("查看回复");
			},
			togivealike() {
				console.log("查看点赞");
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