import VueWrapper from '@/components/core/Vue/vue.wrapper';
import { Component } from 'vue-property-decorator';
import { ValidationObserver } from 'vee-validate';

@Component({
    components: {
        ValidationObserver
    }
})
export default class BaseFormComponent extends VueWrapper {
    // Refs
    public $refs!: {
        baseForm: any;
    };

    // Methods
    public reset() {
        this.$refs.baseForm.reset();
    }
}
