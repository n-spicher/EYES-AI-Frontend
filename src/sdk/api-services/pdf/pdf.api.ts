import {ServiceClass} from '@/decorators';
import {BaseApi} from '..';

@ServiceClass()
export class PdfApi extends BaseApi {
    public UploadPdf(file: File) {
        const data = new FormData();

        data.append('file', file);

        return this.POST_FileRequest<{FileName: string}>(`${this.ApiUrl}/Pdf/UploadPdf`, data);
    }
}
