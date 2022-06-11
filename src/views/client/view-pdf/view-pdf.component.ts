import VueWrapper from '@/components/core/Vue/vue.wrapper';
import {CategoryApi, CategoryItemModel} from '@/sdk';
import {CategoryModel} from '@/sdk/models/category/category.model';
import {PdfProcessorService} from '@/services/pdf-processor.service';
import {Component} from 'vue-property-decorator';
import JSZip from 'jszip';
import {saveAs} from 'file-saver';

@Component
export default class ViewPdfComponent extends VueWrapper {
    public $refs!: {
        pdfViewer: HTMLDivElement;
        thumbnailsContainer: HTMLDivElement;
        pdfPages: HTMLDivElement;
    };

    // public pageViewer: HTMLDivElement | null = null;

    public zoom: number = 100;

    public pdfProcessorSrv: PdfProcessorService = new PdfProcessorService();

    public pagesCount: number = 0;
    public currentPage: number = 1;

    public color: string = 'rgba(255,0,0,1)';

    // public selectedCategory: number | null = null;

    public query: string | null = null;

    public pdfloaded = false;

    public zip: JSZip | null = null;

    public created() {
        this.zip = new JSZip();
    }

    public mounted() {
        // this.pdfProcessorSrv.pdfLoaded.subscribe(() => {
        //     this.currentPage = 1;
        //     this.pagesCount = this.pdfProcessorSrv.pdf.numPages;
        //     for (let i = 0; i < this.pagesCount; i++) {
        //         this.pdfProcessorSrv.pdf.getPage(i + 1).then((page: any) => {
        //             this.openPage(page);
        //             this.makeThumb(page);
        //         });
        //     }
        // });

        // this.pageViewer = this.$refs.pdfViewer.querySelector('#pdf-pages');

        this.pdfProcessorSrv.fileName.subscribe(fileName => {
            if (!!fileName) {
                // this.initPdfLoad();
            }
        });

        this.pdfProcessorSrv.file.subscribe(file => {
            // console.log('file received: ', file);
            if (!!file) {
                this.initPdfLoad(file);
            }
        });

        this.pdfProcessorSrv.pdfLoaded$.subscribe(res => {
            this.pdfloaded = res;
            this.pdfProcessorSrv.findSelectedCategory();

            if (this.pdfloaded) {
                this.updateZoom();

                // this.pdfProcessorSrv.doSearch();
                this.pdfProcessorSrv.loadPagesAndSearch();
                // this.pdfProcessorSrv.selectedCategoryId = this.pdfProcessorSrv.selectedCategories?.Id!;
            }
        });
    }

    public initPdfLoad(file: File) {
        if (this.$refs.pdfPages && this.$refs.thumbnailsContainer) {
            this.pdfProcessorSrv.pdfLoaded$.next(false);

            const fileReader = new FileReader();
            fileReader.onload = result => {
                const typeDArray = new Uint8Array(fileReader.result as any);

                this.pdfProcessorSrv.OpenFile(
                    typeDArray,
                    // this.pdfProcessorSrv.fileName.value!
                    this.$refs.pdfPages!,
                    this.$refs.thumbnailsContainer
                );
            };

            fileReader.readAsArrayBuffer(file);
        }
    }

    // public openPage(page: any) {
    //     const viewport = page.getViewport({scale: 1});

    //     const canvas = document.createElement('canvas');
    //     canvas.style.display = 'block';
    //     canvas.style.margin = 'auto';

    //     const context = canvas.getContext('2d');

    //     canvas.height = viewport.height;
    //     canvas.width = viewport.width;

    //     const rednerTask = page.render({
    //         canvasContext: context,
    //         viewport
    //     });

    //     rednerTask.promise.then(() => {
    //         console.log('page rendered');
    //     });

    //     this.pageViewer!.appendChild(canvas);

    //     const line = document.createElement('hr');
    //     line.style.marginTop = '10px';
    //     line.style.marginBottom = '10px';
    //     this.pageViewer!.appendChild(line);

    //     this.currentPage++;
    //     // if (this.pdfProcessorSrv.pdf !== null && this.currentPage <= this.pagesCount) {
    //     //     this.pdfProcessorSrv.pdf.getPage(this.currentPage).then(this.openPage);
    //     // }
    // }

    public AddItem() {
        this.pdfProcessorSrv.AddItem();
    }

    public zoomIn() {
        if (this.zoom < 200) {
            this.zoom += 10;
            this.updateZoom();
        }
    }
    public zoomOut() {
        if (this.zoom > 10) {
            this.zoom -= 10;
            this.updateZoom();
        }
    }

    public updateZoom() {
        if (this.$refs.pdfPages) {
            (this.$refs.pdfPages as any).style.zoom = this.zoom + '%';
        }
    }

    public onCategoryClick() {
        // this.pdfProcessorSrv.selectedCategories = [category];
        this.pdfProcessorSrv.findSelectedCategory();
        this.pdfProcessorSrv.loadPagesAndSearch();
    }

