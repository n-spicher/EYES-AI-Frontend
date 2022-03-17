export function parseJwt<T>(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
    );

    return JSON.parse(jsonPayload) as T;
}

const CHARACTERS_TO_NORMALIZE: any = {
    '\u2010': '-', // Hyphen
    '\u2018': "'", // Left single quotation mark
    '\u2019': "'", // Right single quotation mark
    '\u201A': "'", // Single low-9 quotation mark
    '\u201B': "'", // Single high-reversed-9 quotation mark
    '\u201C': '"', // Left double quotation mark
    '\u201D': '"', // Right double quotation mark
    '\u201E': '"', // Double low-9 quotation mark
    '\u201F': '"', // Double high-reversed-9 quotation mark
    '\u00BC': '1/4', // Vulgar fraction one quarter
    '\u00BD': '1/2', // Vulgar fraction one half
    '\u00BE': '3/4' // Vulgar fraction three quarters
};

let normalizationRegex: any = null;
export function normalize(text: string) {
    if (!normalizationRegex) {
        // Compile the regular expression for text normalization once.
        const replace = Object.keys(CHARACTERS_TO_NORMALIZE).join('');
        normalizationRegex = new RegExp(`[${replace}]`, 'g');
    }
    let diffs: any = null;
    const normalizedText = text.replace(normalizationRegex, function(ch, index) {
        const normalizedCh = CHARACTERS_TO_NORMALIZE[ch],
            diff = normalizedCh.length - ch.length;
        if (diff !== 0) {
            if (!diffs) {
                diffs = [];
            }
            diffs.push([index, diff]);
        }
        return normalizedCh;
    });

    return [normalizedText, diffs];
}

const CharacterType = {
    SPACE: 0,
    ALPHA_LETTER: 1,
    PUNCT: 2,
    HAN_LETTER: 3,
    KATAKANA_LETTER: 4,
    HIRAGANA_LETTER: 5,
    HALFWIDTH_KATAKANA_LETTER: 6,
    THAI_LETTER: 7
};

function isAlphabeticalScript(charCode: any) {
    return charCode < 0x2e80;
}

function isAscii(charCode: any) {
    return (charCode & 0xff80) === 0;
}

function isAsciiAlpha(charCode: any) {
    return (charCode >= /* a = */ 0x61 && charCode <= /* z = */ 0x7a) || (charCode >= /* A = */ 0x41 && charCode <= /* Z = */ 0x5a);
}

function isAsciiDigit(charCode: any) {
    return charCode >= /* 0 = */ 0x30 && charCode <= /* 9 = */ 0x39;
}

function isAsciiSpace(charCode: any) {
    return charCode === /* SPACE = */ 0x20 || charCode === /* TAB = */ 0x09 || charCode === /* CR = */ 0x0d || charCode === /* LF = */ 0x0a;
}

function isHan(charCode: any) {
    return (charCode >= 0x3400 && charCode <= 0x9fff) || (charCode >= 0xf900 && charCode <= 0xfaff);
}

function isKatakana(charCode: any) {
    return charCode >= 0x30a0 && charCode <= 0x30ff;
}

function isHiragana(charCode: any) {
    return charCode >= 0x3040 && charCode <= 0x309f;
}

function isHalfwidthKatakana(charCode: any) {
    return charCode >= 0xff60 && charCode <= 0xff9f;
}

function isThai(charCode: any) {
    return (charCode & 0xff80) === 0x0e00;
}

/**
 * This function is based on the word-break detection implemented in:
 * https://hg.mozilla.org/mozilla-central/file/tip/intl/lwbrk/WordBreaker.cpp
 */
function getCharacterType(charCode: any) {
    if (isAlphabeticalScript(charCode)) {
        if (isAscii(charCode)) {
            if (isAsciiSpace(charCode)) {
                return CharacterType.SPACE;
            } else if (isAsciiAlpha(charCode) || isAsciiDigit(charCode) || charCode === /* UNDERSCORE = */ 0x5f) {
                return CharacterType.ALPHA_LETTER;
            }
            return CharacterType.PUNCT;
        } else if (isThai(charCode)) {
            return CharacterType.THAI_LETTER;
        } else if (charCode === /* NBSP = */ 0xa0) {
            return CharacterType.SPACE;
        }
        return CharacterType.ALPHA_LETTER;
    }

    if (isHan(charCode)) {
        return CharacterType.HAN_LETTER;
    } else if (isKatakana(charCode)) {
        return CharacterType.KATAKANA_LETTER;
    } else if (isHiragana(charCode)) {
        return CharacterType.HIRAGANA_LETTER;
    } else if (isHalfwidthKatakana(charCode)) {
        return CharacterType.HALFWIDTH_KATAKANA_LETTER;
    }
    return CharacterType.ALPHA_LETTER;
}

function getOutputScale(ctx: any) {
    const devicePixelRatio = window.devicePixelRatio || 1;
    const backingStoreRatio = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
    const pixelRatio = devicePixelRatio / backingStoreRatio;
    return {
        sx: pixelRatio,
        sy: pixelRatio,
        scaled: pixelRatio !== 1
    };
}

export {CharacterType, getCharacterType, getOutputScale};
