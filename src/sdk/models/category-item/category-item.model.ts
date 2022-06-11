import {CategoryItemSynonymModel} from '../category-item-synonym/category-item-synonym.model';

export class CategoryItemModel {
    public Id: number | null = null;
    public Name: string | null = null;
    public Note: string | null = null;

    public active: boolean = false;

    public CategoryId: number | null = null;

    public CategoryItemSynonyms: Array<CategoryItemSynonymModel> | null = null;

    constructor(data?: Partial<CategoryItemModel>) {
        Object.assign(this, data);
    }
}
