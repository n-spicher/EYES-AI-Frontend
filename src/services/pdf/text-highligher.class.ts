import {getCharacterType, normalize} from '@/globals';

export class TextHighlighterClass {
    textDivs: Array<HTMLElement> = [];
    textContentItemsStr: Array<string> = [];
    enabled: boolean = true;
    pageMatches: Array<any> = [];
    pageMatchesLength: Array<any> = [];
    matches: Array<any> = [];

    _pageContents: string | null = null;
    _pageDiffs: string | null = null;
    constructor() {}

    setTextMapping(divs: Array<HTMLElement>, texts: Array<string>) {
        this.textDivs = divs;
        this.textContentItemsStr = texts;

        [this._pageContents, this._pageDiffs] = normalize(this.textContentItemsStr.join(''));
    }

    _convertMatches(matches: Array<any>, matchesLength: Array<number>) {
        // Early exit if there is nothing to convert.
        if (!matches) {
            return [];
        }
        const {textContentItemsStr} = this;

        let i = 0,
            iIndex = 0;
        const end = textContentItemsStr.length - 1;
        const result = [];

        for (let m = 0, mm = matches.length; m < mm; m++) {
            // Calculate the start position.
            let matchIdx = matches[m];

            // Loop over the divIdxs.
            while (i !== end && matchIdx >= iIndex + textContentItemsStr[i].length) {
                iIndex += textContentItemsStr[i].length;
                i++;
            }

            if (i === textContentItemsStr.length) {
                console.error('Could not find a matching mapping');
            }

            const match: any = {
                begin: {
                    divIdx: i,
                    offset: matchIdx - iIndex
                }
            };

            // Calculate the end position.
            matchIdx += matchesLength[m];

            // Somewhat the same array as above, but use > instead of >= to get
            // the end position right.
            while (i !== end && matchIdx > iIndex + textContentItemsStr[i].length) {
                iIndex += textContentItemsStr[i].length;
                i++;
            }

            match.end = {
                divIdx: i,
                offset: matchIdx - iIndex
            };
            result.push(match);
        }
        return result;
    }

    _calculateOnlyMatch(query: string, clear: boolean = false): boolean {
        const pagecontent = this._pageContents!;
        const pageDiffs = this._pageDiffs!;
        const phraseSearch = true;
        const caseSensitive = false;

        this.pageMatches = [];
        this.pageMatchesLength = [];

        if (query.length === 0) {
            // Do nothing: the matches should be wiped out already.
            return false;
        }

        if (!caseSensitive) {
            this._pageContents = pagecontent.toLowerCase();
            // for (let i = 0; i < query.length; i++) {
            //     query[i] = query[i].toLocaleLowerCase();
            // }

            query = query.toLowerCase();
        }

        if (phraseSearch) {
            // for (const q of query) {
            //     const matesObj = this._calculatePhraseMatch(q, pagecontent, pageDiffs, false);
            //     this.pageMatches.push(...matesObj.matches);
            //     this.pageMatchesLength.push(...matesObj.matchesLength);
            // }

            const matesObj = this._calculatePhraseMatch(query, pagecontent, pageDiffs, false);
            return matesObj.matches?.length > 0;
        } else {
            // this._calculateWordMatch(query, pagecontent, pageDiffs, false);
            return false;
        }
    }

    _calculateMatch(query: string, clear: boolean = false): boolean {
        const pagecontent = this._pageContents!;
        const pageDiffs = this._pageDiffs!;
        const phraseSearch = true;
        const caseSensitive = false;

        this.pageMatches = [];
        this.pageMatchesLength = [];

        if (query.length === 0) {
            // Do nothing: the matches should be wiped out already.
            return false;
        }

        if (!caseSensitive) {
            this._pageContents = pagecontent.toLowerCase();
            // for (let i = 0; i < query.length; i++) {
            //     query[i] = query[i].toLocaleLowerCase();
            // }

            query = query.toLowerCase();
        }

        if (phraseSearch) {
            // for (const q of query) {
            //     const matesObj = this._calculatePhraseMatch(q, pagecontent, pageDiffs, false);
            //     this.pageMatches.push(...matesObj.matches);
            //     this.pageMatchesLength.push(...matesObj.matchesLength);
            // }

            const matesObj = this._calculatePhraseMatch(query, pagecontent, pageDiffs, false);
            this.pageMatches = matesObj.matches;
            this.pageMatchesLength = matesObj.matchesLength;
        } else {
            // this._calculateWordMatch(query, pagecontent, pageDiffs, false);
        }

        this._updateMatches(clear);

        return this.pageMatches.length > 0;
    }

