import VueWrapper from '@/components/core/Vue/vue.wrapper';
import BaseFormComponent from '@/components/vuetify/Form/base-form';
import {AccountsApi, LoginModel, ResetPasswordModel, UserSession} from '@/sdk';
import ForgotPasswordComponent from '@/views/shared/forgot-password/forgot-Password.component';
import {Component} from 'vue-property-decorator';

@Component({
    components: {
        ForgotPasswordComponent
    }
})
export default class LoginComponent extends VueWrapper {
    public login = new LoginModel();
    public resetPassword = new ResetPasswordModel();
    $refs!: {
        baseform: BaseFormComponent;
    };

    public loginError: string = '';
    public show1: boolean = false;

    private RelayState: string | null = null;
    private SAMLRequest: string | null = null;

    private support_login: string | null = null;

    public Login() {
        this.LoaderSrv.showFullScreenLoader('Logging in...');

        new AccountsApi()
            .Login(this.login)
            .subscribe(
                ({Data, Message, Status}) => {
                    if (Data && Status) {
                        new UserSession()._session.next(Data);
                        new UserSession().save();

                        // this.$router.push('/user/dashboard');
                        window.location.href = '/backend';
                    } else {
                        this.loginError = Message!;
                    }
                },
                error => {
                    this.AlertSrv.show('error', error.message || error.Message);
                }
            )
            .add(() => {
                this.LoaderSrv.hideFullScreenLoader();
            });
    }

    get notShowable() {
        return this.$vuetify.breakpoint.name == 'xs';
    }
}
