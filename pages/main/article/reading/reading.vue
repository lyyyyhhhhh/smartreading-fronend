<template>
  <view>
    <!-- 网页背景开始 -->
    <view class="pagbg anmt" :style="{backgroundColor:pageBg}"></view>
    <!-- 网页背景结束 -->

    <!-- 顶部开始 -->
    <view class="anmt"
          :style="{color:fontColor,lineHeight:statusBarHeight,backgroundColor:show?menuBg:pageBg,position:'fixed',top:'0',left:'0',zIndex:'6',width:'100%',fontSize:'3vw',zIndex:'20'}">
      <!-- 时间电量开始 -->
<!--      <view :style="{height:statusBarHeight,padding: '0 5vw',marginTop: '15upx'}">-->
<!--        <view style="float: left;letter-spacing:0; margin-left: 47%;">-->
<!--          <text v-text="systemTime"></text>-->

<!--        </view>-->
<!--        <view style="float: right;letter-spacing:0;">-->
<!--          <text class="iconfont icon-80dianliang" style="font-size: 3vw;position: relative;">-->
<!--            <text class="dianxin" :style="{backgroundColor:show?menuBg:pageBg}">-->
<!--              <text class="dLiang" :style="{backgroundColor:fontColor,width:battery+'%'}"></text>-->
<!--            </text>-->
<!--          </text>-->
<!--        </view>-->
<!--      </view>-->
      <!-- 时间电量结束 -->

      <!-- 书名章节开始 -->
      <view
          style="margin-top:18upx; height: 40upx;line-height: 40upx;padding: 0 20px; display: flex; align-items: center; justify-content: space-between;">
        <view v-text="section_title"
              style="float: left;width: 150upx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;text-align: left;font-size: 25rpx; margin-top: 20rpx;">
        </view>
        <view class="zhongMenu" :class="{ active: show }" @click="dianjile"
              style="width: 150upx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;text-align: center;font-size: 25rpx; margin-top: 20rpx;">
          <text v-if="show">关闭菜单</text>
          <text v-else>显示菜单</text>
        </view>
      </view>
      <!-- 书名章节结束 -->
    </view>
    <!-- 顶部结束 -->

    <!-- 带返回键的导航栏开始 -->
    <view class="topBox anmt" :style="{color:fontColor,backgroundColor:menuBg,top:show?'0':'-150px'}">
      <view :style="{height:statusBarHeight}"></view>
      <view style="height: 40upx;"></view>
      <view
          style="height: 100upx;line-height: 100upx;text-overflow: ellipsis; display: flex; justify-content: space-between;"
          class="tMain">
        <image src="../../../../static/images/reading/yueduBack.png" class="back" @click="back()"
               style="width: 22rpx; height: 22rpx;"></image>
        <view class="zhongMenu" :class="{ active: show }" @click="showPopup"
              style="width: 100upx;float: right;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-size: 25rpx; ">
          <liu-progressbar :progress="progressTime/requiredTime * 100" bgColor="#888" dsColor="#D3D3D3" color="#333333"
                           :height="'30rpx'" :borderRadius="'40rpx'" :font-size="'15rpx'"/>
        </view>

        <view style="font-size: 25rpx; margin-right: 30rpx;">
          <uni-fav :checked="collecitonif" class="favBtn" :circle="true" bg-color="#dd524d"
                   bg-color-checked="#007aff" fg-color="#ffffff" fg-color-checked="#ffffff" @click="favClick"/>
        </view>
      </view>
    </view>
    <!-- 带返回键的导航栏结束 -->

    <!-- 菜单开始 -->
    <view class="bottomBox anmt" :style="{color:fontColor,backgroundColor:menuBg,bottom:show?'0':'-150px'}">
      <view style="overflow: hidden;">
        <view style="float: left;width: 50%;overflow: hidden;">
          <view style="float: left;width: 30%;line-height: 70upx;text-align: center;font-size: 24upx;">字体
          </view>
          <view
              style="float: left;width: 70%;height: 70upx;display: flex;align-content: center;justify-content: center;">
            <slider style="width: 100%;" :value="size" min="20" max="80" @changing="changeFontSize"
                    @change="changeFontSize" :activeColor="fontColor" :backgroundColor="pageBg"
                    :block-color="fontColor" block-size="20"/>
          </view>
        </view>
        <view style="float: left;width: 50%;overflow: hidden;">
          <view style="float: left;width: 30%;line-height: 70upx;text-align: center;font-size: 24upx;">间距
          </view>
          <view
              style="float: left;width: 70%;height: 70upx;display: flex;align-content: center;justify-content: center;">
            <slider style="width: 100%;" :value="lineHeight" min="50" max="150" @changing="changeLineHeight"
                    @change="changeLineHeight" :activeColor="fontColor" :backgroundColor="pageBg"
                    :block-color="fontColor" block-size="20"/>
          </view>
        </view>
      </view>
      <view style="overflow: hidden;">
        <view style="float: left;width: 15%;line-height: 100upx;text-align: center;font-size: 24upx;">背景</view>
        <view style="float: left;width: 85%;height: 100upx;display: flex;">
          <view class="sekuai" v-for="(item,index) in themeList" @tap="change(index)" :key="item.name"
                :style="{backgroundColor:item.pageBg,borderColor:currenttheme==index?item.fontColor:'rgba(0,0,0,0)'}"
                v-if="index!=1&&index!=2"></view>
        </view>
      </view>
      <view style="width: 100%;display: flex; justify-content: space-between;" class="ddd">

        <view @click="change(currenttheme==1?0:1)">
          <view>
            <text class="tficon">{{ currenttheme == 1 ? '&#xe699;' : '&#xe612;' }}</text>
          </view>
          <view>{{ currenttheme == 1 ? '白天' : '夜间' }}</view>
        </view>

        <view style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
          <view
              style="background-color: #999999; width: 120rpx; font-size: 20rpx; color: white; text-align: center; padding: 10rpx 0; margin-right: 20rpx">
            <view @click="ideaslist">{{ ideanum }}个想法</view>
          </view>
          <view
              style="background-color: #999999; width: 120rpx; font-size: 20rpx; color: white; text-align: center; padding: 10rpx 0;">
            <!-- 触发弹窗的按钮 -->
            <view @click="openHotPopup">增加热度</view>
          </view>
        </view>

        <view @click="change(currenttheme==2?0:2)" :style="currenttheme==2?'color:green':''">
          <view>
            <text class="tficon">&#xe639;</text>
          </view>
          <view>护眼</view>
        </view>
      </view>
    </view>
    <!-- 菜单结束 -->

    <!-- 小说正文开始 -->
    <view class="sview"
          :style="{paddingTop:'calc('+statusBarHeight+' + 40px)',color:textColor,fontSize:forUpx(size)+'px',lineHeight:forUpx(lineHeight)+'px'}">

      <view class="text-container">
        <rich-text :nodes="richTextNodes" selectable="true" @mouseup="handleSelection" @touchend="handleSelection"
                   style="position: relative;"></rich-text>
      </view>

    </view>
    <!-- 小说正文结束 -->

    <!--弹出层-->
    <view
        style="width: 95%;  height: auto; background-color: white; z-index: 1000; position: fixed; bottom: 130rpx; left: 20rpx; border-radius: 2%;"
        v-if="idealistshow" class="animation-class">
      <view>
        <scroll-view style="height: 600rpx;" scroll-y="true">
          <view v-for="(item, index) in ideaslistdata" :key="index" style=" margin: 40rpx;">
            <view style="display: flex; flex-direction: row;">
              <view style=" width: 10%; text-align: center;">
                <image :src="item.useravatar" style="width: 60rpx; height: 60rpx; border-radius: 50%;"
                       @click="touserhomepage">
                </image>
              </view>
              <view style="display: flex; flex-direction: column;  width: 70%; margin-left: 20rpx;">
                <view style="font-weight: bold; font-size: 25rpx; color: gray;">
                  {{ item.name }}
                </view>
                <view style="font-size: 25rpx; margin-top: 10rpx;">
                  {{ item.idea_content }}
                </view>
              </view>
              <view style=" width: 20%; display: flex;">
                <image src="../../../../static/images/homepage/givelike.png"
                       style="width: 30rpx; height: 30rpx; margin-left: 40rpx;"></image>
                <view style="color: gray; font-size: 22rpx; margin-left: 8rpx;">
                  {{ item.givelikenum }}
                </view>
              </view>
            </view>
            <u-divider style="margin-left: 50rpx; margin-right: 50rpx;"></u-divider>
          </view>
        </scroll-view>

        <!-- 写自己的想法 -->
        <view
            style="background-color: #169EFF; display: flex; margin-bottom: 20rpx; width: 150rpx; margin-left: 40%; border-radius: 10%; align-items: center; justify-content: center; color: white; font-size: 22rpx; height: 50rpx; margin-top: 30rpx; margin-bottom: 30rpx;"
            @click="writeselfidea">
          <image src="../../../../static/images/reading/write.png"
                 style="width: 40rpx; height: 40rpx; margin-left: 5rpx;">
          </image>
          <text style="margin-left: 5rpx;">写想法</text>
        </view>
      </view>
    </view>

    <!-- 写想法的界面 -->
    <view v-if="pulishideashow"
          style="background-color: white; height: 750rpx; position: fixed; z-index: 1001; border-radius: 3%; width: 95%; left: 20rpx; top: 350rpx;border: 1px solid gray; "
          class="animation-class">
      <u--textarea v-model="newideacontent" placeholder="把你的想法写下来吧~" count
                   style="margin-top: 10rpx; height: 70%;"></u--textarea>

      <u-divider style="margin-left: 50rpx; margin-right: 50rpx;"></u-divider>
      <view style="display: flex; justify-content: center; align-items: center;">
        <view style="font-size: 22rpx; margin-right: 20rpx;">为这篇文章打个分:</view>
        <uni-rate size="18" allow-half :value="myideascore / 2" max="5" :is-fill="false"/>
      </view>
      <view style="display: flex;  margin-bottom: 30rpx; margin-left: 500rpx; margin-top: 30rpx;">
        <view
            style="display: flex; justify-content: center; width: 80rpx; height: 40rpx; background-color: #169EFF; text-align:center; align-items: center; color: white; font-size: 22rpx; border-radius: 5%;"
            @click="cancelpublish">
          取消
        </view>
        <view
            style="display: flex; justify-content: center; width: 80rpx; height: 40rpx; background-color: #169EFF; text-align:center; align-items: center; color: white; font-size: 22rpx; border-radius: 5%; margin-right: 20rpx; margin-left: 20rpx;">
          发表
        </view>
      </view>
    </view>

    <!-- 阅读时间弹窗 -->
    <uni-popup ref="popupRef" type="center">
      <view class="popup-container">
        <!-- 关闭按钮 -->
        <view class="close-btn" @click="closePopup">✖</view>

        <!-- 弹窗内容 -->
        <view class="popup-title">📖 每日阅读任务</view>
        <view class="reading-time">
          ⏳ 今日阅读时长：
          <text class="time-highlight">{{ formattedTime }} s</text>
        </view>
        <uni-steps :active="task.completedNum" :options="task.taskOptions"></uni-steps>
        <!-- 当前阶段阅读时长 -->
      </view>
    </uni-popup>

    <!-- 热度弹窗 -->
    <uni-popup ref="hotPopupRef" type="center">
      <view class="hotPopup-container">
        <!-- 弹窗内容 -->
        <view class="hotPopup-title">🔥文章热度</view>
        <view class="heat-info">
          <text style="font-size: 30rpx; font-weight: bold;">📊当前文章热度：</text>
          <text class="heat-highlight">{{ currentHeat }}</text>
        </view>

        <view class="heat-gap" v-if="rank > 0">
          <text style="font-size: 25rpx;">🏆距上一名还差：</text>
          <text class="heat-highlight">{{ heatDiff }}</text>
        </view>
        <view class="heat-gap" v-else-if="rank === 0">
          <text style="font-size: 25rpx;">🏆领先第二名：</text>
          <text class="heat-highlight">{{ -heatDiff }}</text>
        </view>
        <view class="heat-gap" v-else >
          <text style="font-size: 25rpx;">🏆距离上榜：</text>
          <text class="heat-highlight">{{ heatDiff }}</text>
        </view>

        <!-- 输入贡献热度 -->
        <view class="input-container">
          <input
              v-model.number="contributeHeat"
              type="number"
              placeholder="请输入贡献热度"
              class="heat-input"
              @input="calculatePoints"
          />
        </view>
        <!-- 显示消耗积分 -->
        <view class="points-cost" v-if="contributeHeat > 0">
          🛒 消耗积分：
          <text class="cost-highlight">{{ requiredPoints }}</text>
        </view>
        <!-- 确认按钮 -->
        <view class="btn-group">
          <button class="confirm" @click="confirmHeat">确认</button>
          <button class="cancel" @click="closeHotPopup">取消</button>
        </view>
      </view>
    </uni-popup>

    <!-- 评论输入框 -->
    <view
        v-if="isCommenting"
        class="comment-input"
        :style="{ position: 'fixed', top: commentPosition.top + 'px', left: commentPosition.left + 'px' }"
    >
      <textarea v-model="commentText" placeholder="请输入评论内容..." class="textarea"/>
      <view class="button-group">
        <button @click="submitComment" class="button primary">提交评论</button>
        <button @click="cancelComment" class="button">取消</button>
      </view>
    </view>

    <!-- 评论详情弹窗 -->
    <view
        v-if="showCommentDetail"
        class="comment-detail"
        :style="{ position: 'fixed', top: commentPosition.top + 'px', left: commentPosition.left + 'px' }"
    >
      <view class="comment-text">
        评论内容：{{ commentShowText }}
      </view>
      <view class="button-group">
        <button @click="closeCommentDetail" class="button">关闭</button>
        <button @click="deleteComment" class="button danger">删除评论</button>
      </view>
    </view>

    <!-- 遮罩层 -->
    <u-overlay :show="idealistshow" @click="idealistshow=false; pulishideashow=false" z-index="300"></u-overlay>

    <ls-loading text="智阅正在为您加载文章..." :animation="animation" v-if="pageLoading" fontSize="30"></ls-loading>

  </view>
