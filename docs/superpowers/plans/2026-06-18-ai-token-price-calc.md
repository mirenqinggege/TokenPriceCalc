# AI Token 价格计算器 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 实现一个 AI Token 用量价格计算器，用户输入各维度 token 数量及单价，实时计算总费用。

**Architecture:** Nuxt 3 单页应用，分层组件架构。`useTokenCalc` composable 管理所有响应式状态和计算逻辑；`TokenInput` 组件封装单行输入；`PriceResult` 组件展示分项明细和总价；`app.vue` 组装布局。UI 样式由 frontend-design 技能驱动。

**Tech Stack:** Nuxt 4.4, Vue 3.5, TypeScript

---

### Task 1: 创建 useTokenCalc composable

**Files:**
- Create: `composables/useTokenCalc.ts`

- [ ] **Step 1: 编写 composable**

```typescript
export type PricingUnit = 'per_1k' | 'per_10k' | 'per_1M' | 'per_10M'

export interface PricingUnitOption {
  label: string
  value: PricingUnit
  divisor: number
}

export const pricingUnitOptions: PricingUnitOption[] = [
  { label: '每千 tokens', value: 'per_1k', divisor: 1_000 },
  { label: '每万 tokens', value: 'per_10k', divisor: 10_000 },
  { label: '每百万 tokens', value: 'per_1M', divisor: 1_000_000 },
  { label: '每千万 tokens', value: 'per_10M', divisor: 10_000_000 },
]

export function useTokenCalc() {
  const inputTokens = ref<number>(0)
  const cacheTokens = ref<number>(0)
  const outputTokens = ref<number>(0)

  const inputUnitPrice = ref<number>(0)
  const cacheUnitPrice = ref<number>(0)
  const outputUnitPrice = ref<number>(0)

  const pricingUnit = ref<PricingUnit>('per_1M')

  const divisor = computed(() => {
    return pricingUnitOptions.find(u => u.value === pricingUnit.value)?.divisor ?? 1_000_000
  })

  const inputCost = computed(() => (inputTokens.value * inputUnitPrice.value) / divisor.value)
  const cacheCost = computed(() => (cacheTokens.value * cacheUnitPrice.value) / divisor.value)
  const outputCost = computed(() => (outputTokens.value * outputUnitPrice.value) / divisor.value)
  const totalCost = computed(() => inputCost.value + cacheCost.value + outputCost.value)

  return {
    inputTokens,
    cacheTokens,
    outputTokens,
    inputUnitPrice,
    cacheUnitPrice,
    outputUnitPrice,
    pricingUnit,
    divisor,
    inputCost,
    cacheCost,
    outputCost,
    totalCost,
  }
}
```

- [ ] **Step 2: 验证 composable 文件语法**

Run: `pnpm exec tsc --noEmit composables/useTokenCalc.ts`
Expected: 无错误输出（Nuxt auto-imports 的 `ref`/`computed` 由 `.nuxt/tsconfig.json` 的 paths 提供）

- [ ] **Step 3: Commit**

```bash
git add composables/useTokenCalc.ts
git commit -m "feat: 添加 useTokenCalc composable — 状态和计算逻辑"
```

---

### Task 2: 创建 TokenInput 组件

**Files:**
- Create: `components/TokenInput.vue`

- [ ] **Step 1: 编写组件**

TokenInput 接收 label 显示标签，通过 `defineModel` 双向绑定 tokens 和 unitPrice。

```vue
<script setup lang="ts">
defineProps<{ label: string }>()
const tokens = defineModel<number>('tokens', { default: 0 })
const unitPrice = defineModel<number>('unitPrice', { default: 0 })
</script>

<template>
  <div class="token-input">
    <label class="dim-label">{{ label }}</label>
    <div class="input-row">
      <label class="field">
        <span>数量</span>
        <input
          v-model.number="tokens"
          type="number"
          min="0"
          placeholder="0"
        />
      </label>
      <label class="field">
        <span>单价</span>
        <input
          v-model.number="unitPrice"
          type="number"
          min="0"
          step="0.0001"
          placeholder="0.00"
        />
      </label>
    </div>
  </div>
</template>

<style scoped>
/* 占位 — 最终样式由 frontend-design 技能提供 */
</style>
```

- [ ] **Step 2: Commit**

```bash
git add components/TokenInput.vue
git commit -m "feat: 添加 TokenInput 组件 — token 数量和单价输入行"
```

---

### Task 3: 创建 PriceResult 组件

**Files:**
- Create: `components/PriceResult.vue`

- [ ] **Step 1: 编写组件**

