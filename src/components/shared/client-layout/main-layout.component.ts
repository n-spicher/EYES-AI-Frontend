import MainAppBarComponent from '@/components/core/Appbar/main-app-bar/main-app-bar.component';
import VueWrapper from '@/components/core/Vue/vue.wrapper';
import {DIALOG_NAMES} from '@/globals';
import {AppBarService} from '@/services/app-bar.service';
import PdfPickerDialogComponent from '@/views/shared/pdf-picker-dialog/pdf-picker-dialog.component';
import {Component} from 'vue-property-decorator';

@Component({
    components: {
        MainAppBarComponent,
        PdfPickerDialogComponent
    },
    metaInfo() {
        return {
            title: this.$helpers.titleize(this.$route.name ?? ''),
            titleTemplate: '%s | PDF Processor'
        };
    }
})
export default class MainLayoutComponent extends VueWrapper {
    public created() {
        new AppBarService().submitBtn.subscribe(r => {
            this.CoreSrv.OpenModal(DIALOG_NAMES.PdfPickerDialog);
        });
    }
}
