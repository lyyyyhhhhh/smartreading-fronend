<template>
	<view>
		<!-- 状态栏占位 -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>

		<uni-nav-bar left-icon="left" @clickLeft="backLast" :border="false" height="60px" title="创建文章集"></uni-nav-bar>

		<uni-section title="文章集基本信息" type="line"></uni-section>

		<uni-forms :modelValue="articlesetFormData" label-position="top">

			<view style="margin-left: 30rpx; margin-right: 30rpx;">
				<uni-forms-item label="名称" required name="setname">
					<uni-easyinput v-model="articlesetFormData.setname" placeholder="请输入文章集名称" />
				</uni-forms-item>
			</view>

			<view style="margin-left: 30rpx; margin-right: 30rpx;">
				<uni-forms-item label="简介" required name="setabstract">
					<uni-easyinput type="textarea" v-model="articlesetFormData.setabstract" placeholder="请输入文章集简介" />
				</uni-forms-item>
			</view>

			<view style="margin-left: 30rpx; margin-right: 30rpx;">
				<uni-forms-item label="封面图" required name="covetpic">

					<view style="">
						<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
							:maxCount="1" :previewFullImage="true" deletable uploadText="文章集封面图" width="150"
							height="200" :size-type="uuploadsizetype"></u-upload>
					</view>

				</uni-forms-item>
			</view>

		</uni-forms>

		<uni-section title="文章选择 " type="line">
			<view style="margin-left: 35rpx; font-size: 22rpx; color: gray;">
				数据来源: 我的收藏
			</view>
		</uni-section>

		<!-- 		上传文件按钮测试
		<view>
			<view
				style="height: 200rpx; width: 400rpx; background-color: #2979FF;color: white; display: flex; align-items: center; justify-content: center;"
				@click="uploadtest">
				上传测试</view>
		</view> -->

		<view style="margin-left: 20rpx; margin-right: 20rpx; margin-top: 110rpx;">

			<u-checkbox-group v-model="articlesetres" placement="column" @change="checkboxChange"
				style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between; margin-left: 20rpx; margin-right: 20rpx;">

				<view v-for="(item, index) in mycollectedarticlesreal" :key="index" style="display: flex; "
					@longpress="longpressmycollectdetail(item)">
					<u-checkbox :customStyle="{marginBottom: '150px'}" :name="item.articleid">

					</u-checkbox>

					<view style="display: flex; justify-content: center; align-items: center; flex-direction: column; ">

						<image :src="item.pic"
							style="height: 200rpx; width: 150rpx; margin-top: -220rpx; border-radius: 3%; ">
						</image>
						<view
							style="margin-top: 10rpx; font-size: 22rpx; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; width: 150rpx; text-align: center;">
							{{ item.name }}
						</view>
					</view>
				</view>

			</u-checkbox-group>
		</view>

		<button class="uni-btn" type="default" @click="submitnewset"
			style="font-size: 27rpx; font-weight: bold; color:#ffffff;backgroundColor: #2979FF;borderColor:#FCC3A5; margin-left: 260rpx; margin-right: 260rpx; margin-top: 10rpx;">创建文章集</button>

		<ls-loading text="创建中... " :animation="animation" v-if="pageLoading" fontSize="30"></ls-loading>

		<view v-if="pulishideashow"
			style=" background-color: white; width: 200rpx; height: auto; position: fixed; z-index: 1001; border-radius: 3%; width: 95%; left: 20rpx; top: 350rpx; "
			class="animation-class">

			<view class="info" style="height: auto;">
				<view style="display: flex;">
					<image :src="articleinfo.pic"
						style="width: 240rpx;margin-left: 30rpx; border-radius: 10px; height: 350rpx; border: 2px solid #ccc; margin-top: 20rpx;"
						mode="aspectFill">
					</image>
					<view
						style="width: 400rpx; height: 365rpx; margin-left: 20rpx; margin-top: 25rpx; display: flex; flex-direction: column;">
						<view style="margin-top: 40rpx; margin-left: 20rpx;"><text
								style="font-weight: bold;font-size: 32rpx;">
								{{ articleinfo.title }} </text></view>
						<view
							style="margin-top: 10rpx; margin-left: 20rpx; font-size: 25rpx; color: #3FAFFF; font-weight: bold;">
							<text>
								{{ articleinfo.author }} </text>
						</view>

						<view style="margin-left: 20rpx;margin-top: 40rpx; display: flex; text-align: center;">
							<uni-rate size="18" allow-half :readonly="true" :value="articleinfo.mark / 2" max="5" />
							<view style="color: gray; font-size: 23rpx; margin-left: 10rpx;"><text>
									{{ articleinfo.mark.toFixed(1) }} 分 </text>
							</view>
							<view style="color: gray; font-size: 23rpx;"><text>
									&nbsp; ({{ articleinfo.numberofcomments }}人评论)
								</text></view>
						</view>

						<view
							style="display: flex; margin-left: 20rpx; margin-top: 30rpx; gap: 15rpx; flex-wrap: wrap;">
							<view v-for="(item, index) in articleinfo.labels" :key="index">
								<uni-tag :text="item"
									custom-style="background-color: #E7F5FF;  color: #43B0FF; font-weight: bold; border: white">
								</uni-tag>
							</view>

							<uni-tag :text="articleinfo.isfree ? '免费' : '付费'" :custom-style="{
							            'background-color': articleinfo.isfree ? 'green' : 'orange',
							            'color': 'white',
							            'font-weight': 'bold',
							            'border': 'white'
							         }">
							</uni-tag>


						</view>


					</view>
				</view>

				<view style="margin: 23rpx;">
					<view style="font-size: 25rpx;">
						{{ articleinfo.abstract }}
					</view>

				</view>
			</view>

		</view>

		<!-- 遮罩层 -->
		<u-overlay :show="overlayshow" @click="overlayshow=false; pulishideashow=false" z-index="300"></u-overlay>

		<view style="height: 30rpx;"></view>
	</view>
