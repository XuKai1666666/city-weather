<script setup lang="ts">
import * as DT from '../data.json';
import { onMounted, getCurrentInstance, reactive } from 'vue'
import SearchInput from './SearchInput.vue'
const { proxy } = getCurrentInstance() as any
// 配置建议写在 onMount 的外面
// const result = DT.result;
// const City = result.city;
// const FutureDays = result.future
// const RealTime = result.realtime;
const sessionStorageDT=reactive( JSON.parse(sessionStorage.getItem('cityWeatherData')))
const shuju=JSON.stringify(sessionStorageDT)==null?DT:JSON.stringify(sessionStorageDT)
// const {reason,result:{city},result:{realtime},result:{future},}=DT
const {data,data:{reason},data:{result},data:{result:{city}},data:{result:{realtime}},data:{result:{future}}}=DT

console.log('赋值数据sessionStorageDT：',sessionStorageDT);
function FutureDaysMaxTemperature(FutureDays:any){
    const Temperature:Array<string> = [];
        const pattern = new RegExp(/(?<=\/)\d{1,2}(?=℃)/);
        for(let index in FutureDays){
            Temperature.push(pattern[Symbol.match](FutureDays[index].temperature)[0])
        }
        console.log(Temperature)
        return Temperature
}
function FutureDaysMinTemperature(FutureDays:any){
    const Temperature2:Array<string> = [];
        const pattern = new RegExp(/\d{1,2}(?=\/)/);
        for(let index in FutureDays){
            Temperature2.push(pattern[Symbol.match](FutureDays[index].temperature)[0])
        }
        console.log(Temperature2)
        return Temperature2
}
function FutureDaysDate(FutureDays:any){
    const date:Array<string> = [];
        for(let index in FutureDays){
            date.push(FutureDays[index].date)
        }
        console.log(date)
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
    const echarts = proxy.$echarts
    //初始化挂载
    const echarts1 = echarts.init(document.getElementById('weatherline'))
    //添加配置
    echarts1.setOption(option)
    // 自适应
    window.onresize = function () {
        echarts1.resize()
    }
    FutureDaysMaxTemperature(future)
    FutureDaysMinTemperature(future)
    console.log('数据shuju',shuju)
})
</script>
<template>

    <div class="weather-city">
        <h1>{{ city }}</h1>
        <SearchInput style="margin-left: 40px;"/>
    </div>
    <div class="weather-realtime">
        <span>{{ realtime.temperature }}°C</span>
        <span>{{ realtime.info }}</span>
        <span>湿度：{{ realtime.humidity }}</span>
        <span>{{ realtime.direct }}</span>
        <span>{{ realtime.power }}</span>
        <span>空气质量指数：{{ realtime.aqi }}</span>
    </div>
    <div>
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
    <div id="weatherline" style="width: 60%;height: 400px;float: left;"></div>

</template>
<style>
.weather-city{
    display: flex;
}
.weather-realtime span {
    margin-right: 20px;
}
</style>