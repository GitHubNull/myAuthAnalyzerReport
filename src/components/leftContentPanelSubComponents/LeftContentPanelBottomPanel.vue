<template>
    <div class="my-data-table">
        <DataTable v-model:filters="filters" :value="props.data" paginator showGridlines stripedRows :rows="20"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}" class="p-datatable-sm"
            tableStyle="min-width: 50rem" filterDisplay="row" :loading="props.loading" dataKey="id" resizableColumns
            columnResizeMode="fit" :reorderableColumns="true" @row-click="rowSelectChangeF0"
            :globalFilterFields="['method', 'host', 'port', 'path', 'responseContentLength', 'responseStatusCode']">
            <template #header>
                <div class="flex justify-content-between">
                    <MultiSelect :modelValue="selectedColumns" :options="props.columns" optionLabel="title"
                        @update:modelValue="onToggle" filter display="chip" placeholder="Select Columns"
                        :maxSelectedLabels="3" />
                    <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" />
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                    </span>
                </div>
            </template>
            <template #empty> No customers found. </template>
            <template #loading> Loading customers data. Please wait. </template>
            <template v-for="column in selectedColumns">
                <template v-if="column.key == 'method'">
                    <Column field="method" header="method" sortable style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.method }}
                        </template>
                        <template #filter="{ filterModel }">
                            <InputText v-model="filterModel.value" type="text" class="p-column-filter"
                                placeholder="Search by method" />
                        </template>
                    </Column>
                </template>

                <template v-else-if="column.key == 'host'">
                    <Column field="host" header="host" sortable style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.host }}
                        </template>
                        <template #filter="{ filterModel }">
                            <InputText v-model="filterModel.value" type="text" class="p-column-filter"
                                placeholder="Search by host" />
                        </template>
                    </Column>
                </template>

                <template v-else-if="column.key == 'port'">
                    <Column field="port" header="port" sortable style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.port }}
                        </template>
                        <template #filter="{ filterModel }">
                            <InputText v-model="filterModel.value" type="text" class="p-column-filter"
                                placeholder="Search by port" />
                        </template>
                    </Column>
                </template>

                <template v-else-if="column.key == 'path'">
                    <Column field="path" header="path" sortable style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.path }}
                        </template>
                        <template #filter="{ filterModel }">
                            <InputText v-model="filterModel.value" type="text" class="p-column-filter"
                                placeholder="Search by path" />
                        </template>
                    </Column>
                </template>

                <template v-else-if="column.key == 'responseContentLength'">
                    <Column field="responseContentLength" header="responseContentLength" sortable style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.responseContentLength }}
                        </template>
                        <template #filter="{ filterModel }">
                            <InputText v-model="filterModel.value" type="text" class="p-column-filter"
                                placeholder="Search by responseContentLength" />
                        </template>
                    </Column>
                </template>

                <template v-else-if="column.key == 'responseStatusCode'">
                    <Column field="responseStatusCode" header="responseStatusCode" sortable style="min-width: 12rem">
                        <template #body="{ data }">
                            {{ data.responseStatusCode }}
                        </template>
                        <template #filter="{ filterModel }">
                            <InputText v-model="filterModel.value" type="text" class="p-column-filter"
                                placeholder="Search by responseStatusCode" />
                        </template>
                    </Column>
                </template>

                <template v-else-if="testColumnKeyIsSessionStatus(column.key)">
                    <Column :field="column.key" :header="column.title" style="min-width: 12rem">
                        <template #body="{ data }">
                            <Tag :value="data[column.key]" :severity="getSeverity(data[column.key])" />
                        </template>
                    </Column>
                </template>

                <template v-else>
                    <Column :field="column.key" :header="column.title" sortable style="min-width: 12rem"></Column>
                </template>


            </template>
            <template #footer> In total there are {{ props.data ? props.data.length : 0 }} item. </template>
        </DataTable>
    </div>
</template>

<script setup>
import { ref } from 'vue';

import { FilterMatchMode } from 'primevue/api';

const props = defineProps({
    columns: Object,
    data: Object
});

const selectedColumns = ref(props.columns);

const onToggle = (val) => {
    selectedColumns.value = props.columns.filter(col => val.includes(col));
};

const loading = ref(true);

const emit = defineEmits(['rowSelectChangeL0']);

const filters = ref();

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        method: { value: null, matchMode: FilterMatchMode.EQUALS },
        host: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        port: { value: null, matchMode: FilterMatchMode.EQUALS },
        path: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        responseContentLength: { value: null, matchMode: FilterMatchMode.EQUALS },
        responseStatusCode: { value: null, matchMode: FilterMatchMode.EQUALS }
    };
};

initFilters();

const clearFilter = () => {
    initFilters();
};

function rowSelectChangeF0(e) {
    emit('rowSelectChangeL0', e);
}

function testColumnKeyIsSessionStatus(key) {
    if (key === null || key === undefined || key === '') {
        return false;
    }
    return key.endsWith('_status');
}

function getSeverity(status) {
    switch (status) {
        case 'SAME':
            return 'danger';
        case 'SIMILAR':
            return 'warning';
        case 'DIFFERENT':
            return 'success';
        default:
            return null;
    }
}

</script>

<style scoped>
.my-data-table {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 5px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
}
</style>