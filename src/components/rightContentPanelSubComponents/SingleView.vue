<template>
    <div class="my-tab-view">
        <TabView>
            <TabPanel header="Raw">
                <div class="http-data-view">
                    <HTTPDataView :requestData="props.rawHttpData.requestData"
                        :responseData="props.rawHttpData.responseData" :HTTPDataviewStyle="props.HTTPDataviewStyle"
                        :syncTabEnable="false" :sessionIndex="0" :bottomHTTPDataViewIndex="-1"
                        :level0_width_height="props.level0_width_height" />
                </div>
            </TabPanel>
            <template v-for="(sessionName, index) in props.sessionNames" :key="index">
                <TabPanel :header="sessionName">
                    <div class="http-data-view">
                        <HTTPDataView :requestData="props.currentSessionHTTPData[sessionName].requestData"
                            :responseData="props.currentSessionHTTPData[sessionName].responseData"
                            :HTTPDataviewStyle="props.HTTPDataviewStyle" :sessionIndex="index + 1" :syncTabEnable="false"
                            :bottomHTTPDataViewIndex="-1" :level0_width_height="props.level0_width_height" />
                    </div>
                </TabPanel>
            </template>

        </TabView>
    </div>
</template>

<script setup>

const props = defineProps({
    rawHttpData: {
        requestData: String,
        responseData: String,
    },
    sessionNames: Array,
    currentSessionHTTPData: Object,
    HTTPDataviewStyle: String,
    level0_width_height: Object
})

</script>

<style scoped>
.my-tab-view {
    height: 100%;
    width: 100%;
}

.http-data-view {
    height: 100%;
    width: 100%;
}
</style>