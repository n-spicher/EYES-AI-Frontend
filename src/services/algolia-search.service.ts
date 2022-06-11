import {ServiceClass} from '@/decorators';

import * as tcom from 'thesaurus-com';

@ServiceClass()
export class AlgoliaSearchSearvice {
    public init() {}

    public getSynonym(word: string) {
        return tcom.search(word);
    }
}
