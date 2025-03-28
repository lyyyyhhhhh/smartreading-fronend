<template>
	<view>
		<view class="status_bar">

		</view>

		<uni-nav-bar left-icon="left" @clickLeft="backLast" :border="false" height="60px" title="个人资料设置"></uni-nav-bar>

		<view style="height: 15rpx; background-color: #F6F7FB;"></view>

		<view style="display: flex; flex-direction: column; margin: 50rpx;">
			<view class="infoitem" style=" display: flex; align-items: center;">
				<view class="item-title">头像</view>
				<image :src="useravatar"
					style="width: 130rpx; height: 130rpx; border-radius: 50%; margin-right: -40rpx;"></image>
				<image class="right-arrow" src="../../../static/images/personaldata/right.png"
					style="width: 30rpx; height: 30rpx;"></image>
			</view>
			<view class="infoitem" style=" display: flex; align-items: center;">
				<view class="item-title">昵称</view>
				<view class="info-content"> {{ username }} </view>
				<image class="right-arrow" src="../../../static/images/personaldata/right.png"
					style="width: 30rpx; height: 30rpx;"></image>
			</view>
			<view class="infoitem" style=" display: flex; align-items: center;">
				<view class="item-title">
					账号
				</view>
				<view class="info-content"> {{ useraccount }} </view>
				<image class="right-arrow" src="../../../static/images/personaldata/right.png"
					style="width: 30rpx; height: 30rpx;"></image>
			</view>

			<view class="infoitem" style=" display: flex; align-items: center;">
				<view class="item-title">
					ID
				</view>
				<view class="info-content"> {{ userid }} </view>

			</view>

			<view class="infoitem" style=" display: flex; align-items: center;">
				<view class="item-title">
					手机
				</view>
				<view class="info-content"> {{ userphonenumber }} </view>
				<image class="right-arrow" src="../../../static/images/personaldata/right.png"
					style="width: 30rpx; height: 30rpx;"></image>
			</view>

			<view class="infoitem" style=" display: flex; align-items: center;">
				<view class="item-title">
					职业
				</view>
				<view style="margin-right: -50rpx;" class="info-content"> {{ occupation }} </view>
				<image class="right-arrow" src="../../../static/images/personaldata/right.png"
					style="width: 30rpx; height: 30rpx;"></image>
			</view>

			<view class="infoitem" style=" display: flex; align-items: center;">
				<view class="item-title">
					邮箱
				</view>
				<view class="info-content"> {{ email }} </view>
				<image class="right-arrow" src="../../../static/images/personaldata/right.png"
					style="width: 30rpx; height: 30rpx;"></image>
			</view>

		</view>

		<view style="height: 15rpx; background-color: #F6F7FB;"></view>

		<view style="display: flex; flex-direction: column; margin: 50rpx;">
			<view class="infoitem" style=" display: flex; align-items: center;">
				<view class="item-title">
					地区
				</view>
				<view class="info-content"> {{ location }} </view>
				<image class="right-arrow" src="../../../static/images/personaldata/right.png"
					style="width: 30rpx; height: 30rpx;"></image>
			</view>

			<view class="infoitem" style=" display: flex; align-items: center;">
				<view class="item-title">
					个性签名
				</view>
				<view style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis; " class="info-content">
					{{ personalsignature }}
				</view>
				<image class="right-arrow" src="../../../static/images/personaldata/right.png"
					style="width: 30rpx; height: 30rpx;"></image>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';

	export default {

		computed: {

			...mapState(['userid', 'username', 'useraccount', 'useravatar', 'location', 'userphonenumber',
				'personalsignature', 'occupation', 'email',
				'isLogin'
			]),

		},

		data() {
			return {
				headImg: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/dingjiaxiong.jpg',
				phone: '13088888888',
			}
		},
		methods: {
			backLast() {
				uni.navigateBack();
			},

			changeavatar() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						this.headImg = res.tempFilePaths[0]
					}
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.item-title {
		width: 60%;
	}

	.infoitem {
		margin: 20rpx 20rpx 40rpx 20rpx;

		display: flex;
		justify-content: space-between;
	}

	.right-arrow {}

	.info-content {
		color: #888888;
	}
</style>