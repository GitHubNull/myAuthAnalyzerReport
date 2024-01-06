<template>
    <template v-if="props.HTTPDataviewStyle === 'Single'">
        <SingleView :rawHttpData="props.rawHttpData" :sessionNames="props.sessionNames" 
        :currentSessionHTTPData="props.currentSessionHTTPData"
        :HTTPDataviewStyle="props.HTTPDataviewStyle"
        :level0_width_height="props.level0_width_height"
        />
    </template>
    <template v-else>
        <CompareView :rawHttpData="props.rawHttpData" :sessionNames="props.sessionNames" 
        :currentSessionHTTPData="props.currentSessionHTTPData"
        :HTTPDataviewStyle="props.HTTPDataviewStyle"
        :syncTabEnable="props.syncTabEnable"
        :level0_width_height="props.level0_width_height"
        />
    </template>
</template>

<script setup>
import { ref } from 'vue';

import SingleView from './SingleView.vue';
import CompareView from './CompareView.vue';


const props = defineProps({
    rawHttpData: {
        requestData: String,
        responseData: String,
    },
    sessionNames: Array,
    currentSessionHTTPData: Object,
    HTTPDataviewStyle: String,
    syncTabEnable: Boolean,
    level0_width_height: Object
});

</script>

<style scoped>



</style>