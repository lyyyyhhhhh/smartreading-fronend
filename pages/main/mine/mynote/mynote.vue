<template>
  <view>
    <!-- 状态栏占位 -->
    <view class="status_bar">
      <view class="top_view"></view>
    </view>

    <uni-nav-bar left-icon="left" @clickLeft="backLast" :border="false" height="60px" title="我的笔记"></uni-nav-bar>

    <view v-if="Object.keys(groupedHighlights).length === 0">
      <u-empty mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png"
               style="position: fixed; top: 400rpx; left: 33%;"
               text="您还没有记过任何笔记哦!" textSize="12">
      </u-empty>
    </view>
    <view v-else>
      <view v-for="([articleId, articleInfo], index) in Object.entries(articleInfos)" :key="index"
            style="margin-left: 40rpx; height: auto; background-color: #ffffff;"
            @click="toarticledetail(groupedHighlights[articleId], articleId)">

        <view style="display: flex; align-items: center;">
          <image :src="articleInfo.pic"
                 style="width: 200rpx; height: 300rpx; margin-top: 20rpx; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); border-radius: 5%;"
                 mode="aspectFill">
          </image>

          <view style="display: flex; flex-direction: column; margin-left: 10rpx;">
            <view
                style="margin-top: 60rpx; margin-left: 20rpx; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 390rpx;">
              <text style="font-weight: bold; font-size: 28rpx;">
                {{ articleInfo.title }}
              </text>
            </view>
            <view style="margin-top: 10rpx; margin-left: 20rpx; font-size: 23rpx; color: #3FAFFF; font-weight: bold;">
              <text>{{ articleInfo.author }}</text>
            </view>

            <view style="display: flex; margin-left: 20rpx; margin-top: 30rpx; gap: 15rpx;">
              <view v-for="(label, i) in articleInfo.labels" :key="i">
                <uni-tag :text="label"
                         custom-style="background-color: #E7F5FF; color: #43B0FF; font-weight: bold; border: white;">
                </uni-tag>
              </view>
            </view>

            <view style="margin-left: 20rpx; margin-top: 40rpx; display: flex; text-align: center;">
              <view style="color: gray; font-size: 20rpx;">
                <text>&nbsp; {{ groupedHighlights[articleId].length }} 条笔记</text>
              </view>
            </view>

          </view>
        </view>
        <u-divider></u-divider>

      </view>

    </view>

    <view style="height: 20rpx;"></view>

    <ls-loading text="加载中... " :animation="animation" v-if="pageLoading" fontSize="30"></ls-loading>

  </view>
</template>

<script>
import {
  mapState
}
  from 'vuex';

export default {

  computed: {

    ...mapState(['userid', 'username', 'useraccount', 'useravatar', 'location', 'userphonenumber',
      'personalsignature', 'occupation', 'email',
      'isLogin'
    ]),

  },

  data() {
    return {
      animation: 'twinkle',
      pageLoading: true,
      articleInfos: {},
      groupedHighlights: {},
    }
  },
  onShow() {
    this.pageLoading = true;
    this.groupedHighlights = {}
    this.articleInfos = {}
    uni.request({
      url: "http://114.215.189.9:8088/api/highlight/user?userId=" + this.userid,
      method: 'GET',
      success: res => {
        // 拼接出查询条件
        var selectIds = [];
        for (let i = 0; i < res.data.length; i++) {
          selectIds.push(res.data[i].articleId);
        }

        // 根据拿到的ID列表去获取文章信息
        uni.request({
          url: 'http://123.56.217.170:2222/api/article/getarticlesinfobyids',
          method: 'POST',
          data: selectIds,
          success: res => {
            // 整理结果
            for (let i = 0; i < res.data.length; i++) {
              let articleinfo = {
                articleId: res.data[i].articleId,
                pic: res.data[i].coverpic,
                title: res.data[i].title,
                author: res.data[i].author,
                labels: JSON.parse(res.data[i].articlelabel),
                mark: res.data[i].markscore,
                numberofcomments: res.data[i].commentsnumber,
              }
              if (!this.articleInfos[articleinfo.articleId]) {
                this.articleInfos[articleinfo.articleId] = articleinfo;
              }
            }
          },
          fail: () => {
            console.log("请求文章数据异常");
          },
          complete: () => {
            this.pageLoading = false;
          }
        });
        // 按 articleId 给每种书的笔记分组

        res.data.forEach(item => {
          this.$set(this.groupedHighlights, item.articleId, this.groupedHighlights[item.articleId] || []);
          this.groupedHighlights[item.articleId].push(item);
        });

        // 到这里动画结束
        setTimeout(() => {
          this.pageLoading = false;
        }, 500);
      }
    });
  },


  methods: {
    backLast() {
      uni.switchTab({
        url: '/pages/main/mine/mine'
      })
    },

    toarticledetail(comments, articleId) {
      console.log("跳转到文章详情页");

      console.log(comments);

      uni.navigateTo({
        url: `../../../main/article/comment/comment?articleId=${articleId}&comments=${encodeURIComponent(JSON.stringify(comments))}`,
        success: () => {
          console.log("跳转文章评论成功");
        },
        fail: () => {
        },
        complete: () => {
        }
      });
    },
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

.swipe-action {
  &__content {
    padding: 25rpx 0;

    &__text {
      font-size: 15px;
      color: $u-main-color;
      padding-left: 30rpx;
    }
  }
}

.shadow-box.active {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
</style>
