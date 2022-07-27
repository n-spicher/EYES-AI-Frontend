import VueWrapper from '@/components/core/Vue/vue.wrapper';
import {CategoryItemModel, CategoryModel} from '@/sdk';
import {Component, Prop, PropSync} from 'vue-property-decorator';

@Component
export default class AddEquipmentDialogComponent extends VueWrapper {
    public name: string = 'add-equipment-dialog';

    // public category: CategoryModel = new CategoryModel();

    // @PropSync('category', {
    //     type: Object
    // })
    public categoryO: CategoryModel = new CategoryModel();

    public get getCategory(): CategoryModel {
        return this.categoryO ?? new CategoryModel();
    }

    // public CategoryItemObj: CategoryItemModel = new CategoryItemModel();

    @PropSync('category', {
        type: Object
    })
    public categorySync!: CategoryModel;

    public get categoryObj() {
        if (this.categorySync) {
            this.categoryO = this.categorySync;
        }
        if (this.categoryO == null) {
            this.categoryO = new CategoryModel();
        }

        return this.categoryO;
    }

    public mounted() {}

    public reset() {
        this.categoryO = new CategoryModel();
    }

    public Close() {
        this.CoreSrv.CloseModal(this.name);
    }
}
