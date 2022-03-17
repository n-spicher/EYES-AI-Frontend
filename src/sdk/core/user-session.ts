import {SessionModel} from '../models/authentication/session.model';
import {CookieBrowser, Cookies} from './cookie-browser';
import {ServiceClass} from '../../decorators';
import {BehaviorSubject} from 'rxjs';
import {parseJwt} from '@/globals';
import {JwtPayloadModel} from '..';

@ServiceClass()
export class UserSession {
    public _session = new BehaviorSubject<SessionModel | null>(null);

    private Cookie: Cookies = new CookieBrowser();

    get Session() {
        return this._session.value;
    }

    set Session(session: SessionModel | null) {
        this._session.next(session);
    }

    constructor() {
        this.fetchCookies();
        if (this.Session?.JwtToken) {
            console.log('decoded token: ', parseJwt(this.Session?.JwtToken!));
        }
    }

    public fetchCookies() {
        this._session.next(
            new SessionModel({
                Email: this.load('Email'),
                Expiry: this.load('Expiry'),
                FirstName: this.load('FirstName'),
                LastName: this.load('LastName'),
                JwtToken: this.load('JwtToken'),
                RememberMe: this.load('RememberMe'),
                Role: this.load('Role'),
                UserId: this.load('UserId'),
                UserName: this.load('UserName')
            })
        );
    }

    public get isUserAuthenticated() {
        if (!this.Session?.JwtToken || !this.Session.UserId) {
            this.clear();
            return false;
        }

        const jwtData = parseJwt<JwtPayloadModel>(this.Session.JwtToken);

        if (!jwtData.exp) {
            this.clear();
            return false;
        }

        //  - 10 * 60 * 1000
        if (new Date().valueOf() >= jwtData.exp * 1000) {
            this.clear();
            return false;
        }

        return true;
    }

    public get isTokenExpired() {
        return !this.isUserAuthenticated;
    }

    public save() {
        if (this.Session) {
            for (const item of Object.entries(this.Session)) {
                this.persist(item[0], item[1], new Date(this.Session!.Expiry!));
            }
            return true;
        }
        return false;
    }

    private load(key: string): any {
        if (this.Cookie) {
            return this.Cookie.get(key);
        }
    }
    private persist(key: string, value: any, expires: Date) {
        this.Cookie.set(key, typeof value === 'object' ? JSON.stringify(value) : value, {expires});
    }

    public clear(): void {
        if (this._session.value) {
            Object.keys(this._session.value).forEach((key: string) => this.Cookie.remove(key));
        }
        this._session.next(null);
    }
}
