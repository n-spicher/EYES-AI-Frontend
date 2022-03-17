import {ServiceClass} from '@/decorators';
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

    public DeleteCategoryItem(id: number) {
        return this.DELETE_Request<{Status: boolean}>(`${this.ApiUrl}/Category/DeleteCategoryItem/${id}`);
    }
}
