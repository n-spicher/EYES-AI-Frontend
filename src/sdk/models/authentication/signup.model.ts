export class SignupModel {
    public FirstName: string | null = null;
    public LastName: string | null = null;
    public Email: string | null = null;
    public Password: string | null = null;
    public ConfirmPassword: string | null = null;

    constructor(data?: Partial<SignupModel>) {
        Object.assign(this, data);
    }
}
