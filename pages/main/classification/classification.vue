<template>
  <view>
    <!-- 状态栏占位 -->
    <view class="status_bar">
      <view class="top_view"></view>
    </view>

    <!-- <uni-nav-bar :border="false" height="60px" title="全部分类"></uni-nav-bar> -->
    <!-- <view style="height: 15rpx; background-color: white;"> -->
    <!-- <view style="font-weight: bold; font-size: 30rpx; margin: 30rpx;">全部分类</view> -->
    <!-- </view> -->

    <!-- 一个选项卡切换的布局 左分类 右文章集广场 -->
    <view class="tab">
      <text v-for="v in tabs" :key="v.key" :class="{'tab-active' : v.key === currenttab}" @click="tabChange(v)">
        {{ v.name }}
      </text>
    </view>

    <view v-if="currenttab === 1" @touchstart="handleTouchStart" @touchmove="handleTouchMove"
          @touchend="handleTouchEnd">
      <view
          style="height: 150rpx; display: flex; flex-wrap: wrap; margin-top: 20rpx; margin-left: 50rpx; margin-right: 50rpx; justify-content: center;">
        <view v-for="(item, index) in classes" :key="index" style="margin-right: 40rpx; font-size: 29rpx;"
              :class="['item', { selected: selectedIndex === index }]" @click="selectItem(index)">
          {{ item }}
        </view>
      </view>

      <view style="height: 15rpx; background-color: #F6F7FB;"></view>

      <view style="height: auto;">
        <!-- 操作区 -->
        <view style="margin: 45rpx; display: flex;  align-items: center; justify-content: space-between;">
          <view style="font-size: 26rpx; font-weight: bold;">文章列表</view>

          <u-subsection mode="subsection" :list="list" :current="current" activeColor="#169EFF"
                        @change="sectionChange" style="width: 370rpx; "></u-subsection>

          <view style="display: flex; align-items: center;">
            <image src="../../../static/images/classes/select.png" style="height: 50rpx; width: 50rpx;">
            </image>
            <view style="font-size: 26rpx; margin-left: 5rpx; ">筛选</view>
          </view>
        </view>

        <!-- 筛选结果区 -->
        <view
            style="display: flex; flex-wrap: wrap; margin-top: 10rpx; margin-left: 70rpx; margin-right: 70rpx; justify-content: space-between; ">
          <view v-for="(item, index) in articlesinfos" :key="index"
                style=" margin-top: 50rpx; display: flex; flex-direction: column; ">
            <image :src="item.coverpicurl"
                   style="height: 280rpx; width: 180rpx; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);"></image>

            <view style="margin-top: 10rpx; font-size: 25rpx;">{{ item.title }}</view>
            <view style="margin-top: 10rpx; font-size: 22rpx; color: gray;">{{ item.author }}</view>
          </view>
        </view>
      </view>
    </view>

    <view v-if="currenttab === 2" style="height: auto; " @touchstart="handleTouchStart" @touchmove="handleTouchMove"
          @touchend="handleTouchEnd">

      <view
          style="margin: 20rpx;  height: auto; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); border-radius: 1%; display: flex; flex-direction: column;">

        <view style="display: flex; justify-content: space-between;">
          <view style="display: flex; align-items: center; margin: 10rpx;">
            <image src="../../../static/images/classes/recommendedarticleset.png"
                   style="height: 40rpx; width: 40rpx; margin: 5rpx;"></image>
            <view style="font-size: 25rpx; margin-left: 10rpx; font-weight: bold;">推荐文章集</view>
          </view>

          <view style="display: flex; align-items: center; margin: 10rpx;">
            <image src="../../../static/images/classes/other.png" style="height: 25rpx; width: 25rpx;">
            </image>
            <view style="font-size: 25rpx; margin-left: 10rpx;">换一批</view>
          </view>

        </view>

        <!-- 推荐文章集区域 -->
        <view style="margin: 20rpx; display: flex; flex-wrap: wrap; justify-content: space-between">
          <view v-for="(item, index) in recarticlesets" :key="index"
                style="display: flex; margin-right: 20rpx; margin-top: 25rpx;" @click="toarticlesetdetail">
            <image :src="item.pic"
                   style="height: 190rpx; width: 130rpx; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); border-radius: 10%;">
            </image>
            <view style="display: flex; flex-direction: column;">
              <view
                  style="font-size: 22rpx; margin-left: 15rpx; margin-top: 45rpx; width: 170rpx; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                {{ item.name }}
              </view>
              <view style="font-size: 20rpx; color: gray;margin-left: 15rpx; margin-top: 20rpx;">
                浏览{{ item.browse }}
              </view>
            </view>
          </view>
        </view>

      </view>

      <u-divider text="大家的文章集" text-size="11" style="margin-left: 30rpx; margin-right: 30rpx;"></u-divider>

      <!-- 可能感兴趣的 -->
      <!-- 2024年6月13日15:15:29 修改UI -->
      <view style="margin: 20rpx;  height: auto;  display: flex; flex-direction: column;">

        <view v-for="(item, index) in maybeinterestedinsarticlesets" :key="index"
              style="box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); border-radius: 1%; margin-top: 20rpx;margin-bottom: 20rpx; height: auto; box-sizing: border-box;">

          <view style="display: flex; align-items: center; margin: 20rpx;">
            <image src="../../../static/images/classes/interested.png" style="width: 20rpx; height: 20rpx;">
            </image>
            <view style="margin-left: 10rpx; font-size: 20rpx; color: gray;">你可能感兴趣的</view>
          </view>

          <view style="margin: 20rpx;">


            <!-- 文章内容区，点击跳转文章集详情页 -->
            <view
                style=" background-color: #F6F7FB; height: 270rpx;  margin-right: 20rpx; margin-top: 15rpx; display: flex; align-items: center;"
                @click="tootherarticlesetdetail">
              <view>
                <image :src="item.setcover"
                       style="width: 180rpx; height: 250rpx; margin-top: 5rpx; margin-left: 10rpx; border-radius: 3%;">
                </image>
              </view>
              <view style="display: flex; flex-direction: column;">
                <view style=" margin-left: 20rpx; font-weight: bold; font-size: 26rpx;">
                  {{ item.setname }}
                </view>
                <view style="margin-top: 10rpx; margin-left: 20rpx; color: gray; font-size: 22rpx;">
                  {{ item.abstract }}
                </view>
              </view>
            </view>

            <view
                style="  margin-top: 20rpx; font-size: 23rpx; margin: 10rpx; color: gray; line-height: 35rpx; ">
              分享理由:
              {{ item.content }}
            </view>

          </view>

          <view style="height: auto;display: flex; ">
            <view style="display: flex; margin-left: 30rpx; margin-bottom: 20rpx; align-items: center;">

              <view style="display: flex; width: 400rpx; align-items: center;">
                <image :src="item.useravtar"
                       style="border-radius: 50%; width: 35rpx; height: 35rpx;  margin-top: 10rpx;"
                       @click="touserhomepage">
                </image>

                <!-- 用户名和更多按钮 -->
                <view style="display: flex; flex-direction: column;">
                  <view style="display: flex; ">
                    <view
                        style="color: gray; font-size: 23rpx; margin-top: 5rpx; margin-left: 10rpx;">
                      {{ item.username }}
                    </view>
                  </view>
                </view>

                <view style="display: flex; align-items: center; margin-top: 5rpx;">

                  <view style=" font-size: 22rpx; color: gray; margin-left: 5rpx;">
                    分享于{{ item.pubtime }}
                  </view>
                </view>

              </view>

            </view>

            <view style="display: flex;  margin-bottom: 20rpx;">
              <view style="display: flex; justify-content: center; align-items: center;">
                <image src="../../../static/images/homepage/review.png"
                       style="width: 25rpx; height: 25rpx;"></image>
                <view style="margin-left: 10rpx;  color: gray; font-size: 23rpx;">
                  <view v-if="item.review === 0" style="font-size: 22rpx;">评论</view>
                  <view v-else>{{ item.review }}</view>
                </view>
              </view>
              <view
                  style="display: flex;margin-left: 20rpx; justify-content: center; align-items: center;">
                <image src="../../../static/images/homepage/givelike.png"
                       style="width: 30rpx; height: 30rpx;"></image>
                <view style="margin-left: 10rpx; color: gray; font-size: 23rpx;">
                  <view v-if="item.like === 0" style="font-size: 22rpx;">点赞</view>
                  <view v-else>{{ item.like }}</view>
                </view>
              </view>
              <view
                  style="display: flex;margin-left: 20rpx; justify-content: center; align-items: center;">
                <image src="../../../static/images/classes/share_set.png"
                       style="width: 30rpx; height: 30rpx;"></image>
                <view style="margin-left: 10rpx; color: gray; font-size: 20rpx;">
                  分享
                </view>
              </view>
            </view>

          </view>

        </view>

      </view>

      <u-divider text="到底了" text-size="11" style="margin-left: 30rpx; margin-right: 30rpx;"></u-divider>

    </view>


    <view style="height: 40rpx; "></view>
  </view>
