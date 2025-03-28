<template>
	<view>
		<!-- 状态栏占位 -->
		<view class="status_bar"></view>


		<swiper class="swiper" :current="currentIndex" @change="changeswiper">
			// 提示页面
			<swiper-item>
				<!-- <view style="position: absolute;">{{ currentIndex }} / 10</view> -->
				<view class="swiper-item">
					<image src="../../../../static/images/preference/1.png"
						style="width: 100%; height: 100%; position: absolute; z-index: -1;" mode="aspectFill">
					</image>
					<view class="passbtn" @click="passsetpreference">
						跳过
					</view>
					<view
						style="background-color: rgba(1, 1, 1, 0.3); width: auto; height: 300rpx; display: flex; flex-direction: column; justify-content: center; color: white; font-weight: bold;">
						<view>为了让我们更了解你</view>
						<view style="margin-top: 30rpx;">请花费一些时间设置一下更丰富的个人信息</view>
						<view style="margin-top: 40rpx; width: 100%; text-align: center; ">向右滑动继续 →</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item>

				<!-- 性别设置 -->
				<view class="swiper-item">

					<view class="passbtn" @click="passsetpreference">
						跳过
					</view>
					<view><text>{{ currentIndex }}/6 </text>
						<view style="font-size: 30rpx; margin-top: 20rpx;">您的性别是?</view>
					</view>
					<view style="display: flex; flex-direction: row; justify-content: center; margin-top: 100rpx;">
						<view style="display: flex; flex-direction: column;">

							<image src="../../../../static/images/preference/male.png"
								style="height: 200rpx; width: 200rpx;">
							</image>
							<view>男</view>
						</view>
						<view style="display: flex; flex-direction: column;">

							<image src="../../../../static/images/preference/female.png"
								style="height: 200rpx; width: 200rpx;">
							</image>
							<view>女</view>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item>
				<!-- 生日设置 -->
				<view class="swiper-item">
					<view class="passbtn" @click="passsetpreference">
						跳过
					</view>

					<view><text>{{ currentIndex }}/6 </text>
						<view style="font-size: 30rpx; margin-top: 20rpx;">您的生日是? {{ single }}</view>
					</view>

					<view class="example-body" style="margin-top: 30rpx; width: 400rpx;">
						<uni-datetime-picker type="date" :clear-icon="true" v-model="single" />
					</view>

				</view>
			</swiper-item>

			<swiper-item>
				<!-- 生日设置 -->
				<view class="swiper-item">
					<view class="passbtn" @click="passsetpreference">
						跳过
					</view>

					<view><text>{{ currentIndex }}/6 </text>
						<view style="font-size: 30rpx; margin-top: 20rpx;">您在哪儿? {{ address }}</view>
					</view>

					<view @click="selectAddress" style="margin-top: 30rpx; width: 100%; ">点击选择</view>

					<address-picker :show="addressShow" closeOnClickOverlay @confirm='confirmAddress'
						@cancel='addressShow=false' @close='addressShow = false' :indexs="indexs"
						:type="type"></address-picker>
				</view>
			</swiper-item>

			<swiper-item>
				<!-- 职业设置 -->
				<view class="swiper-item">
					<view class="passbtn" @click="passsetpreference">
						跳过
					</view>
					<view><text>{{ currentIndex }}/6 </text>
						<view style="font-size: 30rpx; margin-top: 20rpx;">您的职业是? {{ career }}</view>
					</view>
					<view style="margin-top: 40rpx;">
						<uni-combox :candidates="candidates" placeholder="请选择或输入您的职业" v-model="career"></uni-combox>
					</view>
				</view>
			</swiper-item>

			<swiper-item>
				<!-- 阅读偏好设置 -->
				<view class="swiper-item">
					<view class="passbtn" @click="passsetpreference">
						跳过
					</view>
					<view><text>{{ currentIndex }}/6 </text>
						<view style="font-size: 30rpx; margin-top: 20rpx; margin-bottom: 20rpx;">您喜欢读什么? </view>

						<view>文章类型</view>
						<view>文章主题</view>
					</view>

				</view>
			</swiper-item>

			<swiper-item>
				<!-- 欢迎语，调查结束 -->
				<view class="swiper-item">

					<view>
						<text>{{ currentIndex }}/6 </text>
						<view style="font-size: 30rpx; margin-top: 20rpx;">好了，一切准备就绪。 </view>
						<view style="font-size: 30rpx; margin-top: 20rpx;">开始我们的个性化文章阅读之旅吧!</view>
					</view>

					<view style="margin-top: 50rpx; width: 300rpx; ">
						<u-button @click="todiscover" type="primary">立即进入</u-button>
					</view>

				</view>
			</swiper-item>

		</swiper>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				candidates: ["学生", "医生",
					"教师",
					"工程师",
					"律师",
					"会计师",
					"护士",
					"心理学家",
					"程序员",
					"建筑师",
					"销售人员",
					"厨师",
					"警察",
					"消防员",
					"家庭主妇/主夫",
					"艺术家",
					"作家",
					"记者",
					"市场营销专员",
					"政府官员",
					"企业顾问"

				],

				type: 2,
				indexs: [0, 0, 0],
				address: '',
				addressShow: false,
				single: '',
				currentIndex: 0,

				career: '',

				userinfo: {
					sex: 0,
				}
			}
		},

		onLoad() {},

		methods: {
			passsetpreference() {

				uni.switchTab({
					url: '/pages/main/discover/discover',
					success() {
						console.log("跳过成功");

					}
				})
			},

			changeswiper(e) {

				this.currentIndex = e.detail.current;
			},
			selectAddress() {
				this.addressShow = !this.addressShow;
			},
			confirmAddress(val) {
				this.address = val.value.join(' / ')
				this.addressShow = false
			},
			todiscover() {
				uni.switchTab({
					url: '/pages/main/discover/discover',
					success() {
						console.log("跳转成功");

					}
				})
			}
		}
	}
</script>

<style>
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;

	}

	.swiper {
		height: 100vh;
	}

	.swiper-item {
		/* height: 100vh; */
		height: 100%;
		text-align: center;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.passbtn {
		position: absolute;
		font-size: 22rpx;
		right: 20rpx;
		top: 20rpx;
		border-radius: 10%;
		color: white;
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100rpx;
		height: 50rpx;
		background-color: gray;
	}

	.example-body {
		background-color: #fff;
		padding: 10px;
	}
</style>