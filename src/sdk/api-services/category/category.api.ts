import {ServiceClass} from '@/decorators';
import {CategoryCodeModel, CategoryItemSynonymModel} from '@/sdk/models';
import {CategoryItemModel} from '@/sdk/models/category-item/category-item.model';
import {CategoryModel} from '@/sdk/models/category/category.model';
import {BaseApi} from '..';

@ServiceClass()
export class CategoryApi extends BaseApi {
    public GetCategoriesWithItems() {
        return this.GET_Request<Array<CategoryModel>>(`${this.ApiUrl}/Category/GetCategories`);
    }

    public AddCategoryItem(data: CategoryItemModel) {
        return this.POST_Request<CategoryItemModel>(`${this.ApiUrl}/Category/AddCategoryItem`, data);
    }

    public UpdateCategoryItem(Id: number, data: CategoryItemModel) {
        return this.POST_Request<CategoryItemModel>(`${this.ApiUrl}/Category/UpdateCategoryItem/${Id}`, data);
    }

    public AddCategoryCode(data: CategoryCodeModel) {
        return this.POST_Request<CategoryCodeModel>(`${this.ApiUrl}/Category/AddCategoryCode`, data);
    }

    public AddCategory(name: string) {
        return this.POST_Request<CategoryModel>(`${this.ApiUrl}/Category/AddCategory`, {Name: name});
    }

    public UpdateCategory(id: number, name: string) {
        return this.POST_Request<CategoryModel>(`${this.ApiUrl}/Category/UpdateCategory`, {Id: id, Name: name});
    }

    public AddCategoryItemSynonyms(items: Array<CategoryItemSynonymModel>) {
        return this.POST_Request<CategoryModel>(`${this.ApiUrl}/Category/AddCategoryItemSynonyms`, items);
    }

    public DeleteCategoryItem(id: number) {
        return this.GET_Request<{Status: boolean}>(`${this.ApiUrl}/Category/DeleteCategoryItem/${id}`);
    }

    public DeleteCategoryItemSynonym(id: number) {
        return this.GET_Request<{Status: boolean}>(`${this.ApiUrl}/Category/DeleteCategoryItemSynonym/${id}`);
    }

    public DeleteCategoryCode(id: number) {
        return this.GET_Request<{Status: boolean}>(`${this.ApiUrl}/Category/DeleteCategoryCode/${id}`);
    }

    public DeleteCategory(id: number) {
        return this.GET_Request<{Status: boolean}>(`${this.ApiUrl}/Category/DeleteCategory/${id}`);
    }
}