</template>

<script>
	import {
		mapState
	}
	from 'vuex';

	export default {

		computed: {

			...mapState(['userid', 'username', 'useraccount', 'useravatar', 'location', 'userphonenumber',
				'personalsignature', 'occupation', 'email',
				'isLogin'
			]),

		},

		data() {
			return {

				uuploadsizetype: ['compressed'],

				pulishideashow: false,

				overlayshow: false,

				pageLoading: false,
				animation: 'twinkle',



				fileList1: [],
				picurl: "",

				articleinfo: {},

				// 这个可以用来编辑
				articlesetres: [],

				mycollectedarticlesreal: [],

				articlesetFormData: {
					setname: '',
					setabstract: '',
					coverpic: '',
					// setauthor: this.username,
					// setauhorid: this.userid,
					// articlenumber: this.articlesetres.length,
					// setarticles: this.articlesetres
				},

				articlesetformdata: {
					setname: "创建测试",
					setauthor: "丁家雄",
					setauhorid: 1,
					setabstract: "测试描述",
					coverpic: "https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/dingjiaxiong.jpg",
					articlenumber: 0,
					setarticles: [1, 2, 3]
				},



			}
		},

		onLoad() {

			// 请求所有的收藏数据
			uni.request({
				url: 'http://123.56.217.170:2222/api/collection/collectarticlelistbyuserid/' + this.userid,

				method: 'GET',
				data: {},
				success: res => {
					// console.log(res.data);

					// 拼接出查询条件
					var selectids = [];

					for (let i = 0; i < res.data.length; i++) {
						selectids.push(res.data[i].articleid);
					}

					console.log(selectids);

					uni.request({
						url: 'http://123.56.217.170:2222/api/article/getarticlesinfobyids',
						method: 'POST',
						data: selectids,
						success: res => {
							console.log(res.data);

							this.mycollectedarticlesreal.length = 0;

							for (let i = 0; i < res.data.length; i++) {
								let singlearticle = {

									name: res.data[i].title,
									pic: res.data[i].coverpic,
									disabled: false,
									articleid: res.data[i].articleId,
									articleabstract: res.data[i].articleabstract,
									articlelabel: res.data[i].articlelabel,
									author: res.data[i].author,
									charnumber: res.data[i].charnumber,
									commentsnumber: res.data[i].commentsnumber,
									freeornot: res.data[i].freeornot,
									markscore: res.data[i].markscore
								}

								this.mycollectedarticlesreal.push(singlearticle);
							}
						},
						fail: () => {},
						complete: () => {}
					});
				},
				fail: () => {},
				complete: () => {}
			});
		},

		methods: {


			uploadtest() {
				console.log("上传测试");

				// 图片选择上传

				var _self = this;
				// 图片选择，只支持一次选择一张图片
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册、相机选择
					success: function(res) {
						console.log('res:', res)
						const tempFilePaths = res.tempFilePaths[0];
						// 图片上传
						const uploadTask = uni.uploadFile({
							url: 'http://123.56.217.170:2222/api/articlesetcoverpic/upload', // post请求地址
							filePath: tempFilePaths,
							name: 'file', // 待确认
							header: {
								'Content-Type': 'multipart/form-data',
								'Authorization': getApp().globalData.token ||
									'Basic YXBwOmFwcA=='
							},
							success: function(uploadFileRes) {
								console.log(uploadFileRes);
							},
							fail: function(uploadFileFail) {
								console.log('Error:', uploadFileFail.data);
							},
							complete: () => {
								console.log('Complete:');
							}
						});
					},
					error: function(e) {
						console.log(e);
					}
				});


			},
			checkboxChange(n) {
				console.log('change', n);

				console.log(this.mycollectedarticlesreal);
			},

			backLast() {
				// uni.navigateBack()

				// 2024年6月11日16:18:44 重写逻辑
				uni.reLaunch({
					url: '/pages/main/mine/myarticlesetinfo/myarticlesetinfo'
				})
			},

			submitnewset() {
				// console.log("提交新的文章集, 以下是提交信息: ");

				// console.log(this.articlesetFormData);
				// console.log(this.username);
				// console.log(this.userid);
				// console.log(this.articlesetres.length);
				// console.log(this.articlesetres);

				let articlesetinfo = {
					setname: this.articlesetFormData.setname,
					setauthor: this.username,
					setauhorid: this.userid,
					setabstract: this.articlesetFormData.setabstract,
					coverpic: this.articlesetFormData.coverpic,
					articlenumber: this.articlesetres.length,
					setarticles: this.articlesetres
				}

				// console.log(articlesetinfo);

				uni.request({
					url: 'http://123.56.217.170:2222/api/articleset/addnewarticleset',
					method: 'POST',
					data: articlesetinfo,
					success: res => {
						console.log(res);

						uni.showToast({
							title: '创建文章集成功!'
						});

						// 完成后回到我的文章集页面
						uni.reLaunch({
							url: '/pages/main/mine/myarticlesetinfo/myarticlesetinfo'
						})
					},
					fail: () => {},
					complete: () => {}
				});

			},

			uploadimg() {
				console.log("开始上传");
			},


			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {

					console.log(lists[i].url);

					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},


			// iOS失败原因，未进行压缩，iOS不能上传原图
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'http://123.56.217.170:2222/api/articlesetcoverpic/upload',
						filePath: url,
						// 请求头一定要加，否则iOS图片上传会失败，Android可有可无
						header: {
							'Content-type': 'multipart/form-data'
						},
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {

							console.log(res);
							url = res.data;

							// console.log(eval(res.data));

							console.log("要存的url为：" + url);
							this.picurl = url;
							this.articlesetFormData.coverpic = url;

							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
				})
			},
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},

			// 长按查看详情
			longpressmycollectdetail(clickarticleinfo) {
				console.log(clickarticleinfo);

				this.pulishideashow = true;
				this.overlayshow = true;

				// 加入信息
				this.articleinfo = {
					title: clickarticleinfo.name,
					pic: clickarticleinfo.pic,
					author: clickarticleinfo.author,
					mark: clickarticleinfo.markscore,
					numberofcomments: clickarticleinfo.commentsnumber,
					labels: JSON.parse(clickarticleinfo.articlelabel),
					isfree: clickarticleinfo.freeornot === 0 ? true : false,
					abstract: clickarticleinfo.articleabstract
				}
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

	.animation-class {
		animation: fade-in 0.5s;
	}

	@keyframes fade-in {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	.info {

		display: flex;

		flex-direction: column;

		margin-left: 10rpx;
		margin-right: 20rpx;

		height: 25vh;

	}
</style>