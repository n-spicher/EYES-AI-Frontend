import VueWrapper from '@/components/core/Vue/vue.wrapper';
import {AccountsApi, SessionModel, UserSession} from '@/sdk';
import {AppBarService} from '@/services/app-bar.service';
import {Component} from 'vue-property-decorator';

@Component
export default class MainAppBarComponent extends VueWrapper {
    public UserSessionSrv: UserSession = new UserSession();

    public User = new SessionModel();

    public submitClick() {
        new AppBarService().submitBtn.next(true);
    }

    public mounted() {
        this.UserSessionSrv._session.subscribe(s => {
            this.User = new SessionModel(s ?? {});
        });
    }

    public logout() {
        new AccountsApi().Logout().subscribe();
        new UserSession().clear();
        // this.$router.push({name: 'Home'});
        window.location.href = '/login';
    }
}
