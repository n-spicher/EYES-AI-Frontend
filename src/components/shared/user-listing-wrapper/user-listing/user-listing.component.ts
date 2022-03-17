import VueWrapper from '@/components/core/Vue/vue.wrapper';
import { AnyObject } from '@/globals';
import { GLOBAL_CONSTANTS } from '@/globals/constants';
import { Component, Prop, PropSync } from 'vue-property-decorator';

const _footerProps = {
    itemsPerPageOptions: GLOBAL_CONSTANTS.itemsPerPageOptions,
    itemsPerPageText: 'Load Records'
};
@Component
export default class UserListingComponent extends VueWrapper {
    public e1 = 'All';
    public items = ['Active', 'Not Active', 'All'];
    // Props
    @Prop({
        default: () => [],
        type: Array
    })
    private readonly data!: Array<AnyObject>;

    @Prop({
        default: () => [],
        type: Array
    })
    private readonly headers!: Array<AnyObject>;

    @Prop({ default: 1, type: Number })
    private readonly ServerItems!: number;

    @Prop({
        default: () => {
            return _footerProps;
        },
        type: Object
    })
    footerProps!: AnyObject;

    @PropSync('expanded', {
        default: () => {
            return [];
        },
        type: Array
    })
    expandedSync!: Array<string>;
}
