import VueWrapper from '@/components/core/Vue/vue.wrapper';
import {CategoryItemModel, CategoryModel} from '@/sdk';

import {Component, Prop, PropSync} from 'vue-property-decorator';

@Component
export default class AddKeywordDialogComponent extends VueWrapper {
    public name: string = 'add-keyword-dialog';

    // public CategoryItem: CategoryItemModel = new CategoryItemModel();

    // public algoliaSrv: AlgoliaSearchSearvice = new AlgoliaSearchSearvice();

    @Prop({
        type: Object,
        default: null
    })
    public category!: CategoryModel;

    public CategoryItemObj: CategoryItemModel = new CategoryItemModel();

    @PropSync('CategoryItem', {
        type: Object,
        default: new CategoryItemModel()
    })
    public CategoryItemProp!: CategoryItemModel;

    // public set categoryItemData(obj: CategoryItemModel | null) {
    //     console.log(this, obj);
    //     if (obj == null) {
    //         this.CategoryItemObj = new CategoryItemModel();
    //     } else {
    //         this.CategoryItemObj = obj;
    //     }
    // }
    public get categoryItemData(): CategoryItemModel {
        if (this.CategoryItemProp) {
            this.CategoryItemObj = this.CategoryItemProp;
        }
        if (!this.CategoryItemObj) {
            this.CategoryItemObj = new CategoryItemModel();
        }
        return this.CategoryItemObj;
    }

    public mounted() {
        // this.algoliaSrv.init();
    }

    public reset() {
        this.CategoryItemObj = new CategoryItemModel();
    }

    public keywordChange(ev: any) {
        // console.log(ev);
        // if ((this.CategoryItem.Name?.length ?? 0) >= 3) {
        //     console.log(this.algoliaSrv.getSynonym(this.CategoryItem.Name!));
        // }
    }

    public Close() {
        this.CoreSrv.CloseModal(this.name);
    }
}
