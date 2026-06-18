# AI Token 价格计算器 — 设计文档

**日期:** 2026-06-18  
**目标用户:** 个人开发者  
**概述:** 一个 Nuxt 3 单页应用，用户输入各维度 token 数量和单价，实时计算 AI API 调用费用。

## 架构

分层组件架构：

```
composables/useTokenCalc.ts    — 响应式状态 + 计算逻辑（单一数据源）
components/TokenInput.vue      — 单行输入（token 数量 + 单价）
components/PriceResult.vue     — 分项明细 + 总价
app/app.vue                    — 布局容器 + 计价单位选择器
```

## 组件树

```
app.vue
├── 计价单位选择器 <select>
├── TokenInput (Input Tokens)
├── TokenInput (Cache Tokens)
├── TokenInput (Output Tokens)
└── PriceResult
```

## 数据模型

### 状态（useTokenCalc composable）

| 字段 | 类型 | 说明 |
|------|------|------|
| inputTokens | number | Input token 数量 |
| cacheTokens | number | Cache token 数量 |
| outputTokens | number | Output token 数量 |
| inputUnitPrice | number | Input 单价 |
| cacheUnitPrice | number | Cache 单价 |
| outputUnitPrice | number | Output 单价 |
| pricingUnit | PricingUnit | 计价单位枚举 |

### 派生值（computed）

| 字段 | 公式 |
|------|------|
| divisor | 按 pricingUnit 映射：千=1e3, 万=1e4, 百万=1e6, 千万=1e7 |
| inputCost | inputTokens × inputUnitPrice / divisor |
| cacheCost | cacheTokens × cacheUnitPrice / divisor |
| outputCost | outputTokens × outputUnitPrice / divisor |
| totalCost | inputCost + cacheCost + outputCost |

### 计价单位枚举

```
per_1k    → 1,000
per_10k   → 10,000
per_1M    → 1,000,000
per_10M   → 10,000,000
```

## 计算逻辑

```
cost = tokens × unitPrice / unitDivisor
```

- 输入任意字段变化 → 所有 computed 自动重算（Vue 响应式）
- 不依赖按钮触发，纯响应式计算

## UI 布局

```
┌─────────────────────────────────────┐
│  AI Token 价格计算器                 │
├─────────────────────────────────────┤
│  计价单位: [每百万 ▼]               │
├─────────────────────────────────────┤
│  Input Tokens                        │
│  数量: [______]  单价: [______]     │
│                                     │
│  Cache Tokens                       │
│  数量: [______]  单价: [______]     │
│                                     │
│  Output Tokens                      │
│  数量: [______]  单价: [______]     │
├─────────────────────────────────────┤
│  费用明细                           │
│  Input 费用:   $0.0000             │
│  Cache 费用:   $0.0000             │
│  Output 费用:  $0.0000             │
│  ──────────────────                │
│  总计:         $0.0000             │
└─────────────────────────────────────┘
```

## 边界情况

- **空输入：** token 数量或单价为空时视为 0，对应费用显示 $0.00
- **小数精度：** 结果保留 4 位小数，避免浮点误差
- **负值：** 不做校验拦截（用户可能输入负值自行处理）
- **非数字：** input[type=number] 原生处理

## 实现注意事项

- UI 实现时使用 `frontend-design` 技能确保视觉质量
- 纯前端应用，无后端/API 依赖
- 删除默认的 `NuxtWelcome` 组件
- 计价单位默认选中"每百万"（业界标准）
