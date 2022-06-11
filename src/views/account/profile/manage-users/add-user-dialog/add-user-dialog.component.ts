import VueWrapper from '@/components/core/Vue/vue.wrapper';
import BaseFormComponent from '@/components/vuetify/Form/base-form';
import {AccountsApi, SignupModel} from '@/sdk';
import {Component} from 'vue-property-decorator';

@Component
export default class AddUserDialogComponent extends VueWrapper {
    public readonly name = 'add-user-dialog';

    public showPassword = {
        pass: false,
        confirmPass: false
    };

    public Signup = new SignupModel();
    $refs!: {
        baseform: BaseFormComponent;
    };

    public mounted() {
        //
    }

    get isInvalid() {
        return this.$refs.baseform?.isInvalid || true;
    }

    public async validate() {
        return await this.$refs.baseform?.validate();
    }

    public async SignUp() {
        if (!(await this.validate())) {
            this.AlertSrv.show('error', 'Please provide values for all required fields.');
            return;
        }

        // new SignupService().Signup.next(this.Signup);
        this.LoaderSrv.showFullScreenLoader();
        new AccountsApi()
            .signup(this.Signup)
            .subscribe(
                ({Data, Message, Status}) => {
                    if (Data && Status) {
                        this.AlertSrv.show('success', Message ?? '');
                        this.emptyForm();

                        this.AlertSrv.show('success', 'Account has been created successfully!').then(ok => {
                            // this.$router.push({name: 'Login'});
                        });

                        this.$emit('userCreated');
                        this.cancel();
                    } else {
                        this.AlertSrv.show('error', Message ?? '');
                    }
                },
                ({Message}) => {
                    this.AlertSrv.show('error', Message);
                }
            )
            .add(() => {
                this.LoaderSrv.hideFullScreenLoader();
            });
    }

    public emptyForm() {
        this.$nextTick(() => {
            this.$refs.baseform.reset();
        });
    }

    public cancel() {
        (this.$refs.baseform as any).reset();
        this.CoreSrv.CloseModal(this.name);
    }
}
