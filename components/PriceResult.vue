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
        <span class="cost-label">Input 费用</span>
        <span class="cost-value">${{ inputCost.toFixed(4) }}</span>
      </div>
      <div class="cost-line">
        <span class="cost-label">Cache 费用</span>
        <span class="cost-value">${{ cacheCost.toFixed(4) }}</span>
      </div>
      <div class="cost-line">
        <span class="cost-label">Output 费用</span>
        <span class="cost-value">${{ outputCost.toFixed(4) }}</span>
      </div>
      <div class="divider" />
      <div class="cost-line total-line">
        <span class="cost-label">总计</span>
        <span class="cost-value">${{ totalCost.toFixed(4) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.price-result {
  background: #0c0c16;
  border: 1px solid #1a1a2e;
  border-radius: 10px;
  padding: 20px 22px;
}

.section-title {
  display: block;
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-size: 0.78rem;
  font-weight: 500;
  color: #606078;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 14px;
}

.breakdown {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cost-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cost-label {
  font-size: 0.85rem;
  color: #808098;
}

.cost-value {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  font-weight: 500;
  color: #c0c0d4;
  font-variant-numeric: tabular-nums;
}

.divider {
  height: 1px;
  background: #1a1a30;
  margin: 4px 0;
}

.total-line {
  padding-top: 4px;
}

.total-line .cost-label {
  font-weight: 500;
  color: #a0a0b8;
  font-size: 0.9rem;
}

.total-line .cost-value {
  font-size: 1.15rem;
  font-weight: 600;
  color: #28c88c;
  text-shadow: 0 0 20px rgba(40, 200, 140, 0.15);
}
</style>
