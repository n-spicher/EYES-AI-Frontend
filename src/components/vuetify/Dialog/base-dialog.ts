import VueWrapper from '@/components/core/Vue/vue.wrapper';
import { CoreService } from '@/services/core.service';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class BaseDialog extends VueWrapper {
    // Refs
    public $refs!: {
        baseDialogRef: HTMLDivElement;
    };

    @Prop({
        required: true,
        type: String
    })
    public readonly name!: string;

    private _Show: boolean = false;

    // Properties
    public get Show() {
        return this.CoreSrv.getOpenedModals.indexOf(this.name) != -1
            ? true
            : this._Show;
    }
    public set(val: any) {}

    // Methods
    public mounted() {
        new CoreService()._SaveMode.subscribe(res => {
            // if (res) {
            //     this.resetPosition();
            // }
            this._Show = res;
        });
        // this.dragWindow();
    }
    public dragWindow() {
        const d: any = {};
        document.addEventListener('mousedown', (e: MouseEvent) => {
            const closestDialog = (e.target as HTMLElement).closest(
                '.base-dialog'
            );
            if (e.button === 0 && closestDialog != null) {
                d.el = closestDialog;
                d.mouseStartX = e.clientX;
                d.mouseStartY = e.clientY;
                d.elStartX = d.el.getBoundingClientRect().left;
                d.elStartY = d.el.getBoundingClientRect().top;
                d.el.style.position = 'fixed';
                d.el.style.margin = 0;
                d.oldTransition = d.el.style.transition;
                d.el.style.transition = 'none';
                document.body.style.userSelect = 'none';
                document.body.style.cursor = 'grab';
            }
        });
        document.addEventListener('mousemove', (e: MouseEvent) => {
            if (d.el === undefined) {
                return;
            }
            d.el.style.left =
                Math.min(
                    Math.max(d.elStartX + e.clientX - d.mouseStartX, 0),
                    window.innerWidth - d.el.getBoundingClientRect().width
                ) + 'px';
            d.el.style.top =
                Math.min(
                    Math.max(d.elStartY + e.clientY - d.mouseStartY, 0),
                    window.innerHeight - d.el.getBoundingClientRect().height
                ) + 'px';
        });
        document.addEventListener('mouseup', () => {
            if (d.el === undefined) {
                return;
            }
            d.el.style.transition = d.oldTransition;
            document.body.style.userSelect = '';
            document.body.style.cursor = '';
            d.el = undefined;
        });
    }
    public resetPosition() {
        this.$nextTick(() => {
            this.$refs.baseDialogRef.style.top = '5%';
            this.$refs.baseDialogRef.style.left = '25%';
        });
    }
}
