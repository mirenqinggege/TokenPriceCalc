<script setup lang="ts">
defineProps<{ label: string }>()
const tokens = defineModel<number>('tokens', { default: 0 })
const unitPrice = defineModel<number>('unitPrice', { default: 0 })
</script>

<template>
  <div class="token-input">
    <span class="dim-label">{{ label }}</span>
    <div class="input-row">
      <label class="field">
        <span class="field-label">数量</span>
        <input
          v-model.number="tokens"
          type="number"
          min="0"
          placeholder="0"
        />
      </label>
      <label class="field">
        <span class="field-label">单价</span>
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
.token-input {
  background: #11111c;
  border: 1px solid #1a1a2e;
  border-radius: 10px;
  padding: 16px 18px;
  transition: border-color 0.2s;
}

.token-input:focus-within {
  border-color: #28c88c33;
}

.dim-label {
  display: block;
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-size: 0.82rem;
  font-weight: 500;
  color: #9090a8;
  margin-bottom: 12px;
  letter-spacing: 0.01em;
}

.input-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.field-label {
  font-size: 0.7rem;
  font-weight: 500;
  color: #585870;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.field input {
  width: 100%;
  background: #161622;
  border: 1px solid #1e1e32;
  border-radius: 6px;
  padding: 9px 12px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  font-weight: 500;
  color: #d0d0e0;
  caret-color: #28c88c;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.field input::placeholder {
  color: #3a3a50;
}

.field input:focus {
  outline: none;
  border-color: #28c88c;
  box-shadow: 0 0 0 3px rgba(40, 200, 140, 0.1), inset 0 0 0 1px rgba(40, 200, 140, 0.05);
}

.field input::-webkit-inner-spin-button,
.field input::-webkit-outer-spin-button {
  opacity: 0.3;
}

.field input:hover:not(:focus) {
  border-color: #262644;
}
</style>
