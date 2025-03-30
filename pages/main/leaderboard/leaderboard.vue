<template>
  <view>
    <!-- 状态栏占位 -->
    <view class="status_bar">
      <view class="top_view"></view>
    </view>
    <view style="display: flex; flex-direction: column; margin: 30rpx 30rpx 0;">
      <view style="font-weight: bold; font-size: 30rpx;">推荐榜单</view>
      <view style="font-size: 20rpx; margin-top: 10rpx;">精选高人气优质文章</view>
    </view>
    <view class="page">
      <view class="header">
        <view class="header-title">
          <image src="/static/trophy.png"></image>
          <text>文章热点排行榜</text>
        </view>
      </view>
      <view class="ranking">
        <view class="ranking-sum" @click="torankdetail('热点榜单')">
          <view class="ranking-list">
            <view class="ranking-title">
              <text>排名</text>
              <text>文章</text>
              <text>热度值</text>
            </view>
            <view class="ranking-list-item" v-for="(item, key) in hotRankList.slice(0, 5)" :key="key">
              <view v-if="key < 3" class="ranking-list-number">
                <image :src="'/static/' + (key + 1) + '.png'"></image>
              </view>
              <view v-else class="ranking-list-number">
                <text>{{ key + 1 }}</text>
              </view>
              <view class="ranking-list-nickname">
                <image :src="item.pic"></image>
                <text>{{ item.title }}</text>
              </view>
              <text class="ranking-list-score">{{item.heat}}</text>
            </view>
          </view>
          <view class="separator"></view>

          <view class="ranking-list">
            <view class="ranking-title">
              <text>排名</text>
              <text>文章</text>
              <text>热度值</text>
            </view>
            <view class="ranking-list-item" v-for="(item, key) in hotRankList.slice(5, 10)" :key="key">
              <view class="ranking-list-number">
                <text>{{ key + 6 }}</text>
              </view>
              <view class="ranking-list-nickname">
                <image :src="item.pic"></image>
                <text>{{ item.title }}</text>
              </view>
              <text class="ranking-list-score">{{item.heat}}</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view style="display: flex; flex-direction: column; margin: 30rpx;">
      <view style="font-weight: bold; font-size: 30rpx;">最新榜单</view>
      <view style="font-size: 20rpx; margin-top: 10rpx;">给你的爱好增添光彩</view>
    </view>
    <view class="ranklist">
      <view class="container">
        <view class="row">
          <view class="item" @click="torankdetail(ranklist[0].name)">
            <view style="display: flex; flex-direction: column;">
              <view
                  style="background-color: #EAEFF1;  display: flex; flex-direction: row; align-items: flex-end; justify-content: center; margin-top: 30rpx;">
                <image :src="ranklist[0].pics[1]" style="width: 80rpx; height: 180rpx;"
                       mode="aspectFill"></image>
                <image :src="ranklist[0].pics[0]" style="width: 140rpx; height: 200rpx;"></image>
                <image :src="ranklist[0].pics[2]" style="width: 80rpx; height: 180rpx;"
                       mode="aspectFill"></image>
              </view>
              <view
                  style="background-color: #808A9F; height: 80rpx; color: white; display: flex; flex-direction: column; justify-content: center; font-size: 22rpx;">
                <text>{{ ranklist[0].name }}</text>
              </view>
            </view>
          </view>
          <view class="item" @click="torankdetail(ranklist[1].name)">
            <view style="display: flex; flex-direction: column;">
              <view
                  style="background-color: #EAEFF1;  display: flex; flex-direction: row; align-items: flex-end; justify-content: center; margin-top: 30rpx;">
                <image :src="ranklist[1].pics[1]" style="width: 80rpx; height: 180rpx;"
                       mode="aspectFill"></image>
                <image :src="ranklist[1].pics[0]" style="width: 140rpx; height: 200rpx;"></image>
                <image :src="ranklist[1].pics[2]" style="width: 80rpx; height: 180rpx;"
                       mode="aspectFill"></image>
              </view>
              <view
                  style="background-color: #808A9F; height: 80rpx; color: white; display: flex; flex-direction: column; justify-content: center; font-size: 22rpx;">
                <text>{{ ranklist[1].name }}</text>
              </view>
            </view>
          </view>
        </view>
        <view class="row">
          <view class="item" @click="torankdetail(ranklist[2].name)">
            <view style="display: flex; flex-direction: column;">
              <view
                  style="background-color: #EAEFF1;  display: flex; flex-direction: row; align-items: flex-end; justify-content: center; margin-top: 30rpx;">
                <image :src="ranklist[2].pics[1]" style="width: 80rpx; height: 180rpx;"
                       mode="aspectFill"></image>
                <image :src="ranklist[2].pics[0]" style="width: 140rpx; height: 200rpx;"></image>
                <image :src="ranklist[2].pics[2]" style="width: 80rpx; height: 180rpx;"
                       mode="aspectFill"></image>
              </view>
              <view
                  style="background-color: #808A9F; height: 80rpx; color: white; display: flex; flex-direction: column; justify-content: center; font-size: 22rpx;">
                <text>{{ ranklist[2].name }}</text>
              </view>
            </view>
          </view>
          <view class="item" @click="torankdetail(ranklist[3].name)">
            <view style="display: flex; flex-direction: column;">
              <view
                  style="background-color: #EAEFF1;  display: flex; flex-direction: row; align-items: flex-end; justify-content: center; margin-top: 30rpx;">
                <image :src="ranklist[3].pics[1]" style="width: 80rpx; height: 180rpx;"
                       mode="aspectFill"></image>
                <image :src="ranklist[3].pics[0]" style="width: 140rpx; height: 200rpx;"></image>
                <image :src="ranklist[3].pics[2]" style="width: 80rpx; height: 180rpx;"
                       mode="aspectFill"></image>
              </view>
              <view
                  style="background-color: #808A9F; height: 80rpx; color: white; display: flex; flex-direction: column; justify-content: center; font-size: 22rpx;">
                <text>{{ ranklist[3].name }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view style="display: flex; flex-direction: column; margin: 30rpx;">
      <view style="font-weight: bold; font-size: 30rpx;">读物推荐</view>
      <view style="font-size: 20rpx; margin-top: 10rpx;">最好的读物推荐给最好的你</view>
    </view>
    <view class="recommendedreadingmaterial" style="display: flex; flex-direction: column;">
      <view style="height: 300rpx; margin-bottom: 2rpx; padding: 40rpx;" v-for="(item, index) in readingmaterials"
            :key="index" @click="tomaterialdetail(item.homeurl)">
        <view style="display: flex; flex-direction: row;">
          <view>
            <image :src="item.pic" style="width: 220rpx; height: 300rpx;" mode="aspectFill"></image>
          </view>
          <view style="display: flex; flex-direction: column; padding-left: 20rpx;">
            <view style="font-size: 29rpx; font-weight: bold;">{{ item.name }}</view>
            <view style="font-size: 24rpx; margin-top: 15rpx; color: #808A9F;">{{ item.introduction }}
            </view>
          </view>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
export default {
  data() {
    return {
      rankname: '',

      // 榜单热度
      hotRankList: [
        {
          articleId: 1,
          title: '灵与肉',
          pic: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/coverpic/1.png',
          heat: 0,
        },
        {
          articleId: 2,
          title: '一台1846年的摄像机',
          pic: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/2.png',
          heat: 0,
        },
        {
          articleId: 3,
          title: '假如你观察一个小孩子',
          pic: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/3.png',
          heat: 0,
        },
        {
          articleId: 4,
          title: '像爱因斯坦一样思考',
          pic: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/4.png',
          heat: 0,
        },
        {
          articleId: 5,
          title: '厨房之战',
          pic: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/5.png',
          heat: 0,
        },
        {
          articleId: 6,
          title: '最微小的旅行',
          pic: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/6.png',
          heat: 0,
        },
        {
          articleId: 7,
          title: '像爱因斯坦一样思考',
          pic: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/4.png',
        },
        {
          articleId: 8,
          title: '厨房之战',
          pic: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/5.png',
        },
        {
          articleId: 9,
          title: '最微小的旅行',
          pic: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/6.png',
        },
        {
          articleId: 10,
          title: '像爱因斯坦一样思考',
          pic: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/4.png',
        },
      ],

      // 榜单分类
      ranklist: [
        {
          name: '科技科普榜',
          pics: [
            'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/ranklist1_1.png',
            'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/ranklist1_2.png',
            'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/ranklist1_3.png'
          ]
        },
        {
          name: '成功励志榜',
          pics: [
            'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/ranklist2_1.png',
            'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/ranklist2_2.png',
            'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/ranklist2_3.png'
          ]
        },
        {
          name: '艺术设计榜',
          pics: [
            'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/ranklist3_1.png',
            'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/ranklist3_2.png',
            'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/ranklist3_3.png'
          ]
        },
        {
          name: '人文社科榜',
          pics: [
            'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/ranklist4_1.png',
            'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/ranklist4_2.png',
            'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/ranklist4_3.png'
          ]
        }
      ],

      // 读物推荐
      readingmaterials: [
        {
          name: '读者',
          pic: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/readingmaterial_1.png',
          introduction: '《读者》原称《读者文摘》，发掘人性中的真、善、美，体现人文关怀，在刊物内容及形式方面与时俱进，追求高品位、高质量，力求精品，形式和内容具有丰富性及多样性，被誉为“中国人的心灵读本”。',
          homeurl: 'https://baike.baidu.com/item/%E8%AF%BB%E8%80%85/2643910?fr=ge_ala'

        },
        {
          name: '意林',
          pic: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/readingmaterial_2.png',
          introduction: '意林是一本以文学为主的杂志，由中国作家协会主办。它于1979年创刊，成为中国最早的文艺综合性刊物之一。意林主要以散文、小说、诗歌、书评等为主要内容，涵盖了文学、历史、哲学、社会科学等领域。',
          homeurl: 'https://baike.baidu.com/item/%E6%84%8F%E6%9E%97/3565733?fr=ge_ala'

        },
        {
          name: '青年文摘',
          pic: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/readingmaterial_3.png',
          introduction: '《青年文摘》是一本面向全国、以青少年为核心读者群的文摘类综合刊物，刊物集萃来自报纸、期刊、图书等大众媒体的名篇佳作，旨在为青少年打造一个丰富生动、健康向上的精神空间。',
          homeurl: 'https://baike.baidu.com/item/%E9%9D%92%E5%B9%B4%E6%96%87%E6%91%98/179910?fr=ge_ala'
        }
      ]
    }
  },

  onLoad() {
    uni.setTabBarItem({
      index: 0,
      text: ''
    });

    uni.setTabBarItem({
      index: 1,
      text: ''
    });

    uni.setTabBarItem({
      index: 2,
      text: '排行榜'
    });

    uni.setTabBarItem({
      index: 3,
      text: ''
    });

    this.getAllHeatsFromDb()
  },

  onShow() {
    // 每次查看的时候都刷新榜单
    this.getAllHeatsFromDb()
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
      text: ''
    });

    uni.setTabBarItem({
      index: 2,
      text: '排行榜'
    });

    uni.setTabBarItem({

      index: 3,
      text: ''
    });
  },

  methods: {
    torankdetail(name) {
      uni.navigateTo({
        url: '../leaderboard/rankdetail/rankdetail?name=' + name,
        success: res => {
          console.log("跳转成功");
        },
        fail: () => {
        },
        complete: () => {
        }
      });
    },

    tomaterialdetail(homeurl) {
      uni.navigateTo({
        url: '../leaderboard/readingmaterialdetail/readingmaterialdetail?url=' + homeurl,
        success: res => {
          console.log("跳转成功");
        },
        fail: () => {
        },
        complete: () => {
        }
      });
    },

    getAllHeatsFromDb() {
      uni.request({
        url: `http://114.215.189.9:8088/heat/getAllHeats`,
        method: 'GET',
        success: res => {
          this.hotRankList = res.data; // 先保存热度数据
          const selectIds = res.data.map(item => item.articleId); // 提取文章ID列表

          // 获取文章详细信息
          uni.request({
            url: 'http://123.56.217.170:2222/api/article/getarticlesinfobyids',
            method: 'POST',
            data: selectIds,
            success: res => {
              // 把文章信息转换成 Map 结构，方便匹配
              const articleMap = new Map(res.data.map(article => [article.articleId, article]));

              // 遍历 hotRankList，把文章详细信息补充进去
              this.hotRankList = this.hotRankList.map(item => ({
                ...item,
                pic: articleMap.get(item.articleId)?.coverpic || '', // 避免 undefined
                title: articleMap.get(item.articleId)?.title || '未知标题'
              }));
            },
            fail: err => {
              console.error("🚨 获取文章信息失败", err);
            }
          });
        },
        fail: err => {
          console.error("🚨 请求热度数据失败", err);
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

}


.top_view {
  height: var(--status-bar-height);
  width: 100%;
  position: fixed;
  background-color: white;
  top: 0;
  z-index: 999;
}

.ranklist {
  /* background-color: aquamarine; */
  /* width: 1; */
  padding: 20rpx;
  height: auto;
}

.recommendedreadingmaterial {
  padding: 20rpx;
  height: auto;
}

.container {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
}

.item {
  flex: 1;
  height: 300rpx;
  text-align: center;
  background-color: #f0f0f0;
  margin: 5px;

  width: 47.6%;
}


.page {
  margin-top: 10rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; /* 页面宽度自适应 */
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  padding-bottom: 20rpx;
  width: 100%; /* 自适应宽度 */
}

.header-title {
  background: #F2856E;
  width: 40%; /* 使用百分比来让标题宽度自适应 */
  max-width: 400rpx; /* 限制最大宽度 */
  height: 50rpx;
  border-radius: 16rpx;
  font-size: 20rpx;
  text-align: center;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-title image {
  width: 40rpx;
  height: 40rpx;
  margin-right: 8rpx;
}

.ranking {
  margin-left: 5%;
  margin-right: 5%;
  border-radius: 30rpx;
  box-sizing: border-box;
  padding: 5rpx;
  background: #EAEFF1;
  width: 90%; /* 自适应宽度 */
}

.ranking-title {
  display: flex;
  align-items: center;
  font-weight: bold;
  width: 100%;
}

.ranking-title text {
  text-align: center;
  font-size: 20rpx;
}

.ranking-title text:nth-child(1) {
  width: 15%; /* 排名列占 15% */
  text-align: left;
}

.ranking-title text:nth-child(2) {
  flex-grow: 2; /* 让文章列占更多空间 */
  text-align: center;
  padding-left: 10rpx;
}

.ranking-title text:nth-child(3) {
  width: 25%; /* 热度值列占 20% */
  text-align: right;
}

.separator {
  width: 3rpx;
  height: auto;
  flex-shrink: 0;
  background-color: white;
  margin: 0 20rpx;
}

.ranking-sum {
  display: flex;
  justify-content: center;
  align-items: stretch;
  width: 100%;
}

.ranking-list {
  width: 48%; /* 每个榜单占 48% */
  padding: 10px;
  border-radius: 10px;
  margin: 1%; /* 留出间隙 */
}

.ranking-list-item {
  display: flex;
  align-items: center;
  height: 80rpx;
  font-size: 13rpx;
}

.ranking-list-number {
  width: 15%;
  text-align: center;
  color: #777;
}

.ranking-list-number image {
  width: 25rpx;
  height: 25rpx;
}

.ranking-list-nickname {
  display: flex;
  align-items: center;
  width: 65%;
  padding-left: 10rpx;
}

.ranking-list-nickname image {
  width: 30rpx;
  height: 30rpx;
  border-radius: 50%;
  margin-right: 10rpx;
  flex-shrink: 0;
}

.ranking-list-nickname text {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ranking-list-score {
  width: 25%; /* 热度值列占 20% */
  text-align: center;
  color: #E28935;
  font-size: 16rpx;
}
</style>