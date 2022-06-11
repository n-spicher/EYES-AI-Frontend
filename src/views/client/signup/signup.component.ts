import VueWrapper from '@/components/core/Vue/vue.wrapper';
import {Component} from 'vue-property-decorator';
import {AccountsApi, SignupModel} from '@/sdk';
import {AlertService, LoaderService} from '@/sdk/services';

import {CoreService} from '@/services/core.service';
import BaseFormComponent from '@/components/vuetify/Form/base-form';

@Component
export default class SignupComponent extends VueWrapper {
    // Properties

    public mailerLite: boolean = true;

    public showPassword = {
        pass: false,
        confirmPass: false
    };

    public Signup = new SignupModel();
    public CoreSrv = new CoreService();
    $refs!: {
        baseform: BaseFormComponent;
    };
    public SignUp() {
        // new SignupService().Signup.next(this.Signup);
        new LoaderService().showFullScreenLoader();
        new AccountsApi()
            .signup(this.Signup)
            .subscribe(
                ({Data, Message, Status}) => {
                    if (Data && Status) {
                        this.CoreSrv.dialog.loginsignupPage = false;
                        this.CoreSrv.dialog.loginsignup = false;
                        new AlertService().show('success', Message ?? '');
                        this.emptyForm();

                        this.AlertSrv.show('success', 'Account has been created successfully!').then(ok => {
                            this.$router.push({name: 'Login'});
                        });
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
    public cancelSignup() {
        this.CoreSrv.dialog.loginsignup = false;
        this.CoreSrv.dialog.loginsignupPage = false;
    }
    public emptyForm() {
        this.$nextTick(() => {
            this.$refs.baseform.reset();
        });
    }

    public cancel() {
        (this.$refs.baseform as any).reset();
    }

    public Step = 0;

    public mounted() {
        this.Step++;
    }
    get notShowable() {
        return this.$vuetify.breakpoint.name == 'xs';
    }
    public a: number = 60;
    public Start() {
        while (this.a === 1) {
            setTimeout(() => {
                this.a = this.a - 1;
            }, 1000);
        }
    }
}
