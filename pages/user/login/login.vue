<!-- Ding Jiaxiong 2024年4月23日10:30:44 -->
<template>
	<view class="main-login">
		<view>
			<image src="../../../static/login/login_background.png"></image>
		</view>

		<view class="smartreadingcontent">
			<!-- 顶部文字 -->
			<text class="title title-box" style="margin-bottom: 50rpx;">您好，欢迎登录智阅</text>

			<!-- 登录表单 -->
			<uni-forms ref="form" :modelValue="formData" :rules="rules">

				<uni-forms-item name="useraccount">
					<uni-easyinput type="text" v-model="formData.useraccount" placeholder="请输入账号"></uni-easyinput>
				</uni-forms-item>

				<uni-forms-item name="password">
					<uni-easyinput type="password" v-model="formData.password" placeholder="请输入密码"></uni-easyinput>
				</uni-forms-item>

			</uni-forms>

			<!-- 阅读隐私协议 -->
			<view class="agreement">
				<checkbox-group style="margin-top: 10rpx;" @change="setAgree">
					<label class="checkbox-box">
						<checkbox :checked="isAgree" style="transform: scale(0.5);margin-right: -6px;" />
						<text>同意</text>
					</label>
				</checkbox-group>
				<view>
					<view>
						<text class="link" @click="goToAgreement">用户服务协议</text>
						<text space="nbsp"> 和 </text>
						<text class="link" @click="goToPrivacy">隐私政策条款</text>
					</view>
				</view>
			</view>

			<button class="uni-btn" type="default" @click="pwdLogin"
				style="color:#ffffff;backgroundColor:#9960FF;borderColor:#9960FF">登录</button>

			<button class="uni-btn" type="default" @click="touristLogin"
				style="color:#ffffff;backgroundColor:#FCC3A5;borderColor:#FCC3A5">游客</button>

			<view class="link-box">
				<view>
					<text class="forget">忘记了？</text>
					<text class="link" @click="toRetrievePwd">找回密码</text>
				</view>
				<view class="link" @click="toRegister">注册账号</view>
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
			...mapState(['name', 'isLogin'])
		},

		comments: {},

		data() {
			return {
				// 表单数据
				formData: {
					useraccount: '',
					password: ''
				},

				rules: {
					useraccount: {
						rules: [
							// 校验不能为空
							{
								required: true,
								errorMessage: '账号不能为空'
							}
						]
					},
					password: {
						rules: [
							// 校验不能为空
							{
								required: true,
								errorMessage: '密码不能为空'
							}
						]
					}
				},

				isAgree: false,
			}
		},

		onReady() {
			this.$refs.form.setRules(this.rules);
		},

		methods: {
			pwdLogin() {

				// // 暂时不进行登录校验【直接跳转到偏好设置页面】
				// uni.navigateTo({
				// 	url: '../../common/interestpreference/newuserpreference/newuserpreference',
				// 	success: res => {
				// 		console.log("跳转用户偏好设置页面成功");
				// 	},
				// 	fail: () => {},
				// 	complete: () => {}
				// });

				if (this.isAgree) {

					// 先对表单进行校验
					this.$refs.form.validate().then(res => {
						console.log("表单信息", res);
						// 请求服务器接口进行登录操作
						uni.request({
							url: 'http://123.56.217.170:2222/api/user/login',
							method: 'POST',
							data: this.formData,
							success: res => {
								console.log(res);
								// 登录

								if (res.data === "") { // 登录失败

									uni.showToast({
										title: '登录失败',
										icon: 'error'
									});

								} else {
									this.$store.commit('setLogin', {
										userid: res.data.data.id,
										username: res.data.data
											.userName, // 账号只是用来登录的, username 才是昵称
										useraccount: res.data.data.userAccount,
										useravatar: res.data.data.userAvatar,
										personalsignature: res.data.data.personalSignature,
										phonenumber: res.data.data.phone,
										occupation: res.data.data.occupation,
										email: res.data.data.email,
										location: res.data.data.location,
										isLogin: true
									});

									// 判断一下, 如果当前用户还没有进行偏好信息设置就跳转到一个新的swiper 页面
									if (res.data.data.isPreference === 0) {
										// 进行偏好设置
										uni.navigateTo({
											url: '../../common/interestpreference/newuserpreference/newuserpreference',
											success: res => {
												console.log("跳转设置兴趣偏好页面成功");
											},
											fail: () => {},
											complete: () => {}
										});
									} else {
										uni.switchTab({
											url: '../../main/discover/discover',
											success() {
												console.log("跳转成功");
											}
										})
									}


								}


							},
							fail: () => {},
							complete: () => {}
						});

					}).catch(err => {
						console.log("表单错误信息", err);
					})

				} else {
					uni.showToast({
						title: '请同意用户服务协议及隐私政策条款',
						icon: 'error'
					});
				}




			},
			touristLogin() {
				console.log("游客登录");

				uni.switchTab({
					url: '../../main/discover/discover',
					success() {
						console.log("跳转成功");
					}
				})
			},
			toRetrievePwd() {
				console.log("找回密码");

				uni.showToast({
					title: '此功能建设中',
					icon: 'error'
				});

				// uni.navigateTo({
				// 	url: '../forgetpassword/forgetpassword',
				// 	success() {
				// 		console.log("找回密码");
				// 	}
				// })

			},
			toRegister() {

				// 2024年6月12日10:28:41 暂时关闭注册功能
				uni.showToast({
					title: '暂未开通此功能, 请联系管理员分配账号!',
					icon: 'fail'
				});

				// console.log("注册账号");

				// uni.navigateTo({
				// 	url: '../register/register',
				// 	success: res => {
				// 		console.log("跳转注册页面成功");
				// 	},
				// 	fail: () => {},
				// 	complete: () => {}
				// });
			},
			goToAgreement() {
				console.log("打开服务协议");
			},
			goToPrivacy() {
				console.log("打开隐私政策");
			},
			setAgree(e) {
				this.isAgree = !this.isAgree;
				console.log(this.isAgree);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/pages/common/loginscss/login-page.scss";
</style>