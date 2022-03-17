export class KeyValueModel {
    public Key: string | null = null;
    public Value: string | null = null;

    constructor(data?: Partial<KeyValueModel>) {
        Object.assign(this, data);
    }
}
