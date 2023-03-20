<template>
    <div style="height: 64px;display: flex;flex-direction: row;align-items: center;background-color:whitesmoke">
        <cloud-outlined :style="{ fontSize: '50px', color: '#08c', padding: '10px', }">City Weather</cloud-outlined>
        <span style="font-size: 20px; color: #08c;right: 50px;">City Weather</span>
        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        <span style="margin-left:50px ;color: #08c;">Wellcome to city weather!</span>
    </div>
    <a-layout style="min-height:1080px;">
        <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible theme="light">
            <a-menu v-model:selectedKeys="selectedKeys" mode="inline">
                <a-menu-item key="1">
                    <user-outlined />
                    <span>nav 1</span>
                </a-menu-item>
                <a-menu-item key="2">
                    <video-camera-outlined />
                    <span>nav 2</span>
                </a-menu-item>
                <a-menu-item key="3">
                    <upload-outlined />
                    <span>nav 3</span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout>

            <a-layout-content
                :style="{ padding: '10px',minHeight: '1080px' }">
                <div class="card">
                    <a-card title="Pie Chart" :bordered="false">
                        <PieChart />
                    </a-card>
                </div>
                <div class="card">
                    <a-card title="Weather" :bordered="false">
                        <WeatherDetail />
                    </a-card>
                </div>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script setup lang="ts">
import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    CloudOutlined,
} from '@ant-design/icons-vue';
import { ref } from 'vue';
import PieChart from '../components/PieChart.vue';
import WeatherDetail from '../components/WeatherDetail.vue';
const selectedKeys = ref<string[]>(['1'])
const collapsed = ref<boolean>(false)

</script>
<style>
.card {
    float: left;
    padding: 10px;
    width: 50%;
}

.trigger {
    margin-left: 40px;
}

#components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    display: flex;
    cursor: pointer;
    transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
}

.site-layout .site-layout-background {
    background: #fff;
}
</style>
  