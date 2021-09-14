import { createApp } from 'vue';
import router from './router';
import store from './store';
import App from './App.vue';

import registerComponents from '@/plugins/components';
import registerDirectives from '@/plugins/directives';

const app = createApp(App);
app.use(router);
app.use(store);

registerComponents(app);
registerDirectives(app);

app.mount('#app');
