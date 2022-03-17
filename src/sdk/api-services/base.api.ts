import axios, {AxiosError, AxiosRequestConfig, AxiosResponse, CancelTokenSource} from 'axios';
import {Observable, throwError, Subscriber, from} from 'rxjs';
import {catchError, map, delay} from 'rxjs/operators';
import {SdkConfig} from '../sdk.config';
import {AnyObject} from '@/globals';
import {ApiResponseModel} from '../models';
import {ApiAuth, UserSession} from '../core';
import {FilterModel} from '../models/common/filter.model';
import {FilterService} from '../services/shared/filter.service';

import {AlertService} from '..';

import router from '@/router';

export abstract class BaseApi {
    protected ApiUrl = SdkConfig.ApiPath;
    protected FilterSrv = new FilterService();

    private cancelToken: CancelTokenSource | null = null;

    constructor() {
        this.cancelToken = axios.CancelToken.source();
    }

    private request(method: AxiosRequestConfig['method'], url: string, postBody: AnyObject = {}): Observable<AxiosResponse> {
        const headers: AxiosRequestConfig['headers'] = {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization: this.authorize()
        };
        const options: AxiosRequestConfig = {
            method,
            url,
            headers,
            data: postBody
        };
        if (this.cancelToken) {
            options.cancelToken = this.cancelToken.token;
        }

        return new Observable((observer: Subscriber<any>) => {
            axios(options)
                .then(res => {
                    observer.next(res);
                    observer.complete();
                })
                .catch(err => {
                    observer.error(err);
                    observer.complete();
                });
        }).pipe(
            map(res => res),
            catchError(e => this.handleError(e))
        );
    }

    protected fileRequest(method: AxiosRequestConfig['method'], url: string, data: AnyObject = {}): Observable<AxiosResponse> {
        // Headers to be sent
        const headers: AxiosRequestConfig['headers'] = {
            'Content-Type': 'multipart/form-data',
            Authorization: this.authorize()
        };
        const options: AxiosRequestConfig = {
            method,
            url,
            headers,
            data
        };

        return new Observable((observer: Subscriber<any>) => {
            axios(options)
                .then(res => {
                    observer.next(res);
                    observer.complete();
                })
                .catch(err => {
                    observer.error(err);
                    observer.complete();
                });
        }).pipe(
            map(res => res),
            catchError(e => this.handleError(e))
        );
        // return from(axios(options)).pipe(
        //     delay(0),
        //     map(Res => Res),
        //     catchError(e => this.handleError(e))
        // );
    }

    protected downloadRequest(Url: string): Observable<AxiosResponse> {
        const Options: AxiosRequestConfig = {
            method: 'GET',
            url: Url,
            responseType: 'blob'
        };
        return from(axios(Options)).pipe(
            delay(0),
            map(Res => Res),
            catchError(e => this.handleError(e))
        );
    }

    private authorize() {
        const SessionValue = new UserSession().Session;

        return `Bearer ${SessionValue ? SessionValue.JwtToken : ''}`;
    }

    private handleError(error: AxiosError) {
        if (error.response?.status == 451) {
            new UserSession().clear()!;
            new AlertService().show('error', "We can't proceed a request. You Sign in from another device. ").then(() => {
                if (router.currentRoute.name !== 'Home') {
                    router.push({name: 'Home'});
                }
            });
        }
        if (error.response?.status == 401) {
            this.cancelToken?.cancel();
            // new AlertService().show('info', 'You session is expired. Please login again to continue.').then(() => {});
            if (router.currentRoute.name !== 'Home') {
                router.push({name: 'Home', query: {redirect_reason: 'UNAUTHORIZIED'}});
            }
        }

        return throwError(error.response!.data || 'Internal Server Error');
    }

    // Requests
    protected GET_Request<T>(url: string): Observable<T> {
        return this.request('GET', url).pipe(map(res => res.data));
    }
    protected POST_Request<T>(url: string, postBody: AnyObject): Observable<T> {
        return this.request('POST', url, postBody).pipe(map(res => res.data));
    }

    protected PATCH_Request<T>(url: string, postBody: AnyObject): Observable<ApiResponseModel<T>> {
        return this.request('PATCH', url, postBody).pipe(map(res => res.data));
    }
    protected PUT_Request<T>(url: string, postBody: AnyObject): Observable<ApiResponseModel<T>> {
        return this.request('PUT', url, postBody).pipe(map(res => res.data));
    }
    protected DELETE_Request<T>(url: string): Observable<ApiResponseModel<T>> {
        return this.request('DELETE', url).pipe(map(res => res.data));
    }
    protected POST_FileRequest<T>(url: string, postBody: AnyObject): Observable<T> {
        return this.fileRequest('POST', url, postBody).pipe(map(res => res.data));
    }
}
