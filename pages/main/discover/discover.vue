<template>
  <view>
    <!-- 状态栏占位 -->
    <view class="status_bar"></view>

    <!-- 搜索框 -->

    <view style="width: 100%; display: flex; justify-content: center; align-items: center;" class="search_bar">

      <uni-data-select v-model="searchscreenvalue" placeholder="" :localdata="searchscreenrange"
                       @change="searchscreenchange"
                       style="width: auto; background-color: white; height: 60rpx;  margin-left: 20rpx;"
                       v-show="selectshow"
                       :clear="false"></uni-data-select>

      <uni-search-bar cancelButton="none" placeholder="搜索文章、主题、用户名 ..." v-model="searchValue"
                      @focus="searchbarfocus" @confirm="searchbarconfirm" :style="elementStyle"></uni-search-bar>
    </view>

    <u-overlay :show="uoverlayshow" @click="uoverlayshowif" z-index="2" style="background-color: white;">

      <view @tap.stop
            style="width: auto; height: 300rpx;  margin-top: 200rpx; margin-left: 40rpx; margin-right: 40rpx; ">
        <view style="display: flex; flex-direction: column;">
          <view style="display: flex; flex-direction: column;">
            <view style="display: flex; justify-content: space-between;">
              <view style="font-size: 27rpx;">热门搜索</view>
              <image src="../../../static/images/search/flush.png" style="width: 30rpx; height: 30rpx;">
              </image>
            </view>

            <view style="display: flex; flex-wrap: wrap; margin-top: 30rpx; ">
              <view v-for="(item, index) in hotsearchvalues" :key="index"
                    style="display: flex; align-items: center; justify-content: center; color: #43B0FF; font-weight: bold; font-size: 24rpx; background-color: white; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); height: 50rpx; width: calc(33.33% - 50rpx); margin-right: 50rpx; margin-bottom: 30rpx;">
                <view>{{ item }}</view>
              </view>
            </view>


          </view>
          <view style="display: flex; flex-direction: column; margin-top: 40rpx;">
            <view style="display: flex; justify-content: space-between;">
              <view style="font-size: 27rpx;">搜索历史</view>
              <view>
                <image src="../../../static/images/search/dustbin.png"
                       style="width: 30rpx; height: 30rpx;"></image>
              </view>
            </view>
            <view style="display: flex; flex-wrap: wrap; margin-top: 30rpx; ">
              <view v-for="(item, i) in historysearchvalues" :key="i"
                    style="display: flex; align-items: center; justify-content: center; color: gray;  font-size: 24rpx; background-color: white; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); height: 50rpx; width: calc(33.33% - 50rpx); margin-right: 50rpx; margin-bottom: 30rpx;">
                <view>{{ item }}</view>
              </view>
            </view>
          </view>
        </view>
      </view>

    </u-overlay>

    <view style="height: 50rpx;"></view>

    <!-- 主体 -->
    <view style="height: 100%">
      <transition name="fade">
        <view v-if="showCard" class="card-container">
          <swiper class="swiper" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd"
                  :current="currentCartIndex" @change="changeCurrentCard" vertical="true">
            <swiper-item v-for="(item, ind) in recommendedarticlelist" :key="ind" class="swiper-item"
                         @click="toreading(item)">
              <!-- @click="toDetail" -->
              <!-- 这里放置卡片内容 -->
              <view class="card" style="text-align: center;">
                <view
                    style=" display: flex; flex-direction: column; text-align: center; align-items: center;">
                  <image class="image-style" :src="item.pic" style="width: 460rpx; height: 650rpx;"
                         mode="scaleToFill">
                  </image>
                  <view style="height: 30rpx;"></view>
                  <text class="article-title" style="font-family: 'kaiti';"> {{ item.title }}</text>

                  <text style="font-size: 25rpx;">{{ item.author }}</text>

                  <!-- <text> {{ item.abstract }}</text> -->
                  <view style="height: 30rpx;"></view>
                  <view style="margin-left: 120rpx; margin-right: 120rpx;">
                    <view class="article-abstract" style="width: 85vw;height: auto;">
                      <!-- <view style="margin-bottom: 20rpx;">文章摘要</view> -->
                      <view>

                        <!-- 												<u-read-more showHeight="60" :toggle="true" backgroundImage="none"
                          closeText="更多">
                          <rich-text :nodes="item.abstract"></rich-text>
                        </u-read-more> -->

                        <rich-text :nodes="item.abstract"></rich-text>
                      </view>
                    </view>
                  </view>

                  <view style="height: 20rpx;"></view>

                  <view style="margin-left: 20rpx; display: flex; text-align: center;">
                    <uni-rate size="18" allow-half :readonly="true" :value="item.mark / 2"
                              max="5"/>
                    <view style="color: gray; font-size: 23rpx; margin-left: 10rpx;">
                      <text>
                        {{ item.mark.toFixed(1) }} 分
                      </text>
                    </view>
                    <view style="color: gray; font-size: 23rpx;">
                      <text>
                        &nbsp; ({{ item.numberofcomments }}人评论)
                      </text>
                    </view>
                  </view>

                  <view
                      style="display: flex; margin: 30rpx; gap: 15rpx; align-items: center;">
                    <view v-for="(item, inde) in item.labels" :key="inde">
                      <uni-tag :text="item"
                               style="background-color: #E7F5FF;  color: #43B0FF; font-weight: bold; border: white">
                      </uni-tag>
                    </view>

                    <uni-tag :text="item.isfree ? '免费' : '付费'" :style="{
										            'background-color': item.isfree ? 'green' : 'orange',
										            'color': 'white',
										            'font-weight': 'bold',
										            'border': 'white'
										         }">
                    </uni-tag>


                  </view>

                  <view style="height: 30rpx;"></view>
                  <view style="font-size: 22rpx; color: gray;">
                    提示: 约{{ item.characternumber }} 字符, 读完大概需要 {{ item.readingtime }} 分钟
                  </view>

                  <view style="height: 20rpx;"></view>

                </view>


              </view>
            </swiper-item>
          </swiper>
        </view>
      </transition>
    </view>

    <ls-loading text="很快就好, 智阅正在为您推荐..." :animation="animation" v-if="pageLoading"
                fontSize="30"></ls-loading>
    <!-- 		<view class="floating-view">

    </view> -->

  </view>
