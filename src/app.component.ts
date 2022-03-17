import VueWrapper from '@/components/core/Vue/vue.wrapper';
import {GlobalWorkerOptions, version} from 'pdfjs-dist';
import {Component} from 'vue-property-decorator';
import ConfirmComponent from './components/shared/Confirm/confirm.component';

@Component({
    components: {
        ConfirmComponent
    }
})
export default class AppComponent extends VueWrapper {
    get cssProps() {
        const themeColors: any = {};
        Object.keys(this.$vuetify.theme.themes.light).forEach(color => {
            themeColors[`--v-${color}`] = this.$vuetify.theme.themes.light[color];
        });
        return themeColors;
    }

    public MobileSize() {
        if (window.innerWidth <= 991) {
            this.CoreSrv.UserDrawer.MobileScreen = true;
            this.CoreSrv.Drawer.MobileScreen = true;
            this.CoreSrv.block = true;
        } else if (window.innerWidth >= 991) {
            this.CoreSrv.UserDrawer.MobileScreen = false;
            this.CoreSrv.Drawer.MobileScreen = false;
            this.CoreSrv.block = false;
        }
    }

    public mounted() {
        GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.js`;
    }

    public created() {
        this.LibrariesServie.loadGoogleMapsLibrary();
        window.addEventListener('resize', this.MobileSize);
    }
}
