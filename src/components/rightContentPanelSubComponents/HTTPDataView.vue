<template>
    <TabView @update:activeIndex="onActiveIndexChange" v-model:activeIndex="myActiveIndex">
        <!-- <TabView v-model:activeIndex="myActiveIndex" -->
        <TabPanel header="Request">
            <div class="request-data-view-container">
                <ScrollPanel :style="{width: '100%', height: height + 'px'}" :pt="{

                    barX: { class: 'bg-primary' },
                    barY: { class: 'bg-primary' }
                }">
                    <highlightjs language='html' :code="props.requestData" />
                    <!-- <pre><code>{{ props.requestData }}</code></pre> -->
                    <!-- <pre v-highlight><code>{{ props.requestData }}</code></pre> -->
                    <!-- <div v-html="props.requestData"></div> -->
                </ScrollPanel>
            </div>

        </TabPanel>
        <TabPanel header="Response">
            <div class="response-data-view-container">
                <ScrollPanel :style="{width: '100%', height: height + 'px'}" :pt="{

                    barX: { class: 'bg-primary' },
                    barY: { class: 'bg-primary' }
                }">
                    <highlightjs language='html' :code="props.responseData" />
                    <!-- <pre v-highlight><code>{{ props.responseData }}</code></pre> -->
                    <!-- <div v-html="props.responseData"></div> -->
                    <!-- <pre><code>{{ props.responseData }}</code></pre> -->
                </ScrollPanel>
            </div>
        </TabPanel>
    </TabView>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, computed, onUnmounted, watch } from 'vue';



onMounted(() => {
    if(props.HTTPDataviewStyle !== undefined && props.HTTPDataviewStyle !== null && props.HTTPDataviewStyle === "Single"){
        height.value = 1000;
    }else{
        height.value = 450;
    }
});

const height = ref(350);

onUnmounted(() => {

});

const width_and_height = computed(() => {
    let width = 45;
    let height = 45;
    if (props.HTTPDataviewStyle === undefined || props.HTTPDataviewStyle === null) {
        if (props.up_or_bottom === undefined || props.up_or_bottom === null) {
            width = 45;
            height = 45;
        } else {
            if (props.up_or_bottom === 'up') {
                if (props.level1_up_width_height === undefined || props.level1_up_width_height === null) {
                    width = 45;
                    height = 45;;
                } else {
                    width = props.level0_width_height.width * 0.949;
                    height = props.level1_up_width_height.height * 0.84;
                }
            }
            else if (props.up_or_bottom === 'bottom') {
                if (props.level1_bottom_width_height === undefined || props.level1_bottom_width_height === null) {
                    width = 45;
                    height = 45;;
                } else {
                    width = props.level0_width_height.width * 0.949;;
                    height = props.level1_bottom_width_height.height * 0.84;
                }
            }
        }
    }
    else if (props.HTTPDataviewStyle === 'Single') {
        if (props.level0_width_height === undefined || props.level0_width_height === null) {
            width = 45;
            height = 45;;
        } else {
            width = props.level0_width_height.width * 0.949;
            height = props.level0_width_height.height * 0.949;;
        }
    } else {
        if (props.up_or_bottom === undefined || props.up_or_bottom === null) {
            width = 45;
            height = 45;;
        } else {
            if (props.up_or_bottom === 'up') {
                if (props.level1_up_width_height === undefined || props.level1_up_width_height === null) {
                    width = 45;
                    height = 45;;
                } else {
                    width = props.level0_width_height.width * 0.949;
                    height = props.level1_up_width_height.height * 0.84;
                }
            }
            else if (props.up_or_bottom === 'bottom') {
                if (props.level1_bottom_width_height === undefined || props.level1_bottom_width_height === null) {
                    width = 45;
                    height = 45;;
                } else {
                    width = props.level0_width_height.width * 0.949;
                    height = props.level1_bottom_width_height.height * 0.84;
                }
            }
        }
    }

    return {
        width: width,
        height: height
    }
});

const props = defineProps({
    requestData: String,
    responseData: String,
    HTTPDataviewStyle: String,
    syncTabEnable: Boolean,
    sessionIndex: Number,
    bottomHTTPDataViewIndex: Number,
    level0_width_height: Object,
    up_or_bottom: String,
    level1_up_width_height: Object,
    level1_bottom_width_height: Object,
});

const myBottomHTTPDataViewIndex = ref(props.bottomHTTPDataViewIndex);

const emits = defineEmits(['update:activeIndexChange'])

onBeforeMount(() => {

});

function onActiveIndexChange(index) {
    if (props.HTTPDataviewStyle === 'Compare' && props.sessionIndex !== 0 && props.up_or_bottom === 'bottom' && props.syncTabEnable === true) {
        // console.log('index: ' + index);
        // console.log('sessionIndex: ' + props.sessionIndex);
        // console.log('bottomHTTPDataViewIndex: ' + props.bottomHTTPDataViewIndex);
        // console.log('up_or_bottom: ' + props.up_or_bottom);
        // console.log('syncTabEnable: ' + props.syncTabEnable);
        emits('update:activeIndexChange', index);
    }
}

const myActiveIndex = ref((props.HTTPDataviewStyle === 'Compare' && props.up_or_bottom === 'top' && props.syncTabEnable === true && props.sessionIndex === 0) ? props.bottomHTTPDataViewIndex : 0);

// function myActiveIndex(){
//         console.log('HTTPDATAView activeIndex computed props.bottomHTTPDataViewIndex: ' + props.bottomHTTPDataViewIndex);
//     if (props.HTTPDataviewStyle === 'Compare' && props.up_or_bottom === 'top' && props.syncTabEnable === true) {
//         return props.bottomHTTPDataViewIndex;
//     }else{
//         return 0;
//     }
// }

// watch(props.myBottomHTTPDataViewIndex, (neWbottomHTTPDataViewIndex, preBottomHTTPDataViewIndex) => {
//     console.log('HTTPDATAView watch neWbottomHTTPDataViewIndex: ' + neWbottomHTTPDataViewIndex);
//     if (props.HTTPDataviewStyle === 'Compare' && props.up_or_bottom === 'top' && props.syncTabEnable === true && props.sessionIndex === 0) {
//         myActiveIndex.value = neWbottomHTTPDataViewIndex;
//     }
// });

watch(()=> props.bottomHTTPDataViewIndex, (neWbottomHTTPDataViewIndex) =>{
    // console.log('HTTPDATAView watch neWbottomHTTPDataViewIndex: ' + neWbottomHTTPDataViewIndex);
    // console.log('HTTPDATAView watch props.HTTPDataviewStyle: ' + props.HTTPDataviewStyle);
    // console.log('HTTPDATAView watch props.up_or_bottom: ' + props.up_or_bottom);
    // console.log('HTTPDATAView watch props.syncTabEnable: ' + props.syncTabEnable);
    // console.log('HTTPDATAView watch props.sessionIndex: ' + props.sessionIndex);
    if (props.HTTPDataviewStyle === 'Compare' && props.up_or_bottom === 'up' && props.syncTabEnable === true && props.sessionIndex === 0) {
        // console.log('HTTPDATAView watch ---------------------------------------');
        myActiveIndex.value = neWbottomHTTPDataViewIndex;
    }
})


</script>

<style scoped>
.request-data-view-container {
    height: 100%;
    width: 100%;
    display: flex;
}

.response-data-view-container {
    height: 100%;
    width: 100%;
    display: flex;
}

.request-data-view {
    height: 100%;
    width: 50%;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 10px;
    border-right: 1px solid #e5e5e5;
}
</style>