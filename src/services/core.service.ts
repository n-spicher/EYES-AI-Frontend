import {ServiceClass} from '@/decorators';
import {BehaviorSubject} from 'rxjs';

@ServiceClass()
export class CoreService {
    private _OpenedModals: Array<string> = [];
    get getOpenedModals() {
        return this._OpenedModals;
    }
    OpenModal(val: string) {
        this._OpenedModals.push(val);
    }
    CloseModal(val: string) {
        const ind = this._OpenedModals.indexOf(val);
        if (ind >= 0) {
            this._OpenedModals.splice(ind, 1);
        }
    }

    public Drawer = {
        Mode: true,
        Mini: false,
        Width: 250,
        MobileScreen: false
    };
    public AdminDrawer = {
        Mode: true,
        Mini: false,
        Width: 250,
        MobileScreen: false
    };
    public UserDrawer = {
        Mode: true,
        Mini: false,
        Width: 250,
        MobileScreen: false
    };
    public SettingsDrawer = {
        Mode: false
    };
    public knowledgeDrawer = {
        Mode: false
    };
    public QuickLinksDrawer = {
        Mode: false
    };

    public menu = true;
    public menuMethod() {
        Object.values(this.dialog).forEach(x => {
            if (x === true) {
                this.menu = false;
            } else if (x === false) {
                this.menu = true;
            }
        });
    }
    public dialog = {
        notification: false,
        manageUser: false,
        knowledgeBase: false,
        manageCategoriesSetting: false,
        editManageCategoriesSetting: false,
        userAdsType: false,
        editUserAdsType: false,
        userNotificationType: false,
        editUserNotificationType: false,
        knowledgeBaseCategories: false,
        editKnowledgeBaseCategories: false,
        ticketCategories: false,
        editTicketCategories: false,
        cityData: false,
        ///
        editManageUser: false,
        editUserNotification: false,
        crm: false,
        editCrm: false,
        editKnowledgeBase: false,
        // settings
        editCountyWebsite: false,
        editStateWebsite: false,
        cityDetails: false,
        ///
        editQuickLinks: false,
        addQuickLinks: false,
        ///
        changePassword: false,
        ////
        markEmailVerified: false,
        ////
        forgetPassword: false,
        ////
        parkNewContact: false,
        ////
        loginsignup: false,
        loginsignupPage: false,
        profilepic: false,

        // user Support side
        contactSupport: false,
        submitTicket: false,
        reportAbuse: false,

        // contact seller
        contactSeller: false,

        // park-listin component
        parkListingDetails: false,
        // park edit site
        myParkSite: false
    };
    public step: number = 1;

    public userDialog = {
        parkRequest: false,
        editParkRequest: false
    };

    public showImage: boolean = true;

    // public mainLinks = [
    //     {title: 'Sold Parks', name: 'Sold Parks'},
    //     {
    //         title: 'Park Sites',
    //         name: 'Park Sites'
    //     },
    //     {
    //         title: 'Advertise',
    //         name: 'Advertise'
    //     },
    //     {title: 'Pricing', name: 'Pricing'},
    //     {
    //         title: 'Blog',
    //         name: 'Blog'
    //     },
    //     {title: 'Contact', name: 'Contact'}
    // ];

    public isLoggedIn = false;

    public _SaveMode = new BehaviorSubject(false);
    get SaveMode() {
        return this._SaveMode.value;
    }
    set SaveMode(mode: boolean) {
        this._SaveMode.next(mode);
    }

    public block: boolean = false;

    public Dialog: boolean = false;
    public editDialog: boolean = false;
    public drawer: boolean = false;
    public isLetterOrNumber(e: any) {
        const char = String.fromCharCode(e.keyCode);
        if (/^[a-zA-Z ]+$/.test(char)) return true;
        else e.preventDefault();
    }

    public DropDownFilter = {
        PageNo: 0,
        PageSize: 30,
        Query: null,
        SortBy: null,
        SortDesc: null,
        Status: 'TRUE'
    };
}
