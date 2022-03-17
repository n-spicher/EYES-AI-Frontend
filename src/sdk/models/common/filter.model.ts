export class FilterModel {
    public PageNo: number | null = 1;
    public PageSize: number | null = 30;
    public Query: string | null = null;
    public SortBy: string | null = null;
    public SortDesc: boolean | null = null;
    public Status: boolean | string | null = null;

    constructor(data?: Partial<FilterModel>) {
        Object.assign(this, data);
    }
}
