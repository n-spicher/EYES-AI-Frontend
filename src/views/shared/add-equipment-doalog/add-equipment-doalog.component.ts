import VueWrapper from '@/components/core/Vue/vue.wrapper';
import {CategoryItemModel, CategoryModel} from '@/sdk';
import {Component, Prop, PropSync} from 'vue-property-decorator';

@Component
export default class AddEquipmentDialogComponent extends VueWrapper {
    public name: string = 'add-equipment-dialog';

    // public category: CategoryModel = new CategoryModel();

    @PropSync('category', {
        type: Object
    })
    public _category!: CategoryModel;

    public get getCategory(): CategoryModel {
        return this._category ?? new CategoryModel();
    }

    public mounted() {}

    public reset() {
        this._category = new CategoryModel();
    }

    public Close() {
        this.CoreSrv.CloseModal(this.name);
    }
}
