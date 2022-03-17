import {AnyObject, getOutputScale} from '@/globals';
import {PDFPageProxy, PixelsPerInch, renderTextLayer, Util, XfaLayer} from 'pdfjs-dist';
import {TextContent} from 'pdfjs-dist/types/src/display/api';
import {PageViewport} from 'pdfjs-dist/types/src/display/display_utils';
import {LinkService} from '../LinkService';
import {TextHighlighterClass} from './text-highligher.class';

const DRAW_UPSCALE_FACTOR = 2; // See comment in `PDFThumbnailView.draw` below.
const MAX_NUM_SCALING_STEPS = 3;
const THUMBNAIL_CANVAS_BORDER_WIDTH = 1; // px
const THUMBNAIL_WIDTH = 98; // px

class TempImageFactory {
    static tempCanvas1: any = null;

    static getCanvas(width: number, height: number) {
        if (!this.tempCanvas1) {
            this.tempCanvas1 = document.createElement('canvas');
        }
        const tempCanvas = this.tempCanvas1;
        tempCanvas.width = width;
        tempCanvas.height = height;

        const ctx = tempCanvas.getContext('2d', {alpha: false});
        ctx.save();
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
        return [tempCanvas, tempCanvas.getContext('2d')];
    }

    static destroyCanvas() {
        const tempCanvas = this.tempCanvas1;
        if (tempCanvas) {
            // Zeroing the width and height causes Firefox to release graphics
            // resources immediately, which can greatly reduce memory consumption.
            tempCanvas.width = 0;
            tempCanvas.height = 0;
        }
        this.tempCanvas1 = null;
    }
}

export class PdfPageThumbnail {
    public id: number;
    public pdfThumbsElem: HTMLDivElement;
    public thumbElem?: HTMLDivElement | null = null;
    public ring?: HTMLDivElement | null = null;
    public anchor?: HTMLAnchorElement | null = null;

    public page?: PDFPageProxy | null = null;
    public viewport?: PageViewport | null = null;
    // public pageTextContent: TextContent | null = null;
    // public pageTextItems: Array<string> = [];
    public rotation: number = 0;
    public pdfPageRotation: number = 0;
    public scale: number = 1;

    public canvasWidth: number = 98;
    public canvasHeight: number = 0;

    public renderTask: any = null;

    public image: HTMLImageElement | null = null;

    // public xfaHtml: AnyObject | null = null;
    // public textDivs: Array<HTMLElement> = [];

    // public textHighlighter: TextHighlighterClass;

    constructor(data: {id: number; pdfThumbsElem: HTMLDivElement}) {
        this.id = data.id;
        this.pdfThumbsElem = data.pdfThumbsElem;

        // this.pageTextItems = [];
        // this.textHighlighter = new TextHighlighterClass();
        // Object.assign(this, data);

        if (!this.thumbElem) {
            // this.thumbElem = this.createEmptyPage(this.id!);
            // this.pdfThumbsElem?.appendChild(this.thumbElem);
        }

        const anchor = document.createElement('a');
        anchor.href = '#pageContainer' + this.id;
        // this._thumbPageTitle.then(msg => {
        //   anchor.title = msg;
        // });
        anchor.onclick = function() {
            //   linkService.goToPage(id);
            return false;
        };
        this.anchor = anchor;

        const div = document.createElement('div');
        div.className = 'thumbnail';
        div.setAttribute('data-page-number', `${this.id}`);
        this.thumbElem = div;

        const span = document.createElement('span');
        span.innerHTML = `${this.id}`;
        span.className = 'page-number';

        const ring = document.createElement('div');
        ring.className = 'thumbnailSelectionRing';

        this.ring = ring;

        div.appendChild(span);
        div.appendChild(ring);
        anchor.appendChild(div);
        this.pdfThumbsElem.appendChild(anchor);
    }

    public showThumbnail() {
        if (!!this.thumbElem) {
            this.thumbElem.style.display = 'block';
        }
    }

    public hideThumb() {
        if (!!this.thumbElem) {
            this.thumbElem.style.display = 'none';
        }
    }

