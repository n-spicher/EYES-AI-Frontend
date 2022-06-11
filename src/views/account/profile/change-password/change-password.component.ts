import VueWrapper from '@/components/core/Vue/vue.wrapper';
import BaseFormComponent from '@/components/vuetify/Form/base-form';
import {AccountsApi, AlertService, ChangePasswordModel, LoaderService, UserSession} from '@/sdk';
import {Component} from 'vue-property-decorator';

@Component
export default class ChangePasswordComponent extends VueWrapper {
    $refs!: {
        baseform: BaseFormComponent;
    };
    public changePassword = new ChangePasswordModel();
    public showPassword = {
        old: false,
        new: false,
        confirmNew: false
    };

    public ChangePassword() {
        this.changePassword.Id = new UserSession().Session?.UserId!;
        new LoaderService().showFullScreenLoader();
        new AccountsApi()
            .ChangePassword(this.changePassword)
            .subscribe(
                ({Status, Message}) => {
                    if (!!Status) {
                        new AlertService().show('success', 'Password has been Updated Successfully!');
                        this.CoreSrv.dialog.changePassword = false;
                        this.emptyForm();
                        this.changePassword = new ChangePasswordModel();
                    } else {
                        new AlertService().show('error', Message ?? '');
                    }
                },
                ({Message}) => {
                    new AlertService().show('error', Message);
                }
            )
            .add(() => {
                new LoaderService().hideFullScreenLoader();
            });
    }

    public emptyForm() {
        this.$nextTick(() => {
            this.$refs.baseform.reset();
        });
    }
}
