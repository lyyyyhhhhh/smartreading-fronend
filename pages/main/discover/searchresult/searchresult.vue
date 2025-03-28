<template>
  <view>
    <!-- 状态栏占位 -->
    <view class="status_bar">
      <view class="top_view"></view>
    </view>
    <view style="width: 100%; display: flex; justify-content: center; align-items: center;" class="search_bar">

      <uni-data-select v-model="searchscreenvalue" placeholder="" :localdata="searchscreenrange"
                       @change="searchscreenchange"
                       style="width: auto; background-color: white; height: 60rpx;  margin-left: 20rpx; z-index: 999;"
                       v-show="selectshow" :clear="false"></uni-data-select>

      <uni-search-bar cancelButton="none" placeholder="搜索文章、主题、用户名 ..." v-model="searchValue"
                      :style="elementStyle" @clear="clear" @confirm="searchbarconfirm"></uni-search-bar>
    </view>

    <view style="margin: 20rpx; font-weight: bold; font-size: 27rpx;" v-show="prompttextshow">
      {{ prompttext }}
    </view>

    <view style="display: flex; flex-direction: column; margin: 20rpx;">
      <!-- 主题 -->
      <view v-if="searchscreenvalue === 0">
        <view v-for="(item, index) in real_themearticleinfo" :key="index"
              style="display: flex; margin-top: 20rpx; background-color: #F8F8F8; height: 250rpx; align-items: center; ">
          <image :src="item.pic"
                 style="width: 170rpx; height: 220rpx; margin-left: 10rpx; border-radius: 5%;"></image>

          <view style="display: flex; flex-direction: column; margin-left: 40rpx; ">
            <view
                style="font-size: 27rpx;overflow: hidden; white-space: nowrap; text-overflow: ellipsis; width: 450rpx;">
              {{ item.articlename }}
            </view>
            <view style="margin-top: 20rpx; font-size: 23rpx; color: gray;">{{ item.author }}</view>
          </view>


        </view>

        <view style="height: 20rpx;"></view>
      </view>

      <!-- 文章 -->
      <view v-if="searchscreenvalue === 1">
        <view v-for="(item, index) in real_articlearticleinfo" :key="index"
              style="display: flex; margin-top: 20rpx; background-color: #F8F8F8; height: 250rpx; align-items: center; ">
          <image :src="item.pic"
                 style="width: 170rpx; height: 220rpx; margin-left: 10rpx; border-radius: 5%;"></image>
          <view style="display: flex; flex-direction: column; margin-left: 40rpx; ">
            <view
                style="font-size: 27rpx; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; width: 450rpx; ">
              {{ item.articlename }}
            </view>
            <view style="margin-top: 20rpx; font-size: 23rpx; color: gray;">{{ item.author }}</view>
          </view>


        </view>

        <view style="height: 20rpx;"></view>
      </view>

      <!-- 用户 -->
      <view v-if="searchscreenvalue === 2">
        <view style="display: flex; margin: 20rpx; align-items: center;">
          <image :src="real_searchuserinfo.useravatar"
                 style="height: 150rpx; width: 150rpx; border-radius: 50%;">
          </image>
          <view style="display: flex; flex-direction: column; margin-left: 30rpx;">
            <view style="font-size: 27rpx;">{{ real_searchuserinfo.username }}</view>
            <view style="margin-top: 20rpx; font-size: 23rpx; color: gray;">
              {{ real_searchuserinfo.location }}
            </view>
          </view>
        </view>
      </view>

      <view style="height: 20rpx;"></view>

    </view>

    <ls-loading text="智阅正在全力搜索中..." :animation="animation" v-if="pageLoading" fontSize="30"></ls-loading>

    <u-empty :show="emptyshow" mode="search" icon="http://cdn.uviewui.com/uview/empty/search.png">
    </u-empty>

  </view>
</template>

<script>
import avatar from '../../../../uni_modules/uview-ui/libs/config/props/avatar';

