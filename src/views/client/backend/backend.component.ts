import VueWrapper from '@/components/core/Vue/vue.wrapper';
import {Component} from 'vue-property-decorator';
import {PdfProcessorService} from '@/services/pdf-processor.service';
import * as XLSX from 'xlsx';
import {CategoryApi, CategoryCodeModel, CategoryItemModel, CategoryItemSynonymModel, CategoryModel, LoaderService} from '@/sdk';
import AddKeywordDialogComponent from '@/views/shared/add-keyword-doalog/add-keyword-doalog.component';
import AddEquipmentDialogComponent from '@/views/shared/add-equipment-doalog/add-equipment-doalog.component';
import {AlgoliaSearchSearvice} from '@/services/algolia-search.service';
import AddSynonymDialogComponent from '@/views/shared/add-synonym-dialog/add-synonym-dialog.component';
import AddCodeDialogComponent from '@/views/shared/add-code-dialog/add-code-dialog.component';

@Component({
    components: {
        AddKeywordDialogComponent,
        AddEquipmentDialogComponent,
        AddSynonymDialogComponent,
        AddCodeDialogComponent
    }
})
export default class BackendComponent extends VueWrapper {
    public $refs!: {
        fileInputElem: HTMLInputElement;
        addKeyworddDialog: AddKeywordDialogComponent;
        addEquipmentDialog: AddEquipmentDialogComponent;
        addSynonymDialog: AddSynonymDialogComponent;
        addCodeDialog: AddCodeDialogComponent;
    };

    public items = [
        {
            action: 'mdi-ticket',
            items: [{title: 'List Item'}],
            title: 'Attractions'
        },
        {
            action: 'mdi-silverware-fork-knife',
            active: true,
            items: [{title: 'Breakfast & brunch'}, {title: 'New American'}, {title: 'Sushi'}],
            title: 'Dining'
        },
        {
            action: 'mdi-school',
            items: [{title: 'List Item'}],
            title: 'Education'
        },
        {
            action: 'mdi-human-male-female-child',
            items: [{title: 'List Item'}],
            title: 'Family'
        },
        {
            action: 'mdi-bottle-tonic-plus',
            items: [{title: 'List Item'}],
            title: 'Health'
        },
        {
            action: 'mdi-briefcase',
            items: [{title: 'List Item'}],
            title: 'Office'
        },
        {
            action: 'mdi-tag',
            items: [{title: 'List Item'}],
            title: 'Promotions'
        }
    ];

    public selectedCategory: CategoryModel | null = null;
    public selectedCategoryItem: CategoryItemModel | null = null;

    public seletedEquipmentId: number = -1;

    public pdfSrv: PdfProcessorService = new PdfProcessorService();

    public mounted() {
        //
    }

    public get equipments() {
        if (this.seletedEquipmentId === -1) {
            return this.pdfSrv.categories;
        }
        return this.pdfSrv.categories.filter(x => x.Id === this.seletedEquipmentId);
    }

    public AddKeywordClick(category: CategoryModel) {
        if (this.$refs.addKeyworddDialog) {
            this.selectedCategory = category;
            this.selectedCategoryItem = null;
            this.$refs.addKeyworddDialog.reset();
            this.CoreSrv.OpenModal(this.$refs.addKeyworddDialog.name);
        }
    }

    public AddCodeClick(category: CategoryModel) {
        if (this.$refs.addCodeDialog) {
            this.selectedCategory = category;
            this.$refs.addCodeDialog.reset();
            this.CoreSrv.OpenModal(this.$refs.addCodeDialog.name);
        }
    }

    public AddSynonymClick(categoryItem: CategoryItemModel) {
        if (this.$refs.addSynonymDialog) {
            this.selectedCategoryItem = categoryItem;
            this.$refs.addSynonymDialog.reset();
            this.CoreSrv.OpenModal(this.$refs.addSynonymDialog.name);
        }
    }

    public AddEquipmentClick() {
        if (this.$refs.addEquipmentDialog) {
            this.$refs.addEquipmentDialog.reset();
            this.CoreSrv.OpenModal(this.$refs.addEquipmentDialog?.name);
        }
    }

