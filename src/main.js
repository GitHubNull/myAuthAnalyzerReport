import { createApp } from 'vue'
// import ViewUIPlus from 'view-ui-plus'
import App from './App.vue'
// import router from './router'
// import 'view-ui-plus/dist/styles/viewuiplus.css'

import 'highlight.js/styles/stackoverflow-light.css'
import hljs from 'highlight.js/lib/core';
import http from 'highlight.js/lib/languages/http';
import hljsVuePlugin from "@highlightjs/vue-plugin";

// import VueCodeHighlight from 'vue-code-highlight';

import "primeflex/primeflex.css";
import "primevue/resources/themes/lara-light-green/theme.css";
import "primevue/resources/primevue.min.css"; /* Deprecated */
import "primeicons/primeicons.css";
import "./style.css";
import "./flags.css";

import PrimeVue from "primevue/config";
import Badge from 'primevue/badge';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Checkbox from 'primevue/checkbox';
import Chip from 'primevue/chip';
import Chips from 'primevue/chips';
import Column from 'primevue/column';
import ConfirmationService from 'primevue/confirmationservice';
import DataTable from 'primevue/datatable';
import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
import Dialog from 'primevue/dialog';
import DialogService from 'primevue/dialogservice'
import Divider from 'primevue/divider';
import FileUpload from 'primevue/fileupload';
import Image from 'primevue/image';
import InputSwitch from 'primevue/inputswitch';
import InputText from 'primevue/inputtext';
import MultiSelect from 'primevue/multiselect';
import Paginator from 'primevue/paginator';
import Panel from 'primevue/panel';
import RadioButton from 'primevue/radiobutton';
import Ripple from 'primevue/ripple';
import Row from 'primevue/row';
import ScrollPanel from 'primevue/scrollpanel';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import StyleClass from 'primevue/styleclass';
import ToastService from 'primevue/toastservice';
import Toolbar from 'primevue/toolbar';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Tag from 'primevue/tag';
import Tooltip from 'primevue/tooltip';
import VirtualScroller from 'primevue/virtualscroller';


// myself commponets
import HTTPDataView from './components/rightContentPanelSubComponents/HTTPDataView.vue';

hljs.registerLanguage('http', http);

const app = createApp(App);

// app.use(router);
// app.use(ViewUIPlus);
app.use(hljsVuePlugin);

app.use(PrimeVue, { ripple: true });
app.use(ConfirmationService);
app.use(ToastService);
app.use(DialogService);


// app.use(VueCodeHighlight);

app.directive('tooltip', Tooltip);
app.directive('ripple', Ripple);
app.directive('styleclass', StyleClass);

app.component('Badge', Badge);
app.component('Button', Button);
app.component('Card', Card);
app.component('Checkbox', Checkbox);
app.component('Chip', Chip);
app.component('Chips', Chips);
app.component('Column', Column);
app.component('DataTable', DataTable);
app.component('DataView', DataView);
app.component('DataViewLayoutOptions', DataViewLayoutOptions);
app.component('Dialog', Dialog);
app.component('Divider', Divider);
app.component('FileUpload', FileUpload);
app.component('Image', Image);
app.component('InputSwitch', InputSwitch);
app.component('InputText', InputText);
app.component('MultiSelect', MultiSelect);
app.component('Paginator', Paginator);
app.component('Panel', Panel);
app.component('RadioButton', RadioButton);
app.component('Row', Row);
app.component('ScrollPanel', ScrollPanel);
app.component('Splitter', Splitter);
app.component('SplitterPanel', SplitterPanel);
app.component('TabView', TabView);
app.component('TabPanel', TabPanel);
app.component('Tag', Tag);
app.component('Toolbar', Toolbar);
app.component('VirtualScroller', VirtualScroller);

// myseft component 
app.component('HTTPDataView', HTTPDataView);

app.mount('#app');
