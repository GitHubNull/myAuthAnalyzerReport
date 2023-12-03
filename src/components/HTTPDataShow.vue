<template>
    <ScrollPanel class="http-data-view-scroll-panel">
        <Tabs value="requestTabPane" :animated="false" type="line" size="small">
            <TabPane label="请求报文" name="requestTabPane">
                <!-- <highlightjs language='http' :code="httpData.request_data" /> -->

                <highlightjs language='http' :code="httpData.request_data" />

            </TabPane>
            <TabPane label="响应报文" name="responseTabPane">
                <highlightjs language='http' :code="httpData.response_data" />
            </TabPane>
        </Tabs>
    </ScrollPanel>
</template>

<script setup>
import ScrollPanel from 'primevue/scrollpanel';


defineProps({
    httpData: Object
})

</script>

<style scoped>
.http-data-view-scroll-panel {
    height: 100%;
    width: 100%;
    overflow: false;
}
</style>