import { createApp } from 'vue'
import ViewUIPlus from 'view-ui-plus'
import App from './App.vue'
import router from './router'
import 'view-ui-plus/dist/styles/viewuiplus.css'

import 'highlight.js/styles/stackoverflow-light.css'
import hljs from 'highlight.js/lib/core';
import http from 'highlight.js/lib/languages/http';
import hljsVuePlugin from "@highlightjs/vue-plugin";

// import VueCodeHighlight from 'vue-code-highlight';

import PrimeVue from 'primevue/config';


hljs.registerLanguage('http', http);


const app = createApp(App);

app.use(router)
  .use(ViewUIPlus)
  .use(hljsVuePlugin)
  .use(PrimeVue)
  // .use(VueCodeHighlight)
  .mount('#app')
