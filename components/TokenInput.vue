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
