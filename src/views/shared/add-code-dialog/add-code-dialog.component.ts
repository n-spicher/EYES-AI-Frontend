import VueWrapper from '@/components/core/Vue/vue.wrapper';
import {CategoryCodeModel, CategoryItemModel, CategoryModel} from '@/sdk';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class AddCodeDialogComponent extends VueWrapper {
    public name: string = 'add-category-code-dialog';

    @Prop({
        type: Object,
        default: null
    })
    public category!: CategoryModel;

    public code: CategoryCodeModel = new CategoryCodeModel();

    public mounted() {}

    public reset() {
        this.code = new CategoryCodeModel();
    }

    public Close() {
        this.CoreSrv.CloseModal(this.name);
    }
}
