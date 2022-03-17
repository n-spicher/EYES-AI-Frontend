import {ClaimsModel} from '..';
import {UserProfileModel} from '../user/user-profile.model';

export class SessionModel {
    public Email: string | null = null;
    public Expiry: string | null = null;
    public FirstName: string | null = null;
    public LastName: string | null = null;
    public JwtToken: string | null = null;
    public RememberMe = false;
    public Role: string | null = null;
    public UserId: string | null = null;
    public UserName: string | null = null;

    public SessionLogId: string | null = null;

    constructor(data?: Partial<SessionModel>) {
        Object.assign(this, data);
    }
}
