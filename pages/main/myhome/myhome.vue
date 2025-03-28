<template>
	<view>

		<!-- 个人主页背景图 -->
		<view>
			<image :src="homepagebackimage" class="homepagebackimage" mode="scaleToFill"></image>
		</view>

		<!-- 状态栏占位 -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<uni-nav-bar left-icon="left" @clickLeft="backLast" :border="false" height="50px" fixed="true"
			background-color="transparent"></uni-nav-bar>

		<image class="useravatar" :src="userinfo.useravatar"
			style="border-radius: 50%; height: 210rpx; width: 210rpx; border: 3px solid white;">
		</image>
		<view
			style="margin-top: 400rpx; width: auto; height: 130rpx; background-color: white;  border-radius: 8% 8% 0 0; display: flex;">

			<view>
				<view
					style="margin-top: 20rpx; width: auto; height: auto; display: flex; text-align: center; align-items: center;">
					<view style=" margin-left: 130rpx; font-weight: bold; font-size: 30rpx;">{{ userinfo.username }}
					</view>
					<view style=" margin-left: 30rpx; font-size: 23rpx; color: gray;">{{ userinfo.userlocation }}
					</view>
				</view>

				<view
					style="margin-top: 10rpx;margin-left: 50rpx; width: auto; height: auto; display: flex; text-align: center; align-items: center;">
					<view><text
							style=" margin-left: 20rpx; font-weight: bold; font-size: 35rpx; color: #169EFF;">{{ followinfo.followed }}</text>
						<text style="font-size: 25rpx; color: gray; margin-left: 10rpx;">关注Ta的人</text>
					</view>
					<view><text
							style=" margin-left: 30rpx; font-size: 35rpx; font-weight: bold; color: #169EFF;">{{ followinfo.follow }}</text>
						<text style="font-size: 25rpx; color: gray; margin-left: 10rpx;">Ta关注的人</text>
					</view>
				</view>
			</view>

			<view class="followbtn"
				style="margin-left: 70rpx; margin-bottom: 50rpx; width: 200rpx; height: 50rpx; display: flex; flex-direction: row; align-items: center; justify-content: space-between; ">
				<view
					style="background-color: #8590A6; border-radius: 50%; width: 50rpx; height: 50rpx; display: flex; align-items: center; justify-content: center;"
					@click="sendmessage">
					<image src="../../../static/images/homepage/send_message.png" style="width: 30rpx; height: 30rpx;">
					</image>
				</view>
				<view @click="follow"
					style="background-color: #169EFF; border-radius: 10%; width: 150rpx; height: 50rpx; margin-left: 20rpx; display: flex; align-items: center; justify-content: center;">
					<image src="../../../static/images/homepage/follow.png" style="width: 30rpx; height: 30rpx;">
					</image>
					<view style="color: white; margin-left: 20rpx; font-size: 23rpx;">关注</view>
				</view>
			</view>
		</view>

		<view style="height: 15rpx; background-color: #F6F7FB;"></view>

		<view style="margin-top: 10rpx;">
			<uni-segmented-control :current="current" :values="items" :style-type="styleType"
				:active-color="activeColor" @clickItem="onClickItem" />
		</view>

		<view style="margin-left: 30rpx; margin-right: 30rpx;">
			<u-divider></u-divider>
		</view>

		<view>
			<view v-if="current === 0" style="background-color: white;">
				<u-scroll-list>
					<view v-for="(item, index) in recentreadinglist" :key="index">
						<view
							style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
							<image :src="item.image"
								style="width: 180rpx; height: 250rpx; margin-left: 30rpx; margin-right: 30rpx; border: 1px solid #ccc;"
								mode="aspectFill"></image>
							<view style="margin-top: 15rpx; font-size: 27rpx;"> {{ item.name }} </view>
						</view>
					</view>
				</u-scroll-list>
			</view>
			<view v-if="current === 1">
				<view v-for="(item, index) in articlesetsreal" :key="index"
					@click="totasarticlesdetail(item.articlesetid)">
					<view style="height: auto;   display: flex; margin: 15rpx;">
						<view style="display: flex;">
							<view>
								<image :src="item.image"
									style="height: 270rpx; width: 200rpx; margin-top: 20rpx; margin-left: 40rpx; border-radius: 3%;">
								</image>
							</view>
							<view style="margin-top: 50rpx; margin-left: 30rpx;">
								<view style="font-weight: bold; font-size: 28rpx;">{{ item.setname }}</view>
								<view style="margin-top: 20rpx; color: gray; font-size: 23rpx; margin-right: 20rpx;">
									{{ item.abstract }}
								</view>
								<view style="margin-top: 80rpx; color: gray; font-size: 21rpx;">
									总共有<text
										style="margin-left: 5rpx; margin-right: 5rpx;">{{ item.articlenumber }}</text>篇文章
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view style="height: 15rpx; background-color: #F6F7FB;"></view>

		<view style="height: auto; margin: 25rpx;">
			<view style="font-weight: bold; margin-left: 15rpx; font-size: 25rpx;">
				TA的想法
			</view>

			<view v-for="(item, index) in hisideas" :key="index">
				<view style="height: 370rpx;  margin: 30rpx;display: flex; flex-direction: row;">
					<view style="height: 370rpx; width: 100rpx; ">
						<image :src="useravatar"
							style="border-radius: 50%; width: 65rpx; height: 65rpx;  margin-top: 10rpx;">
						</image>
					</view>
					<view style="height: 370rpx; width: 100%; ">

						<!-- 用户名和更多按钮 -->
						<view style="display: flex; flex-direction: column;">
							<view style="display: flex; ">
								<view style="color: gray; font-size: 25rpx; margin-top: 5rpx;"> {{ username }} </view>
								<view style="margin-left: 430rpx;">
									<image src="../../../static/images/homepage/more.png"
										style="width: 35rpx; height: 35rpx;"></image>
								</view>
							</view>
						</view>

						<view style="display: flex; align-items: center;">
							<view><uni-rate size="15" allow-half :readonly="true" :value="item.markscore / 2" max="5" />
							</view>
							<view style="margin-left: 10rpx; font-size: 23rpx; color: gray;">{{ item.time }}</view>
						</view>

						<view style=" height: auto; margin-top: 10rpx; font-size: 25rpx;">
							{{ item.content }}
						</view>

						<view
							style=" background-color: #F6F7FB; height: 160rpx;  margin-right: 20rpx; margin-top: 15rpx; display: flex;">
							<image :src="item.articleinfo.image"
								style="width: 100rpx; height: 150rpx; margin-top: 5rpx; margin-left: 10rpx;"></image>
							<view style="display: flex; flex-direction: column;">
								<view
									style="margin-top: 30rpx; margin-left: 30rpx; font-weight: bold; font-size: 25rpx;">
									{{ item.articleinfo.name }}
								</view>
								<view style="margin-top: 10rpx; margin-left: 30rpx; color: gray; font-size: 20rpx;">
									{{ item.articleinfo.author }}
								</view>
							</view>
						</view>

						<view style="display: flex; margin-left: 390rpx; margin-top: 15rpx;">
							<view style="display: flex; justify-content: center; align-items: center;">
								<image src="../../../static/images/homepage/review.png"
									style="width: 25rpx; height: 25rpx;"></image>
								<view style="margin-left: 10rpx;  color: gray; font-size: 23rpx;">
									{{ item.reviewnumber }}
								</view>
							</view>
							<view
								style="display: flex;justify-content: center; align-items: center; margin-left: 20rpx;">
								<image src="../../../static/images/homepage/givelike.png"
									style="width: 30rpx; height: 30rpx;"></image>
								<view style="margin-left: 10rpx; color: gray; font-size: 23rpx;">
									{{ item.givelikenumber }}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

		</view>

		<view style="height: 50rpx;">

		</view>

	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';

	export default {

		computed: {
			...mapState(['userid', 'useraccount', 'username', 'useravatar', 'personalsignature', 'location', 'isLogin'])
		},

		data() {
			return {

				items: ['最近阅读', 'TA的文章集'],
				styles: [{
						value: 'button',
						text: '按钮',
						checked: true
					},
					{
						value: 'text',
						text: '文字'
					}
				],
				colors: ['white'],
				current: 0,
				colorIndex: 0,
				activeColor: '#007aff',
				styleType: 'text',

				currenttabindex: 0,

				tablist: [{
					name: '最近阅读'
				}, {
					name: '文章集'
				}],

				userinfo: {
					username: this.$store.state.username,
					useravatar: this.$store.state.useravatar,
					userlocation: this.$store.state.location
				},

				followinfo: {
					follow: 13, // ta 关注的人数
					followed: 10 // 关注ta 的人数
				},

				homepagebackimage: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/homepagebackimage.png',

				recentreadinglist: [{
						name: '熊镇',
						image: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/zuijinyuedu_1.png'
					},
					{
						name: '甜月亮',
						image: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/zuijinyuedu_2.png'
					},
					{
						name: '大潜能',
						image: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/zuijinyuedu_3.png'
					},
					{
						name: '熊镇',
						image: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/zuijinyuedu_1.png'
					},
				],

				hisideas: [{
						markscore: 8.0,
						time: '2024年5月5日 18:29',
						articleinfo: {
							name: '夜气',
							author: '舒飞廉',
							image: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/wodexiangfa_1.png'
						},
						givelikenumber: 10,
						reviewnumber: 0,
						content: '这篇短文写得真是太棒了！深入人心'
					},
					{
						markscore: 9.0,
						time: '2024年5月3日 12:20',
						articleinfo: {
							name: '等你下课',
							author: '周杰伦',
							image: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/wodewenzhangji_3.png'
						},
						givelikenumber: 7,
						reviewnumber: 2,
						content: '站在你学校的操场看星空，教室里的灯还亮着你没走~'
					},
				],

				hisarticlesets: [{
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

				articlesetsreal: []
			}
		},

		onShow() {

		},

		onLoad() {

			// 获取Ta的文章集信息
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
							articlesetid: res.data[i].articlesetId,
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

			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},

			backLast() {
				uni.navigateBack()
			},

			sendmessage() {
				console.log("点击了发送消息");
			},

			follow() {
				console.log("点击了关注");
			},

			// 跳转到TA的文章集页面【他人视角】
			totasarticlesdetail(articlesetid) {

				// console.log(item);

				uni.navigateTo({
					url: '../myhome/tasarticlesdetail/tasarticlesdetail?articlesetid=' + articlesetid,
					success: res => {
						console.log("跳转页面成功");
					},
					fail: () => {
						console.log("跳转页面失败");
					},
					complete: () => {}
				});
			}
		}
	}
</script>

<style scoped lang="scss">
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

	.homepagebackimage {
		position: absolute;
		z-index: -1;

		width: 100%;
		height: 25%;

	}

	.useravatar {
		margin-top: 170rpx;
		margin-left: 80rpx;

		position: absolute;

	}

	.followbtn {
		/* 		position: absolute;
		right: 50rpx;
		bottom: 1050rpx; */

	}
</style>