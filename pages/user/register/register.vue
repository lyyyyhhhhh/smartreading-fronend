<template>
	<view class="register-content">
		<view style="text-align: center;">
			<image src="../../../static/register/smartreading.png"></image>
		</view>

		<view class="register">

			<text class="title title-box">用户名密码注册</text>

			<!-- 注册表单 -->
			<uni-forms ref="form" :modelValue="formData" label-position="top">

				<uni-forms-item label="账号" name="useraccount" required>
					<uni-easyinput type="text" v-model="formData.useraccount"
						placeholder="请输入用于登录的用户账号"></uni-easyinput>
				</uni-forms-item>

				<uni-forms-item label="昵称" name="username" required>
					<uni-easyinput type="text" v-model="formData.username" placeholder="请输入用于对外展示的用户昵称"></uni-easyinput>
				</uni-forms-item>

				<uni-forms-item label="密码" name="password" required>
					<uni-easyinput type="password" v-model="formData.password" placeholder="请输入登录密码"></uni-easyinput>
				</uni-forms-item>

				<uni-forms-item label="确认密码" name="checkpassword" required>
					<uni-easyinput type="password" v-model="formData.checkpassword"
						placeholder="请再次输入以确认密码"></uni-easyinput>
				</uni-forms-item>

			</uni-forms>

			<view style="display: flex; margin-left: 40rpx;">
				<view class="code-img-wrapper" @click="updateImageCode">
					<canvas style="width:220rpx;height:86rpx;" canvas-id="canvas"></canvas>
				</view>
				<uni-easyinput style="width: 300rpx;" type="text" v-model="graphicVerifyCode"
					placeholder="请输入验证码"></uni-easyinput>
			</view>

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

		</view>

		<view style="display: flex; justify-content: center;">
			<button class="uni-btn" type="primary" @click="pwdRegister">注册</button>
		</view>

	</view>
</template>

<script>
	import {
		Mcaptcha
	} from '../../../components/utils/mcaptcha';

	export default {
		data() {

			return {
				isAgree: false,

				// 表单数据
				formData: {
					useraccount: '',
					username: '',
					password: '',
					checkpassword: ''
				},

				graphicVerifyCode: '',

				rules: {
					useraccount: {
						rules: [
							// 校验不能为空
							{
								required: true,
								errorMessage: '请输入账号/用户名'
							},
							{
								// 长度验证
								minLength: 4,
								maxLength: 20,
								errorMessage: '{label}长度在 {minLength} 到 {maxLength} 个字符',
							},

						],
						label: '账号'
					},
					username: {
						rules: [
							// 校验不能为空
							{
								required: true,
								errorMessage: '请输入用户昵称'
							},
							{
								// 长度验证
								minLength: 1,
								maxLength: 20,
								errorMessage: '{label}长度在 {minLength} 到 {maxLength} 个字符',
							},

						],
						label: '昵称'
					},
					password: {
						rules: [
							// 校验不能为空
							{
								required: true,
								errorMessage: '请输入密码'
							},
							{
								// 长度验证
								minLength: 8,
								maxLength: 30,
								errorMessage: '{label}长度在 {minLength} 到 {maxLength} 个字符',
							},

						],
						label: '密码'
					},
					checkpassword: {
						rules: [
							// 校验不能为空
							{
								required: true,
								errorMessage: '请再次输入确认密码'
							},
							{

								validateFunction: function(rule, value, data, callback) {
									console.log('data', data)
									if (value != data.password) {
										callback('两次输入的密码必须相同')
									}
									return true
								}
							},

						],
						label: '确认密码'
					}
				}
			}
		},

		onReady() {
			this.mcaptcha = new Mcaptcha({
				el: 'canvas',
				width: 80,
				height: 35,
				createCodeImg: ""
			});

			// 设置规则
			this.$refs.form.setRules(this.rules);
		},


		onShow() {
			this.mcaptcha = new Mcaptcha({
				el: 'canvas',
				width: 80,
				height: 35,
				createCodeImg: ""
			});
			this.mcaptcha.refresh()
		},

		methods: {
			goToAgreement() {
				console.log("打开服务协议");
			},
			goToPrivacy() {
				console.log("打开隐私政策");
			},
			setAgree(e) {
				this.isAgree = !this.isAgree;
				console.log(this.isAgree);
			},
			pwdRegister() {
				console.log("点击了注册");

				if (this.isAgree) {

					if (this.graphicVerifyCode === undefined) {
						uni.showToast({
							title: '请输入验证码',
							icon: 'error'
						});
					} else {
						let validate = this.mcaptcha.validate(this.graphicVerifyCode);

						if (validate) {
							console.log("验证码正确");

							this.$refs.form.validate().then(res => {
								console.log("表单数据信息", res);

								// 发送请求完成用户注册

								uni.request({
									url: 'http://123.56.217.170:2222/api/user/register',
									method: 'POST',
									data: this.formData,
									success: res => {
										console.log(res);

										if (res.data !== -1) {
											console.log("注册新用户成功");

											uni.showToast({
												title: '注册成功! ',
												icon: 'success'
											});

											// 跳转至登录页面
                      uni.navigateTo({
                        url: '../login/login',
                        success: () => {
                          console.log("跳转登录页面成功");
                        },
                      });

										} else if (res.data === -1) {
											uni.showToast({
												title: '注册失败 ',
												icon: 'fail'
											});
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
								title: '验证码错误',
								icon: 'error'
							});
						}
					}

				} else {
					uni.showToast({
						title: '请同意用户服务协议及隐私政策条款',
						icon: 'error'
					});
				}


			},

			updateImageCode() {
				this.mcaptcha.refresh()
			}

		}
	}
</script>

<style lang="scss" scoped>
	@import "@/pages/common/registerscss/register-page.scss";
</style>