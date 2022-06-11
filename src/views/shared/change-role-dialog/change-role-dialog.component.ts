import VueWrapper from '@/components/core/Vue/vue.wrapper';
import {CategoryCodeModel, CategoryItemModel, CategoryModel, UsersModel} from '@/sdk';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class ChangeRoleDialogComponent extends VueWrapper {
    public name: string = 'change-role-dialog';

    @Prop({
        type: Object,
        default: null
    })
    public user!: UsersModel;

    public roles: Array<string> = ['Admin', 'User'];

    public role: string | null = null;

    public mounted() {}

    public reset() {
        this.role = null;
    }

    public Open() {
        this.CoreSrv.OpenModal(this.name);
        this.role = this.user?.Role;
    }

    public Close() {
        this.CoreSrv.CloseModal(this.name);
    }
}
