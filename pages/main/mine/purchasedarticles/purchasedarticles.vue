<template>
  <view>
    <!-- 状态栏占位 -->
    <view class="status_bar">
      <view class="top_view"></view>
    </view>

    <uni-nav-bar left-icon="left" @clickLeft="backLast" :border="false" height="60px" title="已购文章"></uni-nav-bar>
    <view v-if="myPurchasedArticles.length === 0">
      <u-empty mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png"
               style="position: fixed; top: 400rpx; left: 33%;" text="您还没有购买过任何文章哦!" textSize="12">
      </u-empty>
    </view>
    <view v-else>
      <view v-for="(item, index) in myPurchasedArticles" :key="index"
            style="margin-left: 40rpx;  height: auto; background-color: #ffffff;"
            @click="toarticledetail(item.articleid)" @longpress="handleLongPress(item)">

        <view style="display: flex; align-items: center; ">
          <image :src="item.pic"
                 style="width: 200rpx; height: 300rpx; margin-top: 20rpx; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); border-radius: 5%;"
                 mode="aspectFill">
          </image>
          <view style="display: flex; flex-direction: column; margin-left: 10rpx;" class="swipe-action">
            <view
                style="margin-top: 60rpx; margin-left: 20rpx; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 390rpx;">
              <text style="font-weight: bold;font-size: 28rpx;  ">
                {{ item.title }} </text>
            </view>
            <view
                style="margin-top: 10rpx; margin-left: 20rpx; font-size: 23rpx; color: #3FAFFF; font-weight: bold;">
              <text>
                {{ item.author }} </text>
            </view>

            <view style="display: flex; margin-left: 20rpx; margin-top: 30rpx; gap: 15rpx;">
              <view v-for="(item, i) in item.labels" :key="i">
                <uni-tag :text="item"
                         custom-style="background-color: #E7F5FF;  color: #43B0FF; font-weight: bold; border: white;">
                </uni-tag>
              </view>
            </view>

            <view style="margin-left: 20rpx;margin-top: 40rpx; display: flex; text-align: center;">
              <uni-rate size="15" allow-half :readonly="true" :value="item.mark / 2" max="5" />
              <view style="color: gray; font-size: 20rpx; margin-left: 10rpx;"><text>
                {{ item.mark.toFixed(1) }} 分 </text>
              </view>
              <view style="color: gray; font-size: 20rpx;"><text>
                &nbsp; ({{ item.numberofcomments }}人评论)
              </text></view>
            </view>

            <view style="font-size: 20rpx; margin-left: 180rpx; margin-top: 30rpx; color: gray;">
              购买于:
              {{ item.purchasedTime }}
            </view>

          </view>
        </view>
        <u-divider></u-divider>

      </view>
    </view>

    <view style="height: 20rpx;"></view>

    <u-modal :show="firstmodalshow" :title="firstmodaltitle" :showConfirmButton="false" :showCancelButton="true"
             @confirm="firstmodalconfirm" @cancel="firstmodalcancel">
      <view class="slot-content">
        <view style="margin: 20rpx; display: flex; flex-direction: column;">
          <view @click="cancelthiscollect" style="display: flex; align-items: center;">
            <image src="../../../../static/images/collect/cancelcollect.png"
                   style="height: 45rpx; width: 45rpx;"></image>
            <view style="margin-left: 22rpx; font-size: 25rpx;">取消收藏</view>
          </view>
          <view @click="addmyarticleset" style="display: flex; margin-top: 30rpx; align-items: center;">
            <image src="../../../../static/images/collect/addmyarticleset.png"
                   style="height: 45rpx; width: 45rpx;"></image>
            <view style="margin-left: 22rpx; font-size: 25rpx;">加入我的文章集</view>
          </view>
        </view>
      </view>
    </u-modal>

    <u-modal :show="secmodalshow" :title="secmodaltitle" :showConfirmButton="true" :showCancelButton="true"
             @confirm="secmodalconfirm" @cancel="secmodalcancel">
      <view class="slot-content">

      </view>
    </u-modal>



    <!-- 遮罩层 -->
    <!-- <u-overlay :show="overlayshow" @click="overlayshow=false; pulishideashow=false" z-index="999"></u-overlay> -->

    <u-action-sheet :actions="list" :title="title" :show="actionsheetshow" @select="selectClick"
                    @close="closeaction" round="10" :safeAreaInsetBottom="true" :closeOnClickAction="false"></u-action-sheet>

    <ls-loading text="加载中... " :animation="animation" v-if="pageLoading" fontSize="30"></ls-loading>

  </view>
