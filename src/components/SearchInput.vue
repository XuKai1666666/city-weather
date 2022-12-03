<template>
  <a-space direction="vertical">
    <a-input-search v-model:value="value" placeholder="input search text" enter-button @search="onSearch" />
  </a-space>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios'
export default defineComponent({
  setup() {
    const value = ref<string>('');
    const wheatherApiUrl: string = "http://apis.juhe.cn/simpleWeather/query?city=";
    const key: string = "&key=fe96221d015c2d2ed59065fc3ed591bb";
    const onSearch = (searchValue: string) => {
      console.log('use value', searchValue);
      console.log('or use this.value', value.value);
      console.log(value.value)
      console.log(encodeURI(searchValue))
      console.log(wheatherApiUrl + encodeURI(searchValue) + key)
      axios.get(wheatherApiUrl + encodeURI(searchValue) + key, {
      }).then((res) => {
        console.log('数据：', res);
      }).catch((err) => {
        console.error(err);
      })
    };
    


    return {
      value,
      onSearch,
    };
  },
});
</script>