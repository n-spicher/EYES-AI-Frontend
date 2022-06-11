import VueWrapper from '@/components/core/Vue/vue.wrapper';
import {CategoryApi, CategoryItemModel, CategoryModel} from '@/sdk';
import {AlgoliaSearchSearvice} from '@/services/algolia-search.service';
import {PdfProcessorService} from '@/services/pdf-processor.service';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class AddSynonymDialogComponent extends VueWrapper {
    public name: string = 'add-synonym-dialog';

    public Name: string | null = null;

    public synonyms: Array<string> = [];

    public algoliaSrv: AlgoliaSearchSearvice = new AlgoliaSearchSearvice();

    public pdfSrv: PdfProcessorService = new PdfProcessorService();

    @Prop({
        type: Object,
        default: null
    })
    public category!: CategoryItemModel;

    public mounted() {
        this.algoliaSrv.init();
    }

    public DeleteCategoryItemSynonym(item: CategoryItemModel) {
        this.ConfirmSrv.open('Delete Synonym', 'Are you sure to delete this synonym?').then(yes => {
            if (yes) {
                new CategoryApi().DeleteCategoryItemSynonym(item.Id!).subscribe(
                    res => {
                        if (res.Status) {
                            this.AlertSrv.show('success', 'Synonym has been deleted successfully.');
                            this.pdfSrv.loadCategories();
                        }
                    },
                    err => {
                        this.AlertSrv.show('error', err.message || err.Message);
                    }
                );
            }
        });
    }

    public AddItem() {
        if (!!this.Name) {
            this.synonyms.push(this.Name!);
        }
        this.Name = null;
    }

    public reset() {
        this.Name = null;
        this.synonyms = [];
    }

    public Close() {
        this.CoreSrv.CloseModal(this.name);
    }
}