    getOriginalIndex(matchIndex: number, diffs: any = null) {
        if (!diffs) {
            return matchIndex;
        }
        let totalDiff = 0;
        for (const [index, diff] of diffs) {
            const currentIndex = index + totalDiff;

            if (currentIndex >= matchIndex) {
                break;
            }
            if (currentIndex + diff > matchIndex) {
                totalDiff += matchIndex - currentIndex;
                break;
            }
            totalDiff += diff;
        }
        return matchIndex - totalDiff;
    }

    _calculatePhraseMatch(query: string, pageContent: string, pageDiffs: string, entireWord: boolean) {
        const matches = [],
            matchesLength = [];
        const queryLen = query.length;

        let matchIdx = -queryLen;
        // eslint-disable-next-line no-constant-condition
        while (true) {
            matchIdx = this._pageContents!.indexOf(query, matchIdx + queryLen);
            if (matchIdx === -1) {
                break;
            }
            if (entireWord && !this._isEntireWord(pageContent, matchIdx, queryLen)) {
                continue;
            }
            const originalMatchIdx = this.getOriginalIndex(matchIdx, pageDiffs),
                matchEnd = matchIdx + queryLen - 1,
                originalQueryLen = this.getOriginalIndex(matchEnd, pageDiffs) - originalMatchIdx + 1;

            matches.push(originalMatchIdx);
            matchesLength.push(originalQueryLen);
        }

        // console.log(matches, matchesLength);
        // this.pageMatches = matches;
        // this.pageMatchesLength = matchesLength;

        return {
            matches,
            matchesLength
        };
    }

    _calculateWordMatch(query: string, pageContent: string, pageDiffs: string, entireWord: boolean) {
        const matchesWithLength = [];

        // Divide the query into pieces and search for text in each piece.
        const queryArray = query.match(/\S+/g);
        for (let i = 0, len = queryArray!.length; i < len; i++) {
            const subquery = queryArray![i];
            const subqueryLen = subquery.length;

            let matchIdx = -subqueryLen;
            // eslint-disable-next-line no-constant-condition
            while (true) {
                matchIdx = this._pageContents!.indexOf(subquery, matchIdx + subqueryLen);
                if (matchIdx === -1) {
                    break;
                }
                if (entireWord && !this._isEntireWord(pageContent, matchIdx, subqueryLen)) {
                    continue;
                }
                const originalMatchIdx = this.getOriginalIndex(matchIdx, pageDiffs),
                    matchEnd = matchIdx + subqueryLen - 1,
                    originalQueryLen = this.getOriginalIndex(matchEnd, pageDiffs) - originalMatchIdx + 1;

                // Other searches do not, so we store the length.
                matchesWithLength.push({
                    match: originalMatchIdx,
                    matchLength: originalQueryLen,
                    skipped: false
                });
            }
        }

        // // Prepare arrays for storing the matches.
        // this._pageMatchesLength[pageIndex] = [];
        // this._pageMatches[pageIndex] = [];

        // // Sort `matchesWithLength`, remove intersecting terms and put the result
        // // into the two arrays.
        // this._prepareMatches(
        //   matchesWithLength,
        //   this._pageMatches[pageIndex],
        //   this._pageMatchesLength[pageIndex]
        // );
    }

    _isEntireWord(content: string, startIdx: number, length: number) {
        if (startIdx > 0) {
            const first = content.charCodeAt(startIdx);
            const limit = content.charCodeAt(startIdx - 1);
            if (getCharacterType(first) === getCharacterType(limit)) {
                return false;
            }
        }
        const endIdx = startIdx + length - 1;
        if (endIdx < content.length - 1) {
            const last = content.charCodeAt(endIdx);
            const limit = content.charCodeAt(endIdx + 1);
            if (getCharacterType(last) === getCharacterType(limit)) {
                return false;
            }
        }
        return true;
    }

    public clear() {
        const {matches} = this;
        const {textContentItemsStr, textDivs} = this;
        let clearedUntilDivIdx = -1;

        for (let i = 0, ii = matches.length; i < ii; i++) {
            const match = matches[i];
            const begin = Math.max(clearedUntilDivIdx, match.begin.divIdx);
            for (let n = begin, end = match.end.divIdx; n <= end; n++) {
                const div = textDivs[n];
                div.textContent = textContentItemsStr[n];
                div.className = '';
            }
            clearedUntilDivIdx = match.end.divIdx + 1;
        }

        this.matches = [];
    }

