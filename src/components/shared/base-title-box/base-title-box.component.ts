import VueWrapper from '@/components/core/Vue/vue.wrapper';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class BaseTitleBoxComponent extends VueWrapper {
    @Prop({
        required: true,
        type: String
    })
    private readonly title!: string;
}
