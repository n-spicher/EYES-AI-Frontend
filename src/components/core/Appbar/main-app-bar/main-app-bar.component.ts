import VueWrapper from '@/components/core/Vue/vue.wrapper';
import {AppBarService} from '@/services/app-bar.service';
import {Component} from 'vue-property-decorator';

@Component
export default class MainAppBarComponent extends VueWrapper {
    public submitClick() {
        new AppBarService().submitBtn.next(true);
    }
}
