<template>
  <view class="x-steps">
    <view 
      class="step-item"
      v-for="(item, index) in steps" 
      :key="index"
      :class="{
        'is-active': index <= active,
        'is-last': index === steps.length - 1,
        'is-first': index === 0
      }"
    >
      <!-- 步骤点和标题 -->
      <view 
        class="step-header"
        :class="{ 'is-clickable': index <= active + 1 }"
      >
        <!-- 步骤点 -->
        <view class="step-point">
          <view class="point-inner">
            <text v-if="index < active" class="step-icon">✓</text>
            <text v-else class="step-number">{{index + 1}}</text>
          </view>
        </view>
        
        <!-- 标题和描述 -->
        <view class="step-info">
          <text class="step-title">{{item.title}}</text>
          <text v-if="item.desc" class="step-desc">{{item.desc}}</text>
        </view>
      </view>
      
      <!-- 步骤内容插槽 -->
      <view class="step-content" v-show="index === active">
        <slot :name="`step-${index}`"></slot>
      </view>
      
      <!-- 连接线 -->
      <view v-if="index !== steps.length - 1" class="step-line">
        <view class="line-inner"></view>
      </view>
    </view>
  </view>
</template>

<script setup>
const props = defineProps({
  // 步骤数据
  steps: {
    type: Array,
    default: () => []
  },
  // 当前激活步骤
  active: {
    type: Number,
    default: 0
  },
  // 主题色
  activeColor: {
    type: String,
    default: '#007AFF'
  }
})
</script>

<style>
.x-steps {
  width: 100%;
  padding: 30rpx 20rpx;
  box-sizing: border-box;
  flex-direction: column;
}

.step-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 0 40rpx 0;
  min-height: 60rpx;
}

.step-header {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  position: relative;
  z-index: 1;
  width: 100%;
  cursor: default;
}

.step-header.is-clickable {
  cursor: pointer;
}

.step-header.is-clickable:hover {
  opacity: 0.8;
}

.step-header.is-clickable:active {
  opacity: 0.6;
}

.step-point {
  width: 36rpx;
  height: 36rpx;
  border-radius: 50%;
  background: #fff;
  border: 2rpx solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16rpx;
  transition: all 0.3s;
  position: relative;
  z-index: 1;
  flex-shrink: 0;
}

.point-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.is-active .step-point {
  border-color: v-bind(activeColor);
  background: v-bind(activeColor);
  color: #fff;
}

.step-number {
  font-size: 24rpx;
  color: inherit;
  line-height: 1;
}

.step-icon {
  font-size: 24rpx;
  color: #fff;
  line-height: 1;
}

.step-content {
  flex: 1;
  padding: 20rpx;
  background: #f8f8f8;
  border-radius: 8rpx;
  margin-top: 16rpx;
  width: calc(100% - 52rpx);
  margin-left: 52rpx;
  box-sizing: border-box;
}

.step-info {
  display: flex;
  flex-direction: column;
}

.step-title {
  font-size: 28rpx;
  color: #333;
  line-height: 36rpx;
}

.step-desc {
  font-size: 24rpx;
  color: #999;
  line-height: 1.5;
  margin-top: 8rpx;
}

.step-line {
  position: absolute;
  top: 36rpx;
  left: 18rpx;
  width: 2rpx;
  height: calc(100% - 16rpx);
  background: #f5f5f5;
  overflow: hidden;
}

.line-inner {
  height: 0;
  width: 100%;
  transition: height 0.3s ease-in-out;
  background: v-bind(activeColor);
}

.is-active .line-inner {
  height: 100%;
}

/* 首尾项特殊处理 */
.is-last .step-line {
  display: none;
}

/* 激活状态标题样式 */
.is-active .step-title {
  color: v-bind(activeColor);
  font-weight: bold;
}

/* 非当前步骤标题样式 */
.is-active:not(.is-current) .step-title {
  color: #333;
  font-weight: normal;
}
</style> 