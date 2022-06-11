export class CategoryItemSynonymModel {
    public Id: number | null = null;
    public Name: string | null = null;

    public CategoryItemId: number | null = null;

    constructor(data?: Partial<CategoryItemSynonymModel>) {
        Object.assign(this, data);
    }
}
