import VueWrapper from '@/components/core/Vue/vue.wrapper';
import { Component, Prop } from 'vue-property-decorator';
@Component
export default class BaseInput extends VueWrapper {
    // Props
    @Prop({ default: '', type: String })
    protected readonly rules!: string;

    @Prop({ type: String })
    protected readonly vid!: string;

    @Prop({ default: null })
    protected readonly value!: string | null;

    @Prop({ default: true, type: Boolean })
    protected readonly outlined!: boolean;

    @Prop({ default: false, type: Boolean })
    protected readonly dense!: boolean;

    @Prop({ default: true, type: Boolean })
    protected readonly edit!: boolean;
}
