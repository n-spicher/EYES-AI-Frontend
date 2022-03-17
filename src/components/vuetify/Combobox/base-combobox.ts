import { Component } from 'vue-property-decorator';
import { ValidationProvider } from 'vee-validate';
import BaseInput from '../Input/base-input';

@Component({
    components: {
        ValidationProvider
    }
})
export default class BaseCombobox extends BaseInput {}
