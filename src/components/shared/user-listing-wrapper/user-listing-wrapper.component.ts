import VueWrapper from '@/components/core/Vue/vue.wrapper';
import { Component, Prop } from 'vue-property-decorator';
import PaginationComponent from '../pagination/pagination.component';
import SearchComponent from '../search/search.component';
import UserListingComponent from './user-listing/user-listing.component';

@Component({
    components: {
        UserListingComponent,
        SearchComponent,
        PaginationComponent
    }
})
export default class UserListingWrapperComponent extends VueWrapper {
    @Prop({
        default: '',
        type: Boolean
    })
    private readonly showSearch!: false;
}
