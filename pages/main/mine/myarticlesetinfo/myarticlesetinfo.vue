<template>
	<view>
		<!-- 状态栏占位 -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>

		<uni-nav-bar left-icon="left" right-icon="plusempty" @clickLeft="backLast" :border="false" height="60px"
			@clickRight="addnewset" title="我的文章集"></uni-nav-bar>

		<view>

			<view v-for="(item, index) in articlesetsreal" :key="index" style="margin: 10rpx;">

				<view style=" height: auto; ">
					<view style="display: flex; align-items: center;">

						<view>
							<image :src="item.image"
								style="height: 270rpx; width: 210rpx; margin-top: 20rpx; margin-left: 30rpx; box-shadow: 10px 10px 4px rgba(0, 0, 0, 0.1); border-radius: 3%; ">
							</image>
						</view>

						<view
							style="margin-top: 50rpx; margin-left: 35rpx; display: flex; flex-direction: column; justify-content: center; ">

							<view style="display: flex; align-items: center;  ">
								<view style="font-size: 24rpx;">
									名称:
								</view>
								<view style="font-weight: bold; font-size: 25rpx; margin-left: 15rpx;">
									{{ item.setname }}
								</view>
							</view>
							<view style="display: flex;  margin-top: 20rpx; ">
								<view style="font-size: 22rpx; width: 15%; ">
									简介:
								</view>
								<view style=" color: gray; font-size: 23rpx; margin-right: 20rpx;  width: 85%;">
									{{ item.abstract }}
								</view>
							</view>
							<view style="margin-top: 80rpx; color: gray; font-size: 21rpx;">
								总共有<text
									style="margin-left: 5rpx; margin-right: 5rpx;">{{ item.articlenumber }}</text>篇文章
							</view>

							<view style="display: flex; margin-left: 210rpx; font-size: 22rpx; margin-top: 20rpx;">
								<view @click="articlesetdetail(item.articlesetid)"
									style="background-color: #169EFF; color: white; border-radius: 10%; height: 45rpx; width: 60rpx;  display: flex; justify-content: center; align-items: center;">
									<view>查看</view>
								</view>
								<view
									style="margin-left: 15rpx; background-color: #169EFF; color: white; border-radius: 10%; height: 45rpx; width: 60rpx;  display: flex; justify-content: center; align-items: center;"
									@click="editarticleset(item.articlesetid)">
									<view>
										编辑
									</view>
								</view>

								<view
									style="margin-left: 15rpx; background-color: red; color: white; border-radius: 10%; height: 45rpx; width: 60rpx;  display: flex; justify-content: center; align-items: center;"
									@click="deletethisarticleset(item)">
									<view>
										删除
									</view>
								</view>

							</view>

						</view>

					</view>
				</view>

				<u-divider style="margin-left: 50rpx; margin-right: 50rpx;"></u-divider>

			</view>

		</view>

		<ls-loading text="正在获取文章集信息..." :animation="animation" v-if="pageLoading" fontSize="30"
			:nav="true"></ls-loading>

		<u-modal :show="modalshow" :title="modaltitle" :showConfirmButton="true" :showCancelButton="true"
			@confirm="modalconfirm" @cancel="modalcancel">
			<view class="slot-content">

			</view>
		</u-modal>

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

				modalshow: false,
				modaltitle: '',

				pageLoading: true,
				animation: 'twinkle',

				// 2024年6月11日09:52:34 改掉，使用网络请求服务器数据
				articlesets: [{
						setname: '缓解疲劳',
						image: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/wodewenzhangji_1.png',
						abstract: '当你疲劳的时候它是最佳的伴侣',
						articlenumber: 10
					},
					{
						setname: '动人故事',
						image: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/wodewenzhangji_2.png',
						abstract: '这是我的第一个文章集',
						articlenumber: 6
					},
					{
						setname: '等你下课',
						image: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/wodewenzhangji_3.png',
						abstract: '原来你还在这里',
						articlenumber: 3
					}
				],

				articlesetsreal: [],

				modaldeleteid: null,

			}
		},

		onShow() {
			uni.request({
				url: 'http://123.56.217.170:2222/api/articleset/getarticlesetsinfobyuserid/' + this.userid,
				// 测试id
				// url: 'http://123.56.217.170:2222/articleset/getarticlesetsinfobyuserid/1' ,
				method: 'GET',
				data: {},
				success: res => {
					// console.log(res.data);

					this.articlesetsreal.length = 0;

					for (let i = 0; i < res.data.length; i++) {
						let articlesetinfo = {
							setname: res.data[i].setname,
							image: res.data[i].coverpic,
							abstract: res.data[i].setabstract,
							articlenumber: res.data[i].articlenumber,

							articlesetid: res.data[i].articlesetId
						}

						this.articlesetsreal.push(articlesetinfo)

					}

					// 到这里动画结束
					setTimeout(() => {
						this.pageLoading = false;
					}, 500);
				},
				fail: () => {},
				complete: () => {}
			});
		},

		onLoad() {

			uni.request({
				url: 'http://123.56.217.170:2222/api/articleset/getarticlesetsinfobyuserid/' + this.userid,
				// 测试id
				// url: 'http://123.56.217.170:2222/articleset/getarticlesetsinfobyuserid/1' ,
				method: 'GET',
				data: {},
				success: res => {
					// console.log(res.data);

					this.articlesetsreal.length = 0;

					for (let i = 0; i < res.data.length; i++) {
						let articlesetinfo = {
							setname: res.data[i].setname,
							image: res.data[i].coverpic,
							abstract: res.data[i].setabstract,
							articlenumber: res.data[i].articlenumber,

							articlesetid: res.data[i].articlesetId
						}

						this.articlesetsreal.push(articlesetinfo)

					}

					// 到这里动画结束
					setTimeout(() => {
						this.pageLoading = false;
					}, 500);
				},
				fail: () => {},
				complete: () => {}
			});

		},

		methods: {
			backLast() {
				// uni.navigateBack();

				// 修改为直接跳转到个人中心页
				uni.switchTab({
					url: '/pages/main/mine/mine'
				})
			},

			addnewset() {

				uni.navigateTo({
					url: '../myarticlesetinfo/addnewarticleset/addnewarticleset',
					success: res => {
						console.log("跳转页面成功");
					},
					fail: (e) => {
						console.log("跳转页面失败");
						console.log(e);
					},
					complete: () => {}
				});
			},

			articlesetdetail(articlesetid) {
				console.log("查看文章集");
				console.log(articlesetid);

				uni.navigateTo({
					url: '../../myhome/tasarticlesdetail/tasarticlesdetail?articlesetid=' + articlesetid,
					success: res => {
						console.log("跳转页面成功");
					},
					fail: () => {},
					complete: () => {}
				});
			},

			editarticleset(articlesetid) {
				console.log("编辑文章集");

				uni.navigateTo({
					url: '../myarticlesetinfo/editarticleset/editarticleset?articlesetid=' + articlesetid,
					success: res => {
						console.log("跳转页面成功");
					},
					fail: () => {},
					complete: () => {}
				});
			},

			deletethisarticleset(articlesetinfo) {
				console.log("删除文章集");
				// 弹出用户提示
				this.modalshow = true;

				this.modaltitle = "确定要删除 " + articlesetinfo.setname + " 文章集吗? ";
				this.modaldeleteid = articlesetinfo.articlesetid;

			},

			modalconfirm() {
				console.log("确定");
				console.log(this.modaldeleteid);

				// 发出删除文章集请求
				uni.request({
					url: 'http://123.56.217.170:2222/api/articleset/deletearticlesetbyid/' + this.modaldeleteid,
					method: 'GET',
					data: {

					},
					success: res => {
						console.log(res);

						// 重新加载本页面
						uni.reLaunch({
							url: '/pages/main/mine/myarticlesetinfo/myarticlesetinfo'
						})
					},
					fail: () => {},
					complete: () => {}
				});

				this.modalshow = false;


			},

			modalcancel() {
				console.log("取消");
				this.modalshow = false;
			},
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