<script setup lang="ts">
import { onMounted, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance() as any
// 配置建议写在 onMount 的外面
const option = {
    title: {
        text: 'Temperature Change in the Coming Week'
    },
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
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
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
            data: [10, 11, 13, 11, 12, 12, 9],
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
            data: [1, -2, 2, 5, 3, 2, 0],
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
    const echarts1 = echarts.init(document.getElementById('line'))
    //添加配置
    echarts1.setOption(option)
    // 自适应
    window.onresize = function () {
        echarts1.resize()
    }
})
</script>
    
    <template>
    <div id="line" style="width: 500px;height: 300px;"></div>
</template>
    
    <style scoped>
    </style>
    