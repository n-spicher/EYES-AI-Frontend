import {ServiceClass} from '@/decorators';
import {AlertService, CategoryApi, LoaderService} from '@/sdk';
import {SdkConfig} from '@/sdk/sdk.config';
import {BehaviorSubject, Subject} from 'rxjs';
import {getDocument as getPdfDocument, PDFDocumentLoadingTask, PDFDocumentProxy, PDFPageProxy} from 'pdfjs-dist';
import {PdfPageThumbnail, PdfPageView} from './pdf';
import {CategoryModel} from '@/sdk/models/category/category.model';
import {CategoryItemModel} from '@/sdk/models/category-item/category-item.model';
import {AnyObject} from '@/globals';

@ServiceClass()
export class PdfProcessorService {
    public loadedPdfTask: PDFDocumentLoadingTask | null = null;
    public pdf: PDFDocumentProxy | null = null;
    public pdfContainerElem: HTMLDivElement | null = null;
    public thumbsContainerElem: HTMLDivElement | null = null;
    public pdfLoaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public fileName: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

    public file: BehaviorSubject<File | null> = new BehaviorSubject<File | null>(null);

    public _pdfPageViews: Array<PdfPageView> = [];
    public pdfThumbsList: Array<PdfPageThumbnail> = [];

    public search: number | null = null;

    public selectedCategories: Array<CategoryModel> = [];

    public foundPagesList: Array<boolean> = [];

    public selectedCategoryId: number | null = -1;

    public setFileName(name: string) {
        this.fileName.next(name);
    }
    public getFileName() {
        return this.fileName.value;
    }

    public setFile(file: File) {
        this.file.next(file);
    }
    public getFile() {
        return this.file.value;
    }

    public categoryPages: AnyObject = {};

    public collingTower: Array<string> = ['manufacturers', 'evapco', 'warranty', 'basin heater', 'control panel', 'equalizer connection', 'walkway'];

    public VFD: Array<string> = ['bypass', 'danfoss', 'bacnet', 'communication', 'type 12', 'type 3R'];

    public hydronicPumps: Array<string> = [
        'bronze wear rings',
        'pump shaft',
        'armstrong',
        'in-line',
        'base mounted',
        'shaft grounding rings',
        'extra materials'
    ];

    public categories: Array<CategoryModel> = [];

    public searchValue: string | null = null;

    constructor() {
        this.loadCategories();
    }

    public get searchedName() {
        const found = this.categories.find(x => x.Id === this.search);
        return found?.Name ?? '';
    }

    public loadCategories() {
        new LoaderService().showFullScreenLoader();
        new CategoryApi()
            .GetCategoriesWithItems()
            .subscribe(rs => {
                this.categories = [
                    new CategoryModel({
                        Id: -1,
                        Name: 'All Equipment'
                    }),
                    ...rs
                ];

                this.findSelectedCategory();
                if (this.pdfLoaded$.value) {
                    this.loadPagesAndSearch();
                }
            })
            .add(() => {
                new LoaderService().hideFullScreenLoader();
            });
    }

    public loadPagesAndSearch() {
        this.searchPages();
        this.loadPages();
        this.doSearch();
    }

    public removeItemFromCategory(itemId: number, categoryId: number) {
        const category = this.categories.find(x => x.Id === categoryId);
        if (!!category) {
            const ind = category.CategoryItems.findIndex(x => x.Id === itemId);
            if (ind >= 0) {
                category.CategoryItems.splice(ind, 1);
            }
        }
    }

    public findSelectedCategory() {
        if (this.selectedCategoryId === -1) {
            this.selectedCategories = [...this.categories];
            // console.log(this.selectedCategories);
            return;
        }
        const found = this.categories.find(x => x.Id === this.selectedCategoryId);

        if (found) {
            this.selectedCategories = [found];
        }

        // this.selectedCategories = this.selectedCategoryId! > 0 ? [] : [...this.categories];
    }

    public AddItem() {
        const categoryItem = new CategoryItemModel({
            Name: this.searchValue,
            CategoryId: this.selectedCategoryId!
        });
        new LoaderService().showFullScreenLoader();
        new CategoryApi()
            .AddCategoryItem(categoryItem)
            .subscribe(
                res => {
                    new AlertService().show('success', 'Keyword Added');
                    this.loadCategories();
                    this.searchValue = null;
                },
                err => {
                    new AlertService().show('error', 'Unable to add Keyword');
                }
            )
            .add(() => {
                new LoaderService().hideFullScreenLoader();
            });
    }

    public OpenFile(fileArray: Uint8Array, pdfContainerElem: HTMLDivElement, thumbsContainerElem: HTMLDivElement) {
        this.pdfContainerElem = pdfContainerElem;
        this.thumbsContainerElem = thumbsContainerElem;
        this.destroy();

        this._pdfPageViews = [];
        this.pdfThumbsList = [];
        this.categoryPages = {};

        new LoaderService().showFullScreenLoader();
        this.loadedPdfTask = getPdfDocument(
            fileArray
            // `${SdkConfig.ApiBaseUrl}/pdf-files/${fileName}`
        );
        this.loadedPdfTask.promise
            .then((pdf: PDFDocumentProxy) => {
                this.pdf = pdf;

                this.loadPdf();
            })
            .finally(() => {
                new LoaderService().hideFullScreenLoader();
            });
    }

