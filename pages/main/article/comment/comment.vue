<template>
  <view>
    <!-- 状态栏占位 -->
    <view class="status_bar"></view>
    <uni-nav-bar left-icon="left" @clickLeft="backLast" :border="false" height="60px" title="评论详细"></uni-nav-bar>
    <!-- <view style="height: 10rpx; background-color: #F6F7FB;"></view> -->
    <view class="article-info">
      <view class="info"
            style="height: 365rpx; margin-left: 20rpx; display: flex; flex-direction: row;">
        <view>
          <image :src="articleInfo.pic"
                 style="width: 240rpx;margin-left: 30rpx; border-radius: 10px; height: 345rpx; border: 2px solid #ccc; margin-top: 20rpx;"
                 mode="aspectFill">
          </image>
        </view>
        <view
            style="width: 400rpx; height: 345rpx; margin-left: 20rpx; margin-top: 20rpx; display: flex; flex-direction: column; justify-content: space-between">
          <view style=" margin-left: 20rpx;">
            <text
                style="font-weight: bold;font-size: 32rpx;">
              {{ articleInfo.title }}
            </text>
          </view>
          <view
              style="margin-top: 10rpx; margin-left: 20rpx; font-size: 25rpx; color: #3FAFFF; font-weight: bold;">
            <text>
              {{ articleInfo.author }}
            </text>
          </view>

          <view style="margin-left: 20rpx;margin-top: 20rpx; display: flex; text-align: center; align-items: center;">
            <uni-rate size="18" allow-half :readonly="true" :value="articleInfo.mark / 2" max="5"/>
            <view style="color: gray; font-size: 23rpx; margin-left: 10rpx;">
              <text>
                {{ articleInfo.mark.toFixed(1) }} 分
              </text>
            </view>
            <view style="color: gray; font-size: 23rpx;">
              <text>
                &nbsp; ({{ articleInfo.numberofcomments }}人评论)
              </text>
            </view>
          </view>

          <view style="display: flex; margin-left: 20rpx; margin-top: 20rpx; gap: 15rpx; flex-wrap: wrap;">
            <view v-for="(item, index) in articleInfo.labels" :key="index">
              <uni-tag
                  :text="item"
                  custom-style="background-color: #E7F5FF; color: #43B0FF; font-weight: bold; border: white;">
              </uni-tag>
            </view>

            <uni-tag
                :text="articleInfo.isfree ? '免费' : '付费'"
                :custom-style="`background-color: ${articleInfo.isfree ? 'green' : 'orange'};
                  color: white; font-weight: bold; border: white;`">
            </uni-tag>

          </view>
          <view style="margin-left: 20rpx; margin-top: 20rpx;">
            <u-button type="primary" @click="toreading(articleInfo)">开始阅读</u-button>
          </view>
        </view>

      </view>


      <view class="article-abstract" style="display: flex; flex-direction: column;">
        <view>
          <text style="font-size: 29rpx; font-weight: bold; margin: 20rpx; color: #616161;">简介</text>
        </view>
        <view style="font-size: 25rpx; margin: 20rpx; color: #AEAEAE; letter-spacing: 0.05em;">
           {{ articleInfo.abstract }}
          <u-read-more showHeight="60" :toggle="true" backgroundImage="none" closeText="更多">
            <rich-text :nodes="articleInfo.abstract"></rich-text>
          </u-read-more>
        </view>
      </view>

      <view style="height: 15rpx; background-color: #F6F7FB;"></view>

      <view style="display: flex; flex-direction: column;">
        <!-- 显示总条数 -->
        <view class="total-comments" style="margin-top: 10rpx">
          共 {{ comments.length }} 条评论
        </view>

        <view class="container">
          <uni-card v-for="(comment, index) in paginatedComments" :key="index">
            <!-- 标题（笔记图标 + 评论时间 + 右侧菜单） -->
            <view class="card-header">
              <view style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
                <view style="display: flex; align-items: center;">
                  <uni-icons type="compose" size="20" color="#333"/>
                  <text class="comment-time" style="margin-left: 10rpx;">
                    {{ formatDate(comment.updateTime) || '未知时间' }}
                  </text>
                </view>

                <!-- 右侧的 "三个点" 菜单按钮 -->
                <uni-icons
                    ref="menuIcons"
                    type="more-filled"
                    size="20"
                    color="#666"
                    @click="showPopup(index, comment)" />
              </view>
            </view>

            <!-- 评论内容（加粗 + 右缩进） -->
            <view class="comment-content">
              <text>{{ comment.comment }}</text>
            </view>

            <!-- 灰色分隔线 -->
            <view class="gray-divider"></view>

            <!-- 原文内容 -->
            <view class="original-text">
              <text>划线内容: "{{ comment.contentText }}"</text>
            </view>
          </uni-card>
          <!-- 自定义弹出菜单 -->
          <view v-if="popupVisible" class="popup-menu" :style="{ top: popupPosition.top + 'px', left: popupPosition.left + 'px' }">
            <button class="popup-button edit" @click="editComment">修改</button>
            <button class="popup-button delete" @click="deleteComment">删除</button>
          </view>

          <!-- 修改框 -->
          <view v-show="isEditing" class="edit-box" :style="{ top: popupPosition.top + 'px'}">
            <view class="original-content">
              <blockquote>{{ this.comment.contentText }}</blockquote>
            </view>
            <input v-model="editContent" :placeholder="this.comment.comment" class="edit-input"/>

            <!-- 水平排列的按钮 -->
            <view class="button-container">
              <button @click="cancelEdit" class="cancel-button">取消</button>
              <button @click="submitEdit" class="submit-button">提交</button>
            </view>
          </view>
          <!-- 遮罩层，点击空白处关闭弹窗 -->
          <view v-if="popupVisible" class="mask" @click="hidePopup"></view>
        </view>

        <!-- 分页按钮 -->
        <view class="pagination">
          <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
          <text>第 {{ currentPage }} 页 / 共 {{ totalPages }} 页</text>
          <button @click="nextPage" :disabled="currentPage >= totalPages">下一页</button>
        </view>

      </view>

      <ls-loading text="正在获取文章详情信息..." :animation="animation" v-if="pageLoading" fontSize="30"
                  :nav="true"></ls-loading>

    </view>
  </view>
</template>

<script>
import {
  mapState
} from 'vuex';
import UniIcons from "../../../../uni_modules/uni-icons/components/uni-icons/uni-icons.vue";
import UniCard from "../../../../uni_modules/uni-card/components/uni-card/uni-card.vue";
import UniRate from "../../../../uni_modules/uni-rate/components/uni-rate/uni-rate.vue";
import UniTag from "../../../../uni_modules/uni-tag/components/uni-tag/uni-tag.vue";
import UniNavBar from "../../../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue";
import LsLoading from "../../../../uni_modules/ls-loading/components/ls-loading/ls-loading.vue";
import UButton from "../../../../uni_modules/uview-ui/components/u-button/u-button.vue";
import UPopup from "../../../../uni_modules/uview-ui/components/u-popup/u-popup.vue";

export default {
  components: {UPopup, UButton, LsLoading, UniNavBar, UniTag, UniRate, UniCard, UniIcons},

  computed: {

    ...mapState(['userid', 'username', 'useraccount', 'useravatar', 'location', 'userphonenumber',
      'personalsignature', 'occupation', 'email',
      'isLogin'
    ]),
    totalPages() {
      return Math.ceil(this.comments.length / this.pageSize);
    },
    paginatedComments() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.comments.slice(start, start + this.pageSize);
    },
  },

  data() {
    return {
      popupVisible: false,   // 控制菜单显示
      popupPosition: { top: 0, left: 0 }, // 菜单位置
      comment: {},
      comments: [],
      articleInfo: {
        mark: 0
      },
      userId: 0,
      pageLoading: true,
      animation: 'twinkle',
      currentPage: 1, // 当前页
      pageSize: 3, // 每页显示 10 条
      isEditing: false,
      editContent: '',       // 保存编辑内容
    }
  },

  onLoad(options) {
    if (options.comments) {
      try {
        this.comments = JSON.parse(decodeURIComponent(options.comments));
      } catch (e) {
        console.error("解析评论数据失败", e);
      }
    }
    uni.request({
      url: 'http://123.56.217.170:2222/api/article/getarticleinfobyid/' + options.articleId,
      method: 'GET',
      data: {},
      success: res => {
        // 设置到页面上进行展示
        this.articleInfo.articleId = options.articleId;
        this.articleInfo.title = res.data.title;
        this.articleInfo.author = res.data.author;
        this.articleInfo.pic = res.data.coverpic;
        this.articleInfo.abstract = res.data.articleabstract;
        this.articleInfo.mark = res.data.markscore;
        this.articleInfo.numberofcomments = res.data.commentsnumber;
        this.articleInfo.labels = JSON.parse(res.data.articlelabel);
        this.articleInfo.isfree = res.data.freeornot === 0;
        this.articleInfo.oosurl = res.data.aliyuncontentoosurl
        console.log(this.articleInfo.abstract);
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

  methods: {
    backLast() {
      uni.navigateBack()
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    toreading(articleInfo) {
      // 这下带上文章标题和oos_url
      let articleinfo = {
        articleid: articleInfo.articleId,
        title: articleInfo.title,
        oosurl: articleInfo.oosurl
      }
      uni.navigateTo({
        url: '../reading/reading?article=' + JSON.stringify(articleinfo),
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
    formatDate(timeArr) {
      let date = new Date(timeArr[0], timeArr[1] - 1, timeArr[2], timeArr[3], timeArr[4], timeArr[5]);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
    },
    // 显示菜单，并设置其位置
    showPopup(index, comment) {
      this.popupVisible = true;
      // 获取点击的按钮位置
      // 尝试获取最近的父级元素
      this.$nextTick(() => {
        const iconElement = this.$refs.menuIcons[index];
        if (iconElement) {
          console.log(iconElement, iconElement.$el);
          const rect = iconElement.$el.getBoundingClientRect();
          this.popupPosition = {
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX - 40
          };
        }
      });
      this.comment = comment
    },
    hidePopup() {
      this.popupVisible = false;
    },
    editComment() {
      this.popupVisible = false;        // 关闭弹出菜单
      this.isEditing = true;    // 显示修改框
      this.editContent = this.comment.comment  // 默认显示原内容
    },
    // 取消编辑
    cancelEdit() {
      this.isEditing = false;  // 隐藏修改框
      this.editContent = '';   // 清空内容
    },

    // 提交编辑
    submitEdit() {
      this.comment.comment = this.editContent;
      uni.request({
        url: "http://114.215.189.9:8088/api/highlight",
        method: 'POST',
        data: this.comment,
        success: () => {
          console.log("修改数据成功");
          this.flushComments()
          this.isEditing = false;  // 隐藏修改框
        },
        fail: err => {
          console.log("保存数据异常", err);
        },
        complete: () => {
          // 这里可以添加一些清理逻辑
        }
      });
    },
    deleteComment() {
      const currentHighlight = {
        id: this.comment.id,
      };
      console.log(currentHighlight);
      uni.request({
        url: "http://114.215.189.9:8088/api/highlight",
        method: 'DELETE',
        data: currentHighlight,
        success: () => {
          console.log("删除数据成功", this.comment.id);
          this.flushComments();
          this.hidePopup();
        },
        fail: () => {
          console.log("删除数据异常")
        },
        complete: () => {
        }
      });
    },
    flushComments() {
      this.comments = []
      uni.request({
        url: `http://114.215.189.9:8088/api/highlight/user?userId=${this.userid}&articleId=${this.articleInfo.articleId}`,
        method: 'GET',
        success: res => {
          for (const highlight of res.data) {
            this.comments.push(highlight);
          }
          console.log(this.comments);
        },
        fail: () => {
          console.log("请求数据异常")
        },
        complete: () => {
        }
      });
    }
  }
}
</script>

