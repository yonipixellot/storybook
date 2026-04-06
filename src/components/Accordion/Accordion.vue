<template>
  <div class="ac">
    <div
      v-for="item in items"
      :key="item.id"
      class="ac__item"
      :class="{ 'ac__item--borderless': borderless }"
    >
      <!-- Header button -->
      <button
        class="ac__header"
        :aria-expanded="openSet.has(item.id)"
        :aria-label="typeof item.header === 'string' ? item.header : 'Toggle section'"
        @click="toggle(item.id)"
      >
        <div class="ac__header-content">{{ item.header }}</div>
        <ChevronDown
          :size="chevronSize"
          class="ac__chevron"
          :class="{ 'ac__chevron--open': openSet.has(item.id) }"
          aria-hidden="true"
        />
      </button>

      <!-- Content (shown when open) -->
      <div
        v-if="openSet.has(item.id)"
        class="ac__content"
        role="region"
      >
        {{ item.content }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

export interface AccordionItem {
  id:      string
  header:  string
  content: string
}

const props = withDefaults(defineProps<{
  items?:         AccordionItem[]
  allowMultiple?: boolean
  defaultOpen?:   string | null
  chevronSize?:   number
  borderless?:    boolean
}>(), {
  items: () => [
    { id: '1', header: 'What is included?',             content: 'All season highlights for every player on the team.' },
    { id: '2', header: 'How long do I have access?',    content: 'Access lasts for the full season.' },
    { id: '3', header: 'Can I share my subscription?',  content: 'Subscriptions are for personal use only.' },
  ],
  allowMultiple: false,
  defaultOpen:   null,
  chevronSize:   18,
  borderless:    false,
})

const openSet = ref<Set<string>>(
  props.defaultOpen ? new Set([props.defaultOpen]) : new Set()
)

function toggle(id: string) {
  const s = new Set(props.allowMultiple ? openSet.value : [])
  if (openSet.value.has(id)) {
    s.delete(id)
  } else {
    s.add(id)
  }
  openSet.value = s
}
</script>

<style scoped>
.ac__item {
  border-bottom: 1px solid var(--color-gray-100);
}

.ac__item--borderless {
  border-bottom: none;
}

.ac__header {
  display: flex;
  align-items: center;
  width: 100%;
  padding: var(--space-md2) 0;
  background: none;
  border: none;
  cursor: pointer;
  gap: var(--space-md);
}

.ac__header-content {
  flex: 1;
  display: flex;
  align-items: center;
  gap: var(--space-md);
  text-align: left;
  font-family: var(--font-family-base);
  font-size: var(--text-base); /* DS: 16px, not 14px (--text-xs) */
  font-weight: var(--font-bold); /* DS: 700, not 500 (--font-medium) */
  color: var(--color-dark-text);
}

.ac__chevron {
  color: var(--color-gray-400);
  flex-shrink: 0;
  transform: rotate(-90deg);
  transition: transform var(--duration-base);
}

.ac__chevron--open {
  transform: rotate(0deg);
}

.ac__content {
  padding-bottom: var(--space-lg);
  font-family: var(--font-family-base);
  font-size: var(--text-xs);
  color: var(--color-gray-500);
  line-height: 1.5;
}
</style>