    public EditEquipment(category: CategoryModel) {
        if (this.$refs.addEquipmentDialog) {
            this.selectedCategory = category;

            this.CoreSrv.OpenModal(this.$refs.addEquipmentDialog.name);
        }
    }

    public EditCategoryItemClick(category: CategoryModel, categoryItem: CategoryItemModel) {
        if (this.$refs.addKeyworddDialog) {
            this.selectedCategory = category;
            this.selectedCategoryItem = categoryItem;

            this.$refs.addKeyworddDialog.reset();
            this.CoreSrv.OpenModal(this.$refs.addKeyworddDialog.name);
        }
    }

    public SaveEquipment(category: CategoryModel) {
        if (category.Id) {
            this.LoaderSrv.showFullScreenLoader();
            new CategoryApi()
                .UpdateCategory(category.Id!, category.Name!)
                .subscribe(
                    res => {
                        if (res.Id!) {
                            this.AlertSrv.show('success', 'Equipment has been saved successfully!');
                            this.$refs.addEquipmentDialog?.Close();
                            this.pdfSrv.loadCategories();
                        }
                    },
                    err => {
                        this.AlertSrv.show('error', err.message || err.Message);
                    }
                )
                .add(() => {
                    this.LoaderSrv.hideFullScreenLoader();
                });
        } else {
            this.LoaderSrv.showFullScreenLoader();
            new CategoryApi()
                .AddCategory(category.Name!)
                .subscribe(
                    res => {
                        if (res.Id) {
                            this.AlertSrv.show('success', 'Equipment has been saved successfully!');
                            this.$refs.addEquipmentDialog?.Close();
                            this.pdfSrv.loadCategories();
                        }
                    },
                    err => {
                        this.AlertSrv.show('error', err.message || err.Message);
                    }
                )
                .add(() => {
                    this.LoaderSrv.hideFullScreenLoader();
                });
        }
    }

    public SaveCategoryItem(item: CategoryItemModel) {
        if (!!this.selectedCategory) {
            if (item.Id) {
                const categoryItem = new CategoryItemModel({
                    Name: item.Name,
                    Note: item.Note,
                    CategoryId: this.selectedCategory.Id!
                });
                this.LoaderSrv.showFullScreenLoader();
                new CategoryApi()
                    .UpdateCategoryItem(item.Id!, categoryItem)
                    .subscribe(
                        res => {
                            this.AlertSrv.show('success', 'Keyword Updated');
                            this.pdfSrv.loadCategories();
                            this.$refs.addKeyworddDialog?.Close();
                            // this.searchValue = null;
                        },
                        err => {
                            this.AlertSrv.show('error', 'Unable to update Keyword');
                        }
                    )
                    .add(() => {
                        new LoaderService().hideFullScreenLoader();
                    });
            } else {
                const categoryItem = new CategoryItemModel({
                    Name: item.Name,
                    Note: item.Note,
                    CategoryId: this.selectedCategory.Id!
                });
                this.LoaderSrv.showFullScreenLoader();
                new CategoryApi()
                    .AddCategoryItem(categoryItem)
                    .subscribe(
                        res => {
                            this.AlertSrv.show('success', 'Keyword Added');
                            this.pdfSrv.loadCategories();
                            this.$refs.addKeyworddDialog?.Close();
                            // this.searchValue = null;
                        },
                        err => {
                            this.AlertSrv.show('error', 'Unable to add Keyword');
                        }
                    )
                    .add(() => {
                        new LoaderService().hideFullScreenLoader();
                    });
            }
        }
    }

    public SaveCategoryCode(item: CategoryCodeModel) {
        if (!!this.selectedCategory) {
            const categoryCode = new CategoryCodeModel({
                Code: item.Code,
                CategoryId: this.selectedCategory.Id!
            });
            this.LoaderSrv.showFullScreenLoader();
            new CategoryApi()
                .AddCategoryCode(categoryCode)
                .subscribe(
                    res => {
                        this.AlertSrv.show('success', 'Code Added');
                        this.pdfSrv.loadCategories();
                        this.$refs.addCodeDialog?.Close();
                        // this.searchValue = null;
                    },
                    err => {
                        this.AlertSrv.show('error', 'Unable to add Code');
                    }
                )
                .add(() => {
                    new LoaderService().hideFullScreenLoader();
                });
        }
    }

