<template>
  <input
    type="text"
    class="rounded col-span-2 bg-primary-100 border-primary-500 focus:border-primary-600 focus:ring-primary-600 focus-visible:outline-none"
    :placeholder="placeholder"
    v-model="inputedValue"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: String,
  placeholder: String,
});

const emit = defineEmits<{
  (e: "update:modelValue", inputedValue: string);
}>();

const inputedValue = computed({
  get(): string {
    return props.modelValue;
  },
  set(value: string) {
    emit("update:modelValue", value);
  },
});
</script>