    public setViewerElem(div: HTMLDivElement) {
        this.pdfThumbsElem = div;
    }

    public async setPage(page: PDFPageProxy) {
        this.page = page;

        this.pdfPageRotation = this.page.rotate;

        const totalRotation = (this.rotation + this.rotation) % 360;
        this.viewport = page.getViewport({
            scale: this.scale,
            rotation: totalRotation
        });

        const pageWidth = this.viewport.width;
        const pageHeight = this.viewport.height;
        const pageRatio = pageWidth / pageHeight;

        this.canvasHeight = (this.canvasWidth / pageRatio) | 0;
        this.scale = this.canvasWidth / pageWidth;

        const borderAdjustment = 2 * 2;
        this.ring!.style.width = this.canvasWidth + borderAdjustment + 'px';
        this.ring!.style.height = this.canvasHeight + borderAdjustment + 'px';

        // this.pageTextContent = await this.page.getTextContent();

        // for (const item of this.pageTextContent.items) {
        //     this.pageTextItems.push((item as any).str);
        // }

        // this.draw();
    }

    public async draw1() {
        if (!this.thumbElem) {
            return;
        }

        const canvas = this.thumbElem.querySelector('canvas');
        const wrapper: HTMLDivElement = this.thumbElem.querySelector('.canvasWrapper') as HTMLDivElement;
        const container: HTMLDivElement = this.thumbElem.querySelector('.textLayer') as HTMLDivElement;

        const canvasContext = canvas!.getContext('2d');

        canvas!.width = this.viewport!.width;
        canvas!.height = this.viewport!.height;
        this.thumbElem.style.width = `${this.viewport!.width}px`;
        this.thumbElem.style.height = `${this.viewport!.height}px`;
        wrapper!.style.width = `${this.viewport!.width}px`;
        wrapper!.style.height = `${this.viewport!.height}px`;
        container.style.width = `${this.viewport!.width}px`;
        container.style.height = `${this.viewport!.height}px`;

        this.page?.render({
            canvasContext: canvasContext!,
            viewport: this.viewport!
        });

        // await renderTextLayer({
        //     textContent: this.pageTextContent!,
        //     container: container!,
        //     viewport: this.viewport!,
        //     textDivs: this.textDivs
        // }).promise;

        // this.textHighlighter.setTextMapping(this.textDivs, this.pageTextItems);

        this.thumbElem.setAttribute('data-loaded', 'true');
    }

    // public find(q: string) {
    //     this.textHighlighter._calculateMatch(q);
    // }

    createEmptyPage(num: number) {
        const page = document.createElement('div');
        const canvas = document.createElement('canvas');
        const wrapper = document.createElement('div');
        const textLayer = document.createElement('div');

        page.className = 'page';
        wrapper.className = 'canvasWrapper';
        textLayer.className = 'textLayer';

        page.setAttribute('id', `pageContainerThumbnail${num}`);
        page.setAttribute('data-loaded', 'false');
        page.setAttribute('data-page-number', `${num}`);

        canvas.setAttribute('id', `page${num}`);

        page.appendChild(wrapper);
        page.appendChild(textLayer);
        wrapper.appendChild(canvas);

        return page;
    }

    _convertCanvasToImage(canvas: HTMLCanvasElement) {
        const reducedCanvas = this._reduceImage(canvas);

        const image = document.createElement('img');
        image.className = 'thumbnailImage';
        // this._thumbPageCanvas.then(msg => {
        //   image.setAttribute("aria-label", msg);
        // });
        image.style.width = this.canvasWidth + 'px';
        image.style.height = this.canvasHeight + 'px';

        image.src = reducedCanvas.toDataURL();
        this.image = image;

        this.thumbElem?.setAttribute('data-loaded', 'true');
        this.ring?.appendChild(image);

        // Zeroing the width and height causes Firefox to release graphics
        // resources immediately, which can greatly reduce memory consumption.
        reducedCanvas.width = 0;
        reducedCanvas.height = 0;
    }

