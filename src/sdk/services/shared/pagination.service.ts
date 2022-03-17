import VueWrapper from '@/components/core/Vue/vue.wrapper';
import {ServiceClass} from '@/decorators';
import {BehaviorSubject} from 'rxjs';

@ServiceClass()
export class PaginationService {
    public IsRecordDeleted = false;
    public CurrentPage = new BehaviorSubject(1);
    public PerPage = 6;
    public TotalVisible = 6;
    public TotalRecord = 0;
    private _TotalPages = 0;

    get TotalPages() {
        return this._TotalPages;
    }
    set TotalPages(records: number) {
        this.TotalRecord = records;
        records = Math.ceil(records / this.PerPage);
        this._TotalPages = records;
        if (this.IsRecordDeleted && this.CurrentPage.value > this.TotalPages && this.TotalPages > 0) {
            this.CurrentPage.next(records);
        }
        this.IsRecordDeleted = false;
    }
}
