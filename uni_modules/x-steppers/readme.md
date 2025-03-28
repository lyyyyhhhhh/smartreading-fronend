# x-steppers 步骤条组件

一个简单易用的步骤条组件。

## 特性

- 垂直布局
- 支持步骤描述
- 简洁的动画效果
- Vue3 组合式 API

## 基础用法

```vue
<template>
  <x-steppers 
    :steps="steps" 
    :active="active"
    active-color="#2979ff"
  >
    <!-- 第一步内容 -->
    <template #step-0>
      <view>
        <text>第一步内容</text>
        <view class="step-actions">
          <button size="mini" type="primary" @click="handleNext">下一步</button>
        </view>
      </view>
    </template>
    
    <!-- 第二步内容 -->
    <template #step-1>
      <view>
        <text>第二步内容</text>
        <view class="step-actions">
          <button size="mini" type="default" @click="active--">上一步</button>
          <button size="mini" type="primary" @click="handleNext">下一步</button>
        </view>
      </view>
    </template>
    
    <!-- 第三步内容 -->
    <template #step-2>
      <view>
        <text>第三步内容</text>
        <view class="step-actions">
          <button size="mini" type="default" @click="active--">上一步</button>
          <button size="mini" type="primary" @click="handleDone">完成</button>
        </view>
      </view>
    </template>
  </x-steppers>
</template>

<script setup>
const steps = [
  { 
    title: '第一步',
    desc: '第一步说明'  // 描述可选
  },
  { 
    title: '第二步',
    desc: '第二步说明'
  },
  { 
    title: '第三步',
    desc: '第三步说明'
  }
]

const active = ref(0)

const handleNext = () => {
  if (active.value < 2) {
    active.value++
  }
}

const handleDone = () => {
  uni.showToast({ title: '完成' })
}
</script>
```

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| steps | 步骤数据 | Array | [] |
| active | 当前步骤 | Number | 0 |
| activeColor | 主题色 | String | '#007AFF' |

### Steps 数据结构

```js
steps: [
  {
    title: '标题',   // 步骤标题
    desc: '描述'     // 步骤描述(可选)
  }
]
```

### Slots

| 名称 | 说明 |
|---|---|
| step-0 | 第一步内容 |
| step-1 | 第二步内容 |
| step-n | 第n步内容 |

## 注意事项

1. steps数组中的数据必须包含title字段
2. active值从0开始计数
3. 步骤内容通过具名插槽提供