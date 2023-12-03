<template>
    <div class="container-split">
        <Split v-model="split">
            <template #left>
                <div class="sub-split-pane">
                    <Grid :col="1">
                        <GridItem>
                            <Grid :col="1">
                                <GridItem>
                                    <Space direction="vertical" type="flex">
                                        <Space>
                                            <Input v-model="fuzzy_search_key_word" placeholder="输入关键词" />
                                            <Button>模糊搜索</Button>
                                        </Space>
                                        <Collapse>
                                            <Panel name="advance_search">
                                                高级搜索
                                                <template #content>
                                                    <Space direction="vertical" type="flex">
                                                        <Space>
                                                            方法：
                                                            <Select v-model="method_model">
                                                                <Option v-for="item in methodList" :value="item.value"
                                                                    :key="item.value">{{ item.label }}</Option>
                                                            </Select>
                                                            协议：
                                                            <Select v-model="protocol_model">
                                                                <Option v-for="item in protocolList" :value="item.value"
                                                                    :key="item.value">{{ item.label }}</Option>
                                                            </Select>
                                                            主机：
                                                            <Input v-model="host" placeholder="请输入主机" />
                                                        </Space>
                                                        <Space>
                                                            端口：
                                                            <Input v-model="port" placeholder="请输入端口" />
                                                            路径：
                                                            <Input v-model="path" placeholder="请输入路径" />
                                                            参数：
                                                            <Input v-model="params" placeholder="请输入参数" />
                                                        </Space>
                                                        <Space>
                                                            请求报文体：
                                                            <Input v-model="body" placeholder="请输入请求报文体" />
                                                            搜索：
                                                            <button type="primary" @click="search">搜索</Button>
                                                        </Space>
                                                    </Space>

                                                </template>
                                            </Panel>
                                        </Collapse>
                                    </Space>
                                </GridItem>
                                <GridItem>
                                    <Space direction="vertical" type="flex">
                                        <Space>
                                            去重：
                                            <Switch v-model="deduplication" @on-change="changeDeduplication" />
                                        </Space>
                                        <Collapse v-model="show_collomns">
                                            <Panel>
                                                设置显示字段
                                                <template #content>
                                                    <Checkbox :model-value="checkAll" @click.prevent="handleCheckAll">全显示
                                                    </Checkbox>
                                                    <Divider size="small" class="ivu-m-0" />
                                                    <CheckboxGroup v-model="checkAllGroup">
                                                        <Checkbox label="方法"></Checkbox>
                                                        <Checkbox label="协议"></Checkbox>
                                                        <Checkbox label="主机"></Checkbox>
                                                        <Checkbox label="端口"></Checkbox>
                                                        <Checkbox label="路径"></Checkbox>
                                                        <Checkbox label="参数"></Checkbox>
                                                    </CheckboxGroup>
                                                </template>
                                            </Panel>
                                        </Collapse>
                                    </Space>
                                </GridItem>
                            </Grid>
                        </GridItem>
                        <GridItem>
                            <Table :columns="columns" :data="data" @on-row-click="changeShowHttpData"></Table>
                        </GridItem>
                    </Grid>
                </div>
            </template>
            <template #right>
                <div class="sub-split-pane">
                    <Grid :col="1">
                        <GridItem>
                            <Space>
                                <RadioGroup v-model="HTTPDataShowModel">
                                    <Radio label="Single">
                                        <Icon type="ios-arrow-dropleft" />
                                        <span>Single</span>
                                    </Radio>
                                    <Radio label="Compare">
                                        <Icon type="ios-arrow-dropdown" />
                                        <span>Compare</span>
                                    </Radio>
                                </RadioGroup>
                                <Checkbox v-model="SyncTab">Checkbox</Checkbox>
                            </Space>
                        </GridItem>
                        <GridItem class="http-data-show-container">
                            <template v-if="HTTPDataShowModel === HTTP_DATA_SHOW_MODELS.SIGLE">
                                <div class="http-data-view-sub-split-pane">
                                    <Tabs value="rawHTTPData" type="card">
                                        <TabPane label="rawHTTPData" name="rawHTTPData">
                                            <HTTPDataShow :httpData="currentRawHTTPData"></HTTPDataShow>
                                        </TabPane>
                                        <template v-for="sessionName in sessionNames" :key="sessionName">
                                            <TabPane :label="sessionName" :name="sessionName">
                                                <HTTPDataShow
                                                    :httpData="sessionName in currentSessionHTTPData ? currentSessionHTTPData[sessionName] : httpData">
                                                </HTTPDataShow>
                                            </TabPane>
                                        </template>
                                    </Tabs>
                                </div>
                            </template>
                            <template v-else>
                                <div class="http-data-view-sub-split">
                                    <Split v-model="http_data_compare_view_sub_split" mode="vertical">
                                        <template #top>
                                            <div class="http-data-view-sub-split-pane">
                                                <Tabs value="rawHTTPData" type="card">
                                                    <TabPane label="rawHTTPData" name="rawHTTPData">
                                                        <HTTPDataShow :httpData="currentRawHTTPData"></HTTPDataShow>
                                                    </TabPane>
                                                    <template v-for="sessionName in sessionNames" :key="sessionName">
                                                        <TabPane :label="sessionName" :name="sessionName">
                                                            <HTTPDataShow
                                                                :httpData="sessionName in currentSessionHTTPData ? currentSessionHTTPData[sessionName] : httpData">
                                                            </HTTPDataShow>
                                                        </TabPane>
                                                    </template>
                                                </Tabs>
                                            </div>
                                        </template>
                                        <template #bottom>
                                            <div class="http-data-view-sub-split-pane">
                                                <Tabs value="rawHTTPData" type="card">
                                                    <TabPane label="rawHTTPData" name="rawHTTPData">
                                                        <HTTPDataShow :httpData="currentRawHTTPData"></HTTPDataShow>
                                                    </TabPane>
                                                    <template v-for="sessionName in sessionNames" :key="sessionName">
                                                        <TabPane :label="sessionName" :name="sessionName">
                                                            <HTTPDataShow
                                                                :httpData="sessionName in currentSessionHTTPData ? currentSessionHTTPData[sessionName] : httpData">
                                                            </HTTPDataShow>
                                                        </TabPane>
                                                    </template>
                                                </Tabs>
                                            </div>
                                        </template>

                                    </Split>
                                </div>
                            </template>
                        </GridItem>
                    </Grid>
                </div>
            </template>
        </Split>
    </div>
