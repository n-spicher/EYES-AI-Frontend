export class ResetPasswordModel {
    public Email: string | null = null;

    constructor(data?: Partial<ResetPasswordModel>) {
        Object.assign(this, data);
    }
}