    draw() {
        const finishRenderTask = async (error = null) => {
            // The renderTask may have been replaced by a new one, so only remove
            // the reference to the renderTask if it matches the one that is
            // triggering this callback.
            //   if (renderTask === this.renderTask) {
            //     this.renderTask = null;
            //   }

            //   if (error instanceof RenderingCancelledException) {
            //     return;
            //   }
            //   this.renderingState = RenderingStates.FINISHED;
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            this._convertCanvasToImage(canvas);

            if (error) {
                throw error;
            }
        };

        // Render the thumbnail at a larger size and downsize the canvas (similar
        // to `setImage`), to improve consistency between thumbnails created by
        // the `draw` and `setImage` methods (fixes issue 8233).
        // NOTE: To primarily avoid increasing memory usage too much, but also to
        //   reduce downsizing overhead, we purposely limit the up-scaling factor.
        const {ctx, canvas, transform} = this._getPageDrawContext(2);
        const drawViewport = this.viewport!.clone({
            scale: 2 * this.scale
        });
        const renderContinueCallback = (cont: any) => {
            //   if (!this.renderingQueue.isHighestPriority(this)) {
            //     this.renderingState = RenderingStates.PAUSED;
            //     this.resume = () => {
            //       this.renderingState = RenderingStates.RUNNING;
            //       cont();
            //     };
            //     return;
            //   }
            cont();
        };

        const renderContext = {
            canvasContext: ctx!,
            transform: transform!,
            viewport: drawViewport
            //   optionalContentConfigPromise: this._optionalContentConfigPromise,
        };
        const renderTask = (this.renderTask = this.page!.render(renderContext));
        renderTask.onContinue = renderContinueCallback;

        const resultPromise = renderTask.promise.then(
            function() {
                return finishRenderTask(null);
            },
            function(error) {
                return finishRenderTask(error);
            }
        );
        resultPromise.finally(() => {
            // Zeroing the width and height causes Firefox to release graphics
            // resources immediately, which can greatly reduce memory consumption.
            canvas.width = 0;
            canvas.height = 0;
        });

        return resultPromise;
    }

    _reduceImage(img: HTMLCanvasElement) {
        const {ctx, canvas} = this._getPageDrawContext();

        if (img.width <= 2 * canvas.width) {
            ctx!.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
            return canvas;
        }
        // drawImage does an awful job of rescaling the image, doing it gradually.
        let reducedWidth = canvas.width << MAX_NUM_SCALING_STEPS;
        let reducedHeight = canvas.height << MAX_NUM_SCALING_STEPS;
        const [reducedImage, reducedImageCtx] = TempImageFactory.getCanvas(reducedWidth, reducedHeight);

        while (reducedWidth > img.width || reducedHeight > img.height) {
            reducedWidth >>= 1;
            reducedHeight >>= 1;
        }
        reducedImageCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, reducedWidth, reducedHeight);
        while (reducedWidth > 2 * canvas.width) {
            reducedImageCtx.drawImage(reducedImage, 0, 0, reducedWidth, reducedHeight, 0, 0, reducedWidth >> 1, reducedHeight >> 1);
            reducedWidth >>= 1;
            reducedHeight >>= 1;
        }
        ctx?.drawImage(reducedImage, 0, 0, reducedWidth, reducedHeight, 0, 0, canvas.width, canvas.height);
        return canvas;
    }

    destroy() {}

    _getPageDrawContext(upscaleFactor = 1) {
        // Keep the no-thumbnail outline visible, i.e. `data-loaded === false`,
        // until rendering/image conversion is complete, to avoid display issues.
        const canvas = document.createElement('canvas');

        // if (
        //   typeof PDFJSDev === "undefined" ||
        //   PDFJSDev.test("MOZCENTRAL || GENERIC")
        // ) {
        //   canvas.mozOpaque = true;
        // }
        const ctx = canvas.getContext('2d', {alpha: false});
        const outputScale: any = getOutputScale(ctx);

        canvas.width = (upscaleFactor * this.canvasWidth * outputScale.sx) | 0;
        canvas.height = (upscaleFactor * this.canvasHeight * outputScale.sy) | 0;

        const transform = outputScale.scaled ? [outputScale.sx, 0, 0, outputScale.sy, 0, 0] : null;

        return {ctx, canvas, transform};
    }
}
