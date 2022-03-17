import VueWrapper from '@/components/core/Vue/vue.wrapper';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class BaseTooltip extends VueWrapper {
    @Prop({
        default: 'top',
        type: String
    })
    private readonly direction!: string;

    @Prop({
        required: true,
        type: String
    })
    private readonly msg!: string;
}
