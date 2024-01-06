<template>
    <Splitter style="height: 100%" class="mb-5" layout="vertical" @resizeend="get_level1_width_height">
        <SplitterPanel class="flex compare-view-splitter-panel">
            <div class="my-tab-view">
                <TabView v-model:activeIndex="myActiveIndex" @update:activeIndex="onActiveIndexChange">
                    <TabPanel header="Raw">
                        <div class="http-data-view">
                            <HTTPDataView :requestData="props.rawHttpData.requestData"
                                :responseData="props.rawHttpData.responseData" :HTTPDataviewStyle="props.HTTPDataviewStyle"
                                :level0_width_height="props.level0_width_height" up_or_bottom="up" :sessionIndex="0"
                                :bottomHTTPDataViewIndex="bottomHTTPDataViewIndex" :syncTabEnable="props.syncTabEnable"
                                :level1_up_width_height="level1_up_width_height" />

                        </div>
                    </TabPanel>


                    <template v-for="(sessionName, index) in props.sessionNames" :key="index">
                        <TabPanel :header="sessionName">
                            <div class="http-data-view">
                                <HTTPDataView :requestData="props.currentSessionHTTPData[sessionName].requestData"
                                    :responseData="props.currentSessionHTTPData[sessionName].responseData"
                                    :HTTPDataviewStyle="props.HTTPDataviewStyle"
                                    :level0_width_height="props.level0_width_height" up_or_bottom="up"
                                    :sessionIndex="index + 1" :bottomHTTPDataViewIndex="-1"
                                    :syncTabEnable="props.syncTabEnable" :level1_up_width_height="level1_up_width_height" />
                            </div>
                        </TabPanel>
                    </template>
                </TabView>
            </div>

        </SplitterPanel>
        <SplitterPanel class="flex compare-view-splitter-panel">
            <div class="my-tab-view">
                <TabView>
                    <TabPanel header="Raw">
                        <div class="http-data-view">
                            <HTTPDataView :requestData="props.rawHttpData.requestData"
                                :responseData="props.rawHttpData.responseData" :HTTPDataviewStyle="props.HTTPDataviewStyle"
                                :level0_width_height="props.level0_width_height" up_or_bottom="bottom" :sessionIndex="0"
                                :bottomHTTPDataViewIndex="-1" :syncTabEnable="props.syncTabEnable"
                                :level1_bottom_width_height="level1_bottom_width_height" />
                        </div>
                    </TabPanel>

                    <template v-for="(sessionName, index) in props.sessionNames" :key="index">

                        <TabPanel :header="sessionName">
                            <div class="http-data-view">
                                <HTTPDataView :requestData="props.currentSessionHTTPData[sessionName].requestData"
                                    :responseData="props.currentSessionHTTPData[sessionName].responseData"
                                    :HTTPDataviewStyle="props.HTTPDataviewStyle"
                                    :level0_width_height="props.level0_width_height" up_or_bottom="bottom"
                                    :sessionIndex="index + 1" :bottomHTTPDataViewIndex="-1"
                                    :syncTabEnable="props.syncTabEnable" @update:activeIndexChange="bottomActiveIndexChange"
                                    :level1_bottom_width_height="level1_bottom_width_height" />
                            </div>
                        </TabPanel>

                    </template>

                </TabView>
            </div>
        </SplitterPanel>
    </Splitter>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const level1_up_width_height = ref({
    width: 48.6,
    height: 72.6 * 0.5
})

const level1_bottom_width_height = ref({
    width: 48.6,
    height: 72.6 * 0.5
})

const bottomHTTPDataViewIndex = ref(0);
const topActiveIndex = ref(0);

// up_or_bottom: String,
// level1_up_width_height: Object,
// level1_bottom_width_height: Object,

const props = defineProps({
    rawHttpData: {
        requestData: String,
        responseData: String,
    },
    sessionNames: Array,
    currentSessionHTTPData: Object,
    syncTabEnable: Boolean,
    HTTPDataviewStyle: String,
    level0_width_height: Object
})

function get_level1_width_height(e) {
    level1_up_width_height.value.height = 72.6 * (e.sizes[0] / 100);
    level1_bottom_width_height.value.height = 72.6 * (e.sizes[1] / 100);
}

function bottomActiveIndexChange(index) {
    // console.log('Compare panel bottomActiveIndexChange index: ' + index);
    bottomHTTPDataViewIndex.value = index;
    myActiveIndex.value = 0;
}

// watch(bottomHTTPDataViewIndex, (newValue, oldValue)=>{
//     console.log('Compare panel bottomHTTPDataViewIndex watch newValue: ' + newValue + ' oldValue: ' + oldValue);
//     if (newValue !== oldValue) {
//         myActiveIndex.value = 0;
//     }
// })

// watchEffect(()=>{

// })

function onActiveIndexChange(index){
    topActiveIndex.value = index;
}

const myActiveIndex = ref(0);

// const myActiveIndex = computed(()=>{
//         console.log('Compare panel activeIndex computed ');
//     if (props.syncTabEnable === true) {
//         return (bottomHTTPDataViewIndex.value === 0 || bottomHTTPDataViewIndex.value === 1) ? 0 : topActiveIndex.value;
//     }else{
//         return topActiveIndex.value;
//     }
// })


</script>

<style scoped>
.my-tab-view {
    height: 100%;
    width: 100%;
}

.my-tab-panel {
    height: 100%;
    width: 100%;
}

.http-data-view {
    height: 100%;
    width: 100%;
}

.compare-view-splitter-panel {
    height: 100%;
    width: 100%;
}
</style>