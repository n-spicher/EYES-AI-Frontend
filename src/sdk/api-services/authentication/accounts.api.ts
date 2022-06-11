import {ServiceClass} from '@/decorators';
import {ApiResponseModel, ChangePasswordModel, LoginModel, LoginResponseModel, SessionModel, SignupModel, UsersModel} from '@/sdk/models';

import {ResetPasswordModel} from '@/sdk/models/authentication/reset-password.model';
import {SdkConfig} from '@/sdk/sdk.config';
import {map} from 'rxjs/operators';
import {BaseApi} from '../base.api';

@ServiceClass()
export class AccountsApi extends BaseApi {
    public Login(loginData: LoginModel) {
        return this.POST_Request<ApiResponseModel<SessionModel>>(`${this.ApiUrl}/Account/login`, loginData);
    }

    public Logout() {
        return this.GET_Request<void>(`${this.ApiUrl}/Account/Logout`);
    }

    public GetAllUsers() {
        return this.GET_Request<ApiResponseModel<Array<UsersModel>>>(`${this.ApiUrl}/Account/GetAllUsers`);
    }
    public ChangeRole(userId: string, role: string) {
        return this.GET_Request<ApiResponseModel<Array<UsersModel>>>(`${this.ApiUrl}/Account/ChangeRole/${userId}?role=${role}`);
    }

    public signup(signUpData: SignupModel) {
        return this.POST_Request<ApiResponseModel<SessionModel>>(`${this.ApiUrl}/Account/Signup`, signUpData);
    }

    public ChangePassword(password: ChangePasswordModel) {
        return this.POST_Request<ApiResponseModel<void>>(`${this.ApiUrl}/Account/ChangePassword`, password);
    }

    public Update(data: UsersModel) {
        return this.POST_Request<ApiResponseModel<UsersModel>>(`${this.ApiUrl}/Account/Update`, data);
    }

    public sendLink(email: string) {
        return this.POST_Request(`${this.ApiUrl}/Account/SendLink`, {email});
    }

    public ResetPassword(resetPass: ResetPasswordModel) {
        return this.POST_Request<ResetPasswordModel>(`${this.ApiUrl}/Account/ResetPassword`, resetPass);
    }
}
