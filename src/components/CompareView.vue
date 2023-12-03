<template>
    <div class="http-data-view-sub-split">
        <Split v-model="http_data_compare_view_sub_split" mode="vertical">
            <template #top>
                <div class="http-data-view-sub-split-pane">
                    <HTTPDataShow :httpData="httpData"></HTTPDataShow>
                </div>
            </template>
            <template #bottom>
                <div class="http-data-view-sub-split-pane">
                    <HTTPDataShow :httpData="httpData"></HTTPDataShow>
                </div>
            </template>
           
        </Split>
    </div>
</template>

<script setup>
// import HTTPDataShow from './HTTPDataShow.vue';
import { ref } from 'vue';

defineProps({
    httpData: Object
});

const http_data_compare_view_sub_split = ref(0.5);

</script>

<style>
    .http-data-view-sub-split{
        height: 100vh;
        border: 1px solid #dcdee2;
    }
    .http-data-view-sub-split-pane{
        padding: 10px;
    }
</style>