import {ServiceClass} from '@/decorators';

@ServiceClass()
export class LoaderService {
    public FullScreenLoaderCount = 0;
    public SearchLoaderCount = 0;

    // Full Screen Loader for API requests
    private _FullScreenLoader: boolean = false;
    public FullScreenLoaderMessage: string = '';

    private ProgressBarLoaderCount = 0;
    private ProgressBarLoader: boolean = false;

    // Search Loader
    private _SearchLoader = false;

    get getProgressBarLoader(): boolean {
        return this.ProgressBarLoader;
    }

    public showProgressBarLoader(): void {
        this.ProgressBarLoader = true;
        this.ProgressBarLoaderCount++;
    }

    // Getter
    get FullScreenLoader(): boolean {
        return this._FullScreenLoader;
    }
    get SearchLoader(): boolean {
        return this._SearchLoader;
    }

    get getFullScreenLoader(): boolean {
        return this.FullScreenLoader;
    }

    // Show loader
    public showFullScreenLoader(msg = 'Loading...', state = true): void {
        if (state) {
            document.body.focus();
            this._FullScreenLoader = true;
            this.FullScreenLoaderMessage = msg;
            this.FullScreenLoaderCount++;
        }
    }
    public showSearchLoader() {
        this._SearchLoader = true;
        this.SearchLoaderCount++;
    }

    // Hide loader
    public hideFullScreenLoader(state = true): void {
        if (state) {
            if (this.FullScreenLoaderCount === 0) {
                this._FullScreenLoader = false;
                return;
            }
            this.FullScreenLoaderCount--;
            if (this.FullScreenLoaderCount === 0) {
                this._FullScreenLoader = false;
            }
        }
    }
    public hideSearchLoader() {
        if (this.SearchLoaderCount === 0) {
            this._SearchLoader = false;
            return;
        }
        this.SearchLoaderCount--;
        if (this.SearchLoaderCount === 0) {
            this._SearchLoader = false;
        }
    }

    public hideProgressBarLoader(): void {
        this.ProgressBarLoaderCount--;
        if (this.ProgressBarLoaderCount === 0) {
            this.ProgressBarLoader = false;
        }
    }
}
