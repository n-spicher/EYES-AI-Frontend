import VueWrapper from '@/components/core/Vue/vue.wrapper';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class BaseBreadcrumbsComponent extends VueWrapper {
    @Prop({ type: String, default: 'primary' })
    public readonly color!: string;
}
