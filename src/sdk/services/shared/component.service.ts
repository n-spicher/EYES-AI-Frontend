import { ServiceClass } from '@/decorators';

@ServiceClass()
export class ComponentService {
    // Properties
    private Resolve!: (value: boolean) => void;
    private Title: string = '';
    private Path: string = '';
    private Options: ComponentOptions = {
        ConfirmText: 'Save',
        CancelText: 'Cancel'
    };

    private ConfirmMode: boolean = false;

    // Getter
    get getConfirmMode(): boolean {
        return this.ConfirmMode;
    }

    // Show loader
    public open(title: string, path: string, options?: ComponentOptions) {
        const instance = new ComponentService();
        instance.ConfirmMode = true;
        instance.Title = title;
        instance.Path = path;

        if (options) {
            instance.Options = { ...instance.Options, ...options };
        } else {
            instance.Options = {
                ConfirmText: 'Save',
                CancelText: 'Cancel'
            };
        }
        return new Promise(resolve => {
            instance.Resolve = resolve;
        });
    }

    public close(value: boolean) {
        this.ConfirmMode = false;
        this.Resolve(value);
    }

    public openItem(title: string, path: string) {
        const instance = new ComponentService();
        instance.Title = title;
        instance.Path = path;

        return this.Path && this.Title;
    }
}
interface ComponentOptions {
    ConfirmText?: 'Save' | 'Confirm' | 'Discard' | 'Continue';
    CancelText?: 'Cancel' | 'No' | 'Close' | 'Dashboard';
}
