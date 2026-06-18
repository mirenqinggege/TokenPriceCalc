<script setup lang="ts">
import { pricingUnitOptions } from '~/composables/useTokenCalc'

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
