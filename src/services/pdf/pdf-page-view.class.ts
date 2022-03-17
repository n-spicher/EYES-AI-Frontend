import {AnyObject} from '@/globals';
import {PDFPageProxy, PixelsPerInch, renderTextLayer, Util, XfaLayer} from 'pdfjs-dist';
import {TextContent} from 'pdfjs-dist/types/src/display/api';
import {PageViewport} from 'pdfjs-dist/types/src/display/display_utils';
import {LinkService} from '../LinkService';
import {TextHighlighterClass} from './text-highligher.class';

export class PdfPageView {
    public id: number | null = null;
    public pdfViewerElem: HTMLDivElement | null = null;
    public pageEleme: HTMLDivElement | null = null;

    public page: PDFPageProxy | null = null;
    public viewport: PageViewport | null = null;
    public pageTextContent: TextContent | null = null;
    public pageTextItems: Array<string> = [];
    public rotation: number = 0;
    public pdfPageRotation: number = 0;
    public scale: number = 1;

    public pageLoaded: boolean = false;

    // public xfaHtml: AnyObject | null = null;
    public textDivs: Array<HTMLElement> = [];

    public textHighlighter: TextHighlighterClass;

    constructor(data?: Partial<PdfPageView>) {
        this.pageTextItems = [];
        Object.assign(this, data);
        this.textHighlighter = new TextHighlighterClass();

        if (!this.pageEleme) {
            this.pageEleme = this.createEmptyPage(this.id!);
            this.pdfViewerElem?.appendChild(this.pageEleme);
        }
    }

    public setViewerElem(div: HTMLDivElement) {
        this.pdfViewerElem = div;
    }

    public async setPage(page: PDFPageProxy) {
        this.page = page;

        this.pdfPageRotation = this.page.rotate;

        const totalRotation = (this.rotation + this.rotation) % 360;
        this.viewport = page.getViewport({
            scale: this.scale * (PixelsPerInch.CSS / PixelsPerInch.PDF),
            rotation: totalRotation
        });

        this.pageTextContent = await this.page.getTextContent();

        for (const item of this.pageTextContent.items) {
            this.pageTextItems.push((item as any).str);
        }

        this.textHighlighter.setTextMapping(this.textDivs, this.pageTextItems);

        // await this.draw();
    }

    public async draw() {
        if (!this.pageEleme) {
            return;
        }

        const canvas = this.pageEleme.querySelector('canvas');
        const wrapper: HTMLDivElement = this.pageEleme.querySelector('.canvasWrapper') as HTMLDivElement;
        const container: HTMLDivElement = this.pageEleme.querySelector('.textLayer') as HTMLDivElement;

        const canvasContext = canvas!.getContext('2d');

        canvas!.width = this.viewport!.width;
        canvas!.height = this.viewport!.height;
        this.pageEleme.style.width = `${this.viewport!.width}px`;
        this.pageEleme.style.height = `${this.viewport!.height}px`;
        wrapper!.style.width = `${this.viewport!.width}px`;
        wrapper!.style.height = `${this.viewport!.height}px`;
        container.style.width = `${this.viewport!.width}px`;
        container.style.height = `${this.viewport!.height}px`;

        this.page?.render({
            canvasContext: canvasContext!,
            viewport: this.viewport!
        });

        await renderTextLayer({
            textContent: this.pageTextContent!,
            container: container!,
            viewport: this.viewport!,
            textDivs: this.textDivs
        }).promise;

        this.textHighlighter.setTextMapping(this.textDivs, this.pageTextItems);

        this.pageEleme.setAttribute('data-loaded', 'true');
    }

    public findCodes(q: Array<string>, clear = true) {
        let found = false;
        for (let i = 0; i < q.length; i++) {
            const f = this.textHighlighter._calculateMatch(q[i], clear);
            if (f) found = f;
        }

        return found;
    }

    public find(q: Array<string>, clear: boolean) {
        let found = false;
        for (let i = 0; i < q.length; i++) {
            const f = this.textHighlighter._calculateMatch(q[i], clear);
            if (f) found = f;
        }

        return found;
    }

    public clear() {
        this.textHighlighter?.clear();
    }

    createEmptyPage(num: number) {
        const page = document.createElement('div');
        const canvas = document.createElement('canvas');
        const wrapper = document.createElement('div');
        const textLayer = document.createElement('div');

        page.className = 'page';

        wrapper.className = 'canvasWrapper';
        textLayer.className = 'textLayer';

        page.setAttribute('id', `pageContainer${num}`);
        page.setAttribute('data-loaded', 'false');
        page.setAttribute('data-page-number', `${num}`);

        canvas.setAttribute('id', `page${num}`);

        page.appendChild(wrapper);
        page.appendChild(textLayer);
        wrapper.appendChild(canvas);

        return page;
    }

    public showPage() {
        if (!!this.pageEleme) {
            this.pageEleme.style.display = 'block';
            this.pageEleme.removeAttribute('data-hidden');
            this.pageLoaded = true;
        }
    }

    public hidePage() {
        if (!!this.pageEleme) {
            this.pageEleme.style.display = 'none';
            this.pageEleme.setAttribute('data-hidden', 'true');
            this.pageLoaded = false;
        }
    }

    destroy() {}
}