    makeThumb(page: any) {
        // draw page to fit into 96x96 canvas
        let vp = page.getViewport({scale: 1});
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.style.display = 'block';
        canvas.style.margin = 'auto';
        canvas.style.marginBottom = '10px';

        canvas.height = 96;
        canvas.width = 76;
        const scale = Math.min(canvas.width / vp.width, canvas.height / vp.height);

        vp = page.getViewport({scale});

        page.render({canvasContext: context, viewport: vp}).promise.then(() => {
            console.log('thumbnail rendered');
        });

        this.$refs.thumbnailsContainer.appendChild(canvas);

        // const line = document.createElement('hr');
        // line.style.marginTop = '10px';
        // line.style.marginBottom = '10px';
        // this.$refs.thumbnailsContainer.appendChild(line);
    }

    public DeleteCategoryItem(item: CategoryItemModel) {
        this.ConfirmSrv.open(`Delete '${item.Name}'`, 'Are you sure you want to delete this keyword?').then(yes => {
            if (yes) {
                this.LoaderSrv.showFullScreenLoader();
                new CategoryApi()
                    .DeleteCategoryItem(item.Id!)
                    .subscribe(
                        res => {
                            if (res.Status) {
                                this.AlertSrv.show('success', 'Keyword has been deleted successfully!');

                                this.pdfProcessorSrv.removeItemFromCategory(item.Id!, item.CategoryId!);
                                this.onCategoryClick();
                            } else {
                                this.AlertSrv.show('warning', 'Unable to delete keyword. Please try again later!');
                            }
                        },
                        err => {
                            this.AlertSrv.show('error', err.Message || err.message);
                        }
                    )
                    .add(() => {
                        this.LoaderSrv.hideFullScreenLoader();
                    });
            }
        });
    }

    public search() {
        this.pdfProcessorSrv.find([this.query!], true);
    }

    public generateCategoryFile(category: CategoryModel) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const element = document.getElementById('pdf-pages');
                console.log('child elements', element?.childElementCount);
                if (element && element.childElementCount > 0) {
                    this.LoaderSrv.showFullScreenLoader(`Generating Pdf Document for ${category.Name}...`);

                    const worker = html2pdf();

                    worker
                        .from(element)
                        .set({
                            // margin: 0,

                            // image: {type: 'png'},
                            // html2canvas: {scale: 2},
                            // jsPDF: {unit: 'in', format: 'letter', orientation: 'p'},
                            pagebreak: {mode: 'avoid-all', before: '.page'}
                        })
                        .outputPdf()
                        .then((pdf: any) => {
                            if (pdf) {
                                const fileName = `${category.Name}.pdf`;
                                this.zip?.file(fileName, pdf, {
                                    binary: true
                                });

                                resolve(fileName);
                                this.LoaderSrv.hideFullScreenLoader();

                                // .generateAsync({type: 'blob'})
                                // .then(content => {
                                //     // saveAs(content, 'pdf-zip.zip');

                                //     // this.initPdfLoad(this.pdfProcessorSrv.getFile()!);
                                //     // this.LoaderSrv.hideFullScreenLoader();
                                // });
                            } else {
                                resolve(null);
                                this.LoaderSrv.hideFullScreenLoader();
                            }
                        });
                } else {
                    resolve(null);
                }
            }, 1000);
        });
    }

    count = 1;
    currentSelectedCategory: number | null = null;
    generatedFiles: number = 0;

    processCategoriesForDownload(startId: number) {
        if (this.count < this.pdfProcessorSrv.categories.length && startId === -1) {
            this.pdfProcessorSrv.selectedCategoryId = this.pdfProcessorSrv.categories[this.count].Id;
            this.onCategoryClick();

            return this.generateCategoryFile(this.pdfProcessorSrv.categories[this.count]).then(result => {
                // console.log('generateCategoryFile result', result);
                if (!!result) {
                    this.generatedFiles++;
                }
                this.count++;

                return new Promise((res: (v: number) => void, rej) => {
                    this.processCategoriesForDownload(startId).then(num => {
                        // console.log('category inner: ', num);
                        res(num);
                    });
                });
            });
        } else {
            return this.generateCategoryFile(this.pdfProcessorSrv.selectedCategories[0]).then(result => {
                // console.log('generateCategoryFile result', result);
                if (!!result) {
                    this.generatedFiles++;
                }
                this.count++;

                return Promise.resolve(this.count);
            });
        }

        return Promise.resolve(this.count);
    }

    public download() {
        this.generatedFiles = 0;
        this.currentSelectedCategory = this.pdfProcessorSrv.selectedCategoryId;
        this.LoaderSrv.showFullScreenLoader();
        this.processCategoriesForDownload(this.currentSelectedCategory!)
            .then(num => {
                // console.log('category: ', num);

                this.pdfProcessorSrv.selectedCategoryId = this.currentSelectedCategory;
                this.onCategoryClick();

                if (this.zip) {
                    this.LoaderSrv.showFullScreenLoader('Generating zip file.');
                    this.zip
                        ?.generateAsync({type: 'blob'})
                        .then(function(content) {
                            saveAs(content, 'equipments.zip');
                        })
                        .finally(() => {
                            this.LoaderSrv.hideFullScreenLoader();
                        });
                }
            })
            .finally(() => {
                this.LoaderSrv.hideFullScreenLoader();
            });
    }
}
