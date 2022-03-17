import VueWrapper from '@/components/core/Vue/vue.wrapper';
import { Component } from 'vue-property-decorator';
import { LoaderService } from '@/sdk/services';

@Component
export default class BaseCard extends VueWrapper {
    // Services
    // private LoaderService = LoaderService.Instance;
}
