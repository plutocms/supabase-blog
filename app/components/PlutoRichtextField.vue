<script setup lang="ts">
// Adapts PostEditor.vue to the generic field-widget contract every widget
// in the content form shares: `field`, `modelValue`, `disabled`, and
// `update:modelValue` (see the content-model skill). PostEditor.vue only
// has a plain `v-model` (`placeholder`/`ui` props, no `field`/`disabled`)
// — this wrapper is the adapter, so PostEditor.vue itself stays untouched.
const props = defineProps<{
  field: PlutoTextField
  modelValue: unknown
  disabled?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const value = computed(() => (props.modelValue as string | undefined) ?? '')
</script>

<template>
  <UFormField :label="field.label" :description="field.description" :required="field.required">
    <!-- PostEditor.vue has no disabled state of its own. Dim and block
         input instead of forwarding an unsupported prop. -->
    <div :class="disabled ? 'pointer-events-none opacity-60' : undefined">
      <PostEditor
        :model-value="value"
        :placeholder="`Write ${field.label.toLowerCase()}...`"
        @update:model-value="emit('update:modelValue', $event)"
      />
    </div>
  </UFormField>
</template>