export default {
  data() {
    return {

      emptyshow: false,

      prompttextshow: true,

      pageLoading: true,
      animation: 'twinkle',

      placeholder: '',

      selectshow: true,

      searchscreenvalue: 0,

      searchValue: '',

      prompttext: '已为您找到',

      // 三种情况的模拟搜索结果
      // 主题
      themearticleinfo: [{
        articlename: '他给这世界留下了什么',
        author: '蒋文月',
        pic: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/searchres_1.png'
      },
        {
          articlename: '鲁迅施茶',
          author: '张蓬云',
          pic: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/searchres_2.png'
        },
      ],


      real_themearticleinfo: [],

      // 文章
      articlearticleinfo: [{
        articlename: '我决定爱你',
        author: '林宛瑜',
        pic: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/searchres_3.png'
      }],

      real_articlearticleinfo: [],

      // 用户
      searchuserinfo: {
        username: '丁家雄',
        useravatar: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/dingjiaxiong.jpg',
        location: '四川省 成都市'
      },

      real_searchuserinfo: {
        username: '',
        useravatar: '',
        location: ''
      },

      searchscreenrange: [{
        value: 0,
        text: "主题"
      },
        {
          value: 1,
          text: "文章"
        },
        {
          value: 2,
          text: "用户"
        },
      ],
    }
  },

  computed: {
    elementStyle() {
      return {
        'z-index': 999,
        'width': '75%'
      };
    }
  },

  onLoad(option) {

    // 暂无封面的url
    // https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/proenv/temporarilynocover.png

    console.log(JSON.parse(option.searchobj).select);
    console.log(JSON.parse(option.searchobj).searchvalue);

    this.searchscreenvalue = JSON.parse(option.searchobj).select;
    this.searchValue = JSON.parse(option.searchobj).searchvalue;

    if (this.searchscreenvalue === 0) {
      console.log("进行主题搜索");

      // 请求elasticsearch进行文档搜索
      uni.request({
        url: 'http://123.56.217.170:9199/articles/_search',
        method: 'POST',
        data: {
          "track_total_hits": true,
          "size": 9999,
          "query": {
            "match": {
              "标签数组": this.searchValue
            }
          }
        },
        success: res => {
          console.log(res.data);

          // 找到的数据数量
          this.prompttext = "已为您找到 " + res.data.hits.total.value + " 篇文章"

          // 如果啥也没找到，图标show
          if (res.data.hits.total.value === 0) {
            this.emptyshow = true;

            this.prompttextshow = false;

            // 到这里动画结束
            setTimeout(() => {
              this.pageLoading = false;
            }, 1000);
          } else {

            this.emptyshow = false;
            this.prompttextshow = true;

            for (let i = 0; i < res.data.hits.total.value; i++) {

              let articleinfo = {
                articlename: res.data.hits.hits[i]._source.文章标题,
                author: res.data.hits.hits[i]._source.文章作者,
                pic: '../../../../static/images/search/temporarilynocover.png'
              }

              this.real_themearticleinfo.push(articleinfo);
            }

            // 到这里动画结束
            setTimeout(() => {
              this.pageLoading = false;
            }, 1000);
          }


        },
        fail: () => {
        },
        complete: () => {
        }
      });

    } else if (this.searchscreenvalue === 1) {
      console.log("进行文章搜索");

      // 请求elasticsearch进行文档搜索
      uni.request({
        url: 'http://123.56.217.170:9199/articles/_search',
        method: 'POST',
        data: {
          "track_total_hits": true,
          "size": 1000,
          "query": {
            "match_phrase": {
              "文章标题": this.searchValue
            }
          }
        },
        success: res => {
          console.log(res.data);

          this.prompttext = "已为您找到 " + res.data.hits.total.value + " 篇文章"


          if (res.data.hits.total.value === 0) {
            this.emptyshow = true;

            this.prompttextshow = false;

            // 到这里动画结束
            setTimeout(() => {
              this.pageLoading = false;
            }, 1000);
          } else {

            this.emptyshow = false;
            this.prompttextshow = true;

            for (let i = 0; i < res.data.hits.total.value; i++) {

              let articleinfo = {
                articlename: res.data.hits.hits[i]._source.文章标题,
                author: res.data.hits.hits[i]._source.文章作者,
                pic: '../../../../static/images/search/temporarilynocover.png'
              }

              this.real_articlearticleinfo.push(articleinfo);
            }

            // 到这里动画结束
            setTimeout(() => {
              this.pageLoading = false;
            }, 1000);
          }


        },
        fail: () => {
        },
        complete: () => {
        }
      });

    } else if (this.searchscreenvalue === 2) {
      console.log("进行用户搜索");

      // 请求elasticsearch进行文档搜索
      uni.request({
        url: 'http://123.56.217.170:9199/users/_search',
        method: 'POST',
        data: {
          "query": {
            "match_phrase": {
              "username": this.searchValue
            }
          }
        },
        success: res => {
          console.log(res.data);

          this.prompttext = "已为您找到 " + res.data.hits.total.value + " 位用户"

          if (res.data.hits.total.value === 0) {
            this.emptyshow = true;

            this.prompttextshow = false;

            // 到这里动画结束
            setTimeout(() => {
              this.pageLoading = false;
            }, 1000);
          } else {

            this.emptyshow = false;
            this.prompttextshow = true;

            this.real_searchuserinfo.username = res.data.hits.hits[0]._source.username;
            this.real_searchuserinfo.useravatar = res.data.hits.hits[0]._source.avatarUrl;
            this.real_searchuserinfo.location = res.data.hits.hits[0]._source.location;

            // 到这里动画结束
            setTimeout(() => {
              this.pageLoading = false;
            }, 1000);
          }


        },
        fail: () => {
        },
        complete: () => {
        }
      });
    }

  },

  methods: {

    clear() {
      console.log("搜索框内容被清除了，那就该返回首页了");
      uni.switchTab({
        url: '../discover'
      })
    },

    searchscreenchange() {

      this.pageLoading = true;

      if (this.searchscreenvalue === 0) {
        console.log("进行主题搜索");

        // 请求elasticsearch进行文档搜索
        uni.request({
          url: 'http://123.56.217.170:9199/articles/_search',
          method: 'POST',
          data: {
            "track_total_hits": true,
            "size": 9999,
            "query": {
              "match": {
                "标签数组": this.searchValue
              }
            }
          },
          success: res => {
            console.log(res.data);

            // 找到的数据数量
            this.prompttext = "已为您找到 " + res.data.hits.total.value + " 篇文章"

            // 如果啥也没找到，图标show
            if (res.data.hits.total.value === 0) {
              this.emptyshow = true;

              this.prompttextshow = false;

              // 到这里动画结束
              setTimeout(() => {
                this.pageLoading = false;
              }, 1000);
            } else {

              this.emptyshow = false;
              this.prompttextshow = true;

              this.real_themearticleinfo.length = 0;

              for (let i = 0; i < res.data.hits.total.value; i++) {

                let articleinfo = {
                  articlename: res.data.hits.hits[i]._source.文章标题,
                  author: res.data.hits.hits[i]._source.文章作者,
                  pic: '../../../../static/images/search/temporarilynocover.png'
                }

                this.real_themearticleinfo.push(articleinfo);
              }

              // 到这里动画结束
              setTimeout(() => {
                this.pageLoading = false;
              }, 1000);
            }


          },
          fail: () => {
          },
          complete: () => {
          }
        });

      } else if (this.searchscreenvalue === 1) {
        console.log("进行文章搜索");

        // 请求elasticsearch进行文档搜索
        uni.request({
          url: 'http://123.56.217.170:9199/articles/_search',
          method: 'POST',
          data: {
            "track_total_hits": true,
            "size": 1000,
            "query": {
              "match_phrase": {
                "文章标题": this.searchValue
              }
            }
          },
          success: res => {
            console.log(res.data);

            this.prompttext = "已为您找到 " + res.data.hits.total.value + " 篇文章"

            if (res.data.hits.total.value === 0) {
              this.emptyshow = true;

              this.prompttextshow = false;

              // 到这里动画结束
              setTimeout(() => {
                this.pageLoading = false;
              }, 1000);
            } else {

              this.emptyshow = false;
              this.prompttextshow = true;

              this.real_articlearticleinfo.length = 0;

              for (let i = 0; i < res.data.hits.total.value; i++) {

                let articleinfo = {
                  articlename: res.data.hits.hits[i]._source.文章标题,
                  author: res.data.hits.hits[i]._source.文章作者,
                  pic: '../../../../static/images/search/temporarilynocover.png'
                }

                this.real_articlearticleinfo.push(articleinfo);
              }

              // 到这里动画结束
              setTimeout(() => {
                this.pageLoading = false;
              }, 1000);
            }


          },
          fail: () => {
          },
          complete: () => {
          }
        });

      } else if (this.searchscreenvalue === 2) {
        console.log("进行用户搜索");

        // 请求elasticsearch进行文档搜索
        uni.request({
          url: 'http://123.56.217.170:9199/users/_search',
          method: 'POST',
          data: {
            "query": {
              "match_phrase": {
                "username": this.searchValue
              }
            }
          },
          success: res => {
            console.log(res.data);

            this.prompttext = "已为您找到 " + res.data.hits.total.value + " 位用户"

            if (res.data.hits.total.value === 0) {
              this.emptyshow = true;
              this.prompttextshow = false;

              // 到这里动画结束
              setTimeout(() => {
                this.pageLoading = false;
              }, 1000);
            } else {

              this.emptyshow = false;
              this.prompttextshow = true;

              this.real_searchuserinfo.username = res.data.hits.hits[0]._source.username;
              this.real_searchuserinfo.useravatar = res.data.hits.hits[0]._source.avatarUrl;
              this.real_searchuserinfo.location = res.data.hits.hits[0]._source.location;

              // 到这里动画结束
              setTimeout(() => {
                this.pageLoading = false;
              }, 1000);
            }


          },
          fail: () => {
          },
          complete: () => {
          }
        });
      }

    },

    // 搜索框确定时，遮罩消失并跳转至搜索结果页面
    searchbarconfirm() {
      this.uoverlayshow = false;

      // 跳转时带上搜索对象
      let searchobj = {
        select: this.searchscreenvalue,
        searchvalue: this.searchValue
      }

      uni.redirectTo({
        url: '../searchresult/searchresult?searchobj=' + JSON.stringify(searchobj),
      });

    },

  }
}
</script>

<style lang="scss" scoped>
.status_bar {
  height: var(--status-bar-height);
  width: 100%;
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