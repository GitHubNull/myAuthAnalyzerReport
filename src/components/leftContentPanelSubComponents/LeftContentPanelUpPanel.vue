<template>
    <Toolbar class="my-tool-bar">
        <template #start>
            <div class="card flex justify-content-center">
                <MultiSelect :modelValue="props.selectedColumns" inputId="select-column-to-show" :options="props.columns" optionLabel="title" @update:modelValue="onToggle" :maxSelectedLabels="5"
                filter placeholder="Select Columns" />
                <label for="select-column-to-show">Select column to show</label>
            </div>  
        </template>
    </Toolbar>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
    columns: {
        type: Array,
        required: true
    },
    selectedColumns: {
        type: Array,
        required: true
    }
});

// const selectedColumns = ref(props.columns);

const emit = defineEmits(['showColumnsChange']);

const onToggle = (val) => {
    emit('showColumnsChange', val);
};





</script>

<style scoped>
.my-tool-bar {
    height: 100%;
    width: 100%;
}
</style>