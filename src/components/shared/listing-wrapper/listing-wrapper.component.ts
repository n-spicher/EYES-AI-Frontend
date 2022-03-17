import VueWrapper from '@/components/core/Vue/vue.wrapper';
import { AnyObject } from '@/globals';
import { Component, Prop, PropSync } from 'vue-property-decorator';
import { DataOptions } from 'vuetify';
import SearchComponent from '../search/search.component';
import ListingComponent from './listing/listing.component';

@Component({
    components: {
        ListingComponent,
        SearchComponent
    }
})
export default class ListingWrapperComponent extends VueWrapper {
    public e1 = 'Active';
    public items = ['Active', 'Not Active'];
    @Prop({
        type: Array
    })
    private readonly actions!: Array<AnyObject>;

    @Prop({
        required: false,
        type: String
    })
    private readonly title!: string;
}
