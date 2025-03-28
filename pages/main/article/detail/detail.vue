<template>
	<view>
		<!-- 状态栏占位 -->
		<view class="status_bar"></view>
		<uni-nav-bar left-icon="left" @clickLeft="backLast" :border="false" height="60px"></uni-nav-bar>
		<!-- <view style="height: 10rpx; background-color: #F6F7FB;"></view> -->
		<view class="article-info">
			<view class="info">
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

					<view style="display: flex; margin-left: 20rpx; margin-top: 30rpx; gap: 15rpx; flex-wrap: wrap;">
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
			<view class="positions" style="display: flex; justify-content: space-between; align-items: center;">
				<view class="positionitem" @click="nowreading">
					<image src="../../../../static/images/operate/read.png" style="width: 40rpx; height: 40rpx;">
					</image>
					<text style="font-size: 20rpx; color: #BFBFBF; margin-top: 10rpx;">阅读</text>
				</view>
				<view class="positionitem" @click="collect">
					<image :src="collecitonif ? yishoucangpic : weishoucangpic" style="width: 50rpx; height: 50rpx;">
					</image>
					<text style="font-size: 20rpx; color: #BFBFBF;">{{ collecitonif ? yishoucang : weishoucang }}</text>
				</view>
				<view class="positionitem" @click="share">
					<image src="../../../../static/images/operate/share.png" style="width: 50rpx; height: 50rpx;">
					</image>
					<text style="font-size: 20rpx; color: #BFBFBF;">分享</text>
				</view>
			</view>
		</view>

		<view style="height: 15rpx; background-color: #F6F7FB;"></view>
		<view class="article-abstract" style="display: flex; flex-direction: column;">
			<view> <text style="font-size: 29rpx; font-weight: bold; margin: 20rpx; color: #616161;">简介</text></view>
			<view style="font-size: 25rpx; margin: 20rpx; color: #AEAEAE; letter-spacing: 0.05em;">
				<!-- {{ articleinfo.abstract }} -->
				<u-read-more showHeight="60" :toggle="true" backgroundImage="none" closeText="更多">
					<rich-text :nodes="articleinfo.abstract"></rich-text>
				</u-read-more>
			</view>
		</view>

		<view style="height: 15rpx; background-color: #F6F7FB;"></view>

		<view class="relevant-recommendation" style="display: flex; flex-direction: column;">


			<view> <text style="font-size: 29rpx; font-weight: bold; margin: 20rpx; color: #616161;">相关推荐</text></view>

			<view class="recommendeditem"
				style="display: flex; flex-direction: row; justify-content: space-between; margin: 20rpx;">
				<view v-for="(item, index) in recommendedarticles" :key="index">
					<view style=" width: 180rpx; background-color: white; display: flex; flex-direction: column;">

						<image :src="item.pic"
							style="width: 180rpx; height: 250rpx; border: 2px solid #ccc; border-radius: 5px; ;"
							mode="aspectFill"></image>
						<view style="font-size: 25rpx; margin-top: 10rpx; font-weight: 600;"> {{ item.title }} </view>
					</view>
				</view>
			</view>
		</view>

		<view style="height: 100rpx;"></view>

		<ls-loading text="正在获取文章详情信息..." :animation="animation" v-if="pageLoading" fontSize="30"
			:nav="true"></ls-loading>

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

				yishoucang: '已收藏',
				weishoucang: '未收藏',

				yishoucangpic: '../../../../static/images/operate/collect_.png',
				weishoucangpic: '../../../../static/images/operate/collect.png',

				articleinfo: {
					title: '不接受预定的餐厅',
					author: '郁喆隽',
					pic: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/1.png',
					abstract: '不知从何时起，大家都开始用手机软件来预订餐厅了，搞得那些不习惯用手机的人，也不得不提前几天打电话订座。随意逛街、到店即食的时代似乎正在不知不觉中翻篇。一家餐厅如果非常火爆，自然就很难订到位子。对此人们也已经习以为常。经常看到有些餐厅门可罗雀，隔壁的一家却生意兴隆，等位的人虽然极不耐烦，却也不愿意换另一家。',
					mark: 9.0,
					numberofcomments: 68,
					labels: ['文学', '感人'],
					isfree: false
				},

				thisarticlefulltexturl: '',
				thisarticleid: null,

				pageLoading: true,
				animation: 'twinkle',

				recommendedarticles: [{
						title: '传家之物',
						pic: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/tuijian1.png'
					},
					{
						title: '邦查女孩',
						pic: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/tuijian2.png  '
					},
					{
						title: '羊角口哨',
						pic: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/tuijian3.png'
					}
				],

				collecitonif: null,
			}
		},

		onLoad(e) {
			console.log(e.articleid);

			uni.request({
				url: 'http://123.56.217.170:2222/api/article/getarticleinfobyid/' + e.articleid,
				method: 'GET',
				data: {},
				success: res => {

					console.log("获取到的文章信息如下: ");
					console.log(res.data);


					// 设置到页面上进行展示
					this.articleinfo.title = res.data.title;
					this.articleinfo.author = res.data.author;
					this.articleinfo.pic = res.data.coverpic;
					this.articleinfo.abstract = res.data.articleabstract;
					this.articleinfo.mark = res.data.markscore;
					this.articleinfo.numberofcomments = res.data.commentsnumber;
					this.articleinfo.labels = JSON.parse(res.data.articlelabel);
					this.articleinfo.isfree = res.data.freeornot === 0 ? true : false;

					this.thisarticlefulltexturl = res.data.aliyuncontentoosurl;
					this.thisarticleid = res.data.articleId;

					// 请求本篇文章的收藏情况
					// 这里再获取一下收藏状态信息
					uni.request({
						url: 'http://123.56.217.170:2222/api/collection/ifornot/' + this.userid + "/" +
							this.thisarticleid,
						method: 'GET',
						data: {},
						success: res => {
							// console.log("当前登录用户对此篇文章的收藏状态为");
							// console.log(res.data);

							this.collecitonif = res.data;

							// 到这里动画结束
							setTimeout(() => {
								this.pageLoading = false;
							}, 500);

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
			 backLast() {
				uni.navigateBack()
			},
			more() {
				uni.showToast({
					title: '点击了更多',
					icon: 'none'
				});
			},
			nowreading() {

				// 带着ID、标题、oos地址跳转到阅读页面
				// 这下带上文章标题和oos_url
				let articleinfo = {
					articleid: this.thisarticleid,
					title: this.articleinfo.title,
					oosurl: this.thisarticlefulltexturl
				}

				uni.navigateTo({
					url: '../../../main/article/reading/reading?article=' + JSON.stringify(articleinfo),
					success: res => {
						console.log("正在加载文章资源");
					},
					fail: () => {
						console.log("跳转阅读页面失败");
					},
					complete: () => {}
				});

			},
			collect() {


				// 发送请求进行真实操作
				// 收藏操作
				if (!this.collecitonif) {


					uni.request({
						url: 'http://123.56.217.170:2222/api/collection/favoperation',
						method: 'POST',
						data: {
							"userid": this.userid,
							"articleid": this.thisarticleid
						},
						success: res => {
							console.log(res);
							this.collecitonif = !this.collecitonif;

							uni.showToast({
								title: '收藏文章成功!'
							});
						},
						fail: () => {},
						complete: () => {}
					});

				} else { // 取消收藏操作

					uni.request({
						url: 'http://123.56.217.170:2222/api/collection/cancelfavoperation',
						method: 'POST',
						data: {
							"userid": this.userid,
							"articleid": this.thisarticleid
						},
						success: res => {
							console.log(res);

							this.collecitonif = !this.collecitonif;
							uni.showToast({
								title: '取消收藏成功!'
							});

						},
						fail: () => {},
						complete: () => {}
					});


				}

			},
			share() {
				uni.showToast({
					title: '分享',
					icon: 'none'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;

	}

	.article-info {
		margin-top: 10rpx;
		width: 100%;
		height: auto;
	}

	.article-abstract {
		margin-top: 20rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		padding: 30rpx;
		height: auto;
		// background-color: cadetblue;
	}

	.relevant-recommendation {
		margin-top: 20rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;

		padding: 30rpx;

		height: auto;
	}

	.info {

		display: flex;

		margin-left: 20rpx;
		margin-right: 20rpx;

		height: 25vh;

	}

	.positions {
		margin-left: 100rpx;
		margin-right: 100rpx;

		height: 7vh;
		margin-top: 40rpx;
	}

	.positionitem {
		width: 100rpx;
		height: 100rpx;
		background-color: white;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>