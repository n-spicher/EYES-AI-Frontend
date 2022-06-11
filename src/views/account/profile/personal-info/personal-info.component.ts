import VueWrapper from '@/components/core/Vue/vue.wrapper';
import {AccountsApi, AlertService, LoaderService, SessionModel, UserSession, UsersModel} from '@/sdk';

import {Component} from 'vue-property-decorator';
import {StencilPreview, BoundingBox, DraggableArea} from 'vue-advanced-cropper';
import {StringOrNumber} from 'vee-validate/dist/types/types';

@Component({
    components: {
        StencilPreview,
        BoundingBox,
        DraggableArea
    }
})
export default class PersonalInfoComponent extends VueWrapper {
    isEdit = false;
    public User = new UsersModel();

    public userSessionSrv: UserSession = new UserSession();

    public created() {
        this.loadUser();
    }

    public loadUser() {
        this.userSessionSrv._session.subscribe(s => {
            this.User = new UsersModel({
                Id: s?.UserId,
                FirstName: s?.FirstName,
                LastName: s?.LastName,
                Email: s?.Email
            });
        });
        // new UsersService().getById(new UserSession().Session?.UserId!);
    }

    public loadLoggedInUser() {
        // new UsersService().loadLoggedInUser(new UserSession().Session?.UserId!);
    }

    public Update() {
        new LoaderService().showFullScreenLoader();

        new AccountsApi()
            .Update(this.User)
            .subscribe(({Status, Message, Data}) => {
                if (Status) {
                    new AlertService().show('success', 'User Profile Updated Successfully!' ?? '');
                    const s = new SessionModel({
                        ...this.userSessionSrv.Session
                    });
                    if (s) {
                        s.FirstName = Data?.FirstName!;
                        s.LastName = Data?.LastName!;

                        this.userSessionSrv.Session = s;
                        this.userSessionSrv.save();
                    }
                    this.loadUser();
                    this.loadLoggedInUser();
                } else {
                    new AlertService().show('error', Message ?? '');
                }
            })
            .add(() => {
                new LoaderService().hideFullScreenLoader();
            });
    }

    isLetterOrNumber(e: any) {
        const char = String.fromCharCode(e.keyCode);
        if (/^[a-zA-Z]+$/.test(char)) return true;
        else e.preventDefault();
    }
}