</template>
<script>
import LiuProgressbar from "../../../../uni_modules/liu-progressbar/components/liu-progressbar/liu-progressbar.vue";

var interval, timeInter, dianliangInter;
import theme from '../reading/theme/theme'

import {mapState} from 'vuex';
import UniPopup from "../../../../uni_modules/uni-popup/components/uni-popup/uni-popup.vue";
import UniSteps from "../../../../uni_modules/uni-steps/components/uni-steps/uni-steps.vue";

export default {
  components: {UniSteps, UniPopup, LiuProgressbar},
  computed: {
    ...mapState(['userid', 'username', 'useraccount', 'useravatar', 'location', 'userphonenumber',
      'personalsignature', 'occupation', 'email',
      'isLogin'
    ]),
    // 计算属性：格式化时间
    formattedTime() {
      const minutes = Math.floor(this.totalTime / 60);
      const seconds = this.totalTime % 60;
      return `${minutes} 分 ${seconds} 秒`;
    },
    // 根据 highlights 生成 rich-text 的 nodes
    richTextNodes() {
      const parser = new DOMParser();
      const doc = parser.parseFromString(this.content_text, "text/html");
      let currentIndex = 0;
      // 按 startIndex 排序高亮区域，避免逻辑错乱
      this.highlights.sort((a, b) => a.startIndex - b.startIndex);

      // 递归解析 DOM 节点
      const parseNode = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const textContent = node.textContent;
          const textStart = currentIndex;
          const textEnd = currentIndex + textContent.length;

          let lastIndex = 0;
          const parts = [];

          this.highlights.forEach((highlight) => {
            if (highlight.startIndex < textEnd && highlight.endIndex > textStart) {
              const startOffset = Math.max(0, highlight.startIndex - textStart);
              const endOffset = Math.min(textContent.length, highlight.endIndex - textStart);

              if (lastIndex < startOffset) {
                parts.push({
                  type: "text",
                  text: textContent.slice(lastIndex, startOffset),
                });
              }
              parts.push({
                type: "node",
                name: "span",
                attrs: {
                  style: "background-color: yellow; cursor: pointer; data-id: " + highlight.id + ";",
                  "data-id": highlight.highlightId,
                  //	onClick: () => this.showComment(highlight)
                },
                children: [
                  {
                    type: "text",
                    text: textContent.slice(startOffset, endOffset),
                  },
                ],
              });

              lastIndex = endOffset;
            }
          });

          if (lastIndex < textContent.length) {
            parts.push({
              type: "text",
              text: textContent.slice(lastIndex),
            });
          }

          currentIndex += textContent.length;
          return parts;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          // 提取标签属性（包括 style）
          const attributes = Array.from(node.attributes).reduce((acc, attr) => {
            acc[attr.name] = attr.value;
            return acc;
          }, {});

          const children = Array.from(node.childNodes)
              .map((child) => parseNode(child))
              .flat();

          return {
            type: "node",
            name: node.tagName.toLowerCase(),
            attrs: attributes, // 保留所有属性
            children,
          };
        }
        return null;
      };

      return Array.from(doc.body.childNodes)
          .map((child) => parseNode(child))
          .flat();
    },
  },

  data() {
    return {

      // 是否已收藏
      collecitonif: false,

      thisarticleid: null,

      pageLoading: true,
      animation: 'twinkle',

      ideanum: 7,

      reading_progress: 0, // 阅读进度

      // 发表想法弹出层
      pulishideashow: false,

      myideascore: 2,

      newideacontent: '',

      section_title: '陨落的天才', //章节标题
      //正文

      content_text: '',
      show: true, //菜单display
      currenttheme: 0, //当前主题
      themeList: theme.data, //主题列表
      fontColor: 'rgb(100,103,120)', //菜单字体颜色
      pageBg: 'rgb(247,247,247)', //页面背景色
      menuBg: '#fff', //菜单背景色
      textColor: '#000', //富文本文字颜色
      statusBarHeight: '',
      Dindex: '', //当前章节索引
      battery: '', //电量
      systemTime: '', //系统时间
      size: uni.getStorageSync('fontsize') ? uni.getStorageSync('fontsize') : 40, //正文字体大小
      lineHeight: uni.getStorageSync('lineHeight') ? uni.getStorageSync('lineHeight') : 70, //正文行间距

      // 网络状态
      networktype: '',

      idealistshow: false,


      // 关于本篇文章的所有想法数据
      ideaslistdata: [
        {
          name: '丁家雄',
          useravatar: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/dingjiaxiong.jpg',
          idea_content: '深入人心!',
          givelikenum: 5
        },
        {
          name: '于海龙',
          useravatar: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/user_yuhailong.jpg',
          idea_content: '感觉还不错。',
          givelikenum: 10
        },
        {
          name: '韦豪',
          useravatar: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/user_weihao.jpg',
          idea_content: '还可以。',
          givelikenum: 11
        },
        {
          name: '杨霄',
          useravatar: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/user_yangxiao.jpg',
          idea_content: '写得非常好，让人感动。',
          givelikenum: 18
        },
        {
          name: '于海龙',
          useravatar: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/user_yuhailong.jpg',
          idea_content: '感觉还不错。',
          givelikenum: 10
        },
        {
          name: '韦豪',
          useravatar: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/user_weihao.jpg',
          idea_content: '还可以。',
          givelikenum: 11
        },
        {
          name: '杨霄',
          useravatar: 'https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com/smartreading/user_yangxiao.jpg',
          idea_content: '写得非常好，让人感动。',
          givelikenum: 18
        },


      ],

      highlights: [], // 高亮区域记录
      comments: {}, // 高亮区域对应的评论内容
      isCommenting: false, // 是否处于评论状态
      commentText: "", // 评论输入框内容
      currentHighlight: null, // 当前评论的高亮区域
      showCommentDetail: false, // 是否显示评论详情
      commentShowText: "", // 当前显示的评论内容
      commentPosition: {top: 0, left: 0}, // 用于动态定位评论框位置、
      isSelecting: false, // 标志位：是否正在选择文本

      readingProgress: {},
      readingRules: {},
      tmpTime: 0,
      totalTime: 0,
      progressTime: 0, //累积时长
      addedTime: 0,
      requiredTime: 100,
      stageIdx: 0,

      task: {},

      currentHeat: 1200, // 文章当前热度
      heatDiff: 0, // 距离上一名的差值
      rank: 1, // 文章当前排名（1 表示第一名）
      userPoints: 0, // 用户当前积分
      contributeHeat: '', // 用户输入的贡献热度
      requiredPoints: 0, // 计算所需积分
      pointsPerHeat: 5 // 每 1 热度消耗的积分数
    }
  },
  mounted() {
    // 监听全局点击事件
    this.attachEventListeners();
    document.addEventListener("click", this.handleOutsideClick);
    document.addEventListener("click", this.submitTime);
  },
  beforeDestroy() {
    // 移除全局点击事件
    document.removeEventListener("click", this.handleOutsideClick);
    document.removeEventListener("click", this.submitTime);
  },
  onUnload() {
    // 页面卸载的时候清除定时器
    clearInterval(timeInter)
    //clearInterval(dianliangInter)
    uni.hideLoading();
    //页面卸载的时候将通知栏显示出来
    //plus.navigator.setFullscreen(false);
    //plus.navigator.showSystemNavigation() //隐藏虚拟按键
    this.stopTimer();

  },
  created() {
    //获取状态栏高度给顶部占位节点
    //plus.navigator.setFullscreen(true);
    var zt = uni.getStorageSync('theme'); //主题索引
    if (zt) {
      this.currenttheme = zt;
      this.fontColor = theme.data[zt].fontColor; //菜单字体颜色
      this.pageBg = theme.data[zt].pageBg; //页面背景色
      this.menuBg = theme.data[zt].menuBg; //菜单背景色
      this.textColor = theme.data[zt].textColor; //富文本文字颜色
    } else {
      this.currenttheme = 0;
      this.fontColor = theme.data[0].fontColor; //菜单字体颜色
      this.pageBg = theme.data[0].pageBg; //页面背景色
      this.menuBg = theme.data[0].menuBg; //菜单背景色
      this.textColor = theme.data[0].textColor; //富文本文字颜色
    }
    uni.getSystemInfo({
      success: res => {
        this.statusBarHeight = res.statusBarHeight + 'px';
      }
    })
  },
  onShow() {
    //页面显示的时候将通知栏隐藏掉
    //plus.navigator.setFullscreen(true);
    // 更新阅读时长
    this.getReadingLog()
    this.startTimer();
  },
  onHide() {
    //页面隐藏的时候将通知栏显示出来
    //plus.navigator.setFullscreen(false);
    this.stopTimer();

  },
  onLoad(e) {

    // 模拟正在加载

    //plus.navigator.hideSystemNavigation() //隐藏虚拟按键
    //plus.navigator.setStatusBarStyle('dark');
    //plus.navigator.setStatusBarBackground('#FF0000');
    //this.dianliang();
    this.getTimes();
    //每分钟获取一次电量
    // dianliangInter = setInterval(() => {
    // 	this.dianliang();
    // }, 60000)
    //每秒获取一次时间
    timeInter = setInterval(() => {
      this.getTimes();
    }, 1000)


    var articleinfo = JSON.parse(e.article);
    this.thisarticleid = articleinfo.articleid;
    this.getHighlightsFromDb(this.thisarticleid)
    this.getArticleHeat(this.thisarticleid)
    this.getUserPoints()
    this.getUserCollections(articleinfo)
  },
  methods: {

    attachEventListeners() {
      // 给选中的高亮元素绑定展示的函数
      document.querySelector('.text-container').addEventListener('click', (event) => {
        const target = event.target.closest('span');
        if (target) {
          const targetString = target.outerHTML;
          // 提取 style 属性值, 版本不同找不到bug
          const styleMatch = targetString.match(/style="([^"]*)"/);
          if (styleMatch) {
            const styleString = styleMatch[1];
            // 使用正则匹配 highlightId 的值
            const dataIdMatch = styleString.match(/data-id:\s*([^;]+)/);
            if (dataIdMatch) {
              const dataId = dataIdMatch[1].trim();
              this.showComment(dataId, event)
            } else {
              console.log('data-id not found in style.');
            }
          }
        }
      });
    },
    // 点击收藏按钮
    favClick() {
      if (!this.userid) {
        uni.showToast({
          title: '请先登录后再使用此功能',
          icon: 'none'
        });
        return; // 直接中断请求
      }
      // 收藏操作
      if (!this.collecitonif) {
        uni.request({
          url: 'http://123.56.217.170:2222/api/collection/favoperation',
          method: 'POST',
          data: {
            "userid": this.userid,
            "articleid": this.thisarticleid
          },
          success: res => {
            console.log(res);
            this.collecitonif = !this.collecitonif;
            uni.showToast({
              title: '收藏文章成功!'
            });
          },
        });
      } else { // 取消收藏操作
        uni.request({
          url: 'http://123.56.217.170:2222/api/collection/cancelfavoperation',
          method: 'POST',
          data: {
            "userid": this.userid,
            "articleid": this.thisarticleid
          },
          success: res => {
            console.log(res);
            this.collecitonif = !this.collecitonif;
            uni.showToast({
              title: '取消收藏成功!'
            });
          },
        });
      }
    },

    cancelpublish() {
      this.pulishideashow = false;
    },

    writeselfidea() {
      this.pulishideashow = !this.pulishideashow;
    },

    touserhomepage() {
      console.log("点击了用户头像");
    },

    //修改正文字体大小
    changeFontSize(e) {
      this.size = e.detail.value;
      uni.setStorageSync('fontsize', e.detail.value);
    },

    //修改正文行间距
    changeLineHeight(e) {
      this.lineHeight = e.detail.value;
      uni.setStorageSync('lineHeight', e.detail.value);
    },

    ideaslist() {
      this.idealistshow = !this.idealistshow;
    },

    back() {
      uni.navigateBack({});
    },

    dianjile() {
      this.show = !this.show;
      if (this.pulishideashow) {
        this.pulishideashow = !this.pulishideashow;
      }
      // 如果idea层还显示的话，一并隐藏
      if (this.idealistshow) {
        // 如果想法输入还显示的话，询问用户是否关闭
        this.idealistshow = !this.idealistshow;
      }
    },

    //切换主题
    change(e) {
      this.fontColor = theme.data[e].fontColor; //菜单字体颜色
      this.pageBg = theme.data[e].pageBg; //页面背景色
      this.menuBg = theme.data[e].menuBg; //菜单背景色
      this.textColor = theme.data[e].textColor; //富文本文字颜色
      uni.setStorageSync('theme', e);
      this.currenttheme = e;
    },

    //获取系统电量
    // dianliang() {
    // 	var this_ = this;
    // 	if (uni.getSystemInfoSync().platform != 'ios') {
    // 		var main = plus.android.runtimeMainActivity();
    // 		var Intent = plus.android.importClass('android.content.Intent');
    // 		var recevier = plus.android.implements('io.dcloud.feature.internal.reflect.BroadcastReceiver', {
    // 			onReceive: function(context, intent) {
    // 				var action = intent.getAction();
    // 				if (action == Intent.ACTION_BATTERY_CHANGED) {
    // 					var level = intent.getIntExtra("level", 0); //电量
    // 					var voltage = intent.getIntExtra("voltage", 0); //电池电压
    // 					var temperature = intent.getIntExtra("temperature", 0); //电池温度
    // 					//如需获取别的，在这里继续写，此代码只提供获取电量
    // 					this_.battery = level;
    // 				}
    // 			}
    // 		});
    // 		var IntentFilter = plus.android.importClass('android.content.IntentFilter');
    // 		var filter = new IntentFilter(Intent.ACTION_BATTERY_CHANGED);
    // 		main.registerReceiver(recevier, filter);
    // 	} else {
    // 		var UIDevice = plus.ios.import("UIDevice");
    // 		var dev = UIDevice.currentDevice();
    // 		if (!dev.isBatteryMonitoringEnabled()) {
    // 			dev.setBatteryMonitoringEnabled(true);
    // 		}
    // 		var level = dev.batteryLevel();
    // 		this_.battery = level * 100;
    // 	}
    // },
    getTimes() {
      var times = new Date();
      this.systemTime = (times.getHours() < 10 ? '0' + times.getHours() : times.getHours()) + ':' + (times
          .getMinutes() < 10 ? '0' + times.getMinutes() : times.getMinutes());
    },

    forUpx(e) {
      return uni.upx2px(e)
    },

    // 处理文本选择
    handleSelection() {
      if (!window.getSelection) return;

      const selection = window.getSelection();
      if (!selection.rangeCount) return;
      const range = selection.getRangeAt(0);
      const startNode = range.startContainer;
      const endNode = range.endContainer;

      if (!startNode || !endNode) return;

      const startOffset = range.startOffset;
      const endOffset = range.endOffset;

      const start = this.getGlobalIndex(startNode, startOffset);
      const end = this.getGlobalIndex(endNode, endOffset);
      if (start !== end) {
        this.currentHighlight = {
          highlightId: Date.now(),
          userId: this.userid,
          articleId: this.thisarticleid,
          startIndex: Math.min(start, end),
          endIndex: Math.max(start, end),
          contentText: selection.toString(),
        };
        this.isCommenting = true; // 显示评论框
        this.isSelecting = true; // 标记正在选择文本
        // 获取选区的位置
        const rect = range.getBoundingClientRect();
        this.commentPosition = this.getPosition(rect)
        // 延迟绑定 handleOutsideClick，确保 handleSelection 完成后生效
        setTimeout(() => {
          this.isSelecting = false; // 延迟取消标志位，表示文本选择结束
        }, 0);
      }
    },

    // 获取全局文本索引
    getGlobalIndex(node, offset) {
      let index = 0;
      const richTextContainer = document.querySelector("uni-rich-text");
      const traverse = (currentNode) => {
        if (currentNode === node) {
          index += offset;
          throw new Error("Found node");
        }
        if (currentNode.nodeType === Node.TEXT_NODE) {
          index += currentNode.textContent.length;
        } else if (currentNode.nodeType === Node.ELEMENT_NODE) {
          currentNode.childNodes.forEach((child) => traverse(child));
        }
      };
      try {
        traverse(richTextContainer);
      } catch (e) {
        return index;
      }
    },

    // 提交评论
    submitComment() {
      if (!this.userid) {
        uni.showToast({
          title: '请先登录后再使用此功能',
          icon: 'none'
        });
        return; // 直接中断请求
      }
      if (!this.commentText.trim()) return;
      const highlight = this.currentHighlight;
      highlight.comment = this.commentText;
      // 保存高亮区域
      this.saveHighlightToDb(highlight).then(
          res => {
            highlight.id = res.data.id;
            this.highlights.push(highlight);
            // 保存评论内容
            this.comments[highlight.id] = this.commentText;
            // 重置状态
            this.resetCommentState();
          }
      ).catch(err => {
        console.error("保存到数据库失败" + err)
      })
    },

    // 取消评论
    cancelComment() {
      this.resetCommentState();
    },

    // 重置评论状态
    resetCommentState() {
      this.currentHighlight = null;
      this.commentText = "";
      this.isCommenting = false;
    },

    // 显示评论详情
    showComment(dataId, event) {
      this.isSelecting = true;
      this.commentShowText = this.comments[dataId];
      this.currentHighlight = {
        id: dataId,
      };
      // 获取点击元素的位置和窗口滚动位置
      const rect = event.target.getBoundingClientRect();
      this.commentPosition = this.getPosition(rect)
      this.showCommentDetail = true;
      // 延迟绑定 handleOutsideClick，确保 handleSelection 完成后生效
      setTimeout(() => {
        this.isSelecting = false; // 延迟取消标志位，表示文本选择结束
      }, 0);
    },

    // 计算评论框显示位置
    getPosition(rect) {
      const windowHeight = window.innerHeight; // 浏览器视窗的高度
      const windowWidth = window.innerWidth; // 浏览器视窗的宽度
      const commentHeight = 180; // 评论框的高度
      const commentWidth = 356; // 评论框的宽度
      const margin = 18; // 评论框与目标元素的间距

      // 计算目标元素在整个页面中的位置
      const elementTop = rect.top // 元素相对于页面顶部的位置
      const elementBottom = rect.bottom // 元素底部相对于页面的位置
      let top;
      console.log(elementTop, elementBottom, windowHeight)
      if (elementBottom + commentHeight > windowHeight) {
        // 如果点击位置在视窗的下半部分，评论框显示在上方
        top = elementTop - commentHeight - margin;
      } else {
        // 否则，评论框显示在上方
        top = elementBottom + margin;
      }

      // 计算评论框的水平位置
      let left = rect.left + rect.width / 2 - commentWidth / 2; // 居中对齐
      if (left + commentWidth + margin > windowWidth) {
        // 如果评论框超出屏幕右边界，调整到右侧
        left = windowWidth - commentWidth - margin;
      }
      if (left < 0) {
        // 如果评论框超出屏幕左边界，调整到左侧
        left = margin;
      }

      // 设置评论框的显示位置
      return {
        top: top,
        left: left,
      };
    },

    // 关闭评论详情
    closeCommentDetail() {
      this.showCommentDetail = false;
      this.commentShowText = "";
      this.currentHighlight = null;
    },

    // 删除评论
    deleteComment() {
      console.log(this.currentHighlight);
      uni.request({
        url: "http://114.215.189.9:8088/api/highlight",
        method: 'DELETE',
        data: this.currentHighlight,
        success: res => {
          this.getHighlightsFromDb(this.thisarticleid)
          this.closeCommentDetail()
        },
        fail: () => {
          console.log("删除数据异常")
        },
      });
    },

    // 处理评论框
    handleOutsideClick(event) {
      const commentInput = document.querySelector(".comment-input");
      const commentDetail = document.querySelector(".comment-detail");
      // 如果正在选择文本，不处理点击外部的逻辑
      if (this.isSelecting) return;
      // 判断点击的目标是否不在评论框或评论详情框内
      const clickedOutsideInput =
          commentInput && !commentInput.contains(event.target);
      const clickedOutsideDetail =
          commentDetail && !commentDetail.contains(event.target);

      // 只有当点击发生在评论框或评论详情框之外时，才隐藏
      if (clickedOutsideInput && this.isCommenting) {
        this.resetCommentState();
      }

      if (clickedOutsideDetail && this.showCommentDetail) {
        this.closeCommentDetail();
      }
    },

    // 持久化评论
    saveHighlightToDb(highlight) {
      return new Promise((resolve, reject) => {
        uni.request({
          url: "http://114.215.189.9:8088/api/highlight",
          method: 'POST',
          data: highlight,
          success: res => {
            resolve(res); // 成功时返回结果
          },
          fail: err => {
            console.log("保存数据异常");
            reject(err); // 失败时返回错误
          },
        });
      });
    },

    // 从db中获取所有高亮评论
    getHighlightsFromDb(articleId) {
      if (!this.userid) {
        return; // 直接中断请求
      }
      uni.request({
          url: `http://114.215.189.9:8088/api/highlight/user?userId=${this.userid}&articleId=${articleId}`,
          method: 'GET',
          success: res => {
            this.highlights = res.data;
            for (const highlight of this.highlights) {
              this.comments[highlight.id] = highlight.comment
            }
          },
          fail: () => {
            console.log("请求数据异常")
          },
        });
    },

    // 开始计时
    startTimer() {
      this.timer = setInterval(() => {
        this.totalTime++;
      }, 1000);
    },

    // 停止计时
    stopTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },

    // 提交当前阅读时长
    async submitTime() {
      if (!this.userid) {
        return; // 直接中断请求
      }
      console.log(this.totalTime, this.tmpTime, this.progressTime);
      this.addedTime = this.totalTime - this.tmpTime;
      if (this.addedTime === 0) {
        return;
      }
      await new Promise((resolve, reject) => {
        uni.request({
          url: `http://114.215.189.9:8088/api/reading/submit`,
          method: 'POST',
          data: {
            "articleId": this.thisarticleid,
            "addedTime": this.addedTime,
            "userId": this.userid,
          },
          success: async () => {
            console.log("提交阅读时长详细功能");
            resolve();
          },
          fail: () => {
            console.log("请求阅读时长详细异常");
            reject();
          }
        })
      })
      if (this.progressTime < this.requiredTime) {
        this.progressTime = this.totalTime >= this.requiredTime ? this.requiredTime : this.totalTime;
      }
      if (this.progressTime <= this.requiredTime && this.totalTime >= this.requiredTime) {
        this.updateReadingTask();
      }
      this.tmpTime = this.totalTime;
    },

    // 更新当前阅读任务
    updateReadingTask() {
      if (!this.userid) {
        return; // 直接中断请求
      }
      uni.request({
        url: `http://114.215.189.9:8088/api/tasks/ongoing?userId=${this.userid}&taskType=READING`,
        method: 'GET',
        success: async res => {
          // 获取阅读规则信息
          await new Promise((resolve) => {
            uni.request({
              url: `http://114.215.189.9:8088/api/tasks/rule?taskType=READING`,
              method: 'GET',
              success: res => {
                this.readingRules = JSON.parse(res.data.conditionJson).time_stage;
                resolve(res);
              },
              fail: () => {
                console.log("请求阅读时长详细异常");
              }
            })
          })
          this.readingProgress = JSON.parse(res.data.progressJson);
          this.progressTime = this.readingProgress.readTime;
          this.stageIdx = this.readingProgress.stage_index;
          this.requiredTime = this.readingRules[this.stageIdx.toString()].read_time;
        },
        fail: () => {
          console.log("请求阅读时长详细异常");
        }
      })
    },

    // 获取阅读时长
    async getReadingLog() {
      if (!this.userid) {
        return; // 直接中断请求
      }
      await new Promise((resolve) => {
        uni.request({
          url: `http://114.215.189.9:8088/api/reading/total?userId=${this.userid}`,
          method: 'GET',
          success: res => {
            this.totalTime = res.data;
            this.tmpTime = res.data;
            resolve();
          },
        })
      });
    },

    // 弹出阅读框
    showPopup() {
      if (!this.userid) {
        uni.showToast({
          title: '请先登录后再使用此功能',
          icon: 'none'
        });
        return; // 直接中断请求
      }
      // 调用 uni-popup 的 open 方法显示弹窗
      this.$refs.popupRef.open();
      this.getUserReadingTask();
    },

    // 关闭阅读框
    closePopup() {
      this.$refs.popupRef.close();
    },

    // 获取用户阅读任务进度
    async getUserReadingTask() {
      await new Promise((resolve, reject) => {
        uni.request({
          url: "http://114.215.189.9:8088/api/tasks/rule?taskType=READING",
          method: 'GET',
          success: async res => {
            if (res.data.isActive) {
              this.task = {
                'maxAttempts': res.data.maxAttempts,
                'description': res.data.description,
                'rewardPoints': res.data.rewardPoints,
                'conditionJson': JSON.parse(res.data.conditionJson),
                'name': '阅读任务',
                'isOpen': true,
                'taskOptions': [],
              };
              await this.getUserTaskDetail(this.task);
              console.log(this.task);
            }
            resolve();
          },
          fail: () => {
            console.log("获取阅读任务规则失败");
            this.isLoading = false; // 获取任务规则失败时，依然继续渲染页面
            reject();
          }
        });
      })
    },

    // 获取任务详细
    async getUserTaskDetail(task) {
      // 请求任务的次数状态
      await new Promise((resolve, reject) => {
        uni.request({
          url: `http://114.215.189.9:8088/api/tasks/detail?userId=${this.userid}&taskType=READING`,
          method: 'GET',
          success: res => {
            task.status = res.data.status;
            task.claimedNum = res.data.claimedNum;
            task.completedNum = res.data.completedNum;
            task.progress = JSON.parse(res.data.progressJson);
            task.taskOptions = this.optionsArray(task);
            resolve();
          },
          fail: () => {
            console.log("请求任务次数详细异常");
            reject();
          }
        })
      });
    },

    // 根据任务状态生成 steps 数组
    optionsArray(task) {
      const options = [];
      for (let i = 0; i < task.maxAttempts; i++) {
        let step = {
          title: `第${i + 1}次`, // 步骤标题
        };
        let sumPoints = task.rewardPoints + task.conditionJson.time_stage[i + 1].points;
        if (i < task.claimedNum) {
          step.desc = '已领取';
          step.status = 'finish';
        } else if (i < task.completedNum) {
          step.desc = '已完成';
          step.status = 'finish';
        } else {
          step.desc = '未完成';
          step.status = 'wait';
        }
        step.desc += '\n' + "阅读 " + task.conditionJson.time_stage[i + 1].read_time + " 秒\n+" + sumPoints + '分'
        options.push(step);
      }
      console.log(options)
      return options;
    },

    // 换算热度成消耗积分
    calculatePoints() {
      this.requiredPoints = this.contributeHeat > 0 ? this.contributeHeat * this.pointsPerHeat : 0;
    },

    // 确认贡献热度
    async confirmHeat() {
      let heatValue = parseInt(this.contributeHeat);
      if (isNaN(heatValue) || heatValue <= 0) {
        uni.showToast({title: '请输入正确的热度值', icon: 'none'});
        return;
      }

      if (this.requiredPoints > this.userPoints) {
        uni.showModal({
          title: '积分不足',
          content: `是否前往积分中心完成任务?`,
          success: (res) => {
            if (res.confirm) {
              uni.navigateTo({
                url: '../../../main/mine/mypoint/mypoint',
                success() {
                  console.log("跳转详情页成功");
                }
              });
            }
          }
        });
        return;
      }

      await this.contributeArticleHeat(this.thisarticleid, this.contributeHeat)

      uni.showToast({title: `成功贡献 ${heatValue} 热度！`, icon: 'success'});

      this.contributeHeat = ''; // 清空输入框
      this.requiredPoints = 0; // 重置积分消耗
      this.closePopup();
    },

    // 弹出热度框
    openHotPopup() {
      if (!this.userid) {
        uni.showToast({
          title: '请先登录后再使用此功能',
          icon: 'none'
        });
        return; // 直接中断请求
      }
      this.$refs.hotPopupRef.open(); // 打开弹窗
    },

    // 关闭热度框
    closeHotPopup() {
      this.$refs.hotPopupRef.close(); // 关闭弹窗
    },

    // 查询文章热度
    async getArticleHeat(articleId) {
      if (!this.userid) {
        return; // 直接中断请求
      }
      await new Promise((resolve) => {
        uni.request({
          url: `http://114.215.189.9:8088/heat/getHeat?articleId=${articleId}`,
          method: 'GET',
          success: res => {
            console.log("文章热度", res.data);
            this.currentHeat = res.data.heat;
            this.heatDiff = res.data.heatDiff;
            this.rank = res.data.rank;
            console.log(this.rank);
            resolve();
          },
        })
      });
    },

    // 更新文章热度
    async contributeArticleHeat(articleId, contributeHeat) {
      await new Promise((resolve) => {
        uni.request({
          url: `http://114.215.189.9:8088/heat/contributeHeat?userId=${this.userid}&articleId=${articleId}&heat=${contributeHeat}`,
          method: 'POST',
          success: async () => {
            await this.getArticleHeat(articleId);
            await this.getUserPoints();
            resolve();
          },
        })
      })
    },

    async getUserCollections(articleinfo) {
      // 使用nginx代理
      var proxyUrl = articleinfo.oosurl.replace(
          "https://dingjiaxiong.oss-cn-hangzhou.aliyuncs.com",
          "http://114.215.189.9/oss"
      );
      console.log(articleinfo.oosurl, proxyUrl);
      uni.request({
        url: proxyUrl,
        method: 'GET',
        data: {},
        success: res => {
          this.content_text = res.data;
          this.section_title = articleinfo.title;

          // 这里再获取一下收藏状态信息
          uni.request({
            url: 'http://123.56.217.170:2222/api/collection/ifornot/' + this.userid + "/" +
                this.thisarticleid,
            method: 'GET',
            data: {},
            success: () => {
              this.collecitonif = false;
              // 到这里动画结束
              setTimeout(() => {
                this.pageLoading = false;
              }, 2000);
            },
          });
          // 获取阅读任务信息
          this.updateReadingTask();
        },
        fail: () => {
          console.log("获取文章数据失败")
        },
        complete: () => {
        }
      });

    },
    // 查询用户积分
    async getUserPoints() {
      if (!this.userid) {
        return; // 直接中断请求
      }
      await new Promise((resolve, reject) => {
        // 请求任务的次数状态
        uni.request({
          url: `http://114.215.189.9:8088/api/points/user?userId=${this.userid}`,
          method: 'GET',
          success: res => {
            this.userPoints = res.data.totalPoints;
            resolve();
          },
          fail: () => {
            console.log("请求用户积分数据异常");
            reject();
          }
        });
      })
    }
  },
}
</script>

