<template>
  <view>
    <!-- 状态栏占位 -->
    <view class="status_bar">
      <view class="top_view"></view>
    </view>

    <view
        style="height: 33%;  position: fixed;top: 0; width: 100%; z-index: 999; background-color: white;">
      <uni-nav-bar left-icon="left" @clickLeft="backLast" :border="false" height="60px"
                   :title="setinfo.setname"></uni-nav-bar>
      <!-- 暂时写死了，后面根据文章集唯一ID 获取文章集数据 -->
      <!-- 简介区 -->
      <view style=" height: auto; padding: 30rpx; display: flex;">
        <image :src="setinfo.image"
               style="width: 220rpx; height: 300rpx; box-shadow: 10px 10px 4px rgba(0, 0, 0, 0.1); border-radius: 3%;">
        </image>

        <view style="display: flex; flex-direction: column; margin-left: 40rpx; justify-content: center;">
          <view style="font-weight: bold; font-size: 32rpx;">{{ setinfo.setname }}</view>
          <view style="margin-top: 40rpx; color: gray; font-size: 23rpx;">{{ setinfo.abstract }}</view>

          <view style="margin-top: 80rpx; height: 50rpx; width: auto; display: flex;  align-items: center;">

            <view @click="topersonhomepage"
                  style="display: flex; justify-content: center; align-items: center;">
              <image :src="getuseravatar" style="width: 40rpx; height: 40rpx; border-radius: 50%;">
              </image>
              <view style="font-size: 22rpx; margin-left: 10rpx; color: gray;">{{ setinfo.username }}
              </view>
            </view>
            <view style="font-size: 22rpx; margin-left: 10rpx; color: gray;">创建于{{ createtime }}</view>

          </view>
        </view>

        <view style="height: 20rpx; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);"></view>
        <u-divider></u-divider>
      </view>
    </view>

    <!-- 文章列表区 -->
    <view style=" height: 67%; margin-top: 510rpx; ">
      <scroll-view scroll-y="true" style="height: 100%;">
        <view style=""></view>
        <view v-for="(item, index) in articlesetinlist" :key="index"
              style="margin: 40rpx; height: 350rpx; background-color: #ffffff;"
              @click="toarticledetail(item.articleid)">
          <view style="display: flex; align-items: center; ">
            <image :src="item.pic"
                   style="width: 200rpx; height: 300rpx; margin-top: 20rpx; border-radius: 3%;">
            </image>
            <view style="display: flex; flex-direction: column; margin-left: 10rpx;">
              <view
                  style="margin-top: 60rpx; margin-left: 20rpx; white-space: nowrap; overflow: hidden; text-overflow:ellipsis; width: 400rpx;">
                <text style="font-weight: bold;font-size: 28rpx; ">
                  {{ item.title }}
                </text>
              </view>
              <view
                  style="margin-top: 10rpx; margin-left: 20rpx; font-size: 23rpx; color: #3FAFFF; font-weight: bold;">
                <text>
                  {{ item.author }}
                </text>
              </view>

              <view style="display: flex; margin-left: 20rpx; margin-top: 30rpx; gap: 15rpx;">
                <view v-for="(item, i) in item.labels" :key="i">
                  <uni-tag :text="item"
                           custom-style="background-color: #E7F5FF;  color: #43B0FF; font-weight: bold; border: white;">
                  </uni-tag>
                </view>
              </view>

              <view style="margin-left: 20rpx;margin-top: 40rpx; display: flex; text-align: center;">
                <uni-rate size="15" allow-half :readonly="true" :value="item.mark / 2" max="5"/>
                <view style="color: gray; font-size: 20rpx; margin-left: 10rpx;">
                  <text>
                    {{ item.mark.toFixed(1) }} 分
                  </text>
                </view>
                <view style="color: gray; font-size: 20rpx;">
                  <text>
                    &nbsp; ({{ item.numberofcomments }}人评论)
                  </text>
                </view>
              </view>

            </view>
          </view>
          <u-divider></u-divider>
        </view>
      </scroll-view>
    </view>

    <view style="height: 10rpx;"></view>

    <ls-loading text="正在获取文章集文章列表信息..." :animation="animation" v-if="pageLoading" fontSize="30"
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

      createtime: '',

      pageLoading: true,
      animation: 'twinkle',

      navbartitle: '',

      setinfo: {},
      getuseravatar: '',

      articlesetinlist: [],

      articlesetsids: []
    }
  },

  onLoad(option) {

    // 2024年6月11日10:48:57 修改

    uni.request({
      url: 'http://123.56.217.170:2222/api/articleset/getarticlesetinfobyid/' + option.articlesetid,
      method: 'GET',
      data: {},
      success: res => {
        console.log("文章集信息如下: ");
        console.log(res.data);
        // this.navbartitle = res.data.setname;

        // 获取文章列表信息
        this.setinfo = {
          setname: res.data.setname,
          image: res.data.coverpic,
          abstract: res.data.setabstract,
          username: res.data.setauthor,
        };


        let articlesetcreatetime = new Date(Date.parse(res.data.createTime));

        var year = articlesetcreatetime.getFullYear();
        var month = ("0" + (articlesetcreatetime.getMonth() + 1)).slice(-2);
        var day = ("0" + articlesetcreatetime.getDate()).slice(-2);

        var formattedDate = year + "年" + month + "月" + day + "日";

        this.createtime = formattedDate;

        this.articlesetsids = res.data.setarticles;


        // 请求用户信息
        uni.request({
          url: 'http://123.56.217.170:2222/api/user/getuserinfobyUserId/' + this.userid,
          method: 'GET',
          data: {},
          success: res => {
            console.log(res.data);
            this.getuseravatar = res.data.userAvatar;

            // 拿到文章ID列表
            console.log(this.articlesetsids);

            uni.request({
              url: 'http://123.56.217.170:2222/api/article/getarticlesinfobyids',
              method: 'POST',
              data: this.articlesetsids,
              success: res => {
                console.log("文章集所含文章列表信息如下: ");
                console.log(res.data);
                this.articlesetinlist.length = 0;

                for (let i = 0; i < res.data.length; i++) {
                  let articleinfo = {
                    title: res.data[i].title,
                    author: res.data[i].author,
                    pic: res.data[i].coverpic,
                    abstract: res.data[i].articleabstract,
                    mark: res.data[i].markscore,
                    numberofcomments: res.data[i]
                        .commentsnumber,
                    labels: JSON.parse(res.data[i]
                        .articlelabel),
                    isfree: res.data[i].freeornot === 0 ?
                        true : false,
                    articleid: res.data[i].articleId,
                    fulltexturl: res.data[i]
                        .aliyuncontentoosurl
                  };

                  this.articlesetinlist.push(articleinfo);
                }

                // 到这里动画结束
                setTimeout(() => {
                  this.pageLoading = false;
                }, 500);
              },
              fail: () => {
              },
              complete: () => {
              }
            });
          },
          fail: () => {
          },
          complete: () => {
          }
        });


      },
      fail: () => {
      },
      complete: () => {
      }
    });

    // // console.log(e);
    // // this.navbartitle = e.setname
    // let setinfo = JSON.parse(option.setinfo);

    // this.setinfo = setinfo;

    // // 这里模拟生成文章列表数据，实际是请求服务器获得
    // let articleinfo = {
    // 	title: '不接受预定的餐厅',
    // 	author: '郁喆隽',
    // 	pic: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/1.png',
    // 	abstract: '不知从何时起，大家都开始用手机软件来预订餐厅了，搞得那些不习惯用手机的人，也不得不提前几天打电话订座。随意逛街、到店即食的时代似乎正在不知不觉中翻篇。一家餐厅如果非常火爆，自然就很难订到位子。对此人们也已经习以为常。经常看到有些餐厅门可罗雀，隔壁的一家却生意兴隆，等位的人虽然极不耐烦，却也不愿意换另一家。',
    // 	mark: 9.0,
    // 	numberofcomments: 68,
    // 	labels: ['文学', '感人'],
    // 	isfree: false
    // };
    // for (let i = 0; i < setinfo.articlenumber; i++) {
    // 	this.articlesetinlist.push(articleinfo)
    // }
  },

  methods: {
    backLast() {
      uni.navigateBack()
    },

    toarticledetail(articleid) {
      console.log("跳转到文章详情页");

      console.log(articleid);

      uni.navigateTo({
        url: '../../../main/article/detail/detail?articleid=' + articleid,
        articleid,
        success: res => {
          console.log("跳转文章详情页成功");
        },
        fail: () => {
        },
        complete: () => {
        }
      });
    },

    topersonhomepage() {
      console.log("跳转到个人主页");
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
</style>