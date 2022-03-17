import { subDays } from 'date-fns';
import { ServiceClass } from '@/decorators';

export interface CookiesOption {
    expires?: Date;
    path?: string;
    domain?: string;
    secure?: boolean;
}
export interface Cookies {
    get: (key: string) => string | null;
    set: (key: string, value: any, option?: CookiesOption) => void;
    remove: (key: string) => void;
}

@ServiceClass()
export class CookieBrowser implements Cookies {
    public get(key: string): string | null {
        const value = '; ' + document.cookie;
        const parts = value.split('; ' + key + '=');
        if (parts.length >= 2) {
            return decodeURIComponent(parts.pop()!.split(';').shift()!);
        } else {
            return null;
        }
    }
    public set(key: string, value: any, option?: CookiesOption | undefined) {
        value = encodeURIComponent(value);
        document.cookie =
            key + '=' + value + ';expires=' + (option?.expires?.toUTCString() ?? 2144029104299) + ';path=/';
    }
    public remove(key: string): void {
        document.cookie = key + '=;expires=' + subDays(Date.now(), 1).toUTCString() + ';path=/';
    }
}
