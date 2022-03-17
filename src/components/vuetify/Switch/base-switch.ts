import { Component, Prop } from 'vue-property-decorator';
import { ValidationProvider } from 'vee-validate';
import BaseInput from '../Input/base-input';

@Component({
    components: {
        ValidationProvider
    }
})
export default class BaseSwitch extends BaseInput {
    @Prop()
    private readonly inputValue?: string | boolean;
}
