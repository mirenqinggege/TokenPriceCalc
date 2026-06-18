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

  const inputCost = computed(() => ((inputTokens.value - cacheTokens.value) * inputUnitPrice.value) / divisor.value)
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
