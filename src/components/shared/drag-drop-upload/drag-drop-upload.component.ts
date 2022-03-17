import Component from 'vue-class-component';
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import {Prop} from 'vue-property-decorator';
import VueWrapper from '@/components/core/Vue/vue.wrapper';
import {ValidationProvider} from 'vee-validate';

@Component({
    components: {
        vueDropzone: vue2Dropzone,
        ValidationProvider
    }
})
export default class DragDropUploadComponent extends VueWrapper {
    public $refs!: {
        dragDropUploadRef: any;
    };

    // Props
    @Prop({required: true})
    private readonly file!: Array<File> | null;

    @Prop({default: '', type: String})
    private readonly rules!: string;

    @Prop({default: 1, type: Number})
    private readonly maxFiles!: number;

    @Prop({default: null, type: String})
    public readonly acceptedFiles!: string;

    // Properties
    public get dropzoneOptions() {
        return {
            url: 'https://httpbin.org/post',
            autoProcessQueue: false,
            addRemoveLinks: true,
            maxFiles: this.maxFiles,
            maxFilesize: 100,
            thumbnailWidth: 150,

            dictFileTooBig: `Max file upload limit is {{maxFilesize}}MB`
        };
    }

    // Methods
    public addFile(e: File) {
        if (this.maxFiles < 2) {
            if (this.file?.length) {
                this.$refs.dragDropUploadRef.removeFile(this.file[0]);

                this.removeFile(this.file[0]);
                // this.$emit('update:file', e);
            }
        }
        if (this.file) {
            this.file.push(e);
            this.$emit('update:file', this.file);
            this.$emit('fileAdded', e);
        }
    }
    public removeFile(e: File) {
        // if (this.maxFiles < 2) {
        //     this.$emit('update:file', null);
        // } else {
        const index = (this.file as Array<File>).findIndex(file => file.name === e.name);
        if (index > -1) {
            (this.file as Array<File>).splice(index, 1);
        }
        // }
    }
    public removeAllFiles() {
        this.$refs.dragDropUploadRef.removeAllFiles(true);
    }
}