</template>
<script setup>
import { ref, onBeforeMount, reactive } from 'vue';

import HTTPDataShow from './HTTPDataShow.vue';
// import SingleView from './SingleView.vue';
// import CompareView from './CompareView.vue';

const split = ref(0.5);
const http_data_compare_view_sub_split = ref(0.5);
const fuzzy_search_key_word = ref('');

const columns = ref([
    {
        title: 'id',
        key: 'id'
    },
    {
        title: 'method',
        key: 'method'
    },
    {
        title: 'host',
        key: 'host'
    },
    {
        title: 'port',
        key: 'port'
    },
    {
        title: 'path',
        key: 'path'
    },
    {
        title: 'responseContentLength',
        key: 'responseContentLength'
    },
    {
        title: 'responseStatusCode',
        key: 'responseStatusCode'
    }
]);

const data = ref([]);

const currentRowData = ref({});

const sessionNames = ref([]);

onBeforeMount(async () => {
    let dataItem = dataItemList[0];
    let sessionsHTTPDataList = dataItem.sessionsHTTPDataList;
    let tmpSessionNames = [];
    for (let index = 0; index < sessionsHTTPDataList.length; index++) {
        let sessionsHTTPData = sessionsHTTPDataList[index];
        tmpSessionNames.push(sessionsHTTPData.sessionName);
    }

    sessionNames.value = tmpSessionNames;
    let sessioncount = tmpSessionNames.length;

    // add session status code to column
    let sessionStatusCodeKeyList = [];
    for (let index = 0; index < sessioncount; index++) {
        columns.value.push({
            title: tmpSessionNames[index] + '_statusCode',
            key: tmpSessionNames[index] + '_statusCode'
        });
        sessionStatusCodeKeyList.push(tmpSessionNames[index] + '_statusCode');
    }

    // add session content length to column
    let sessionContentLengthKeyList = [];
    for (let index = 0; index < sessioncount; index++) {
        columns.value.push({
            title: tmpSessionNames[index] + '_contentLength',
            key: tmpSessionNames[index] + '_contentLength'
        });
        sessionContentLengthKeyList.push(tmpSessionNames[index] + '_contentLength');
    }

    //add session diffent to column
    // let sessionDiffKeyList = [];
    // for (let index = 0; index < sessioncount; index++) {
    //     columns.push({
    //         title: sessionNames[index] + '_Diff',
    //         key: sessionNames[index] + '_Diff'
    //     });
    //     sessionDiffKeyList.push(sessionNames[index] + '_Diff');
    // }

    // add session status to column
    let sessionStatusKeyList = [];
    for (let index = 0; index < sessioncount; index++) {
        columns.value.push({
            title: tmpSessionNames[index] + '_status',
            key: tmpSessionNames[index] + '_status'
        });
        sessionStatusKeyList.push(tmpSessionNames[index] + '_status');
    }

    columns.value.push({
        title: 'comment',
        key: 'comment'
    });



    // add data to local data
    dataItemList.forEach(dataItem1 => {
        let sessionsHTTPDataList1 = dataItem1.sessionsHTTPDataList;

        let dataItem = {
            id: dataItem1.id,
            method: dataItem1.method,
            host: dataItem1.host,
            port: dataItem1.port,
            path: dataItem1.path,
            responseContentLength: dataItem1.responseContentLength,
            responseStatusCode: dataItem1.responseStatusCode,
            comment: dataItem1.comment
        }

        // add session status code to dataItem
        for (let index = 0; index < sessioncount; index++) {
            dataItem[sessionStatusCodeKeyList[index]] = sessionsHTTPDataList1[index].responseStatusCode;
        }

        // add session length to dataItem
        for (let index = 0; index < sessioncount; index++) {
            dataItem[sessionContentLengthKeyList[index]] = sessionsHTTPDataList1[index].responseContentLength;
        }

        // add session status to dataItem
        for (let index = 0; index < sessioncount; index++) {
            dataItem[sessionStatusKeyList[index]] = sessionsHTTPDataList1[index].status;
        }
        data.value.push(dataItem);

        let currentSessionsHTTPDataList = dataItemList[0].sessionsHTTPDataList;
        for (let index = 0; index < currentSessionsHTTPDataList.length; index++) {
            let sessionName1 = currentSessionsHTTPDataList[index].sessionName;
            for (let index2 = 0; index2 < sessionNames.value.length; index2++) {
                let currentSessionName = sessionNames.value[index2];
                if (currentSessionName === sessionName1) {
                    currentSessionHTTPData.value[currentSessionName] = {
                        request_data: currentSessionsHTTPDataList[index].requestHeaders + '\r\n\r\n' + currentSessionsHTTPDataList[index].requestBody,
                        response_data: currentSessionsHTTPDataList[index].responseHeaders + '\r\n\r\n' + currentSessionsHTTPDataList[index].responseBody
                    }
                }
            }
        }
    });


});

