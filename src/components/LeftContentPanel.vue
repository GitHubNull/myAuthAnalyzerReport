<template>
    <div class="left-container">
        <!-- <div class="left-up-panel">
            <LeftContentPanelUpPanel :columns="props.columns" :selectedColumns="selectedColumns" @showColumnsChange="changeColumns">

            </LeftContentPanelUpPanel>
        </div> -->

        <div class="left-bottom-panel">
            <LeftContentPanelBottomPanel :columns="selectedColumns" :data="props.data"
            @rowSelectChangeL0="rowSelectChangeF1">

            </LeftContentPanelBottomPanel>
        </div>

    </div>
</template>

<script setup>
import { ref } from "vue";

import LeftContentPanelUpPanel from './leftContentPanelSubComponents/LeftContentPanelUpPanel.vue';
import LeftContentPanelBottomPanel from './leftContentPanelSubComponents/LeftContentPanelBottomPanel.vue';


const props = defineProps({
    columns: Object,
    data: Object
});

const selectedColumns = ref(props.columns);
// const selectedColumns = ref(props.columns);

const emit = defineEmits(['rowSelectChangeL1']);

function rowSelectChangeF1(e) {
    emit('rowSelectChangeL1', e);
}

function changeColumns(val) {
    selectedColumns.value = props.columns.filter(col => val.includes(col));
}


</script>

<style scoped>
.left-container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
}

.left-up-panel {
    height: 15%;
    width: 100%;
}

.left-bottom-panel {
    height: 90%;
    width: 100%;
}
</style>