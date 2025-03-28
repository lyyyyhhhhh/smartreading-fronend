import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({

	state: { // 缓存数据
		userid: null,
		username: '未登录',
		useraccount: '',
		userphonenumber: '',
		useravatar: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/morentouxiang.png',
		personalsignature: '点击登录后畅享个性化文章阅读体验',
		occupation: '',
		email: '',
		location: '未知',
		isLogin: false, // 判断是否登录
	},
	mutations: { // 事件
		setDefaultUserId(state) {
			state.userid = 1
		},

		setLogin(state, payload) {
			state.userid = payload.userid;
			state.username = payload.username;
			state.useraccount = payload.useraccount;
			state.useravatar = payload.useravatar;
			state.userphonenumber = payload.phonenumber;
			state.personalsignature = payload.personalsignature;
			state.occupation = payload.occupation;
			state.email = payload.email;
			state.location = payload.location;
			state.isLogin = payload.isLogin;

			// 将用户信息保存到本地
			uni.setStorage({
				key: 'smartreadinguserInfo',
				data: payload
			})
		},

		// 更新用户信息 [这里是为了同步更新本地的设置]
		updateuserinfo(state, payload) {

		}

	},

})

export default store