    public SaveSynonyms(syns: Array<string>) {
        const list: Array<CategoryItemSynonymModel> = [];
        for (let i = 0; i < syns.length; i++) {
            list.push(
                new CategoryItemSynonymModel({
                    Name: syns[i],
                    CategoryItemId: this.selectedCategoryItem?.Id!
                })
            );
        }

        this.LoaderSrv.showFullScreenLoader();
        new CategoryApi()
            .AddCategoryItemSynonyms(list)
            .subscribe(
                res => {
                    this.$refs.addSynonymDialog.reset();
                    this.$refs.addSynonymDialog.Close();
                    this.pdfSrv.loadCategories();
                },
                err => {
                    this.AlertSrv.show('error', err.message || err.Message);
                }
            )
            .add(() => {
                this.LoaderSrv.hideFullScreenLoader();
            });
    }

    public async onUploadFiles(e: any) {
        if (e.target.files?.length) {
            const file = e.target.files[0];
            const data = await file.arrayBuffer();
            /* data is an ArrayBuffer */
            const workbook = XLSX.read(data);

            // const sn = workbook.SheetNames[0];
            // const ws = workbook.Sheets[sn];
            this.processWorkbook(workbook);
        }
    }

    public processWorkbook(workbook: XLSX.WorkBook) {
        for (let i = 0; i < workbook.SheetNames.length; i++) {
            const sheetName = workbook.SheetNames[i];
            const sheet = workbook.Sheets[sheetName];

            const category = sheet['B2']?.w;

            let dataRow = 5;
            let numberValue: number | null = null;
            let keyword: string = '';
            let synonym: string = '';
            let note: string = '';

            do {
                numberValue = sheet[`B${dataRow}`]?.v ?? 0;
                // if (numberValue! > 0 ) {
                keyword = sheet[`C${dataRow}`]?.w;
                synonym = sheet[`D${dataRow}`]?.w;
                note = sheet[`E${dataRow}`]?.w;
                // }

                if (numberValue! > 0 && !!keyword) {
                    console.log({category: category.split(':')[1], num: numberValue, keyword, synonym: synonym?.split(','), note});
                }
                dataRow++;
            } while (numberValue! > 0);
        }
    }

    public DeleteCategory(category: CategoryModel) {
        this.ConfirmSrv.open('Delete Equipment', 'Are you sure to delete this equipment?').then(yes => {
            if (yes) {
                this.LoaderSrv.showFullScreenLoader();
                new CategoryApi()
                    .DeleteCategory(category.Id!)
                    .subscribe(
                        res => {
                            if (res.Status) {
                                this.AlertSrv.show('success', 'Equipment has been deleted successfully.');
                                this.pdfSrv.loadCategories();
                            }
                        },
                        err => {
                            this.AlertSrv.show('error', err.message || err.Message);
                        }
                    )
                    .add(() => {
                        this.LoaderSrv.hideFullScreenLoader();
                    });
            }
        });
    }

    public DeleteCategoryItem(item: CategoryItemModel) {
        this.ConfirmSrv.open('Delete Keyword', 'Are you sure to delete this keyword?').then(yes => {
            if (yes) {
                this.LoaderSrv.showFullScreenLoader();
                new CategoryApi()
                    .DeleteCategoryItem(item.Id!)
                    .subscribe(
                        res => {
                            if (res.Status) {
                                this.AlertSrv.show('success', 'Keyword has been deleted successfully.');
                                this.pdfSrv.loadCategories();
                            }
                        },
                        err => {
                            this.AlertSrv.show('error', err.message || err.Message);
                        }
                    )
                    .add(() => {
                        this.LoaderSrv.hideFullScreenLoader();
                    });
            }
        });
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

    public DeleteCategoryCode(item: CategoryCodeModel) {
        this.ConfirmSrv.open('Delete Code', 'Are you sure to delete this code?').then(yes => {
            if (yes) {
                new CategoryApi().DeleteCategoryCode(item.Id!).subscribe(
                    res => {
                        if (res.Status) {
                            this.AlertSrv.show('success', 'Code has been deleted successfully.');
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

    public selectFileClick() {
        this.$refs.fileInputElem?.click();
    }
}
