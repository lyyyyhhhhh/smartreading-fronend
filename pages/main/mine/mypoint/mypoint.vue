<template>
  <view>
    <!-- 状态栏占位 -->
    <view class="status_bar">
      <view class="top_view"></view>
    </view>

    <uni-nav-bar left-icon="left" @clickLeft="backLast" :border="false" height="60px" title="我的积分"></uni-nav-bar>

    <view class="container">
      <!-- 如果 isLoading 为 true，显示加载中的提示 -->
      <view v-if="isLoading" class="loading-container">
        <text>加载中...</text>
      </view>

      <!-- 积分展示卡片 -->
      <view v-else class="card">
        <view class="title">积分中心</view>
        <view class="points-info">
          <text class="points-number">{{ points }} 积分</text>
          <view class="details-link" @click="showDetails = !showDetails">
            <text class="details-text">明细 ></text>
          </view>
        </view>
      </view>

      <!-- 弹出的积分明细面板 -->
      <view v-if="showDetails" class="details-panel">
        <view class="log-list">
          <view class="panel-header">
            <text class="panel-title">积分变动明细</text>
            <view class="panel-right">
              <view @click="getPointsLog" class="close-btn">刷新</view>
              <view @click="showDetails = false" class="close-btn">关闭</view>
            </view>
          </view>
          <view v-for="(log, index) in pointsLog" :key="index" class="log-item">
            <view class="log-details">
              <text class="log-description">{{ log.description }}</text>
              <text class="log-points"> {{ log.points | addPlusSign }} 积分</text>
              <text class="log-time">{{ log.createTime }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 阴影分隔 -->
      <view class="shadow-divider"></view>

      <!-- 日常任务模块 -->
      <view class="task-module">
        <view class="module-title">日常任务</view>
        <view class="task-list">
          <view v-for="([taskType, task], index) in Object.entries(taskRules)" :key="index">
            <view class="task-item">
              <!-- 任务内容区域 -->
              <view class="task-info">
                <text class="task-name">{{ task.name }}</text>
                <text class="task-description">{{ task.description }}</text>
              </view>

              <!-- 任务进度按钮 -->
              <view class="task-action">
                <button
                    :class="['task-btn', task.status]"
                    @click="handleTaskAction(taskType, task)"
                    :disabled="task.status === 'CLAIMED'"
                >
                  {{ task.status === 'CLAIMED' ? '今日已完成' : (task.status === 'COMPLETED' ? '领取积分' : '去完成') }}
                </button>
              </view>
            </view>
            <!-- 任务的折叠面板 -->
            <uni-collapse v-if="task.taskOptions.length > 1" :value="task.isOpen.toString()"
                          @change="toggleTaskCollapse(taskType, task)">
              <uni-collapse-item :show-animation="true">
                <template #title>
                  <view v-if="taskType==='SIGN_IN'" class="custom-title">
                    <text class="bold-text">签到进度</text>
                    <text class="gray-text">已连续签到（{{ task.progress.continuousNum % 7 }}/7）</text>
                  </view>
                  <view v-if="taskType==='COMMENT'" class="custom-title">
                    <text class="bold-text">任务进度</text>
                    <text class="gray-text">已完成（{{ task.completedNum }}/{{ task.maxAttempts }}）
                      已领奖（{{ task.claimedNum }}/{{ task.completedNum }}）
                    </text>
                  </view>
                  <view v-if="taskType==='READING'" class="custom-title">
                    <text class="bold-text">阅读进度</text>
                    <text class="gray-text">已完成（{{ task.completedNum }}/{{ task.maxAttempts }}）
                      已领奖（{{ task.claimedNum }}/{{ task.completedNum }}）
                    </text>
                  </view>
                </template>
                <uni-steps v-if="taskType==='SIGN_IN'" :active="task.progress.continuousNum%7"
                           :options="task.taskOptions"></uni-steps>
                <uni-steps v-if="taskType==='COMMENT'" :active="task.completedNum"
                           :options="task.taskOptions"></uni-steps>
                <uni-steps v-if="taskType==='READING'" :active="task.completedNum"
                           :options="task.taskOptions"></uni-steps>
              </uni-collapse-item>
            </uni-collapse>

            <!-- 任务之间的分隔线 -->
            <view class="divider"></view>
          </view>
        </view>
      </view>
      <!-- 阴影分隔 -->
      <view class="shadow-divider"></view>
      <view class="points-module">
        <view class="module-title">积分使用</view>
        <view class="usage-list">
          <view class="usage-item">
            <view class="usage-title">
              <text class="usage-text">兑换智阅币</text>
              <text class="usage-gray-text">限时优惠（每天兑换一次）</text>
            </view>
            <view class="exchange-section">
              <view class="exchange-item" v-for="(denomination, index) in exchangeDenominations" :key="index">
                <view class="exchange-coin">{{ denomination.coin }} 智阅币</view>
                <view class="exchange-points">{{ denomination.points }} 积分</view>
                <button :class="['exchange-btn', {'clicked': clickStatus[index] === true }]"
                        @click="exchangePoints(denomination.points, index)" :disabled="isDisabled(index)">
                  {{ clickStatus[index] === true ? '已兑换' : '兑换' }}
                </button>
              </view>
              <!-- 其他兑换项代码保持不变 -->
              <view class="custom-exchange">
                <input v-model="customExchangePoints" type="number">
                <input :value="customExchangedCoins" type="number" readonly>
                <button @click="exchangePoints(customExchangePoints)">自定义兑换</button>
              </view>
            </view>
          </view>
          <!-- 任务之间的分隔线 -->
          <view class="divider"></view>

          <view class="task-item">
            <view class="usage-title">
              <text class="usage-text">积分打榜</text>
              <text class="usage-gray-text">为喜欢的文章贡献热度（5积分=1热度）</text>
            </view>
            <!-- 任务进度按钮 -->
            <view class="task-action">
              <button :class="['task-btn', 'PENDING']"
                      @click="toDiscover">
                {{ '去贡献' }}
              </button>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import UniNavBar from "../../../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue";
import UniCollapse from '../../../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.vue';
import UniCollapseItem
  from '../../../../uni_modules/uni-collapse-item/components/uni-collapse-item/uni-collapse-item.vue';
import UniSteps from '../../../../uni_modules/uni-steps/components/uni-steps/uni-steps.vue';
import {mapState} from 'vuex';

export default {
  components: {UniNavBar, UniCollapse, UniCollapseItem, UniSteps},

  computed: {
    ...mapState(['userid', 'username', 'useraccount', 'useravatar', 'location', 'userphonenumber',
      'personalsignature', 'occupation', 'email', 'isLogin'
    ]),
    customExchangedCoins() {
      // 假设 10 积分兑换 1 智阅币
      return this.customExchangePoints / 10;
    },
  },

  created() {
    const storedDate = localStorage.getItem(`currentDate_${this.userid}`);
    if (storedDate !== new Date().toLocaleDateString()) {
      localStorage.removeItem(`currentDate_${this.userid}`);
      localStorage.removeItem(`clickStatus_${this.userid}`);
    } else {
      this.clickStatus = JSON.parse(localStorage.getItem(`clickStatus_${this.userid}`));
    }
  },

  data() {
    return {
      isLoading: true, // 加载状态，初始化为 true
      points: 5068, // 当前积分
      coins: 0.17, // 当前现金
      taskRules: {
        "SIGN_IN": {
          name: '评论任务',
          description: '发布3条字数超过10个字的评论',
          maxAttempts: 5, // 每天最多完成5次
          points: 10,
          status: 'PENDING',
          claimedNum: 0,
          completedNum: 0,
          isOpen: true, // 默认展开
          taskOptions: [],
        },
      },
      taskTypeToName: {
        "COMMENT": "评论",
        "SIGN_IN": "签到",
        "READING": "阅读时长"
      },
      // 活动奖励写死
      exchangeDenominations: [
        {points: 50, coin: 6},
        {points: 200, coin: 28},
        {points: 500, coin: 75},
      ],
      customExchangePoints: 0,
      clickStatus: {},
      // 记录当前日期
      currentDate: new Date().toLocaleDateString(),
      pointsLog: [
        {
          description: "购买送京豆",
          points: 5,
          referenceNum: "13857",
          createTime: "2025-02-22 22:31:25"
        },
      ],
      showDetails: false, // 控制面板显示与否
    };
  },

  async onLoad() {
    await Promise.all([this.getUserTasks(), this.getUserPoints()]);
    this.getPointsLog();
    this.isLoading = false
  },

  onShow() {
    this.getUserPoints()
  },

  filters: {
    addPlusSign(value) {
      return value > 0 ? `+${value}` : value.toString();
    }
  },

  methods: {
    backLast() {
      uni.switchTab({
        url: '/pages/main/mine/mine'
      });
    },

    toDiscover() {
      uni.switchTab({
        url: '/pages/main/discover/discover'
      });
    },

    async getUserTasks() {
      await new Promise((resolve, reject) => {
        uni.request({
          url: "http://114.215.189.9:8088/api/tasks/rules",
          method: 'GET',
          success: async res => {
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].isActive) {
                let taskType = res.data[i].taskType;
                this.taskRules[taskType] = {
                  'maxAttempts': res.data[i].maxAttempts,
                  'description': res.data[i].description,
                  'rewardPoints': res.data[i].rewardPoints,
                  'conditionJson': JSON.parse(res.data[i].conditionJson),
                  'name': this.taskTypeToName[taskType] + '任务',
                  'isOpen': true,
                  'taskOptions': [],
                };
                await this.getUserTaskDetail(taskType, this.taskRules[taskType]);
              }
            }
            resolve();
          },
          fail: () => {
            console.log("获取任务规则失败");
            reject();
            this.isLoading = false; // 获取任务规则失败时，依然继续渲染页面
          }
        });
      })
    },

    async getUserTaskDetail(taskType, task) {
      // 请求任务的次数状态
      await new Promise((resolve, reject) => {
        uni.request({
          url: `http://114.215.189.9:8088/api/tasks/detail?userId=1&taskType=${taskType}`,
          //url: `http://localhost:8088/api/tasks/detail?userId=${this.userid}&taskType=${taskType}`,
          method: 'GET',
          success: res => {
            console.log(res.data);
            task.status = res.data.status;
            task.claimedNum = res.data.claimedNum;
            task.completedNum = res.data.completedNum;
            task.progress = JSON.parse(res.data.progressJson);
            task.taskOptions = this.optionsArray(taskType, task);
            resolve();
          },
          fail: () => {
            console.log("请求任务次数详细异常");
            reject();
          }
        })
      });
    },

    async handleTaskAction(taskType, task) {
      if (task.status === 'PENDING') {
        if (taskType === 'SIGN_IN') {
          await this.userSignIn();
          await this.sleep(1000)
          await this.getUserTaskDetail(taskType, this.taskRules[taskType]);
          uni.showToast({
            title: `任务已完成！`,
            icon: 'success',
          });
        } else if (taskType === 'COMMENT') {
          this.toDiscover();
        } else if (taskType === "READING") {
          this.toDiscover();
        }
      } else if (task.status === 'COMPLETED') {
        await this.claimTaskReward(taskType);
        await this.getUserTaskDetail(taskType, this.taskRules[taskType]);
        let sumPoints = task.rewardPoints;
        if (taskType === 'SIGN_IN') {
          sumPoints += task.conditionJson.extra_points[task.progress.continuousNum % 7];
        } else if (taskType === "READING") {
          sumPoints += task.conditionJson.time_stage[task.claimedNum - 1].points;
        }
        this.points += sumPoints; // 增加积分
        uni.showToast({
          title: `任务已领取, 获得 ${sumPoints} 积分！！`,
          icon: 'success',
        });
      }
      task.taskOptions = this.optionsArray(taskType, task);
      this.$forceUpdate(); // 强制 Vue 重新渲染组件
    },

    async claimTaskReward(taskType) {
      await new Promise((resolve, reject) => {
        // 请求任务的次数状态
        uni.request({
          url: `http://114.215.189.9:8088/api/tasks/claim`,
          method: 'POST',
          data: {
            'userId': 1,
            //'userId': this.userid,
            'taskType': taskType,
          },
          success: () => {
            console.log("领取任务成功")
            resolve();
          },
          fail: () => {
            console.log("请求任务次数详细异常");
            reject();
          }
        });
      })
    },

    async userSignIn() {
      await new Promise((resolve, reject) => {
        // 请求任务的次数状态
        uni.request({
          url: `http://114.215.189.9:8088/api/sign-in`,
          method: 'POST',
          data: {
            'userId': 1,
            //'userId': this.userid,
          },
          success: () => {
            console.log("签到成功")
            resolve();
          },
          fail: () => {
            console.log("签到异常");
            reject();
          }
        });
      })
    },

    async getUserPoints() {
      await new Promise((resolve, reject) => {
        // 请求任务的次数状态
        uni.request({
          url: `http://114.215.189.9:8088/api/points/user?userId=1`,
          //url: `http://localhost:8088/api/points/user?userId=${this.userid}`,
          method: 'GET',
          success: res => {
            this.points = res.data.totalPoints;
            this.coins = res.data.coins;
            resolve();
          },
          fail: () => {
            console.log("请求任务次数详细异常");
            reject();
          }
        });
      })
    },

    isDisabled(index) {
      const storedDate = localStorage.getItem(`currentDate_${this.userid}`);
      const storedStatus = JSON.parse(localStorage.getItem(`clickStatus_${this.userid}`)) || {};
      if (storedDate !== this.currentDate) {
        this.clickStatus = {};
        localStorage.setItem(`clickStatus_${this.userid}`, JSON.stringify({}));
        localStorage.setItem(`currentDate_${this.userid}`, this.currentDate);
      }
      return storedStatus[index] === true;
    },

    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },

    // 切换任务的折叠状态
    toggleTaskCollapse(taskType, task) {
      this.taskRules[taskType].isOpen = !this.taskRules[taskType].isOpen;
      this.taskRules[taskType].taskOptions = this.optionsArray(taskType, task);
    },

    // 根据任务状态生成 steps 数组
    optionsArray(taskType, task) {
      const options = [];
      if (taskType === 'SIGN_IN') {
        for (let i = 0; i < 7; i++) {
          let step = {
            title: `第${i + 1}天`, // 步骤标题
          };
          let sumPoints = task.rewardPoints + task.conditionJson.extra_points[i + 1];
          if (i < task.progress.continuousNum % 7) {
            step.desc = '已签到';
            step.status = 'finish';
          } else {
            step.desc = '未签到';
            step.status = 'wait';
          }
          step.desc += '\n+' + sumPoints + '分'
          options.push(step);
        }
      } else if (taskType === 'COMMENT') {
        for (let i = 0; i < task.maxAttempts; i++) {
          let step = {
            title: `第${i + 1}次`, // 步骤标题
          };
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
          step.desc += '\n+' + task.rewardPoints + '分'
          options.push(step);
        }
      } else if (taskType === 'READING') {
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
      }
      return options;
    },

    async exchangePoints(pointsToExchange, index) {
      pointsToExchange = parseInt(pointsToExchange);
      if (isNaN(pointsToExchange) || pointsToExchange <= 0) {
        uni.showToast({
          title: '请输入有效的积分数量',
          icon: 'none'
        });
        return;
      }
      if (pointsToExchange > this.points) {
        uni.showToast({
          title: '积分不足，无法兑换',
          icon: 'none'
        });
        return;
      }
      let exchangedCoin = 0;
      if (isNaN(index)) {
        exchangedCoin = this.customExchangedCoins;
      } else {
        // 查找对应的兑换面额
        const denomination = this.exchangeDenominations.find(d => d.points === pointsToExchange);
        if (denomination) {
          exchangedCoin = denomination.coin;
        }
        // 更新点击状态
        this.clickStatus[index] = true;
        // 保存点击状态到本地存储
        localStorage.setItem(`clickStatus_${this.userid}`, JSON.stringify(this.clickStatus));
        localStorage.setItem(`currentDate_${this.userid}`, this.currentDate);
      }
      await new Promise((resolve, reject) => {
        uni.request({
          url: `http://114.215.189.9:8088/api/points/exchange`,
          method: 'POST',
          data: {
            'userId': 1,
            //'userId': this.userid,
            'points': pointsToExchange,
            'coins': exchangedCoin,
          },
          success: res => {
            if (res.data.success) {
              this.points -= pointsToExchange;
              this.coins += exchangedCoin;
              uni.showToast({
                title: `兑换成功，获得 ${exchangedCoin} 智阅币`,
                icon: 'success'
              });
            } else {
              uni.showToast({
                title: '兑换失败，请稍后重试',
                icon: 'none'
              });
            }
            resolve();
          },
          fail: () => {
            console.log("兑换请求异常");
            uni.showToast({
              title: '兑换请求异常，请稍后重试',
              icon: 'none'
            });
            reject();
          }
        });
      });
    },

    getPointsLog() {
      uni.request({
        url: `http://114.215.189.9:8088/api/points/log?userId=1`,
        method: 'GET',
        success: res => {
          this.pointsLog = [];
          for (let i = 0; i < res.data.length; i++) {
            let tmpLog = {};
            tmpLog.points = res.data[i].points;
            tmpLog.description = res.data[i].description;
            tmpLog.referenceNum = this.encodeData({
              "referenceTable": res.data[i].referenceTable,
              "referenceId": res.data[i].referenceId,
            });
            let timeArr = res.data[i].createTime; // 形如 [2025, 3, 27, 3, 36, 1]
            let date = new Date(timeArr[0], timeArr[1] - 1, timeArr[2], timeArr[3], timeArr[4], timeArr[5]);
            tmpLog.createTime = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
            this.pointsLog.push(tmpLog);
          }
        },
        fail: () => {
          console.log("请求积分日志异常");
        }
      })
    },

    encodeData(data) {
      return btoa(JSON.stringify(data));
    },

    decodeData(data) {
      return JSON.parse(atob(data));
    },
  }
};
</script>

