<script>
	import {
		mapMutations
	} from 'vuex';

	export default {
		onLaunch: function() {
			console.log('App Launch');

			// 尝试获取保存在本地的用户信息
			uni.getStorage({
				key: 'smartreadinguserInfo',
				success: (res) => {
					this.$store.commit('setLogin', res.data)
				}
			})

		},
    onLoad: function() {
      console.log('App Load');
    },
		onShow: function() {
			console.log('App Show')

			// 尝试获取保存在本地的用户信息
			uni.getStorage({
				key: 'smartreadinguserInfo',
				success: (res) => {
					this.$store.commit('setLogin', res.data)
				}
			})
		},
		onHide: function() {
			console.log('App Hide')
		},



	}
</script>

<style>
	/*每个页面公共css */
	.uni-page-head .uni-page-head__title {
		font-size: 25rpx !important;
	}
</style>