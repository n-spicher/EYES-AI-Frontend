import VueWrapper from '@/components/core/Vue/vue.wrapper';
import {AccountsApi, UsersModel} from '@/sdk';
import ChangeRoleDialogComponent from '@/views/shared/change-role-dialog/change-role-dialog.component';
import {Component} from 'vue-property-decorator';
import AddUserDialogComponent from './add-user-dialog/add-user-dialog.component';

@Component({
    components: {
        ChangeRoleDialogComponent,
        AddUserDialogComponent
    }
})
export default class ManageUsersComponent extends VueWrapper {
    public $refs!: {
        changeRoleDialogRef: ChangeRoleDialogComponent;
    };

    public users: Array<UsersModel> = [];

    public selectedUser: UsersModel | null = null;

    public mounted() {
        this.loadUsers();
    }

    loadUsers() {
        new AccountsApi().GetAllUsers().subscribe(users => {
            this.users = users.Data ?? [];
        });
    }

    public loadAgain() {
        this.loadUsers();
    }

    addUser() {
        this.CoreSrv.OpenModal('add-user-dialog');
    }

    ChangeRole(user: UsersModel) {
        this.selectedUser = user;
        this.$refs.changeRoleDialogRef.Open();
    }

    saveRole(role: string) {
        new AccountsApi().ChangeRole(this.selectedUser?.Id!, role).subscribe(
            res => {
                if (res.Status) {
                    this.AlertSrv.show('success', 'Role has been assigned successfully!');
                    this.$refs.changeRoleDialogRef.Close();
                    this.selectedUser = null;
                    this.loadUsers();
                }
            },
            err => {
                this.AlertSrv.show('error', 'Unable to change role. Please try again later!');
            }
        );
    }
}