</template>

<script>
import {
  mapState
}
  from 'vuex';
import UniNavBar from "../../../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue";

export default {
  components: {UniNavBar},

  computed: {

    ...mapState(['userid', 'username', 'useraccount', 'useravatar', 'location', 'userphonenumber',
      'personalsignature', 'occupation', 'email',
      'isLogin'
    ]),

  },

  data() {
    return {

      // 弹出选项
      title: '选择您想要加入的文章集',
      list: [],
      actionsheetshow: false,

      firstmodalshow: false,
      firstmodaltitle: '',

      secmodalshow: false,
      secmodaltitle: '',

      options1: [{
        text: '删除'
      }],

      pageLoading: true,
      animation: 'twinkle',

      myPurchasedArticles: [],

      // 收藏时间列表
      purchasedTimes: [],

      modalarticleid: null,

      selectitle: '',
      selectarticlesetid: null,
    }
  },

  onShow() {

    this.pageLoading = true;
    // 模拟请求数据
    uni.request({
      url: `http://114.215.189.9:8088/api/user-purchased-articles/user?userId=${this.userid}`,
      method: 'GET',
      data: {},
      success: res => {

        console.log(res.data); // 收藏时间一并拿到

        // 拼接出查询条件
        var selectids = [];
        this.purchasedTimes.length = 0;
        for (let i = 0; i < res.data.length; i++) {
          selectids.push(res.data[i].articleId);
          this.purchasedTimes.push(res.data[i].purchaseTime);
        }

        console.log(selectids);

        // 根据拿到的ID列表去获取文章信息
        uni.request({
          url: 'http://123.56.217.170:2222/api/article/getarticlesinfobyids',
          method: 'POST',
          data: selectids,
          success: res => {
            console.log("拿到的文章列表信息");
            console.log(res);

            this.myPurchasedArticles.length = 0;
            // 整理结果
            for (let i = 0; i < res.data.length; i++) {

              let purchasedTime = new Date(Date.parse(this.purchasedTimes[i]));

              var year = purchasedTime.getFullYear();
              var month = ("0" + (purchasedTime.getMonth() + 1)).slice(-2);
              var day = ("0" + purchasedTime.getDate()).slice(-2);
              var hours = ("0" + purchasedTime.getHours()).slice(-2);
              var minutes = ("0" + purchasedTime.getMinutes()).slice(-2);
              var seconds = ("0" + purchasedTime.getSeconds()).slice(-2);

              var formattedDate = year + "-" + month + "-" + day + " " + hours +
                  ":" + minutes + ":" + seconds;

              let articleinfo = {
                articleid: res.data[i].articleId,
                pic: res.data[i].coverpic,
                title: res.data[i].title,
                author: res.data[i].author,
                labels: JSON.parse(res.data[i].articlelabel),
                mark: res.data[i].markscore,
                numberofcomments: res.data[i].commentsnumber,
                // 加一个收藏时间
                purchasedTime: formattedDate
              }

              this.myPurchasedArticles.push(articleinfo);

            }

            // 到这里动画结束
            setTimeout(() => {
              this.pageLoading = false;
            }, 500);
          },
          fail: () => {},
          complete: () => {}
        });


      },
      fail: () => {},
      complete: () => {}
    });
  },

  methods: {

    handleLongPress(iteminfo) {
      console.log("长按了");
      console.log(iteminfo);
      this.firstmodaltitle = '《' + iteminfo.title + '》';

      this.firstmodalshow = true;

      this.selectitle = iteminfo.title;

      this.modalarticleid = iteminfo.articleid;
    },

    backLast() {
      uni.switchTab({
        url: '/pages/main/mine/mine'
      })
    },

    toarticledetail(articleid) {
      console.log("跳转到文章详情页");

      console.log(articleid);

      uni.navigateTo({
        url: '../../../main/article/detail/detail?articleid=' + articleid,
        success: res => {
          console.log("跳转文章详情页成功");
        },
        fail: () => {},
        complete: () => {}
      });
    },

    cancelcollect() {
      console.log("取消收藏");
    },

    firstmodalconfirm() {
      console.log("确定");
      this.firstmodalshow = false;
    },

    firstmodalcancel() {
      console.log("取消");
      this.firstmodalshow = false;
      this.actionsheetshow = false;
    },

    secmodalconfirm() {
      console.log("确定加入文章集");
      // this.secmodalshow = false;

      // console.log(this.selectarticlesetid);
      // console.log(this.modalarticleid);

      // 发起请求
      // 先判断是否已经存在
      uni.request({
        url: 'http://123.56.217.170:2222/api/articleset/judgearticleinsetstatus/' + this
                .modalarticleid +
            "/" + this.selectarticlesetid,
        method: 'GET',
        data: {},
        success: res => {
          console.log(res.data);

          //
          if (res.data) { // 为true说明已经加入了

            uni.showToast({
              title: '此文章已经加入文章集，无法反复加入',
              icon: 'error',

              duration: 2000
            });

            this.secmodalshow = false;
          } else {

            // 没加入过，发起加入请求
            // 通过文章集ID拿到所有数据
            uni.request({
              url: 'http://123.56.217.170:2222/api/articleset/getarticlesetinfobyid/' +
                  this.selectarticlesetid,
              method: 'GET',
              data: {},
              success: res => {
                console.log(res);

                //
                console.log(res.data.setarticles);
                console.log(res.data.setarticles);
                let articlesids = res.data.setarticles;

                articlesids.push(this.modalarticleid);

                console.log(articlesids);

                let articlesetinfo = {
                  setname: res.data.setname,
                  setauthor: res.data.setauthor,
                  setauhorid: res.data.setauhorid,
                  setabstract: res.data.setabstract,
                  coverpic: res.data.coverpic,
                  articlenumber: res.data.setarticles.length,
                  setarticles: articlesids,
                  articlesetId: res.data.articlesetId
                }

                console.log(articlesetinfo);

                // 使用这个数据直接调用更新接口更新文章集
                uni.request({
                  url: 'http://123.56.217.170:2222/api/articleset/updatearticleset',
                  method: 'POST',
                  data: articlesetinfo,
                  success: res => {
                    console.log(res);
                    uni.showToast({
                      title: '文章加入文章集成功!'
                    });
                    // 完成后回到我的收藏
                    uni.reLaunch({
                      url: '/pages/main/mine/mycollection/mycollection'
                    })


                  },
                  fail: () => {},
                  complete: () => {}
                });

              },
              fail: () => {},
              complete: () => {}
            });

          }
        },
        fail: () => {},
        complete: () => {}
      });

    },

    secmodalcancel() {
      console.log("取消加入文章集");
      this.secmodalshow = false;
    },

    cancelthiscollect() {
      // console.log("取消这篇文章的收藏");

      // console.log(this.modalarticleid);

      uni.request({
        url: 'http://123.56.217.170:2222/api/collection/cancelfavoperation',
        method: 'POST',
        data: {
          "userid": this.userid,
          "articleid": this.modalarticleid
        },
        success: res => {
          console.log(res);
          uni.showToast({
            title: '取消收藏成功!'
          });

          uni.reLaunch({
            url: '/pages/main/mine/mycollection/mycollection'
          })

        },
        fail: () => {},
        complete: () => {}
      });


    },

    addmyarticleset() {
      console.log("加入我的文章集");

      console.log(this.modalarticleid);

      // 根据用户ID拿到所有的文章集信息
      uni.request({
        url: 'http://123.56.217.170:2222/api/articleset/getarticlesetsinfobyuserid/' + this.userid,
        method: 'GET',
        data: {},
        success: res => {
          console.log(res.data);

          this.actionsheetshow = true;

          this.list.length = 0;

          for (let i = 0; i < res.data.length; i++) {
            let actionitem = {
              name: res.data[i].setname,
              subname: res.data[i].setabstract,
              articlesetid: res.data[i].articlesetId,
              fontSize: '15'
            }

            this.list.push(actionitem);
          }
        },
        fail: () => {},
        complete: () => {}
      });

    },

    selectClick(index) {
      console.log(index);

      this.actionsheetshow = false;
      this.firstmodalshow = false;

      this.secmodaltitle = "确认将文章 " + this.selectitle + " 加入 " + index.name + " 文章集吗? ";

      console.log(this.modalarticleid);
      console.log(index.articlesetid);
      this.selectarticlesetid = index.articlesetid;

      this.secmodalshow = true;


    },

    closeaction() {
      this.actionsheetshow = false;
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