import VueWrapper from '@/components/core/Vue/vue.wrapper';
import {DIALOG_NAMES} from '@/globals';
import {AlertService} from '@/sdk';
import {AppBarService} from '@/services/app-bar.service';
import Swal from 'sweetalert2';
import {Component} from 'vue-property-decorator';

@Component({
    components: {}
})
export default class HomeComponent extends VueWrapper {
    public created() {}
}
