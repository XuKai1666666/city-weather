<template>
  <a-space direction="vertical">
    <a-input-search v-model:value="value" placeholder="input search text" enter-button @search="onSearch" />
  </a-space>
</template>
<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import axios from 'axios'
const value = ref<string>('');
  let refreshKey=1
const emit=defineEmits(['refreshKey'])

// const refreshKey=()=>{
//   resultKey+=1
//   emit('refreshKey',resultKey)
//   return resultKey
// }
const wheatherApiUrl: string = "/api/simpleWeather/query?city=";
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
    sessionStorage.setItem('cityWeatherData', JSON.stringify(res))
    emit('refreshKey',refreshKey+1)
    console.log(refreshKey)
  }).catch((err) => {
    console.error(err);
  })
};
</script>