    public loadPdf() {
        if (!this.pdf) {
            return;
        }

        new LoaderService().showProgressBarLoader();
        new LoaderService().showFullScreenLoader('Processing PDF File. Please wait...');
        for (let i = 0; i < this.pdf.numPages; i++) {
            const pageView = new PdfPageView({
                id: i + 1,
                pdfViewerElem: this.pdfContainerElem
            });
            pageView.hidePage();

            this._pdfPageViews.push(pageView);

            const pageThumb = new PdfPageThumbnail({
                id: i + 1,
                pdfThumbsElem: this.thumbsContainerElem!
            });
            pageThumb.hideThumb();

            this.pdfThumbsList.push(pageThumb);
        }

        const promises = [];

        // promises.push(
        //     new Promise(resolve => {
        //         this.pdf!.getPage(1).then(async (page: PDFPageProxy) => {
        //             await this._pdfPageViews[1 - 1].setPage(page);
        //             this.pdfThumbsList[1 - 1].setPage(page);
        //             // first page loaded

        //             resolve(null);
        //         });
        //     })
        // );

        for (let i = 0; i < this.pdf.numPages; i++) {
            promises.push(
                new Promise(resolve => {
                    this.pdf!.getPage(i + 1).then(async (page: PDFPageProxy) => {
                        await this._pdfPageViews[i].setPage(page);
                        await this._pdfPageViews[i].draw();
                        await this.pdfThumbsList[i].setPage(page);
                        this.pdfThumbsList[i].draw();

                        resolve(null);
                    });
                })
            );
        }

        Promise.all(promises)
            .then(() => {
                this.pdfLoaded$.next(true);

                setTimeout(() => {
                    if (!!this.search) {
                        // if (this.search === 'Cooling Tower') {
                        //     this.find(this.collingTower);
                        // }
                        // if (this.search === 'VFD') {
                        //     this.find(this.VFD);
                        // }
                        // if (this.search === 'Hydronic Pumps') {
                        //     this.find(this.hydronicPumps);
                        // }
                        // const selected = this.categories.find(x => x.Id === this.search);
                        // if (!!selected) {
                        //     const arr = selected.CategoryItems.map(x => x.Name!);
                        //     this.find(arr);
                        // }
                    }
                }, 10000);
            })
            .finally(() => {
                new LoaderService().hideProgressBarLoader();
                new LoaderService().hideFullScreenLoader();
            });
    }

    public loadPages() {
        for (let i = 0; i < this.foundPagesList.length; i++) {
            if (this.foundPagesList[i]) {
                this._pdfPageViews[i].showPage();
                this.pdfThumbsList[i].showThumbnail();
            } else {
                this._pdfPageViews[i].hidePage();
                this.pdfThumbsList[i].hideThumb();
            }
        }
    }

    public doSearch() {
        // const selected = this.categories.find(x => x.Id === this.selectedCategories?.Id!);

        // if (!!selected) {
        //     const arr = selected.CategoryItems.map(x => x.Name!);
        //     this.find(arr, false);
        // }

        for (const category of this.selectedCategories) {
            let arr = category.CategoryItems.map(x => x.Name!);
            const syns: Array<string> = [];
            for (const item of category.CategoryItems) {
                if (item.CategoryItemSynonyms?.length && item.CategoryItemSynonyms.length > 0) {
                    syns.push(...item.CategoryItemSynonyms!.map(x => x.Name!));
                }
            }

            if (syns.length > 0) {
                arr = [...arr, ...syns];
            }
            this.find(arr, false);
        }
    }

    public find(text: Array<string>, clear: boolean) {
        for (let i = 0; i < this._pdfPageViews.length; i++) {
            const pageView = this._pdfPageViews[i];
            // console.log(text);
            // if (!pageView.searched) {
            pageView.find(text, clear);
            pageView.searched = true;
            // }
        }
    }

    public findPages(codes: Array<string>, clear: boolean, key: string | null = null) {
        for (let i = 0; i < this._pdfPageViews.length; i++) {
            const pageView = this._pdfPageViews[i];

            if (!!key && this.categoryPages[key]) {
                const isFound = pageView.findCodesWithoutHilighting(codes, clear);
                if (isFound) {
                    this.categoryPages[key].push(i);
                }
            } else {
                const isFound = pageView.findCodes(codes, clear);
                this.foundPagesList[i] = isFound ? isFound : this.foundPagesList[i] !== undefined ? this.foundPagesList[i] : false;
            }
        }
        // console.log('code found: ', this.foundPagesList);
    }

    public searchPages() {
        this.categoryPages = {};
        for (let i = 0; i < this.foundPagesList.length; i++) {
            this.foundPagesList[i] = false;
        }
        for (let i = 0; i < this._pdfPageViews.length; i++) {
            const element = this._pdfPageViews[i];
            element.clear();
        }

        for (const category of this.categories) {
            if (category.Id != -1) {
                const codes = category.CategoryCodes.map(x => x.Code!);

                const key = `category-${category.Id}`;
                this.categoryPages[key] = [];
                this.findPages(codes, false, key);
            }
        }

        // const selected = this.categories.find(x => x.Id === this.selectedCategories?.Id);
        for (const category of this.selectedCategories) {
            if (category.Id! > 0) {
                const codes = category.CategoryCodes.map(x => x.Code!);
                this.findPages(codes, false);
            }
        }

        // if (!!selected) {
        //     const arr = selected.CategoryCodes.map(x => x.Code!);
        //     this.findPages(arr, false);
        // }
    }

    destroy() {
        if (this.pdfContainerElem) {
            (this.pdfContainerElem as any).replaceChildren();
        }
        if (this.thumbsContainerElem) {
            (this.thumbsContainerElem as any).replaceChildren();
        }
    }
}
