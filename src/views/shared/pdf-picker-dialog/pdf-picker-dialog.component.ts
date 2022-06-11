import VueWrapper from '@/components/core/Vue/vue.wrapper';
import DragDropUploadComponent from '@/components/shared/drag-drop-upload/drag-drop-upload.component';
import {DIALOG_NAMES} from '@/globals';
import {PdfApi} from '@/sdk/api-services/pdf/pdf.api';
import {PdfProcessorService} from '@/services/pdf-processor.service';
import {Component} from 'vue-property-decorator';

@Component
export default class PdfPickerDialogComponent extends VueWrapper {
    public $refs!: {
        dragDropRef: DragDropUploadComponent;
    };
    public name: string = DIALOG_NAMES.PdfPickerDialog;

    public files: Array<File> = [];

    public pdfProcessorSrv: PdfProcessorService = new PdfProcessorService();

    public searchValue: string | null = null;

    public items: Array<any> = [{name: 'Cooling Tower'}, {name: 'VFD'}, {name: 'Hydronic Pumps'}];

    // public items: Array<any> = [
    //     {header: 'Cooling Tower'},
    //     {name: 'manufacturers'},
    //     {name: 'evapco'},
    //     {name: 'warranty'},
    //     {name: 'basin heater'},
    //     {name: 'control panel'},
    //     {name: 'equalizer connection'},
    //     {name: 'walkway'},

    //     {header: 'VFD'},
    //     {name: 'bypass'},
    //     {name: 'danfoss'},
    //     {name: 'bacnet'},
    //     {name: 'communication'},
    //     {name: 'type 12'},
    //     {name: 'type 3R'},

    //     {header: 'Hydronic Pumps'},
    //     {name: 'bronze wear rings'},
    //     {name: 'pump shaft'},
    //     {name: 'armstrong'},
    //     {name: 'in-line'},
    //     {name: 'base mounted'},
    //     {name: 'shaft grounding rings'},
    //     {name: 'extra materials'}
    // ];

    public acceptedFiles: string = 'application/pdf';

    public mounted() {
        this.pdfProcessorSrv.findSelectedCategory();
    }

    public Add() {
        this.pdfProcessorSrv.AddItem();
    }

    public categoryChanged(ev: any) {
        this.pdfProcessorSrv.findSelectedCategory();
        // this.pdfProcessorSrv.categorySelected = this.pdfProcessorSrv.categories.find(x => x.Id == ev) ?? null;
    }

    public fileChanged() {
        if (this.files.length) {
            // this.LoaderSrv.showFullScreenLoader();
            // this.LoaderSrv.showProgressBarLoader();
            // new PdfApi()
            //     .UploadPdf(this.files[0])
            //     .subscribe(
            //         res => {
            //             if (res.FileName) {
            //                 this.pdfProcessorSrv.setFileName(res.FileName);
            //                 if (this.$route.name !== 'View PDF') {
            //                     this.$router.push({name: 'View PDF'});
            //                 }

            //                 this.Close();
            //             }
            //         },
            //         err => {
            //             console.log(err);
            //         }
            //     )
            //     .add(() => {
            //         this.LoaderSrv.hideFullScreenLoader();
            //         this.LoaderSrv.hideProgressBarLoader();
            //     });
            console.log('file', this.files);
            this.pdfProcessorSrv.setFile(this.files[0]);
            if (this.$route.name !== 'View PDF') {
                this.$router.push({name: 'View PDF'});
            }
            this.Close();
            // new PdfProcessorService().OpenFile(this.files[0]);
        }
    }

    public Close() {
        this.$refs.dragDropRef.removeAllFiles();
        this.files = [];
        this.CoreSrv.CloseModal(this.name);
    }
}
