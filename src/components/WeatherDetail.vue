<template>
    <!-- <div>{{result}}</div> -->
    <!-- <div :key="childMsg"> -->
        <h1>{{ childMsg }}</h1>
    <div class="weather-city" >
        <h1>{{ city }}</h1>
        <SearchInput style="margin-left: 40px;" @refresh-key="(msg) => childMsg = msg" />
    </div>
    <div v-if="realtime" class="weather-realtime" >
        <span>{{ realtime.temperature }}°C</span>
        <span>{{ realtime.info }}</span>
        <span>湿度：{{ realtime.humidity }}</span>
        <span>{{ realtime.direct }}</span>
        <span>{{ realtime.power }}</span>
        <span>空气质量指数：{{ realtime.aqi }}</span>
    </div>
    <div v-if="future" >
        <a-list itemLayout="vertical" :data-source=future>
            <template #renderItem=Future>
                <a-list-item style="float: left;padding:10px">
                    <p>{{ Future.item.date }}</p>
                    <p>{{ Future.item.temperature }}</p>
                    <p>{{ Future.item.weather }}</p>
                    <p>{{ Future.item.direct }}</p>
                </a-list-item>
            </template>
        </a-list>
    </div>
    <div id="weatherline" style="width: 60%;height: 400px;float: left;" ></div>
    <!-- </div> -->
</template>
<script setup lang="ts">
import * as DT from '../data.json';
import { onMounted, getCurrentInstance, reactive, ref, watch, } from 'vue'
import SearchInput from './SearchInput.vue'
const { proxy } = getCurrentInstance() as any
// const {reason,result:{city},result:{realtime},result:{future},}=DT
// const {data,data:{reason},data:{result},data:{result:{city}},data:{result:{realtime}},data:{result:{future}}}=reactive(DT)
// 解构赋值无法响应式赋值
let childMsg = ref(1)
let result = reactive(getSessionStorage().data.result);
let city = ref(result.city)
let future = reactive(result.future);
let realtime = reactive(result.realtime);
function getSessionStorage() {
    // dispatchEventStroage("cityWeatherData")
    const that=this;
    window.addEventListener('storage', function (e) {
      if(e.key && e.key == 'cityWeatherData' && e.newValue){
        that.storage = e.newValue //即可获取到【页面A】最新的socketQuery
        let data = storage !== null && storage.data.error_code != 207301 ? storage : DT
        return data
      }
    })
    // let storage = reactive(JSON.parse(sessionStorage.getItem('cityWeatherData')))
    // let data = storage !== null && storage.data.error_code != 207301 ? storage : DT
    // return data
}
// function SessionStorageEventListener(){
//     const that=this;
// 	window.addEventListener("setItemEvent", function(e) {
// 		if (e.key === "cityWeatherData") {
// 			that.cityWeatherData=e.newValue;
// 		}
// 	})
// }
function FutureDaysMaxTemperature(FutureDays: any) {
    const Temperature: Array<string> = [];
    const pattern = new RegExp(/(?<=\/)\d{1,2}(?=℃)/);
    for (let index in FutureDays) {
        Temperature.push(pattern[Symbol.match](FutureDays[index].temperature)[0])
    }
    // console.log(Temperature)
    return Temperature
}
function FutureDaysMinTemperature(FutureDays: any) {
    const Temperature2: Array<string> = [];
    const pattern = new RegExp(/\d{1,2}(?=\/)/);
    for (let index in FutureDays) {
        Temperature2.push(pattern[Symbol.match](FutureDays[index].temperature)[0])
    }
    // console.log(Temperature2)
    return Temperature2
}
function FutureDaysDate(FutureDays: any) {
    const date: Array<string> = [];
    for (let index in FutureDays) {
        date.push(FutureDays[index].date)
    }
    // console.log(date)
    return date
}

const option = {
    tooltip: {
        trigger: 'axis'
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: FutureDaysDate(future)
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value} °C'
        }
    },
    series: [
        {
            type: 'line',
            data: FutureDaysMaxTemperature(future),
            markPoint: {
                data: [
                    { type: 'max', name: 'Max' },
                    { type: 'min', name: 'Min' }
                ]
            },
            markLine: {
                data: [{ type: 'average', name: 'Avg' }]
            }
        },
        {
            type: 'line',
            data: FutureDaysMinTemperature(future),
            markPoint: {
                data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }]
            },
            markLine: {
                data: [
                    { type: 'average', name: 'Avg' },
                    [
                        {
                            symbol: 'none',
                            x: '90%',
                            yAxis: 'max'
                        },
                        {
                            symbol: 'circle',
                            label: {
                                position: 'start',
                                formatter: 'Max'
                            },
                            type: 'max',
                            name: '最高点'
                        }
                    ]
                ]
            }
        }
    ]
};
onMounted(() => {
    // 获取挂载的组件实例
    var echarts = proxy.$echarts
    //初始化挂载
    var echarts1 = echarts.init(document.getElementById('weatherline'))
    //添加配置
    echarts1.setOption(option, true)
    // 自适应
    window.onresize = function () {
        echarts1.resize()
    }
    result = reactive((getSessionStorage()).data.result);
    FutureDaysMaxTemperature(future)
    FutureDaysMinTemperature(future)
    // SessionStorageEventListener
    //监听缓存中指定key的值变化

})
watch(childMsg, (count, prevCount) => {
    console.log(count, prevCount)
    result = getSessionStorage().data.result;
})
</script>

<style>
.weather-city {
    display: flex;
}

.weather-realtime span {
    margin-right: 20px;
}
</style>