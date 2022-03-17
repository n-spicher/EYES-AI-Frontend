import MainLayoutComponent from '@/components/shared/client-layout/main-layout.component';
import {RouteConfig} from 'vue-router';
import HomeComponent from '../home/home.component';
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
            }
        ]
    }
];
