export class ClaimsModel {
    public Path: string | null = null;
    public UniqueKey: string | null = null;
    constructor(data?: Partial<ClaimsModel>) {
        Object.assign(this, data);
    }
}
