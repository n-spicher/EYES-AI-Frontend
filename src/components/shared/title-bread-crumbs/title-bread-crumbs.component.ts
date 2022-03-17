import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class TitleBreadCrumbs extends Vue {
    // @Prop({ required: true, type: Array })
    // readonly breadLinks!: Array<BreadLinks>;
    @Prop({ required: false })
    readonly toggle!: boolean;

    public dummyBreadLinks: BreadLinks = {
        text: '',
        href: '',
        disabled: true
    };
    public breadCrumbs: Array<BreadLinks> = [];

    public created() {
        this.dummyBreadLinks.text = this.$route.meta?.title;
        this.dummyBreadLinks.href = this.$route.fullPath;
        this.dummyBreadLinks.disabled = false;

        this.breadCrumbs.push(this.dummyBreadLinks);
    }
}
interface BreadLinks {
    text: string;
    href: string;
    disabled: boolean;
}
