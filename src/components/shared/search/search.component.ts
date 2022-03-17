import VueWrapper from '@/components/core/Vue/vue.wrapper';
import {LoaderService} from '@/sdk';
import {BehaviorSubject} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter} from 'rxjs/operators';
import {Component} from 'vue-property-decorator';

@Component
export default class SearchComponent extends VueWrapper {
    $refs!: {
        search: any;
    };

    public Search$ = new BehaviorSubject<string | null>(null);
    public LoaderSrv = new LoaderService();

    private initial: number = 0;

    public created() {
        this.Search$.pipe(
            filter(x => !x || x.length > 1),
            debounceTime(300),
            distinctUntilChanged()
        ).subscribe(res => {
            if (this.initial > 0) {
                this.$emit('search', res);
               
            } else {
                this.initial++;
            }
        });
    }
}
