import ThemeWrapper from '../Theme/theme.wrapper';
import {Subscription} from 'rxjs';
import {CoreService} from '@/services/core.service';
import {AlertService, ComponentService, ConfirmService, LoaderService, UserSession} from '@/sdk';
import {SdkConfig} from '@/sdk/sdk.config';
import {LibrariesService} from '@/services/libraries.service';
import { FilterModel } from '@/sdk/models/common/filter.model';

export default abstract class VueWrapper extends ThemeWrapper {
    // Properties
    private Subscriptions: Array<Subscription> = [];

    // Getters and Setters
    set AddSubscription$(subscription: Subscription) {
        this.Subscriptions.push(subscription);
    }

    // Services
    protected CoreSrv = new CoreService();
    protected ConfirmSrv = new ConfirmService();
    protected AlertSrv = new AlertService();
    protected ComponentSrv = new ComponentService();
    protected LoaderSrv = new LoaderService();
    protected UserSession = new UserSession();
    protected LibrariesServie = new LibrariesService();
    protected FilterModel = new FilterModel()

    

    public get ApiUrl() {
        return SdkConfig.ApiPath;
    }
    public get ApiBaseUrl() {
        return SdkConfig.ApiBaseUrl;
    }

    /**
     * Unsubscribes from all the subscriptions
     * (*used in `beforeDestroy` hook of Vue Components)*.
     */
    public unsubscribeSubscriptions() {
        for (const subscription of this.Subscriptions) {
            if (subscription) {
                try {
                    subscription.unsubscribe();
                } catch (err) {
                    alert();
                    console.log(new Error(err));
                }
            }
        }
        if (this.Subscriptions.length > 0) {
            this.Subscriptions.splice(0, this.Subscriptions.length);
        }
    }

    public beforeDestroy() {
        this.unsubscribeSubscriptions();
    }
}