</template>

<script>
export default {
  data() {
    return {

      currenttab: 1,

      tabs: [{
        name: '分类',
        key: 1
      },
        {
          name: '文章集广场',
          key: 2
        }
      ],

      list: ['热度', '评分', '时间'],
      current: 0,

      classes: [
        '小说', '哲学', '名著', '推理', '理论', '诗词', '艺术', '科幻', '回忆', '鉴赏', '散文', '传记'
      ],

      // 推荐文章集列表
      recarticlesets: [{
        name: '还记得你小时候的愿望吗?',
        browse: 67,
        pic: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/recommend/1.png'
      },
        {
          name: '直面生活的不如意',
          browse: 120,
          pic: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/recommend/2.png'
        },
        {
          name: '缓解疲劳',
          browse: 29,
          pic: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/recommend/3.png'
        },
        {
          name: '不要生气，保持冷静',
          browse: 99,
          pic: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/recommend/4.png'
        },
      ],

      // 用户可能感兴趣的文章集
      maybeinterestedinsarticlesets: [{
        username: '竹韵',
        setname: '时光记忆',
        abstract: '这一系列文章记录了不同时代的人和事，从历史的长河中挑选出最有代表性的故事，让读者感受到时代的变迁和岁月的流逝。',
        content: '通过阅读这些文章，可以帮助读者更好地了解历史，体会不同年代的风貌和文化，增强对时间和生活的珍惜感。', // 用户可以选择要或不要将自己的文章集分享到广场
        useravtar: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/useravtar/zhuyun.jpg',
        setcover: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/recommend/interested/1.png',
        like: 29,
        review: 21,
        pubtime: '2024-05-21'
      },
        {
          username: '丁家雄',
          setname: '心灵启迪',
          abstract: '这一系列文章汇集了许多激励人心的故事和名言警句，旨在启发读者的智慧和勇气，帮助他们在生活中找到动力和方向。',
          content: '这些文章能给读者带来精神上的鼓舞和力量，帮助他们面对生活中的挑战和困难，激发他们的潜能和创造力。', // 用户可以选择要或不要将自己的文章集分享到广场
          useravtar: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/dingjiaxiong.jpg',
          setcover: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/recommend/interested/2.png',
          like: 6,
          review: 3,
          pubtime: '2024-06-02'
        },
        {
          username: '于海龙',
          setname: '文学漫谈',
          abstract: '这一系列文章探讨了各种文学作品和文学现象，从经典名著到现代文学，从不同角度分析和评论，让读者更深入地了解文学的魅力。',
          content: '这些文章可以帮助读者提升文学素养，增强他们对文学作品的理解和欣赏能力，同时也能激发他们对文学创作的兴趣。', // 用户可以选择要或不要将自己的文章集分享到广场
          useravtar: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/user_yuhailong.jpg',
          setcover: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/recommend/interested/3.png',
          like: 3,
          review: 0,
          pubtime: '2024-05-31'
        },
        {
          username: '韦豪',
          setname: '科学奇遇',
          abstract: '这一系列文章讲述了科学发现和发明背后的故事，以及科学家们的奇思妙想和奋斗历程，展现了科学的奇妙和无穷魅力。',
          content: '通过这些文章，读者可以更好地了解科学知识，感受到科学的魅力和力量，激发他们对科学探索的兴趣和热情。', // 用户可以选择要或不要将自己的文章集分享到广场
          useravtar: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/user_weihao.jpg',
          setcover: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/recommend/interested/4.png',
          like: 2,
          review: 1,
          pubtime: '2024-06-01'
        },
        {
          username: '杨霄',
          setname: '生活点滴',
          abstract: '这一系列文章记录了生活中的点点滴滴，从日常琐事到人生感悟，从家庭温情到社会观察，展现了生活的多样性和丰富性。',
          content: '些文章可以让读者从不同的角度看待生活，体会生活中的美好和感动，同时也能帮助他们更好地处理日常事务，享受生活的乐趣。', // 用户可以选择要或不要将自己的文章集分享到广场
          useravtar: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/user_yangxiao.jpg',
          setcover: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/recommend/interested/5.png',
          like: 14,
          review: 3,
          pubtime: '2024-05-25'
        },

      ],

      // 默认选中第一个
      selectedIndex: 0, // 初始选中状态为0

      articlesinfos: [{
        title: '回家建图书馆',
        author: '章瑾',
        coverpicurl: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/coverpic/class_1.png'
      },
        {
          title: '谜一样的孩子',
          author: '苏珊·克莱伯德',
          coverpicurl: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/coverpic/class_2.png'
        },
        {
          title: '熊镇2',
          author: '弗雷德里克',
          coverpicurl: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/coverpic/class_3.png'
        },
        {
          title: '邻人之妻',
          author: '美伊·特立斯',
          coverpicurl: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/coverpic/class_4.png'
        },
        {
          title: '在挪威做木匠',
          author: '奥勒·托斯藤森',
          coverpicurl: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/coverpic/class_5.png'
        },
        {
          title: '尤必克',
          author: '菲利普·迪克',
          coverpicurl: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/coverpic/class_6.png'
        },
        {
          title: '我弥留之际',
          author: '美伊·特立斯',
          coverpicurl: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/coverpic/class_7.png'
        },
        {
          title: '横道世之介',
          author: '奥勒·托斯藤森',
          coverpicurl: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/coverpic/class_8.png'
        },
        {
          title: '隐藏的意识',
          author: '菲利普·迪克',
          coverpicurl: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/coverpic/class_9.png'
        }
      ]
    }
  },

  onLoad() {

  },

  // 来一个监听底部导航栏被点击的方法
  onTabItemTap: function (e) {
    // console.log(e);
    // e的返回格式为json对象： {"index":0,"text":"首页","pagePath":"pages/index/index"}
    uni.setTabBarItem({
      index: 0,
      text: ''
    });

    uni.setTabBarItem({
      index: 1,
      text: '广场'
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
    backLast() {
      uni.navigateBack()
    },

    selectItem(index) {
      this.selectedIndex = index; // 更新选中项的索引
    },

    sectionChange(index) {
      this.current = index;
    },

    tabChange(e) {
      this.currenttab = e.key;
      console.log(e);
    },

    // 监听页面的滑动
    handleTouchStart(e) {
      this.startX = e.touches[0].pageX;
      this.startY = e.touches[0].pageY;
    },
    handleTouchMove(e) {
      const moveX = e.touches[0].pageX;
      const moveY = e.touches[0].pageY;
      const diffX = moveX - this.startX;
      const diffY = moveY - this.startY;

      // Detect left or right swipe
      if (Math.abs(diffX) > Math.abs(diffY)) {
        // Prevent vertical scrolling
        e.preventDefault();
      }
    },
    handleTouchEnd(e) {
      const endX = e.changedTouches[0].pageX;
      const endY = e.changedTouches[0].pageY;
      const diffX = endX - this.startX;
      const diffY = endY - this.startY;

      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 100) {
          console.log("Right");
          this.currenttab = 1;
        } else if (diffX < -100) {
          console.log("Left");
          this.currenttab = 2;
        }
      }
    },

    // 2024年6月13日15:11:50 暂定跳转到固定的文章集，后面请求数据
    toarticlesetdetail() {
      console.log("查看文章集");

      uni.navigateTo({
        url: '../../main/myhome/tasarticlesdetail/tasarticlesdetail?articlesetid=1',
        success: res => {
          console.log("跳转页面成功");
        },
        fail: () => {
        },
        complete: () => {
        }
      });
    },

    touserhomepage() {
      console.log("跳转到用户主页");
    },

    tootherarticlesetdetail() {
      console.log("跳转到大家文章集的详情页");
    }
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


.item.selected {
  font-weight: bold;
  color: #3CADFF;
  /* 选中项的颜色，可以根据需要更改 */
}

.tab {
  width: 700rpx;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 25rpx;


  text {
    display: block;
    width: 180rpx;
    height: 60rpx;
    line-height: 60rpx;
    text-align: center;
    color: gray;
    font-size: 14px;
  }

  .tab-active {
    color: #1296DB;
    font-size: 15px;
    font-weight: bold;
    position: relative;
    transition: all 0.3s ease-in-out;
    /* 添加过渡效果 */

    &::after {
      content: '';
      width: 40rpx;
      height: 6rpx;
      border-radius: 4rpx;
      background: #1296DB;
      position: absolute;
      left: 70rpx;
      bottom: 0;
      transition: all 0.3s ease-in-out;

      /* 添加过渡效果 */
    }
  }

}
</style>