    _updateMatches(clear: boolean) {
        if (!this.enabled) {
            return;
        }

        const {matches} = this;
        const {textContentItemsStr, textDivs} = this;
        let clearedUntilDivIdx = -1;

        if (clear) {
            // Clear all current matches.
            for (let i = 0, ii = matches.length; i < ii; i++) {
                const match = matches[i];
                const begin = Math.max(clearedUntilDivIdx, match.begin.divIdx);
                for (let n = begin, end = match.end.divIdx; n <= end; n++) {
                    const div = textDivs[n];
                    div.textContent = textContentItemsStr[n];
                    div.className = '';
                }
                clearedUntilDivIdx = match.end.divIdx + 1;
            }
        }

        // Convert the matches on the `findController` into the match format
        // used for the textLayer.
        const pageMatches = this.pageMatches || null;
        const pageMatchesLength = this.pageMatchesLength || null;

        if (clear) {
            this.matches = this._convertMatches(pageMatches, pageMatchesLength);
        } else {
            this.matches.push(...this._convertMatches(pageMatches, pageMatchesLength));
        }

        this._renderMatches(this.matches);
    }

    _renderMatches(matches: Array<any>) {
        // Early exit if there is nothing to render.
        if (matches.length === 0) {
            return;
        }
        // const { findController, pageIdx } = this;
        const {textContentItemsStr, textDivs} = this;

        // const isSelectedPage = pageIdx === findController.selected.pageIdx;
        // const selectedMatchIdx = findController.selected.matchIdx;
        const highlightAll = true;
        const isSelectedPage = false;
        let prevEnd = null;
        const infinity = {
            divIdx: -1,
            offset: undefined
        };

        function beginText(begin: any, className?: string) {
            const divIdx = begin.divIdx;
            textDivs[divIdx].textContent = '';
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            return appendTextToDiv(divIdx, 0, begin.offset, className);
        }

        function appendTextToDiv(divIdx: number, fromOffset: number, toOffset?: number, className?: string) {
            let div = textDivs[divIdx];
            if (div.nodeType === Node.TEXT_NODE) {
                const span = document.createElement('span');
                div!.parentNode?.insertBefore(span, div);
                span.appendChild(div);
                textDivs[divIdx] = span;
                div = span;
            }
            const content = textContentItemsStr[divIdx].substring(fromOffset, toOffset);

            const node = document.createTextNode(content);
            if (className) {
                const span = document.createElement('span');
                span.className = `${className} appended`;
                span.appendChild(node);
                div.appendChild(span);
                return className.includes('selected') ? span.offsetLeft : 0;
            }
            div.appendChild(node);
            return 0;
        }

        let i0 = 0,
            i1 = i0 + 1;
        if (highlightAll) {
            i0 = 0;
            i1 = matches.length;
        } else if (!isSelectedPage) {
            // Not highlighting all and this isn't the selected page, so do nothing.
            return;
        }

        for (let i = i0; i < i1; i++) {
            const match = matches[i];
            const begin = match.begin;
            const end = match.end;
            const isSelected = isSelectedPage && i === -1;
            const highlightSuffix = isSelected ? ' selected' : '';
            let selectedLeft = 0;

            // Match inside new div.
            if (!prevEnd || begin.divIdx !== prevEnd.divIdx) {
                // If there was a previous div, then add the text at the end.
                if (prevEnd !== null) {
                    appendTextToDiv(prevEnd.divIdx, prevEnd.offset, infinity.offset);
                }
                // Clear the divs and set the content until the starting point.
                beginText(begin);
            } else {
                appendTextToDiv(prevEnd.divIdx, prevEnd.offset, begin.offset);
            }

            if (begin.divIdx === end.divIdx) {
                selectedLeft = appendTextToDiv(begin.divIdx, begin.offset, end.offset, 'highlight' + highlightSuffix);
            } else {
                selectedLeft = appendTextToDiv(begin.divIdx, begin.offset, infinity.offset, 'highlight begin' + highlightSuffix);
                for (let n0 = begin.divIdx + 1, n1 = end.divIdx; n0 < n1; n0++) {
                    textDivs[n0].className = 'highlight middle' + highlightSuffix;
                }
                beginText(end, 'highlight end' + highlightSuffix);
            }
            prevEnd = end;

            if (isSelected) {
                // Attempt to scroll the selected match into view.
                // findController.scrollMatchIntoView({
                //   element: textDivs[begin.divIdx],
                //   selectedLeft,
                //   pageIndex: pageIdx,
                //   matchIndex: selectedMatchIdx,
                // });
            }
        }

        if (prevEnd) {
            appendTextToDiv(prevEnd.divIdx, prevEnd.offset, infinity.offset);
        }
    }
}