接收四个 computed 数值，展示分项和总计。价格保留 4 位小数。

```vue
<script setup lang="ts">
defineProps<{
  inputCost: number
  cacheCost: number
  outputCost: number
  totalCost: number
}>()
</script>

<template>
  <div class="price-result">
    <span class="section-title">费用明细</span>
    <div class="breakdown">
      <div class="cost-line">
        <span>Input 费用</span>
        <span class="cost-value">${{ inputCost.toFixed(4) }}</span>
      </div>
      <div class="cost-line">
        <span>Cache 费用</span>
        <span class="cost-value">${{ cacheCost.toFixed(4) }}</span>
      </div>
      <div class="cost-line">
        <span>Output 费用</span>
        <span class="cost-value">${{ outputCost.toFixed(4) }}</span>
      </div>
      <hr />
      <div class="cost-line total-line">
        <span>总计</span>
        <span class="cost-value">${{ totalCost.toFixed(4) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 占位 — 最终样式由 frontend-design 技能提供 */
</style>
```

- [ ] **Step 2: Commit**

```bash
git add components/PriceResult.vue
git commit -m "feat: 添加 PriceResult 组件 — 费用明细和总价展示"
```

---

### Task 4: 重写 app.vue 组装页面

**Files:**
- Modify: `app/app.vue`

- [ ] **Step 1: 替换默认内容为计算器布局**

使用 `useTokenCalc` composable 和子组件，替换 `<NuxtWelcome />`。

```vue
<script setup lang="ts">
const {
  inputTokens,
  cacheTokens,
  outputTokens,
  inputUnitPrice,
  cacheUnitPrice,
  outputUnitPrice,
  pricingUnit,
  inputCost,
  cacheCost,
  outputCost,
  totalCost,
} = useTokenCalc()
</script>

<template>
  <div class="calculator">
    <NuxtRouteAnnouncer />
    <h1>AI Token 价格计算器</h1>

    <label class="unit-selector">
      <span>计价单位</span>
      <select v-model="pricingUnit">
        <option
          v-for="u in pricingUnitOptions"
          :key="u.value"
          :value="u.value"
        >
          {{ u.label }}
        </option>
      </select>
    </label>

    <section class="inputs">
      <TokenInput
        label="Input Tokens"
        v-model:tokens="inputTokens"
        v-model:unit-price="inputUnitPrice"
      />
      <TokenInput
        label="Cache Tokens"
        v-model:tokens="cacheTokens"
        v-model:unit-price="cacheUnitPrice"
      />
      <TokenInput
        label="Output Tokens"
        v-model:tokens="outputTokens"
        v-model:unit-price="outputUnitPrice"
      />
    </section>

    <PriceResult
      :input-cost="inputCost"
      :cache-cost="cacheCost"
      :output-cost="outputCost"
      :total-cost="totalCost"
    />
  </div>
</template>

<style scoped>
/* 占位 — 最终样式由 frontend-design 技能提供 */
</style>
```

- [ ] **Step 2: 验证 dev server 启动**

Run: `pnpm dev`
Expected: 无构建错误，浏览器打开 `http://localhost:3000` 可见计算器界面

- [ ] **Step 3: Commit**

```bash
git add app/app.vue
git commit -m "feat: 组装计算器页面，替换默认 NuxtWelcome"
```

---

### Task 5: 使用 frontend-design 技能进行视觉设计

**Files:**
- Modify: `app/app.vue`、`components/TokenInput.vue`、`components/PriceResult.vue`

- [ ] **Step 1: Invoke frontend-design skill**

调用 `Skill` 工具，参数 `skill: "frontend-design:frontend-design"`，描述当前页面结构和需要的视觉设计风格。让 frontend-design 技能提供完整的 `<style>` 代码用于各组件。

- [ ] **Step 2: 应用样式后启动 dev server 确认**

Run: `pnpm dev`
Expected: 计算器界面视觉美观，布局合理

- [ ] **Step 3: Commit**

```bash
git add app/app.vue components/TokenInput.vue components/PriceResult.vue
git commit -m "style: 应用 frontend-design 视觉设计"
```

---

### Task 6: 最终验证

- [ ] **Step 1: 构建检查**

Run: `pnpm build`
Expected: 构建成功，无类型错误，无警告

- [ ] **Step 2: 构建产物检查**

Run: `ls -la .output/public/`
Expected: 存在 `index.html` 等静态文件

- [ ] **Step 3: 最终 commit（如有残留修改）**

```bash
git status
# 如有改动：
git add -A
git commit -m "chore: 最终清理"
```
