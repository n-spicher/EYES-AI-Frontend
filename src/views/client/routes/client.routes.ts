import MainLayoutComponent from '@/components/shared/client-layout/main-layout.component';
import ChangePasswordComponent from '@/views/account/profile/change-password/change-password.component';
import ManageUsersComponent from '@/views/account/profile/manage-users/manage-users.component';
import PersonalInfoComponent from '@/views/account/profile/personal-info/personal-info.component';
import ProfileComponent from '@/views/account/profile/profile.component';
import {RouteConfig} from 'vue-router';
import BackendComponent from '../backend/backend.component';
import HomeComponent from '../home/home.component';
import LoginComponent from '../login/login.component';
import SignupComponent from '../signup/signup.component';
import ViewPdfComponent from '../view-pdf/view-pdf.component';

export const ClientRoutes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Main Component',
        component: MainLayoutComponent,
        redirect: '/home',
        children: [
            {
                path: 'home',
                name: 'Home',
                component: HomeComponent
            },
            {
                path: 'view-pdf',
                name: 'View PDF',
                component: ViewPdfComponent
            },
            {
                path: 'backend',
                name: 'BackEnd',
                component: BackendComponent
            },
            {
                path: 'login',
                name: 'Login',
                component: LoginComponent
            },
            {
                path: 'signup',
                name: 'Signup',
                component: SignupComponent
            },
            {
                path: 'profile',
                name: 'Profile',
                component: ProfileComponent,
                children: [
                    {
                        path: 'personal-information',
                        name: 'PersonalInformation',
                        component: PersonalInfoComponent
                    },
                    {
                        path: 'change-password',
                        name: 'ChangePassword',
                        component: ChangePasswordComponent
                    },
                    {
                        path: 'manage-users',
                        name: 'ManageUsers',
                        component: ManageUsersComponent
                    }
                ]
            }
        ]
    }
];