<style lang="scss">
.status_bar {
  height: var(--status-bar-height);
  width: 100%;

}

.article-info {
  margin-top: 10rpx;
  width: 100%;
  height: 200rpx;
  display: flex;
  flex-direction: column;
}

.article-abstract {
  margin-top: 20rpx;
  margin-left: 20rpx;
  margin-right: 20rpx;
  padding: 30rpx;
  height: auto;
  // background-color: cadetblue;
}

.info {
  display: flex;
  margin-left: 20rpx;
  margin-right: 20rpx;
  height: 25vh;
}

.container {
  padding-left: 20rpx;
}

/* 卡片头部：笔记图标 + 时间 */
.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 10rpx;
}

.comment-time {
  margin-left: 10rpx;
  font-size: 15rpx;
  color: #555;
}

/* 评论内容（黑体 + 字体大 + 向右缩进） */
.comment-content {
  font-size: 23rpx;
  font-weight: bold;
  color: #333;
  margin-left: 20rpx; /* 右缩进 */
  margin-bottom: 10rpx;
}

/* 灰色分隔线 */
.gray-divider {
  height: 5rpx;
  background-color: #f0f0f0;
  margin: 10rpx 0;
}

/* 原文内容 */
.original-text {
  font-size: 20rpx;
  color: #999;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 50rpx;
  margin-bottom: 10rpx;
}

