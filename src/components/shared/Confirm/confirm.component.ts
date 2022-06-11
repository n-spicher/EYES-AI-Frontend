import VueWrapper from '@/components/core/Vue/vue.wrapper';
import {ConfirmService} from '@/sdk/services/shared/confirm.service';
import {Component} from 'vue-property-decorator';

@Component
export default class ConfirmComponent extends VueWrapper {
    // Services
    private ConfirmService = new ConfirmService();

    public sure: boolean = false;
}
