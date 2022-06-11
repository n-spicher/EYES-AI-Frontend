import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';

import {CoreService} from '@/services/core.service';
import {ApiAuth, UserSession} from '@/sdk';

import MainLayoutComponent from '@/components/shared/client-layout/main-layout.component';
import HomeComponent from '@/views/client/home/home.component';

import {ClientRoutes} from '@/views/client/routes/client.routes';

import goTo from 'vuetify/lib/services/goto';
import {FilterService} from '@/sdk/services/shared/filter.service';

import {FilterModel} from '@/sdk/models/common/filter.model';
import VueMeta from 'vue-meta';

Vue.use(VueRouter);
Vue.use(VueMeta);

export const routes: Array<RouteConfig> = [...ClientRoutes];

const UserSessionSrv = new UserSession();

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior: (to, from, savedPosition) => {
        let scrollTo: any = 0;

        if (to.hash) {
            scrollTo = to.hash;
        } else if (savedPosition) {
            scrollTo = savedPosition.y;
        }

        return goTo(scrollTo);
    },
    routes
});

router.beforeEach((to, from, next) => {
    // Get current user from cookie.
    const isUserLoggedIn = UserSessionSrv.isUserAuthenticated;
    // const isUserLoggedIn = false;
    // new ApiAuth().SessionValue && !!new ApiAuth().SessionValue!.UserId;

    const isNonAuthRoute = ['Login', 'Signup', 'Forgot Password', 'Resend Email'].includes(to.name!);
    const isPublicRoute = ['View PDF'].includes(to.name!);

    new FilterService().Filter.Status = null;

    // Perform Authentication
    if (isPublicRoute) {
        next();
    } else if (!isUserLoggedIn && isNonAuthRoute) {
        next();
    } else if (isUserLoggedIn && isNonAuthRoute) {
        next({name: 'Login', query: {redirect_reason: 'UNAUTHORIZIED'}});
    } else if (!isUserLoggedIn && !isNonAuthRoute) {
        next({name: 'Login', query: {redirect_reason: 'UNAUTHORIZIED'}});
    } else {
        next();
    }
});

export default router;
