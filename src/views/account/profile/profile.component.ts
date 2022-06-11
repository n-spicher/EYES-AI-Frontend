import VueWrapper from '@/components/core/Vue/vue.wrapper';
import {ShowableRoute} from '@/globals';
import {Component} from 'vue-property-decorator';

import BaseLayoutComponent from '@/components/shared/base-layout/base-layout.component';
import NavigationCardComponent from '../../../components/shared/navigation-card/navigation-card.component';

import {UsersModel} from '@/sdk/models/user/users.model';
import {AlertService, LoaderService, SessionModel, UserSession} from '@/sdk';
import 'vue-advanced-cropper/dist/style.css';
import {StencilPreview, BoundingBox, DraggableArea, CircleStencil, Cropper} from 'vue-advanced-cropper';
// import UploadProfilePictureComponent from '@/components/shared/upload-profile-picture/upload-profile-picture.component';

@Component({
    components: {
        NavigationCardComponent,
        BaseLayoutComponent,
        // PersonalInfoComponent,
        StencilPreview,
        BoundingBox,
        DraggableArea,
        CircleStencil,
        Cropper
        // UploadProfilePictureComponent
    }
})
export default class ProfileComponent extends VueWrapper {
    public User = new UsersModel();
    public UserData = new SessionModel();
    // public UserSrv = new UsersService();
    public profileImage = '';
    public menus: Array<Array<ShowableRoute>> = [
        [
            {
                Name: 'PersonalInformation',
                Title: 'Personal Information',
                Icon: 'mdi-account-outline',
                // link: '/account/profile/personal-info',
                Chip: '',
                Color: '',
                Position: 1
            },
            {
                Name: 'ChangePassword',
                Title: 'Change Password',
                Icon: 'mdi-lock-outline',
                // link: '/account/profile/change-password',
                Chip: '',
                Color: '',
                Position: 1
            }
        ]
    ];

    public items: Array<Array<ShowableRoute>> = [];
    // public NavigationLinks: Array<Array<ShowableRoute>> = [];
    public $refs!: {
        // cropperRef: UploadProfilePictureComponent;
        file: any;
    };
    public image = '';
    public IsMediaExists = false;

    public uploadImage(event: any) {
        const input = event.target;
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = e => {
                this.image = (e.target as any).result;
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    public created() {
        // this.NavigationLinks =
        //     this.$helpers.getShowableRoutes(this.$route.matched[1].name!)?.reduce((acc: Array<Array<ShowableRoute>>, curr) => {
        //         if (!curr.Position) {
        //             if (acc.length) {
        //                 acc[0].push(curr);
        //             } else {
        //                 acc.push([curr]);
        //             }
        //         } else {
        //             const index = acc.findIndex(x => x[0].Position === curr.Position);
        //             if (index > -1) {
        //                 acc[index].push(curr);
        //             } else {
        //                 acc.push([curr]);
        //             }
        //         }
        //         return acc;
        //     }, []) ?? [];
        // this.AddSubscription$ = new UsersService().loggedInUser$.subscribe(Res => {
        //     this.UserData = Res;
        //     this.profileImage = this.UserData.ImageUrl!;
        // });
        // this.AddSubscription$ = new UsersService().User$.subscribe(Res => {
        //     this.UserData = Res;
        //     this.profileImage = this.UserData.ImageUrl!;
        // });
    }

    public mounted() {
        this.UserSession._session.subscribe(s => {
            this.UserData = new SessionModel(s ?? {});
            this.items = [
                [
                    ...this.menus[0],
                    ...(this.UserSession.Session?.Role === 'SuperAdmin'
                        ? [
                              {
                                  Name: 'ManageUsers',
                                  Title: 'Manage Users',
                                  Icon: 'mdi-lock-outline',
                                  // link: '/account/profile/change-password',
                                  Chip: '',
                                  Color: '',
                                  Position: 1
                              }
                          ]
                        : [])
                ]
            ];
        });

        this.loadUserProfile();
    }

    public loadUserProfile() {
        // new UsersService().getById(new UserSession().Session?.UserId!);
    }

    public async update() {
        // const {canvas} = this.$refs.cropperRef.UplaodedImage;
        // canvas.toBlob((file: File) => {
        //     if (file) {
        //         const fileToSend = new File([file], 'media.png', {
        //             type: 'image/png',
        //             lastModified: Date.now()
        //         });
        //         new LoaderService().showFullScreenLoader();
        //         new UsersApi()
        //             .updateProfilePicture(new UserSession().Session?.UserId!, fileToSend)
        //             .subscribe(
        //                 () => {
        //                     new LoaderService().hideFullScreenLoader();
        //                     new AlertService().show('success', 'Profile picture has been successfully uploaded!');
        //                     this.$refs.cropperRef.close();
        //                 },
        //                 ({message}) => {
        //                     new LoaderService().hideFullScreenLoader();
        //                     new AlertService().show('error', message);
        //                 }
        //             )
        //             .add(() => {
        //                 new LoaderService().hideFullScreenLoader();
        //             });
        //     }
        // }, 'image/png');
    }
}
