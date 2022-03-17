import Vue from 'vue';
import router from './router';
import vuetify from './plugins/vuetify';
import AppComponent from './app.component';

import './styles/sweet-alert2.min.css';
import './components';
import './plugins';

Vue.config.productionTip = false;

new Vue({
    router,
    vuetify,
    render: h => h(AppComponent)
}).$mount('#app');
