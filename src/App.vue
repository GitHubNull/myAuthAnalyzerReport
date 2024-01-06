<template>
  <!-- <div class="container">
    <div class="header">
      <MyHeader></MyHeader>
    </div>
    <div class="content">
      <MyContent 
      :rawHttpData="currentRawHTTPData" 
      :sessionNames="sessionNames" 
      :columns="columns"
      :data="data"
      :currentSessionHTTPData="currentSessionHTTPData" 
      @rowSelectChangeL2="changeShowHttpData"></MyContent>
    </div>
    <div class="footer">
      <MyFooter></MyFooter>
    </div>
  </div> -->
  <div class="flex flex-column">
    <div class="flex bg-primary border-round m-2">
      <MyHeader></MyHeader>
    </div>
    <div class="flex bg-primary border-round m-2">
      <MyContent 
      :rawHttpData="currentRawHTTPData" 
      :sessionNames="sessionNames" 
      :columns="columns"
      :data="data"
      :currentSessionHTTPData="currentSessionHTTPData" 
      @rowSelectChangeL2="changeShowHttpData"></MyContent>
    </div>
    <div class="flex bg-primary justify-content-center border-round m-2">
      <MyFooter></MyFooter>
    </div>
</div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import MyHeader from './components/MyHeader.vue';
import MyContent from './components/MyContent.vue';
import MyFooter from './components/MyFooter.vue';

const rawHttpData = ref({
  requestData: '',
  responseData: '',
});

const sessionNames = ref(['']);

const currentSessionHTTPData = ref({});

const currentRawHTTPData = ref({
  requestData: '',
  responseData: ''
});

const columns = ref([
  {
    title: 'id',
    key: 'id',
    fixed: 'left',
    sortable: true
  },
  {
    title: 'method',
    key: 'method',
    fixed: 'left',
    sortable: true
  },
  {
    title: 'host',
    key: 'host',
    fixed: 'left',
    sortable: true
  },
  {
    title: 'port',
    key: 'port',
    fixed: 'left',
    sortable: true
  },
  {
    title: 'path',
    key: 'path',
    fixed: 'left',
    sortable: true
  },
  {
    title: 'responseContentLength',
    key: 'responseContentLength',
    fixed: 'left',
    sortable: true
  },
  {
    title: 'responseStatusCode',
    key: 'responseStatusCode',
    fixed: 'left',
    sortable: true
  }
]);

const data = ref([]);

const loading = ref(false);

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

  // add session status to column
  let sessionStatusKeyList = []
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
            requestData: currentSessionsHTTPDataList[index].requestHeaders + '\r\n\r\n' + currentSessionsHTTPDataList[index].requestBody,
            responseData: currentSessionsHTTPDataList[index].responseHeaders + '\r\n\r\n' + currentSessionsHTTPDataList[index].responseBody
          }
        }
      }
    }
  });

});

function getCurrentRawHTTPData(rowIndex) {
  // console.log('getCurrentRawHTTPData rowIndex: ' + rowIndex);
  return { requestData: dataItemList[rowIndex].requestHeaders + '\r\n\r\n' + dataItemList[rowIndex].requestBody, responseData: dataItemList[rowIndex].responseHeaders + '\r\n\r\n' + dataItemList[rowIndex].responseBody }
}

function changeShowHttpData(e) {
  // console.log('changeShowHttpData dataItemList: ' + JSON.stringify(dataItemList));
  let rowData = e.data
  let rowIndex = e.index

  // console.log('changeShowHttpData rowIndex: ' + rowIndex);
  // console.log('changeShowHttpData rowData: ' + rowData);
  // currentRowData.value = rowData;
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
          requestData: currentSessionsHTTPDataList[index].requestHeaders + '\r\n\r\n' + currentSessionsHTTPDataList[index].requestBody,
          responseData: currentSessionsHTTPDataList[index].responseHeaders + '\r\n\r\n' + currentSessionsHTTPDataList[index].responseBody
        }
      }
    }
  }

  // console.log('changeShowHttpData currentSessionHTTPData: ' + JSON.stringify(currentSessionHTTPData.value));

}

</script>

<style scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.header {
  height: 5%;
  display: flex;
  background-color: #f0f0f0;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.content {
  height: 90%;
  background-color: #ffffff;
  margin: 20px;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  border: 1px solid #ccc;
}

.footer {
  height: 5%;
  background-color: #f0f0f0;
  margin: 10px;
  padding: 10px;
  display: flex;
  border-radius: 5px;
  border: 1px solid #ccc;
}
</style>
