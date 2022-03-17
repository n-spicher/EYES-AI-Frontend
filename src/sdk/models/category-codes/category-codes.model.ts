export class CategoryCodeModel {
    public Id: number | null = null;
    public Code: string | null = null;

    public CategoryId: number | null = null;

    constructor(data?: Partial<CategoryCodeModel>) {
        Object.assign(this, data);
    }
}