.total-comments {
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  margin-left: 10rpx;
}

/* 菜单样式 */
.popup-menu {
  position: absolute;
  background: white;
  border-radius: 8px;
  z-index: 999;
  width: 150rpx;
  padding: 5px;
}

/* 按钮样式 */
.popup-button {
  background: none;
  border: grey solid 1px;
  padding: 15px;
  font-size: 25rpx;
  text-align: center;
  width: 80%;
  z-index: 1000;
}

.popup-button:hover {
  background: #f5f5f5;
}

/* 删除按钮特殊样式 */
.popup-button.delete {
  color: red;
}

.popup-button.delete:hover {
  background: rgba(255, 0, 0, 0.1);
  color: darkred;
}

/* 编辑按钮特殊样式 */
.popup-button.edit {
  color: black;
}

.popup-button.edit:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #333;
}

.original-content blockquote {
  font-size: 18rpx;
  color: #555;
  border-left: 3px solid #0099FF;
  padding-left: 10rpx;
  margin-bottom: 20rpx;
  font-style: italic;
}

.edit-box {
  position: absolute;
  width: 70%;
  background: blanchedalmond;
  padding: 20rpx;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 999;
  left: 50%; /* 让左边界在屏幕中心 */
  transform: translateX(-50%); /* 向左偏移自身宽度的 50% */
}

.edit-input {
  width: 100%;
  height: 20rpx;
  padding: 5rpx; /* 增大输入框 */
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20rpx;
  font-size: 12px; /* 增大字体 */
  align-content: center;
  align-items: center;
}

.button-container {
  display: flex;
  justify-content: space-between; /* 水平排列 */
  align-items: center;
}

button {
  height: 45rpx;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
  padding: 10rpx 50rpx;
  background-color: #0099FF;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 10px;
}

.cancel-button {
  background-color: #FF4D4D; /* 取消按钮为红色 */
}

.submit-button {
  background-color: #4CAF50; /* 提交按钮为绿色 */
}

/* 遮罩层 */
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  z-index: 100;
}

</style>