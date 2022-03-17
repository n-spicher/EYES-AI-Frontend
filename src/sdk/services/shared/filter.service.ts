import { ServiceClass } from '@/decorators';
import { FilterModel } from '@/sdk/models/common/filter.model';
import { DataOptions } from 'vuetify';

@ServiceClass()
export class FilterService {
    public Filter = new FilterModel();

    public FilterData(event: DataOptions) {
        this.Filter.PageNo = event.page;
        this.Filter.PageSize = event.itemsPerPage;
        this.Filter.SortBy = event.sortBy.length ? event.sortBy[0] : null;
        this.Filter.SortDesc = event.sortDesc.length
            ? event.sortDesc[0]
            : false;
    }
}
