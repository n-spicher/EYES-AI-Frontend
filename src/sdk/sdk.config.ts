export class SdkConfig {
    private static _ApiBaseUrl = process.env.VUE_APP_API_BASE_URL;

    static get ApiPath() {
        return this._ApiBaseUrl + '/api';
    }
    static get ApiBaseUrl() {
        return this._ApiBaseUrl;
    }
    static set ApiBaseUrl(path: string) {
        this._ApiBaseUrl = path;
    }
}
