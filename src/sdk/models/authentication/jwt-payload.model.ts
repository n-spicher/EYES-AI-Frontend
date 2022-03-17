export class JwtPayloadModel {
    exp: number | null = null;
    iat: number | null = null;
    nameid: string | null = null;
    nbf: number | null = null;
    role: string | null = null;
    unique_name: string | null = null;

    constructor(data?: Partial<JwtPayloadModel>) {
        Object.assign(this, data);
    }
}
