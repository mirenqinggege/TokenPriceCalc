<script setup lang="ts">
import TokenInput from '../components/TokenInput.vue'
import PriceResult from '../components/PriceResult.vue'
import { useTokenCalc, pricingUnitOptions } from '../composables/useTokenCalc'

useHead({
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600&display=swap',
    },
  ],
})

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
    <div class="card">
      <header class="header">
        <h1>AI Token 价格计算器</h1>
        <p class="subtitle">实时估算 API 调用成本</p>
      </header>

      <div class="unit-selector">
        <label>
          <span class="label-text">计价单位</span>
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
      </div>

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
  </div>
</template>

<style>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #08080f;
  color: #d4d4e0;
  font-family: 'Space Grotesk', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}
</style>

<style scoped>
.calculator {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background:
    radial-gradient(ellipse 80% 60% at 50% 0%, rgba(40, 200, 140, 0.04), transparent),
    radial-gradient(ellipse 60% 50% at 50% 100%, rgba(100, 80, 255, 0.03), transparent),
    #08080f;
}

.card {
  width: 100%;
  max-width: 520px;
  background: #0f0f18;
  border: 1px solid #1e1e30;
  border-radius: 16px;
  padding: 36px 32px 32px;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.02),
    0 24px 64px rgba(0, 0, 0, 0.4);
}

.header {
  margin-bottom: 28px;
}

.header h1 {
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #f0f0f8;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.subtitle {
  margin-top: 6px;
  font-size: 0.85rem;
  color: #606078;
  letter-spacing: 0.01em;
}

.unit-selector {
  margin-bottom: 28px;
}

.unit-selector label {
  display: flex;
  align-items: center;
  gap: 12px;
}

.label-text {
  font-size: 0.8rem;
  font-weight: 500;
  color: #707088;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.unit-selector select {
  flex: 1;
  appearance: none;
  background: #14141f;
  border: 1px solid #1e1e30;
  border-radius: 8px;
  padding: 10px 36px 10px 14px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  color: #c0c0d0;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23707088' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.unit-selector select:hover {
  border-color: #2a2a40;
}

.unit-selector select:focus {
  outline: none;
  border-color: #28c88c;
  box-shadow: 0 0 0 3px rgba(40, 200, 140, 0.1);
}

.inputs {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 28px;
}
</style>
