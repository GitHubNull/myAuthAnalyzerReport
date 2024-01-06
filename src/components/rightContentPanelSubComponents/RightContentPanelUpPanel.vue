<template>
    <Toolbar class="p-mb-4 common-container">
        <template #start>
            <div class="flex flex-wrap gap-3">
                <div class="flex align-items-center">
                    <RadioButton v-model="subHTTPDataviewStyle" inputId="subHTTPDataviewStyleIngredient" name="Single"
                        value="Single" @change="onHTTPDataviewStyleChang" />
                    <label for="subHTTPDataviewStyleIngredient" class="ml-2">Single view</label>
                </div>
                <div class="flex align-items-center">
                    <RadioButton v-model="subHTTPDataviewStyle" inputId="subCompareViewIngredient" name="Compare"
                        value="Compare" @change="onHTTPDataviewStyleChang" />
                    <label for="subCompareViewIngredient" class="ml-2">Compare view</label>
                </div>
                <template v-if="subHTTPDataviewStyle === 'Single'">
                    <div class="flex align-items-center">
                        <Checkbox v-model="subSyncTabEnable" inputId="subSyncTabEnableIngredient" :binary="true"
                            @change="onSyncTabChang" disabled />
                        <label for="subSyncTabEnableIngredient" class="ml-2">Sync tab</label>
                    </div>
                </template>
                <template v-else>
                    <div class="flex align-items-center">
                        <Checkbox v-model="subSyncTabEnable" inputId="subSyncTabEnableIngredient" :binary="true"
                            @change="onSyncTabChang" />
                        <label for="subSyncTabEnableIngredient" class="ml-2">Sync tab</label>
                    </div>
                </template>
            </div>
        </template>
    </Toolbar>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';

const subHTTPDataviewStyle = ref('Single');
const subSyncTabEnable = ref(false);


const props = defineProps([
    'HTTPDataviewStyle',
    'syncTabEnable'
]);

onBeforeMount(() => {
    subHTTPDataviewStyle.value = props.HTTPDataviewStyle;
    subSyncTabEnable.value = props.syncTabEnable;
});

const emits = defineEmits(['update:HTTPDataviewStyle', 'update:syncTabEnable'])

function onHTTPDataviewStyleChang() {
    emits('update:HTTPDataviewStyle', subHTTPDataviewStyle.value);
}

function onSyncTabChang() {
    emits('update:syncTabEnable', subSyncTabEnable.value);
}

</script>

<style scoped></style>