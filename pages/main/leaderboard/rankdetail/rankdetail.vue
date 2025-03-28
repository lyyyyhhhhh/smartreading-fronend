<template>
  <view>
    <view class="status_bar">
      <view class="top_view"></view>
    </view>


    <uni-nav-bar left-icon="left" @clickLeft="backLast" :border="false" height="60px" :title="rankname"
                 color="white" background-color="#169EFF"></uni-nav-bar>

    <view style="background-color: #169EFF; height: auto;">
      <view class="header">
        <text> 2024-05-31更新 (累计阅读量)</text>
      </view>

      <!-- 前三名 -->
      <view class="top">
        <view class="top-item" @click="toarticledetail">
          <image class="top-item-king" src="../../../../static/images/rankdetail/1.png"></image>
          <image class="top-item-avatar" :src="topthree[0].pic"></image>
          <text class="top-item-name">{{ topthree[0].title }}</text>
          <text class="top-item-score">201</text>
        </view>
        <view class="top-item" @click="toarticledetail">
          <image class="top-item-king" src="../../../../static/images/rankdetail/2.png"></image>
          <image class="top-item-avatar" :src="topthree[1].pic"></image>
          <text class="top-item-name">{{ topthree[1].title }}</text>
          <text class="top-item-score">103</text>
        </view>
        <view class="top-item" @click="toarticledetail">
          <image class="top-item-king" src="../../../../static/images/rankdetail/3.png"></image>
          <image class="top-item-avatar" :src="topthree[2].pic"></image>
          <text class="top-item-name">{{ topthree[2].title }}</text>
          <text class="top-item-score">95</text>
        </view>
      </view>

      <!-- 其他排名 -->
      <view class="ranking">
        <view class="rangking-title">
          <text>排名</text>
          <text>文章</text>
          <text>总阅读量</text>
        </view>
        <view class="ranking-list">
          <view class="ranking-list-item" v-for="(item, key) in rankdatalistesthree" :key="key"
                @click="toarticledetail">
            <text class="ranking-list-number">{{ key + 4 }}</text>
            <view class="ranking-list-nickname">
              <image :src="item.pic"></image>
              <text>{{ item.title }}</text>
            </view>
            <text class="ranking-list-score">90</text>
          </view>
        </view>
      </view>
    </view>

    <view style="height: 20rpx; background-color: #169EFF;"></view>

  </view>
</template>

<script>
export default {
  data() {
    return {
      rankname: '',

      topthree: [
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
      ],

      rankdatalistesthree: [
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
      ],

      rankdatalist: [
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
      ],

    }
  },

  onLoad(option) {
    this.rankname = option.name;
  },

  methods: {
    backLast() {
      uni.navigateBack()
    },
    toarticledetail() {
      uni.navigateTo({
        url: '../../article/detail/detail',
        success: res => {
          console.log("跳转文章详情页成功");
        },
        fail: () => {
        },
        complete: () => {
        }
      });
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


.header {
  width: 100vw;
  height: 100rpx;
  line-height: 80rpx;
  color: #fff;
  font-size: 12px;
  text-align: center;

  margin-bottom: 30rpx;
}

.top {

  width: 660rpx;
  margin: auto;

  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  .top-item {
    width: 200rpx;
    height: 320rpx;
    display: flex;
    flex-direction: column;
    background: #1f78be;
    position: relative;
    align-items: center;
    border-radius: 100rpx 100rpx 0 0;
    color: #fff;

    &:nth-child(1) {
      height: 400rpx;
    }

    &:nth-child(2) {
      height: 360rpx;
    }

    .top-item-king {
      width: 80rpx;
      height: 80rpx;
      position: absolute;
      left: 60rpx;
      top: -40rpx;
    }

    .top-item-avatar {
      border-radius: 50%;
      width: 120rpx;
      height: 120rpx;
      margin-top: 60rpx;
    }

    .top-item-name {
      margin-top: 20rpx;

      font-size: 24rpx;
      margin-left: 10rpx;
      margin-right: 10rpx;

      width: 150rpx;
      text-align: center;

      white-space: nowrap;
      /* 不换行 */
      overflow: hidden;
      /* 超出隐藏 */
      text-overflow: ellipsis;
      /* 超出部分显示省略号 */
    }

    .top-item-score {
      margin-top: 15rpx;
      font-size: 20px;
      color: #E28935;

      font-weight: bold;
    }
  }
}

.ranking {
  width: 700rpx;
  border-radius: 30rpx;
  margin: auto;
  background: #fff;
  box-sizing: border-box;
  padding: 10rpx;

  height: auto;

  .rangking-title {
    margin: 10rpx;
    display: flex;
    font-size: 14px;
    color: #555;
    height: 25rpx;
    line-height: 50rpx;

    text {
      display: block;
      width: 140rpx;

      &:nth-child(2) {
        width: calc(100% - 140rpx);
      }
    }
  }

  .ranking-list-item {
    margin: 20rpx;

    height: 110rpx;
    display: flex;
    align-items: center;
    font-size: 14px;

    .ranking-list-number {
      display: block;
      width: 70rpx;
      margin-left: 15rpx;
      color: #777;
    }

    .ranking-list-score {
      display: block;
      width: 70rpx;
      color: #E28935;
      font-size: 16px;
    }

    .ranking-list-nickname {
      display: flex;
      align-items: center;
      width: calc(100% - 140rpx);

      image {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        margin-right: 20rpx;
      }

      text {
        width: auto;
      }
    }
  }

}
</style>