import { ClaimsModel } from './claims.model';

export class LoginModel {
    public Email: string | null = null;
    public Password: string | null = null;
    public RememberMe: boolean | null = false;

    constructor(data?: Partial<LoginModel>) {
        Object.assign(this, data);
    }
}

export class LoginResponseModel<T> {
    Status: string | null = null;
    Message: string | null = null;
    StatusCode: string | null = null;
    Data: T | null = null;

    constructor(data?: Partial<LoginResponseModel<T>>) {
        Object.assign(this, data);
    }
}
