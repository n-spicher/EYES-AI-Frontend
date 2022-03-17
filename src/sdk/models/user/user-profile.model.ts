export class UserProfileModel {
    public Email: string | null = null;
    public FullName: string | null = null;
    public PhoneNo: string | null = null;
    public ProfileImageUrl: string | null = null;
    public Role: string | null = null;

    public UserId: string | null = null;
    public UserName: string | null = null;

    constructor(data?: Partial<UserProfileModel>) {
        Object.assign(this, data);
    }
}
