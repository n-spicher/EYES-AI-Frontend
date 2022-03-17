/* eslint-disable @typescript-eslint/class-name-casing */
export class GLOBAL_CONSTANTS {
    public static PageSize: number = 30;
    public static itemsPerPageOptions = [30, 50, 100, 200, -1];
}

export enum PRINCIPAL_TYPES {
    USER = 'USER'
}
export enum MEDIA_TYPES {
    ICON_FILE = 'ICON_FILE',
    PNG_FILE = 'PNG_FILE'
}
export enum PARK_SITE_STATUSES {
    NoParkData = 'NoParkData',
    Claimed = 'Claimed',
    UnClaimed = 'UnClaimed'
}

export const resizeImageToSpecificWidth = (base64: string): Promise<File> => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    let resolve: Function;
    img.onload = async () => {
        // if (img.width > 1000) {
        canvas.height = canvas.width * (img.height / img.width);
        const oc = document.createElement('canvas');
        const octx = oc.getContext('2d')!;
        oc.width = img.width * 0.5;
        oc.height = img.height * 0.5;
        octx.drawImage(img, 0, 0, oc.width, oc.height);
        octx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5);
        ctx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(blob => {
            if (blob) {
                resolve(
                    new File([blob], 'media.png', {
                        type: 'image/png',
                        lastModified: Date.now()
                    })
                );
            }
        });
        // } else {
        //     resolve(await urltoFile(base64, 'profile.png', 'image/png'));
        // }
    };
    img.src = base64;
    return new Promise((res: Function) => {
        resolve = res;
    });
};

export enum DIALOG_NAMES {
    PdfPickerDialog = 'pdf-picker-dialog'
}
