import { ServiceClass } from '@/decorators';

@ServiceClass()
export class ConfirmService {
    // Properties
    private Resolve!: (value: boolean) => void;
    private Title: string = '';
    private Detail: string = '';
    private Options: ConfirmOptions = {
        ConfirmText: 'Yes',
        CancelText: 'Cancel'
    };

    private ConfirmMode: boolean = false;

    // Getter
    get getConfirmMode(): boolean {
        return this.ConfirmMode;
    }

    // Show loader
    public open(title: string, detail: string, options?: ConfirmOptions) {
        const instance = new ConfirmService();
        instance.ConfirmMode = true;
        instance.Title = title;
        instance.Detail = detail;

        if (options) {
            instance.Options = { ...instance.Options, ...options };
        } else {
            instance.Options = {
                ConfirmText: 'Yes',
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
}
interface ConfirmOptions {
    ConfirmText?: 'Yes' | 'Confirm' | 'Discard' | 'Continue';
    CancelText?: 'Cancel' | 'No' | 'Close' | 'Dashboard';
}
