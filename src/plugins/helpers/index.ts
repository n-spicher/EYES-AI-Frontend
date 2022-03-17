import { ShowableRoute } from '@/globals';
import Vue from 'vue';
import { RouteConfig } from 'vue-router';
import { helpers } from './helpers';

declare module 'vue/types/vue' {
    // Declare helper augmentation for Vue
    interface Vue {
        $helpers: {
            upperFirst(text: string | null): string;
            formatFileSize(size: number): string;
            excerptText(str: string, limit?: number): string;
            isValidDateFormat(dateString: string | null): boolean;
            isValidDate(dateString: string): string | boolean;
            uuidv4(): string;
            isJSON(str: string): boolean;
            titleize(slug: string): string;
            toCurrency(num: string | number | null): string;
            toPercentage(num: string | number | null): string;
            formatDate(date: string | null): string;
            getShowableRoutes(path: string): Array<ShowableRoute>;
            resolveRoute(
                name: string,
                routes: Array<RouteConfig>
            ): RouteConfig | undefined;
        };
    }
}

const plugin = {
    install() {
        Vue.prototype.$helpers = helpers;
    }
};

Vue.use(plugin);
