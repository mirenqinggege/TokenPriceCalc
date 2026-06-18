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