const currentRawHTTPData = ref({
    request_data: '',
    response_data: ''
});

const httpData = ref({
    request_data: '',
    response_data: ''
});

const currentSessionHTTPData = ref({});

function getCurrentRawHTTPData(rowIndex) {
    return { request_data: dataItemList[rowIndex].requestHeaders + '\r\n\r\n' + dataItemList[rowIndex].requestBody, response_data: dataItemList[rowIndex].responseHeaders + '\r\n\r\n' + dataItemList[rowIndex].responseBody }

    // return {request_data: '', response_data: ''}
}

function changeShowHttpData(rowData, rowIndex) {
    // console.log('changeShowHttpData rowIndex: ' + rowIndex);
    // console.log('changeShowHttpData rowData: ' + rowData);
    currentRowData.value = rowData;
    let tmp = getCurrentRawHTTPData(rowIndex);
    // console.log('changeShowHttpData tmp: ' + tmp);
    currentRawHTTPData.value = tmp;

    let currentSessionsHTTPDataList = dataItemList[rowIndex].sessionsHTTPDataList;
    for (let index = 0; index < currentSessionsHTTPDataList.length; index++) {
        let sessionName1 = currentSessionsHTTPDataList[index].sessionName;
        // console.log('changeShowHttpData sessionName1: ' + sessionName1);
        // console.log('changeShowHttpData sessionNames: ' + JSON.stringify(sessionNames.value));
        for (let index2 = 0; index2 < sessionNames.value.length; index2++) {
            let tmpSessionNamescurrentSessionName = sessionNames.value[index2];
            // console.log('changeShowHttpData tmpSessionNamescurrentSessionName: ' + tmpSessionNamescurrentSessionName);

            if (tmpSessionNamescurrentSessionName === sessionName1) {
                currentSessionHTTPData.value[tmpSessionNamescurrentSessionName] = {
                    request_data: currentSessionsHTTPDataList[index].requestHeaders + '\r\n\r\n' + currentSessionsHTTPDataList[index].requestBody,
                    response_data: currentSessionsHTTPDataList[index].responseHeaders + '\r\n\r\n' + currentSessionsHTTPDataList[index].responseBody
                }
            }
        }
    }

    // console.log('changeShowHttpData currentSessionHTTPData: ' + JSON.stringify(currentSessionHTTPData.value));

}

