import {ServiceClass} from '@/decorators';
import {IPDFLinkService} from 'pdfjs-dist/types/web/interfaces';

@ServiceClass()
export class LinkService implements IPDFLinkService {
    get pagesCount(): number {
        throw new Error('Method not implemented.');
    }
    set page(arg: number) {
        throw new Error('Method not implemented.');
    }
    get page(): number {
        throw new Error('Method not implemented.');
    }
    set rotation(arg: number) {
        throw new Error('Method not implemented.');
    }
    get rotation(): number {
        throw new Error('Method not implemented.');
    }
    set externalLinkEnabled(arg: boolean) {
        throw new Error('Method not implemented.');
    }
    get externalLinkEnabled(): boolean {
        throw new Error('Method not implemented.');
    }
    goToDestination(dest: string | any[]): Promise<void> {
        throw new Error('Method not implemented.');
    }
    goToPage(val: string | number): void {
        throw new Error('Method not implemented.');
    }
    addLinkAttributes(link: HTMLAnchorElement, url: string, newWindow?: boolean): void {
        throw new Error('Method not implemented.');
    }
    getDestinationHash(dest: any): string {
        throw new Error('Method not implemented.');
    }
    getAnchorUrl(hash: any): string {
        throw new Error('Method not implemented.');
    }
    setHash(hash: string): void {
        throw new Error('Method not implemented.');
    }
    executeNamedAction(action: string): void {
        throw new Error('Method not implemented.');
    }
    cachePageRef(pageNum: number, pageRef: Record<string, any>): void {
        throw new Error('Method not implemented.');
    }
    isPageVisible(pageNumber: number): void {
        throw new Error('Method not implemented.');
    }
    isPageCached(pageNumber: number): void {
        throw new Error('Method not implemented.');
    }
}
