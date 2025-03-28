<template>
	<view>
		<!-- 状态栏占位 -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>

		<view
			style="display: flex; justify-content: center; flex-direction: column; height: 500rpx;  margin-top: 30rpx; align-items: center;">

			<image :src="useravatar" style="border-radius: 50%; height: 170rpx; width: 170rpx;" @click="toLogin">
			</image>
			<view style="margin-top: 20rpx; font-weight: bold;">{{ username }}</view>
			<view style="margin-top: 20rpx; font-size: 12px;">{{ personalsignature }}</view>
		</view>

		<view style="height: 15rpx; background-color: #F6F7FB;"></view>

		<!-- 先来一个登出按钮方便测试 -->

		<view v-show="isLogin">

			<view style="height: auto; background-color: white; margin: 40rpx;">
				<u-cell-group :border="false">
					<u-cell title="个人主页" style="margin-top: 15rpx;" :clickable="true" :border="false" isLink
						icon="qzone" url="/pages/main/myhome/myhome"></u-cell>
          <u-cell title="我的积分" style="margin-top: 15rpx;" :clickable="true" :border="false" isLink
                  icon="coupon-fill" url="/pages/main/mine/mypoint/mypoint"></u-cell>
					<u-cell title="我的智阅币" style="margin-top: 15rpx;" :clickable="true" :border="false" isLink
						icon="integral" url="/pages/main/mine/mysmartreadingcoin/mysmartreadingcoin"></u-cell>
					<u-cell title="已购文章" style="margin-top: 15rpx;" :clickable="true" :border="false" isLink
						icon="pushpin-fill" url="/pages/main/mine/purchasedarticles/purchasedarticles"></u-cell>
					<u-cell title="我的收藏" style="margin-top: 15rpx;" :clickable="true" :border="false" isLink
						icon="star-fill" url="/pages/main/mine/mycollection/mycollection"></u-cell>
					<u-cell title="阅读历史" style="margin-top: 15rpx;" :clickable="true" :border="false" isLink
						icon="tags-fill"></u-cell>
					<u-cell title="我的文章集" style="margin-top: 15rpx;" :clickable="true" :border="false" isLink
						icon="apple-fill" url="/pages/main/mine/myarticlesetinfo/myarticlesetinfo"></u-cell>
					<u-cell title="个人资料" style="margin-top: 15rpx;" :clickable="true" :border="false" isLink
						icon="account" url="/pages/user/personaldata/personaldata"></u-cell>

					<u-cell title="我的通知" style="margin-top: 15rpx;" :clickable="true" :border="false" isLink
						icon="bell-fill" url="/pages/main/mine/mynotice/mynotice"></u-cell>
          <u-cell title="我的笔记" style="margin-top: 15rpx;" :clickable="true" :border="false" isLink
                  icon="bookmark-fill" url="/pages/main/mine/mynote/mynote"></u-cell>
				</u-cell-group>
			</view>

			<view style="height: 15rpx; background-color: #F6F7FB;"></view>

			<view style="height: auto; background-color: white; margin: 40rpx;">
				<u-cell-group :border="false">
					<u-cell title="设置" style="margin-top: 15rpx;" :clickable="true" :border="false" isLink
						icon="setting-fill" url="/pages/main/mine/settings/settings"></u-cell>
					<u-cell title="意见反馈" style="margin-top: 15rpx;" :clickable="true" :border="false" isLink
						icon="edit-pen-fill" url="/pages/main/mine/feedback/feedback"></u-cell>
					<!-- <u-cell title="关于软件" style="margin-top: 15rpx;" :clickable="true" :border="false" isLink
						icon="file-text-fill"></u-cell> -->

					<u-collapse accordion :border="false" style="margin-top: 15rpx;">
						<u-collapse-item title="关于软件" :border="false">
							<u-icon name="order" size="20" slot="icon"></u-icon>
							<view
								style="height: auto; width: 100%;display: flex; flex-direction: column; text-align: center;">
								<view>
									毕业论文题目
									<view style="margin-top: 20rpx; font-size: 22rpx;">
										基于深度学习的<<读者>>杂志阅读资源推荐算法研究与应用
									</view>
								</view>

								<view style="margin-top: 20rpx;">
									时间
									<view style="margin-top: 20rpx; font-size: 22rpx;">
										2023年10月 - 2025年3月
									</view>
								</view>

								<view style="margin-top: 20rpx;">
									作者
									<view style="margin-top: 20rpx; font-size: 22rpx;">
										LZU信息科学与工程学院计算机科学与技术专业2022级硕士研究生丁家雄
									</view>
								</view>
							</view>
						</u-collapse-item>
					</u-collapse>

				</u-cell-group>
			</view>

			<button class="uni-btn" type="default" @click="loginout"
				style="font-size: 27rpx; font-weight: bold; color:#ffffff;backgroundColor:red;borderColor:#FCC3A5; margin-left: 260rpx; margin-right: 260rpx; margin-top: 180rpx;">退出登录</button>
		</view>

		<view style="height: 100rpx;"></view>


	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';

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
				text: ''
			});

			uni.setTabBarItem({
				index: 3,
				text: '我的'
			});
		},

		computed: {
			...mapState(['userid', 'username', 'useravatar', 'personalsignature', 'isLogin'])
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
				text: ''
			});

			uni.setTabBarItem({
				index: 3,
				text: '我的'
			});
		},

		methods: {

			tohomepage() {
				console.log("跳转到个人主页!");
			},

			toLogin() {

				// 判断一下如果已经登录那就跳转到个人主页
				if (this.$store.state.isLogin) {

					// 已经登录, 跳转到个人主页
					uni.navigateTo({
						url: '../myhome/myhome',
						success: res => {
							console.log("跳转成功");
						},
						fail: () => {},
						complete: () => {}
					});

				} else {
					// 跳转到登录页
					uni.navigateTo({
						url: '../../user/login/login',
						success() {
							console.log("跳转成功");
						}
					})
				}


			},
			loginout() {
				// 添加询问
				uni.showModal({
					title: '提示',
					content: '确定要退出登录吗?',
					success: function(res) {
						if (res.confirm) {
							// console.log('用户点击确定'); 

							// 处理登出逻辑
							this.$store.commit('setLogin', {
								userid: null,
								username: '未登录',
								useravatar: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/morentouxiang.png',
								personalsignature: '点击登录后畅享个性化文章阅读体验',
								location: '未知',
								isLogin: false
							});

							// 清除本地信息
							uni.removeStorage({
								key: 'smartreadinguserInfo'
							})

							// 退出登录后回到登录页面
							uni.redirectTo({
								url: '../../user/login/login',
								success() {
									console.log("成功回调");
								}
							})

						} else if (res.cancel) {
							console.log("放弃退出登录");
						}
					}.bind(this)
				});


			}
		}
	}
</script>

<style scoped lang="scss">
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;

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