import VueWrapper from '@/components/core/Vue/vue.wrapper';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class FullPageDialogComponent extends VueWrapper {
    public notifications: boolean = false;
    public sound: boolean = true;
    public widgets: boolean = false;

    @Prop({
        required: true,
        type: String
    })
    public readonly name!: string;

    @Prop({
        required: true,
        type: String
    })
    private readonly dialogTitle!: string;
    @Prop({
        required: true,
        type: String
    })
    private readonly icon!: string;

    @Prop({
        default: false,
        type: Boolean
    })
    model!: boolean;

    public get Show() {
        return this.CoreSrv.getOpenedModals.indexOf(this.name) != -1;
    }
    public set Show(val: any) {}

    // @Prop({
    //     required: true,
    //     type: Boolean,
    //     default: false
    // })
    // private readonly openDialog!: boolean;
}
