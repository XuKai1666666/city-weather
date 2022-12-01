<template>
    <a-space direction="vertical">
      <a-input-search
        v-model:value="value"
        placeholder="input search text"
        enter-button
        @search="onSearch"
      />
    </a-space>
  </template>
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  export default defineComponent({
    setup() {
      const value = ref<string>('');
  
      const onSearch = (searchValue: string) => {
        console.log('use value', searchValue);
        console.log('or use this.value', value.value);
      };
  
      return {
        value,
        onSearch,
      };
    },
  });
  </script>