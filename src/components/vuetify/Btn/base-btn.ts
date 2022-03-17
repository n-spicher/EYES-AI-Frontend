import VueWrapper from '@/components/core/Vue/vue.wrapper';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class BaseBtn extends VueWrapper {
    @Prop({ type: String, default: 'primary' })
    public readonly color!: string;

    public created() {
        this.height();
    }
    public height() {
        // switch (this.$vuetify.breakpoint.name) {
        //     case 'xs':
        //         return true;
        //     case 'sm':
        //         return false;
        //     case 'md':
        //         return false;
        //     case 'lg':
        //         return false;
        //     case 'xl':
        //         return false;
        // }

        if (this.$vuetify.breakpoint.name == 'sm') {
            return true;
        }
    }
}
