import {CategoryCodeModel} from '..';
import {CategoryItemModel} from '../category-item/category-item.model';

export class CategoryModel {
    public Id: number | null = null;
    public Name: string | null = null;

    public active: boolean = false;

    public CategoryItems: Array<CategoryItemModel> = [];
    public CategoryCodes: Array<CategoryCodeModel> = [];

    constructor(data?: Partial<CategoryModel>) {
        Object.assign(this, data);
    }
}
