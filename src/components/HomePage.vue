<template>
    <a-layout style="min-height:1080px;">

        <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
            <div class="logo" />
            <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
                <a-menu-item key="0" style="height: 80px;background-color:#000066;">
                    <cloud-outlined :style="{ fontSize: '30px', color: '#08c' }">City Weather</cloud-outlined>
                    <span style="font-size: 20px; color: #fff;">City Weather</span>
                </a-menu-item>
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
            <a-layout-header style="background: #fff; padding: 10,0px">
                <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
                <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
                <span style="margin-left:20px ;">Wellcome to city weather!</span>
            </a-layout-header>
            <a-layout-content
                :style="{ margin: '24px 16px', padding: '24px', background: '#ececec', minHeight: '280px' }">
                <div class="card">
                    <a-card title="Pie Chart" :bordered="false">
                        <PieChart />
                    </a-card>
                </div>
                <div class="card">
                    <a-card title="Line Chart" :bordered="false">
                        <LineChart/>
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
    CloudOutlined
} from '@ant-design/icons-vue';
import { ref } from 'vue';
import LineChart from './LineChart.vue';
import PieChart from './PieChart.vue';
import WeatherDetail from './WeatherDetail.vue';
const selectedKeys = ref<string[]>(['1'])
const collapsed = ref<boolean>(false)

</script>
  <style>
  .card {
      float: left;
      padding: 16px;
      width: 100%;
      max-height: 500px;
  }
  
  #components-layout-demo-custom-trigger .trigger {
      font-size: 18px;
      line-height: 64px;
      padding: 0 24px;
      cursor: pointer;
      transition: color 0.3s;
  }
  
  #components-layout-demo-custom-trigger .trigger:hover {
      color: #1890ff;
  }
  
  #components-layout-demo-custom-trigger .logo {
      height: 32px;
      background: rgba(255, 255, 255, 0.3);
      margin: 16px;
  }
  
  .site-layout .site-layout-background {
      background: #fff;
  }
  </style>
  