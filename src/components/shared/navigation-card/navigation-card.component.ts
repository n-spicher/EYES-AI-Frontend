import VueWrapper from '@/components/core/Vue/vue.wrapper';
import { ShowableRoute } from '@/globals';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class NavigationCardComponent extends VueWrapper {
    @Prop({
        default: () => [],
        type: Array
    })
    private readonly navigationLinks!: Array<Array<ShowableRoute>>;
}
