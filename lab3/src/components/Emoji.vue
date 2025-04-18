<template>
    <span v-html="emojiHtml"></span>
  </template>
  
  <script setup>
  import { defineProps, computed } from 'vue';
  
  const props = defineProps({
    emoji: {
      type: Object,
      required: true,
    },
  });
  
  const emojiHtml = computed(() => {
    return props.emoji.htmlCode ? props.emoji.htmlCode[0] : '';
  });
  </script>