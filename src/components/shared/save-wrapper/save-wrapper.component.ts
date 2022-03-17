import VueWrapper from '@/components/core/Vue/vue.wrapper';
import BaseFormComponent from '@/components/vuetify/Form/base-form';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class SaveWrapperComponent extends VueWrapper {
    public $refs!: {
        baseForm: BaseFormComponent;
    };

    @Prop({
        required: true,
        type: String
    })
    private readonly title!: string;

    @Prop({
        required: true,
        type: String
    })
    public readonly name!: string;
}
