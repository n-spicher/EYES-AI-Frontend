export class ApiResponseModel<T> {
    public Status: boolean = false;
    public Message: string | null = null;
    public Data: T | null = null;

    constructor(data?: Partial<ApiResponseModel<T>>) {
        Object.assign(this, data);
    }
}
