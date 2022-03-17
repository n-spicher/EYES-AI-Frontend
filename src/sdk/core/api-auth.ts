import { LoginResponseModel, SessionModel } from '../models';
import { CookieBrowser, Cookies } from './cookie-browser';
import { ServiceClass } from '@/decorators';
import { BehaviorSubject } from 'rxjs';

@ServiceClass()
export class ApiAuth {
    public UserSession = new BehaviorSubject<SessionModel | null>(null);

    private Prefix: string = '$MhParks$';
    private Cookie: Cookies = new CookieBrowser();

    get SessionValue() {
        return this.UserSession.value!;
    }
    set SessionValue(value: SessionModel) {
        this.UserSession.next(value);
        this.save();
    }

    constructor() {
        this.fetchCookies();
    }

    public fetchCookies() {
        this.UserSession.next(
            new SessionModel({
                JwtToken: this.load('Jwt'),
                UserId: this.load('UserId'),
                RememberMe: this.load('RememberMe'),

                Expiry: this.load('Expiry'),
                SessionLogId: this.load('SessionLogId')
            })
        );
    }
    public save() {
        if (this.SessionValue) {
            for (const item of Object.entries(this.SessionValue)) {
                this.persist(
                    item[0],
                    item[1],
                    new Date(this.SessionValue!.Expiry!)
                );
            }
            return true;
        }
        return false;
    }
    private load(Key: string): any {
        if (this.Cookie) {
            return this.Cookie.get(`${this.Prefix}${Key}`);
        }
    }
    public clear(): void {
        if (this.UserSession.value) {
            Object.keys(this.UserSession.value).forEach((key: string) =>
                this.Cookie.remove(`${this.Prefix}${key}`)
            );
        }
        this.UserSession.next(null);
    }
    private persist(key: string, value: any, expires: Date) {
        this.Cookie.set(
            `${this.Prefix}${key}`,
            typeof value === 'object' ? JSON.stringify(value) : value,
            { expires }
        );
    }
}
