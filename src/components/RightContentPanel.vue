<template>
    <div class="rightContentPanel">
        <!-- 顶部面板 -->
        <div class="right-content-panel-up-panel">
            <RightContentPanelUpPanel v-model:HTTPDataviewStyle="HTTPDataviewStyle" v-model:syncTabEnable="syncTabEnable">

            </RightContentPanelUpPanel>
        </div>

        <!-- 底部面板 -->
        <div class="right-content-panel-bottom-panel" ref="bottomPanelRef">
            <RightContentPanelBottomPanel :rawHttpData="props.rawHttpData" :sessionNames="props.sessionNames"
            :currentSessionHTTPData="currentSessionHTTPData" :HTTPDataviewStyle="HTTPDataviewStyle" 
            :syncTabEnable="syncTabEnable"
            :level0_width_height="props.level0_width_height"
            >

            </RightContentPanelBottomPanel>
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';

import RightContentPanelUpPanel from './rightContentPanelSubComponents/RightContentPanelUpPanel.vue';
import RightContentPanelBottomPanel from './rightContentPanelSubComponents/RightContentPanelBottomPanel.vue';


const HTTPDataviewStyle = ref('Single');
const syncTabEnable = ref(true);

// const bottomPanelRef = ref(null);
// const bottomPanelWidth = ref(0);
// const bottomPanelHeight = ref(0);

// watchEffect(() => {
//   if (bottomPanelRef.value) {
//     // 获取父标签的宽度和高度
//     const { width, height } = bottomPanelRef.value.getBoundingClientRect();
//     // 设置子标签的宽度和高度为父标签的大小
//     bottomPanelWidth.value = `${width}px`;
//     bottomPanelHeight.value = `${height}px`;
//     console.debug('bottomPanelWidth', bottomPanelWidth.value);
//     console.debug('bottomPanelHeight', bottomPanelHeight.value);
//   }
// });

const props = defineProps({
    rawHttpData: {
        requestData: String,
        responseData: String,
    },
    sessionNames: Array,
    currentSessionHTTPData: Object,
    level0_width_height: Object,
});

</script>

<style scoped>
.rightContentPanel {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
}

.right-content-panel-up-panel {
    width: 100%;
    height: 5%;
}

.right-content-panel-bottom-panel {
    width: 100%;
    height: 95%;
}
</style>