const methodList = ref([
    {
        value: 'GET',
        label: 'GET'
    },
    {
        value: 'POST',
        label: 'POST'
    },
    {
        value: 'HEADER',
        label: 'HEADER'
    },
    {
        value: 'DELETE',
        label: 'DELETE'
    },
    {
        value: 'OPTIONS',
        label: 'OPTIONS'
    },
    {
        value: 'PUT',
        label: 'PUT'
    }
]);

const method_model = ref('');


const protocolList = ref([
    {
        value: 'HTTP',
        label: 'HTTP'
    },
    {
        value: 'HTTPS',
        label: 'HTTPS'
    }
]);

const protocol_model = ref('');

const host = ref('');
const port = ref('');
const path = ref('');
const params = ref('');
const body = ref('');

var indeterminate = true;
var checkAll = true;
var checkAllGroup = ['id', 'method', 'host', 'port', 'path'];

const deduplication = ref(false);

function changeDeduplication(status) {
    console.log(status);
}

const show_collomns = ref([]);

function handleCheckAll() {

}

const HTTP_DATA_SHOW_MODELS = ref({
    SIGLE: 'Single',
    COMPARE: 'Compare'
});

const HTTPDataShowModel = ref(HTTP_DATA_SHOW_MODELS.value.SIGLE);

const SyncTab = ref(true);


</script>
<style>
.container-split {
    height: 100vh;
    border: 2px solid #dcdee2;
}

.sub-split-pane {
    height: 100vh;
    padding: 10px;
}


.http-data-view-sub-split {
    height: 100vh;
    border: 2px solid #dcdee2;
}

.http-data-view-sub-split-pane {
    padding: 10px;
}

.http-data-show-container {
    height: 100%;
    border: 2px solid #dcdee2;
}
</style>