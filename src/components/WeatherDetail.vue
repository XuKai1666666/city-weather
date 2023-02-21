<template>
    <div class="weather-city" >
        <h1 :key="childMsg">{{ setData().city }}</h1>
        <SearchInput style="margin-left: 40px;" @refresh-key="(msg) => childMsg = msg" />
    </div>
    <div v-if="setData().realtime" class="weather-realtime" :key="childMsg">
        <span>{{ setData().realtime.temperature }}°C</span>
        <span>{{ setData().realtime.info }}</span>
        <span>湿度：{{ setData().realtime.humidity }}</span>
        <span>{{ setData().realtime.direct }}</span>
        <span>{{ setData().realtime.power }}</span>
        <span>空气质量指数：{{ setData().realtime.aqi }}</span>
    </div>
    <div v-if="setData().future" :key="childMsg">
        <a-list itemLayout="vertical" :data-source=setData().future>
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
    <div id="weatherline" style="width: 60%;height: 400px;float: left;"></div>
</template>
<script setup lang="ts">
import * as DT from '../data.json';
import { onMounted, getCurrentInstance, reactive, ref, watch, } from 'vue'
import SearchInput from './SearchInput.vue'
const { proxy } = getCurrentInstance() as any
let cityWeatherData = null;
let result = null;
let city = null;
let future = null;
let realtime = null;
let childMsg = ref('');
let echarts = null;
let echarts1 = null;
//初始化挂载
function setData() {
    cityWeatherData = JSON.parse(localStorage.getItem('cityWeatherData'))
    result = (getlocalStorage()).data.result
    city = result.city
    future = result.future;
    realtime = result.realtime;

    return {
        cityWeatherData,
        result,
        city,
        future,
        realtime,
    }
}
let option = (Future)=> echarts1.setOption({
    tooltip: {
        trigger: 'axis'
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: FutureDaysDate(Future)
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
            data: FutureDaysMaxTemperature(Future),
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
            data: FutureDaysMinTemperature(Future),
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
    ],
},true)
function getlocalStorage() {
    let data = cityWeatherData !== null && cityWeatherData.data.error_code == 0 ? cityWeatherData : DT
    return data
}

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
// function chartChange() {
//     //添加配置
//     echarts1.setOption(setData().option, true)
// }
onMounted(() => {
    // 监听 localStorage 变化
    window.addEventListener('storage', () => {
        cityWeatherData = reactive(JSON.parse(localStorage.getItem('cityWeatherData')))
    })
    // 获取挂载的组件实例
    echarts = proxy.$echarts
    echarts1 = echarts.init(document.getElementById('weatherline'))
    setData()
    //初始化挂载
    option(setData().future)
    // 自适应
    window.onresize = function () {
        echarts1.resize()
    }
})
watch(() => childMsg,
    (val, newVal) => {
        // 监听数据变了  就重新绘制一遍  也就是大佬们说的  "切记，数据变化后需要再次调init方法刷线图表"
        // 绘制图表
        setData()
        console.log("wacth", val, newVal);
        option(setData().future)
    }, {
    deep: true
}
)
</script>

<style>
.weather-city {
    display: flex;
}

.weather-realtime span {
    margin-right: 20px;
}
</style>