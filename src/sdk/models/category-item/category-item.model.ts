export class CategoryItemModel {
    public Id: number | null = null;
    public Name: string | null = null;

    public CategoryId: number | null = null;

    constructor(data?: Partial<CategoryItemModel>) {
        Object.assign(this, data);
    }
}
