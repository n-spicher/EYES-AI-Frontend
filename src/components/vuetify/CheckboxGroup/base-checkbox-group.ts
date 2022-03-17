import { Component, Prop } from 'vue-property-decorator';
import BaseInput from '../Input/base-input';
import BaseCheckbox from '../Checkbox/base-checkbox';

@Component({
    components: {
        BaseCheckbox: BaseCheckbox
    }
})
export default class CheckboxGroupComponent extends BaseInput {
    // Props
    @Prop({ required: true, type: Array })
    private readonly items!: Array<string>;

    @Prop({ default: () => [], type: Array })
    private readonly values!: Array<any>;

    // Methods
    public updateValues(newVal: string | null, oldVal: any) {
        !newVal
            ? this.values.splice(
                  this.values.findIndex(item => item.Id === oldVal.Id),
                  1
              )
            : this.values.push(oldVal);
    }
}