<style scoped lang="scss">
.animation-class {
  animation: fade-in 0.5s;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@font-face {
  font-family: "iconfont";
  src: url('../../../../font/dianliang.ttf') format('truetype');
}

.iconfont {
  font-family: "iconfont" !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-80dianliang:before {
  content: "\e617";
}

.pagbg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.back {
  width: 40upx;
  height: 40upx;
  margin: 0 40upx;
}

.sview {
  width: calc(100% - 40upx);
  font-size: 45upx;
  line-height: 90upx;
  position: relative;
  text-indent: calc(2em + 12upx);
  margin: 0 auto;
  z-index: 5;
  white-space: normal;
  word-break: break-all;
  word-wrap: break-word;
  overflow: hidden;
  padding: 0 20upx 300upx;
}

.tMain {
  display: flex;
  align-items: center;
}

page {
  letter-spacing: 6upx;
}

.topBox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 1;
  z-index: 9;
}

.bottomBox {
  padding: 0 0 25rpx 0;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  opacity: 1;
  z-index: 9;
}

.bottomBox .ddd > view {
  width: 100%;
  text-align: center;
  // justify-content: center;
  font-size: 24upx;
  line-height: 40upx;
}

.bottomBox .ddd image {
  width: 20rpx;
  height: 20rpx;
}

@font-face {
  font-family: "ydiconfont";
  src: url('https://at.alicdn.com/t/font_1282539_9h0uwv1sxps.ttf') format('truetype');
  /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
}

.tficon {
  font-family: ydiconfont;
  font-size: 34upx;
}

.guanggao {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 6;
  width: 100%;
}

.dianxin {
  position: absolute;
  top: 32.5%;
  left: 11%;
  width: 72%;
  height: 35%;
}

.dLiang {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
}

.anmt {
  transition: all 0.5s;
}

.sekuai {
  width: 150upx;
  height: 100upx;
  background-color: #EC706B;
  border-radius: 12upx;
  border: 5upx solid #000;
  transform: scale(0.4);
  margin: -10upx -35upx 0;
}

.text-container {
  padding: 24rpx;
  user-select: text;
  z-index: 9;
}

.comment-input,
.comment-detail {
  position: absolute;
  width: 322px; /* 固定宽度 */
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  padding: 16px;
  display: flex;
  flex-direction: column; /* 子元素垂直排列 */
  align-items: stretch; /* 子元素宽度填满父容器 */
  gap: 12px; /* 子元素间距 */
  transition: top 0.2s, left 0.2s;
}

.textarea {
  width: 95%; /* 填满父容器 */
  height: 80px; /* 固定高度 */
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 8px;
  font-size: 14px;
  resize: none;
  outline: none;
  transition: border-color 0.2s;
}

.textarea:focus {
  border-color: #007bff; /* 聚焦时边框颜色 */
}

.button-group {
  display: flex; /* 按钮水平排列 */
  justify-content: flex-end; /* 按钮靠右对齐 */
  gap: 8px; /* 按钮之间的间距 */
}


.button {
  padding: 6px 12px;
  font-size: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.button.primary {
  background-color: #007bff;
  color: #fff;
}

.button.primary:hover {
  background-color: #0056b3;
}

.button.danger {
  background-color: #dc3545;
  color: #fff;
}

.button.danger:hover {
  background-color: #a71d2a;
}

.button:hover {
  background-color: #f1f1f1;
}

/* 弹窗整体样式 */
.popup-container {
  width: 70vw;
  background: #fff;
  padding: 40rpx;
  border-radius: 20rpx;
  box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.2);
  position: relative;
}

/* 关闭按钮 */
.close-btn {
  position: absolute;
  top: 20rpx;
  right: 20rpx;
  font-size: 36rpx;
  color: #999;
  cursor: pointer;
}

/* 关闭按钮 hover 效果 */
.close-btn:hover {
  color: #333;
}

/* 标题样式 */
.popup-title {
  font-size: 32rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30rpx;
  color: #333;
}

/* 阅读时长 */
.reading-time {
  font-size: 20rpx;
  text-align: center;
  margin-bottom: 20rpx;

  color: #555;
}

/* 高亮时长 */
.time-highlight {
  font-weight: bold;
  color: #007AFF;
  font-size: 24rpx;
}

/* 弹窗容器 */
.hotPopup-container {
  background: white;
  width: 500rpx;
  border-radius: 20rpx;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  position: relative;
  display: flex;
  flex-direction: column; /* 垂直排列子元素 */
  justify-content: space-between; /* 垂直居中 */
  align-items: center; /* 水平居中 */
  height: 100%; /* 确保容器高度充满 */
  z-index: 10; /* 确保弹窗在遮罩层之上 */
}

/* 遮罩层样式 */
uni-popup {
  position: fixed; /* 设置遮罩层为固定位置 */
  top: 0;
  left: 0;
  width: 100%; /* 遮罩层宽度占满屏幕 */
  height: 100%; /* 遮罩层高度占满屏幕 */
  background-color: rgba(0, 0, 0, 0.5); /* 遮罩层的颜色 */
  z-index: 5; /* 确保遮罩层在弹窗下方 */
}

/* 标题 */
.hotPopup-title {
  font-size: 35rpx;
  font-weight: bold;
  margin-top: 10rpx;
  margin-bottom: 15rpx;
  color: #ff5722;
}

/* 文章热度信息 */
.heat-info,
.heat-gap {
  font-size: 18rpx;
  margin: 10rpx 0;
}

/* 高亮显示 */
.heat-highlight {
  color: #ff5722;
  font-weight: bold;
  font-size: 30rpx;
}

.points-cost {
  color: #ff0000;
  font-weight: bold;
  font-size: 20rpx;
}

.cost-highlight {
  color: #ff0000;
  font-weight: bold;
  font-size: 20rpx;
}

/* 输入框 */
.input-container {
  margin-top: 15rpx;
  display: flex; /* 启用 Flexbox */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.heat-input {
  width: 80%;
  padding: 3px 10px;
  border: 2px solid #ff5722;
  border-radius: 10px;
  text-align: center;
  font-size: 20rpx;
}

/* 按钮 */
.btn-group {
  display: flex;
  justify-content: space-between;
  margin-top: 15rpx;
  margin-bottom: 10rpx;
  .confirm,
  .cancel {
    display: flex; /* 启用 Flexbox 布局 */
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    font-size: 20rpx; /* 设置更合适的字体大小 */
    padding: 0 25rpx; /* 调整按钮的内边距，控制按钮大小 */
    border-radius: 10px;
    flex: 1;
    border: none;
  }

  .confirm {
    background-color: #ff5722;
    color: white;
    margin-right: 100rpx; /* 调整按钮之间的间距 */
  }

  .cancel {
    background-color: #999;
    color: white;
  }

  /* 禁用确认按钮 */
  .confirm:disabled {
    background-color: #ddd;
    color: #666;
  }
}
</style>