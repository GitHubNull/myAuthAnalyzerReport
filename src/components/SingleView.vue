<template>
    <Tabs value="name1">
        <TabPane label="标签一" name="name1">
            <HTTPDataShow :httpData="httpData"></HTTPDataShow>
        </TabPane>
        <TabPane label="标签二" name="name2">
            <HTTPDataShow :httpData="httpData"></HTTPDataShow>
        </TabPane>
        <TabPane label="标签三" name="name3">
            <HTTPDataShow :httpData="httpData"></HTTPDataShow>
        </TabPane>
    </Tabs>
</template>
<script setup>
// import HTTPDataShow from './HTTPDataShow.vue';

defineProps({
    httpData: Object
})
</script>

<style lang="scss" scoped></style>