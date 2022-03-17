import {Component, Prop} from 'vue-property-decorator';
import {ValidationProvider} from 'vee-validate';
import {mask} from 'vue-the-mask';
import BaseInput from '../Input/base-input';

@Component({
    components: {
        ValidationProvider
    },
    directives: {
        mask: (el, binding) => {
            if (!binding.value) return;
            mask(el, binding);
        }
    }
})
export default class BaseTextField extends BaseInput {
    @Prop({
        default: '',
        type: String
    })
    private readonly mask!: string;
    continuousMask(model: any) {
        let mask = '';
        if (model && model.length) {
            for (let i = 0; i < model.length; i++) {
                mask += 'X';
            }
        }
        return mask;
    }

    getErrorMessage(error: string) {
        const msg = this.$attrs['error-message'];

        if (msg?.length) {
            return msg;
        } else {
            return error;
        }
    }
}
