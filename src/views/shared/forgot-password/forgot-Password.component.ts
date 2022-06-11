import VueWrapper from '@/components/core/Vue/vue.wrapper';
import {LoginModel, ResetPasswordModel} from '@/sdk';
import {LoaderService} from '@/sdk/services';
import {Component} from 'vue-property-decorator';
import {AlertService} from '@/sdk';
import BaseFormComponent from '@/components/vuetify/Form/base-form';

@Component
export default class ForgotPasswordComponent extends VueWrapper {
    $refs!: {
        baseform: BaseFormComponent;
    };
    public resetPassword = new ResetPasswordModel();

    public ResetPassword() {
        new LoaderService().showFullScreenLoader();

        // new AccountsApi()
        //     .ResetPassword(this.resetPassword)
        //     .subscribe(({Data, Status, Message}) => {
        //         if (Data && Status) {
        //             this.CoreSrv.dialog.forgetPassword = false;
        //             new AlertService().show('success', `${Message}!` ?? '');
        //             this.resetPassword = new ResetPasswordModel();
        //             this.emptyForm();
        //         } else {
        //             new AlertService().show('error', Message ?? '');
        //         }
        //     })
        //     .add(() => {
        //         new LoaderService().hideFullScreenLoader();
        //     });
    }

    get notShowable() {
        return this.$vuetify.breakpoint.name == 'xs';
    }
    public emptyForm() {
        this.$nextTick(() => {
            this.$refs.baseform.reset();
        });
    }

    public Cancel() {
        this.CoreSrv.dialog.loginsignupPage = false;
        // this.emptyForm();
        // this.login = new LoginModel();
        // this.loginError = '';
    }
}