<style lang="scss" scoped>
/* 状态栏占位 */
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

/* 主容器 */
.container {
  padding: 10px 20px;
}

/* 积分展示卡片 */
.card {
  background-color: #ff9933;
  padding: 25px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 30px;
  color: #fff;
  font-weight: bold;
}

.points-info {
  margin-top: 15px;
  display: flex;
  align-items: center;
}

.points-number {
  font-size: 20px;
  font-weight: lighter;
  color: white;
}

.details-link {
  margin-left: 15px;
  font-size: 16px;
  color: saddlebrown;
  cursor: pointer;
  font-weight: bolder;
}

/* 弹出的积分明细面板 */
.details-panel {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.log-list {
  width: 90%;
  background-color: #fff;
  padding: 5px;
  border-radius: 10px;
  max-height: 60%; /* 最大高度 60% */
  overflow-y: auto; /* 支持纵向滚动 */
}

.panel-header {
  z-index: 1; /* 保证标题栏在顶部 */
  position: sticky;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
}

.panel-title {
  font-size: 25px;
  font-weight: bold;
}

.panel-right {
  display: flex;
  justify-content: space-between;
}

.close-btn {
  font-size: 16px;
  color: #ff4c3b;
  cursor: pointer;
  margin-left: 10px;
}

.log-item {
  display: flex;
  padding: 15px;
  border-bottom: 1px solid #ddd;
}

.log-details {
  display: flex;
  flex-direction: column;
}

.log-description {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.log-points {
  font-size: 16px;
  color: #ff9933;
}

.log-time {
  font-size: 14px;
  color: #888;
}

/* 阴影分隔 */
.shadow-divider {
  height: 10px;
  background-color: #f0f0f0;
  margin: 20px 0;
}

/* 日常任务模块 */
.task-module {
  background-color: #fff;
  border-radius: 10px;
}

.module-title {
  font-size: 20px;
  color: #333;
  font-weight: bold;
}

.task-list {
  padding: 10px 10px 0 10px;
}

.task-item {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 任务信息 */
.task-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.task-name {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.task-description {
  font-size: 14px;
  color: #888;
  margin-top: 5px;
}

/* 任务按钮 */
.task-btn {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 按钮状态 */
.PENDING {
  background-color: #ff9933;
  color: #fff;
}

.COMPLETED {
  background-color: #4CAF50;
  color: #fff;
}

.CLAIMED {
  background-color: #ccc;
  color: #fff;
  cursor: not-allowed;
}

/* 任务折叠面板 */
.uni-collapse {
  margin-top: 12px;
}

.divider {
  height: 1px;
  background-color: #e0e0e0;
  margin: 15px 0;
}

/* 任务进度标题 */
.custom-title {
  display: flex;
  justify-content: space-between;
}

.bold-text {
  font-weight: bold;
  color: black;
  font-size: 14px;
  margin-bottom: 5px;
}

.gray-text {
  font-size: 12px;
  color: #888;
}

/* uni-steps 样式 */
.uni-steps {
  margin-top: 15px;
}

/* 阴影分隔 */
.shadow-divider {
  height: 10px;
  background-color: #f0f0f0;
  margin: 20px 0;
}

/* 积分兑换模块 */
.points-module {
  background-color: #fff;
  border-radius: 10px;
}

.usage-list {
  padding: 10px 10px 0 10px;
}

/* 积分使用信息 */
.usage-item {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.usage-title {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.usage-text {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.usage-gray-text {
  font-size: 14px;
  color: #888;
  margin-top: 5px;
}

.exchange-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* 让子元素整体居中 */
  gap: 20px;
  padding: 12px;
}

.exchange-item {
  // 一行显示 3 个元素，减去元素间的间距后计算每个元素的宽度
  width: calc((100% - 160px) / 3);;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.exchange-coin {
  font-size: 19rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.exchange-points {
  font-size: 17rpx;
  color: #666;
}

/* 任务按钮 */
.exchange-btn {
  background-color: #ff9933;
  color: #fff;
  margin-top: 15rpx;
  padding: 10px 10px;
  border-radius: 20px;
  font-size: 17rpx;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  height: 45rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 按钮状态 */
.clicked {
  background-color: #ccc;
  color: #fff;
  cursor: not-allowed;
}

.custom-exchange {
  width: 100%;
  display: flex;
  gap: 15px;
}

.custom-exchange input {
  font-size: 20rpx;
  flex: 1;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  position: relative;
}

.custom-exchange input::after {
  content: '积分';
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
}

.custom-exchange input:nth-child(2)::after {
  content: '智阅币';
}

.custom-exchange button {
  background-color: #4CAF50;
  color: #fff;
  padding: 10rpx;
  border-radius: 20rpx;
  font-size: 15rpx;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>