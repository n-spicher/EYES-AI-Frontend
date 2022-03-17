import '@mdi/font/css/materialdesignicons.css';
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi'
    },
    theme: {
        themes: {
            light: {
                primary: '#0067d1',
                secondary: '#26AF5F',
                accent: '#109144',
                error: '#f44336',
                warning: '#ffc107',
                info: '#00bcd4',
                success: '#113f0b',
                body: '#e4e4e4',
                white: '#ffffff',
                link: '#8ea0bc',
                accent1: {
                    base: '#e1e1e1',
                    darken1: '#ffffff',
                    darken2: '#ffffff',
                    darken3: '#ffffff',
                    darken4: '#ffffff'
                }
            }
        }
    }
});
