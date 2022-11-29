<script setup lang="ts">
import * as DT from '../data.json';
import { onMounted, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance() as any
// 配置建议写在 onMount 的外面
const result = DT.result;
const City = result.city;
const FutureDays = result.future
const RealTime = result.realtime

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
    // title: {
    //     text: 'Temperature Change in the Coming Week'
    // },
    tooltip: {
        trigger: 'axis'
    },
    legend: {},
    toolbox: {
        show: true,
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: FutureDaysDate(FutureDays)
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value} °C'
        }
    },
    series: [
        {
            name: 'Highest',
            type: 'line',
            data: FutureDaysMaxTemperature(FutureDays),
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
            name: 'Lowest',
            type: 'line',
            data: FutureDaysMinTemperature(FutureDays),
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
    FutureDaysMaxTemperature(FutureDays)
    FutureDaysMinTemperature(FutureDays)
})
</script>
<template>

    <div>
        <h1>{{ City }}</h1>
    </div>
    <div class="weather-realtime">
        <span>{{ RealTime.temperature }}°C</span>
        <span>{{ RealTime.info }}</span>
        <span>湿度：{{ RealTime.humidity }}</span>
        <span>{{ RealTime.direct }}</span>
        <span>{{ RealTime.power }}</span>
        <span>空气质量指数：{{ RealTime.aqi }}</span>
    </div>
    <div>
        <a-list itemLayout="vertical" :data-source=FutureDays>
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
.weather-realtime span {
    margin-right: 20px;
}
</style>