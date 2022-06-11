export class UsersModel {
    public Id?: string | null = null;
    public FirstName: string | null = null;
    public LastName: string | null = null;

    public Role: string | null = null;

    public Email: string | null = null;

    constructor(data?: Partial<UsersModel>) {
        Object.assign(this, data);
    }
}
export class StatusModel {
    public Id?: string | null = null;
    public status: boolean | null = null;

    constructor(data?: Partial<StatusModel>) {
        Object.assign(this, data);
    }
}
export class ChangeUserPasswordModel {
    public Id?: string | null = null;
    public NewPassword?: string | null = null;
    public ConfirmPassword?: string | null = null;

    constructor(data?: Partial<ChangeUserPasswordModel>) {
        Object.assign(this, data);
    }
}
export class RoleUsersModel {
    public Id?: string | null = null;
    public Name: string | null = null;

    constructor(data?: Partial<RoleUsersModel>) {
        Object.assign(this, data);
    }
}

export enum Roles {
    Admin = 'Admin',
    User = 'User'
}