</template>

<script>
import {
  mapState
} from 'vuex';

export default {
  data() {
    return {

      pageLoading: true,
      animation: 'twinkle',

      hotsearchvalues: [
        '失踪的孩子',
        '遮蔽的天空',
        '回答不了',
        '背影'
      ],

      historysearchvalues: [
        '梦的化石',
        '染匠之手',
        '丁家雄'
      ],

      selectshow: false,

      searchscreenvalue: 0,

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

      uoverlayshow: false,
      searchValue: '',

      nodes: [{
        name: 'div',
        attrs: {
          class: 'div-class',
          style: 'margin-left: 30rpx ;line-height: 30rpx; color: black; text-align:left; float: left; font-weight: bold'
        },
        children: [{
          type: 'text',
          text: '文章摘要'
        }]
      }],

      recommendedarticlelist: [],

      cardList: [
        {
          title: '灵与肉',
          pic: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/coverpic/1.png',
          content: "Card1",
          abstract: '&emsp;&emsp;这篇文章描述了主人公许灵均回到家乡的感人故事，他经历了艰苦的放牧生活，最后回到了家乡，与妻子和孩子团聚。在这个过程中，他体会到了劳动者的情感，感受到了家庭的温暖和幸福。',
          author: '张贤亮',
          mark: 9.0,
          numberofcomments: 68,
          labels: ['劳动生活', '家庭情感', '生活变迁'],
          isfree: false,
          characternumber: 17000,
          readingtime: 57
        },
        {
          title: '一台1846年的摄像机',
          pic: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/2.png',
          content: "Card2",
          abstract: '&emsp;&emsp;《温坡街上的巴蕾特》曾是轰动一时的戏剧，大致讲了一出私奔的故事，和中国传统戏曲《西厢记》有些类似。',
          author: '赵瑜',
          mark: 8.0,
          numberofcomments: 20,
          labels: ['怀旧', '咏物'],
          isfree: true,
          characternumber: 8500,
          readingtime: 25
        },
        {
          title: '假如你观察一个小孩子',
          pic: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/3.png',
          content: "Card3",
          abstract: '&emsp;&emsp;她放声大哭，哭到步道上的人都暂停自己的行动去看她。有那么一瞬间，大人围拢过去，像磁石落入铁屑。但她抽泣着，想说什么却不能如愿。',
          author: '沈轶伦',
          mark: 10.0,
          numberofcomments: 68,
          labels: ['文学', '感人'],
          isfree: false,
          characternumber: 8500,
          readingtime: 25
        },
        {
          title: '像爱因斯坦一样思考',
          pic: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/4.png',
          content: "Card4",
          abstract: '&emsp;&emsp;我们不是第一个想了解阿尔伯特·爱因斯坦思维方式的人。即使是孩童，也早已在心中把爱因斯坦的名字和天才这个概念画等号了。爱因斯坦也是无数科学家和思想家迫切希望研究的对象。有人甚至想“钻进爱因斯坦的大脑，一探究竟。',
          author: '[德]特蕾莎·波尔莱恩',
          mark: 9.0,
          numberofcomments: 68,
          labels: ['文学', '感人'],
          isfree: true,
          characternumber: 8500,
          readingtime: 25
        },
        {
          title: '厨房之战',
          pic: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/5.png',
          content: "Card5",
          abstract: '&emsp;&emsp;大观园风光旖旎自是不用说了。但是，如果读书的人不曾注意到园中一群下人”之间的种种争斗和一地鸡毛，就只能说是不懂《红楼梦》。就从精于描写小人物这一点来说，《红楼梦》也是文学史上少有的杰作。',
          author: '骆玉明',
          mark: 9.0,
          numberofcomments: 68,
          labels: ['文学', '感人'],
          isfree: false,
          characternumber: 8500,
          readingtime: 25
        },
        {
          title: '最微小的旅行',
          pic: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/6.png',
          content: "Card6",
          abstract: '&emsp;&emsp;citywalk一词源自西方，意为城市行走、城市漫步。2023年上半年，在国内某社交平台上，与citywalk相关的搜索量同比增长超30倍。有人说这个词的流行源于“年轻人不花钱找乐子”。有人说这是“附近“人与人连接的回归。',
          author: '郭玉洁',
          mark: 9.0,
          numberofcomments: 68,
          labels: ['文学', '感人'],
          isfree: false,
          characternumber: 8500,
          readingtime: 25
        },
      ], // 卡片列表
      startX: 0, // 触摸起始X坐标
      startY: 0, // 触摸起始Y坐标
      deltaY: 0, // Y轴滑动距离
      cardHeight: 200, // 卡片高度
      showCard: true, // 是否显示卡片

      currentCartIndex: 0,


      // 双击用的
      index: 0,
      start_time: 0,
      end_time: 0,

      userPurchasedArticles: {},
      coins: 0,
      points: 0,
    }
  },

  computed: {
    ...mapState(['userid', 'username', 'useraccount', 'useravatar', 'location', 'userphonenumber',
      'personalsignature', 'occupation', 'email',
      'isLogin'
    ]),
    elementStyle() {
      return {
        'z-index': 999,
        'width': this.selectshow ? '75%' : '100%'
      };
    }
  },

  onLoad: function () {
    this.searchValue = '';
    this.selectshow = false;

    // 请求加载添加动画


    // 请求文章数据【2024年6月3日17:17:58 请求30条所有数据】
    uni.request({
      url: 'http://123.56.217.170:2222/api/article/getidtopthirty',
      method: 'GET',
      data: {},
      success: res => {
        // console.log(res.data);

        this.recommendedarticlelist.length = 0;

        for (let i = 0; i < res.data.length; i++) {

          let articletmp = {
            articleid: res.data[i].articleId,
            title: res.data[i].title,
            pic: res.data[i].coverpic,
            content: "",
            abstract: '&emsp;&emsp;' + res.data[i].articleabstract,
            author: res.data[i].author,
            mark: res.data[i].markscore,
            numberofcomments: res.data[i].commentsnumber,
            labels: JSON.parse(res.data[i].articlelabel),
            isfree: res.data[i].freeornot === 0,
            characternumber: res.data[i].charnumber,
            readingtime: Math.round(res.data[i].charnumber / 220),
            fulltexturl: res.data[i].aliyuncontentoosurl
          }
          if (!articletmp.isfree) {
            articletmp.price = 5;
          }

          this.recommendedarticlelist.push(articletmp);
        }


        // 到这里动画结束
        setTimeout(() => {
          this.pageLoading = false;
        }, 1500);

      },
      fail: () => {
      },
      complete: () => {
      }
    });
  },

  onShow() {
    this.searchValue = '';
    this.selectshow = false;
    uni.request({
      url: `http://localhost:8088/api/user-purchased-articles/user?userId=${this.userid}`,
      method: 'GET',
      data: {},
      success: res => {
        this.userPurchasedArticles = [];
        for (let i = 0; i < res.data.length; i++) {
          this.userPurchasedArticles[res.data[i].articleId] = true
        }
      },
      fail: () => {
        console.log('获取用户购买的书籍失败');
      },
    });
    // 请求任务的次数状态
    uni.request({
      url: `http://localhost:8088/api/points/user?userId=${this.userid}`,
      method: 'GET',
      success: res => {
        this.coins = res.data.coins;
        this.points = res.data.totalPoints;
      },
      fail: () => {
        console.log("请求用户智阅币个数异常");
      }
    });
  },

  watch: {
    currentCartIndex(newVal, oldVal) {

      // console.log(newVal, oldVal);

      if (this.currentCartIndex === this.recommendedarticlelist.length - 1) {
        console.log("到数据末尾了");

        // 加入新的数据
        this.recommendedarticlelist.push({
          title: '最微小的旅行',
          pic: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/6.png',
          content: "Card6",
          abstract: '&emsp;&emsp;citywalk一词源自西方，意为城市行走、城市漫步。2023年上半年，在国内某社交平台上，与citywalk相关的搜索量同比增长超30倍。有人说这个词的流行源于“年轻人不花钱找乐子”。有人说这是“附近“人与人连接的回归。',
          author: '郭玉洁',
          mark: 9.0,
          numberofcomments: 68,
          labels: ['文学', '感人'],
          isfree: false,
          characternumber: 8500,
          readingtime: 25
        })

      }
    }
  },

  // 来一个监听底部导航栏被点击的方法
  onTabItemTap: function (e) {
    // console.log(e);
    // e的返回格式为json对象： {"index":0,"text":"首页","pagePath":"pages/index/index"}
    uni.setTabBarItem({
      index: 0,
      text: '发现'
    });

    uni.setTabBarItem({
      index: 1,
      text: ''
    });

    uni.setTabBarItem({
      index: 2,
      text: ''
    });

    uni.setTabBarItem({
      index: 3,
      text: ''
    });


  },

  methods: {
    onTouchStart(e) {
      this.startY = e.touches[0].clientY;
    },
    onTouchMove(e) {
      this.deltaY = e.touches[0].clientY - this.startY;
    },
    onTouchEnd() {
      if (this.deltaY < -50) {
        // 往上滑动
        // 进入卡片详情的逻辑
        console.log('Swipe up');

        console.log(this.currentCartIndex);

      } else if (this.deltaY > 50) {
        // 往下滑动
        // 不喜欢卡片的逻辑

        console.log('Swipe down');
      }
      // 重置滑动距离
      this.deltaY = 0;
    },
    removeCard() {
      // 移除当前卡片
      this.showCard = false;
      setTimeout(() => {
        this.cardList.shift();
        this.showCard = true;
      }, 500); // 500ms后移除当前卡片
    },

    changeCurrentCard(e) {
      // console.log("当前卡片改变了");
      this.currentCartIndex = e.detail.current;
    },

    toDetail() {
      console.log("跳转到文章详情页");

      uni.navigateTo({
        url: '../article/detail/detail',
        success() {
          console.log("跳转详情页成功");
        }
      })
    },

    // 首页的直接进入阅读，之后可加上判断【购买之类的】
    toreading(articleiteminfo) {
      console.log(articleiteminfo);
      console.log(this.userPurchasedArticles);
      if (!articleiteminfo.isfree && !this.userPurchasedArticles[articleiteminfo.articleid]) {
        uni.showModal({
          title: '确认购买',
          content: `是否确认购买文章《${articleiteminfo.title}》？\n售价 ${articleiteminfo.price} 积分`,
          success: (res) => {
            if (res.confirm) {
              console.log('用户确认购买文章', articleiteminfo.title);
              if (this.points >= articleiteminfo.price) {
                // 不必同步等待
                uni.request({
                  url: `http://localhost:8088/api/user-purchased-articles`,
                  method: 'POST',
                  data: {
                    "userId": this.userid,
                    "articleId": articleiteminfo.articleid,
                    "articleName": articleiteminfo.title,
                    "purchasePrice": articleiteminfo.price,
                  },
                  success: () => {
                    this.points -= articleiteminfo.price;
                    console.log("购买成功");
                    // 购买成功后进行页面跳转
                    this.navigateToReadingPage(articleiteminfo);
                  },
                  fail: () => {
                    console.log("扣减用户积分异常");
                  }
                });
              } else {
                uni.showModal({
                  title: '积分不足',
                  content: `是否前往积分中心完成任务?`,
                  success: (res) => {
                    if (res.confirm) {
                      uni.navigateTo({
                        url: '../../main/mine/mypoint/mypoint',
                        success() {
                          console.log("跳转详情页成功");
                        }
                      });
                    }
                  }
                });
                return;
              }
            } else if (res.cancel) {
              // 用户点击了取消
              console.log('用户取消购买文章', articleiteminfo.title);
              return;
            }
          }
        });
      } else {
        // 如果文章免费或者已经购买，直接跳转
        this.navigateToReadingPage(articleiteminfo);
      }
    },

    navigateToReadingPage(articleiteminfo) {
      console.log("开始阅读吧");

      // 这下带上文章标题和oos_url
      let articleinfo = {
        articleid: articleiteminfo.articleid,
        title: articleiteminfo.title,
        oosurl: articleiteminfo.fulltexturl
      };

      console.log(articleinfo);

      uni.navigateTo({
        url: '../../main/article/reading/reading?article=' + JSON.stringify(articleinfo),
        success: res => {
          console.log("跳转成功");
        },
        fail: error => {
          console.log("跳转失败", error);
        },
        complete: () => {
        }
      });
    },
    // 搜索框获取焦点时，遮罩层出现
    searchbarfocus() {
      this.uoverlayshow = true;
      this.selectshow = true;
    },

    // 搜索框确定时，遮罩消失并跳转至搜索结果页面
    searchbarconfirm() {
      this.uoverlayshow = false;

      // 跳转时带上搜索对象
      let searchobj = {
        select: this.searchscreenvalue,
        searchvalue: this.searchValue
      }

      console.log("==================");
      console.log(searchobj);

      uni.navigateTo({
        url: '../discover/searchresult/searchresult?searchobj=' + JSON.stringify(searchobj),
        success: res => {
          console.log("跳转成功");
        },
        fail: () => {
          console.log("跳转失败");
        },
        complete: () => {
        }
      });

    },

    searchscreenchange() {

    },

    uoverlayshowif() {
      this.selectshow = false;
      this.uoverlayshow = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.status_bar {
  height: var(--status-bar-height);
  width: 100%;
}

.search_bar {
  position: fixed;
  top: var(--status-bar-height);
  left: 0;
  width: 100%;
  z-index: 999;
  /* 确保搜索框在其他内容之上 */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to

  /* .fade-leave-active in <2.1.8 */
{
  opacity: 0;
}

.swiper {

  margin-top: 10rpx;

  width: 100%;
  height: 90vh;
}

.swiper-item {

  width: 85%;
  height: 100%;

}

.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {

  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  margin-top: 90rpx;
}

.image-style {
  border: 2px solid #ccc;
  border-radius: 10px;
  box-shadow: 10px 10px 4px rgba(0, 0, 0, 0.1);
}

.article-title {
  margin: 20rpx;
  font-weight: bold;

  font-size: 30rpx;
  letter-spacing: 0.2em;
}

.article-abstract {
  margin: 0 40rpx;
  color: #6a6a6a;
  font-size: 25rpx;

  letter-spacing: 0.1em;
  text-align: left !important;

}

.floating-view {
  width: 20rpx;
  height: 20rpx;
  background-color: aqua;

  position: fixed;
  /* top: 0; */
  /* 将其置于页面顶部 */
  left: 40%;

  bottom: 30rpx;
  /* 如果需要，可以调整左侧距离 */
  width: 100rpx;
  height: 30rpx;
  /* 让悬浮视图占据整个页面宽度 */
  z-index: 999;
  /* 确保悬浮视图位于最上层 */
  /* 其它样式 */
}
</style>