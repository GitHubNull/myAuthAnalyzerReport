<template>
    <Splitter style="height: 100%; width: 100%;" class="mb-5" @resizeend="get_level0_width_height">
        <SplitterPanel class="flex splitter-panel" :size="50" :minSize="35">
        <!-- left panel content -->
            <LeftContentPanel :columns="props.columns" :data="props.data"
            @rowSelectChangeL1="rowSelectChangeF2"></LeftContentPanel>
        </SplitterPanel>
        <SplitterPanel class="flex splitter-panel" :size="50" :minSize="45">
        <!-- right panel content -->
            <RightContentPanel :rawHttpData="props.rawHttpData" :sessionNames="props.sessionNames"
            :currentSessionHTTPData="props.currentSessionHTTPData"
            :level0_width_height="level0_width_height"
            >

            </RightContentPanel>
        </SplitterPanel>
    </Splitter>
</template>

<script setup>
import { ref } from 'vue';

import LeftContentPanel from './LeftContentPanel.vue';
import RightContentPanel from './RightContentPanel.vue';

const props = defineProps({
    rawHttpData: {
        requestData: String,
        responseData: String,
    },
    sessionNames: Array,
    currentSessionHTTPData: Object,
    columns: Object,
    data: Object
});

const emit = defineEmits(['rowSelectChangeL2']);
const level0_width_height = ref({
    width: 98.5 * 0.5,
    height: 76.7,
});

function rowSelectChangeF2(e){
    emit('rowSelectChangeL2', e);
}

function get_level0_width_height(e){
    level0_width_height.value.width = 98.5 * (e.sizes[1] / 100);
    // console.log(e);
}

</script>

<style scoped>
.splitter-panel {
    height: 100%;
    width: 100%;
}
</style>