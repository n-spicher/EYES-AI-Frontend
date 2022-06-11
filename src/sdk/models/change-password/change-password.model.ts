export class ChangePasswordModel {
    public Id: string | null = null;
    public OldPassword: string | null = null;
    public NewPassword: string | null = null;
    public ConfirmPassword: string | null = null;

    constructor(data?: Partial<ChangePasswordModel>) {
        Object.assign(this, data);
    }
}
